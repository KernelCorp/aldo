var doc = $(document);

var ajok = 
{
	i : 1,
	state: { i : 0 },
	containers: {}
};

jQuery.fn.extend({
  ajok_attach: function( fun ) {
    return this.each(function() {
    	$(this).on('ajok:attach', function(e){
    		if( e.target == this ) fun();
    	});
    });
  },
  ajok_detach: function( fun ) {
    return this.each(function() {
    	$(this).on('ajok:detach', function(e){
    		if( e.target == this ) fun();
    	});
    });
  }
});

function history_container( selector, request0 ){
	if( ! history.pushState ) return false;

	var house = $( selector );
	
	if( house.data("container") ){
		log( selector + " container two times" );
		return false;
	}
	
	var hc =
	{
		key: "",
		house: house,
		
		request: function( position, key, url ) {
			if( key == this.key ) return;
		
			request0.call( this, position, key, url );
		},
		
		remember: function( position, key, url ){
			this.key = key;
			ajok.containers[ selector ] = true;
	
			if( position != 'old_cache' ){
				var state = 
				{ 
					who : selector,
					i : ( position == 'new' ) ? ajok.i++ : ajok.state.i
				};
				
				for( c in ajok.containers )
					if( ajok.containers[ c ] )
						state[ c ] = $( c ).data("container").key;
				
				if( position == 'new' ) history.pushState( state, document.title, url);
				else
				if( position == 'old' ) history.replaceState( state, document.title, url);
			}
			
			ajok.state = history.state;
		},

		forget: function(){
			ajok.containers[ selector ] = false;
		}
	}
	
	house.data({ container : hc });
	
	return hc;
}

function ajok_container( selector, rabota, changeRoom0 ){

	var ac = history_container(
		selector,
		
		function request0( position, key, url ) {
			
			if( this.cache[ key ] )
			{
				changeRoom.call(
					this,
					( position == 'old' ) ? 'old_cache' : position, 
					key,
					url,
					this.cache[ key ], 
					true
				);
			}
			else 
			{
				var thos = this;
				$.get(
					key,
					function( data ){
						changeRoom.call(
							thos,
							position, 
							key,
							url,
							rabota.call( thos, data ),
							false 
						);
					}
				);
			}
		}
	);

	ac.reload = function(){
		var thos = this;
		$.get(
			thos.key,
			function( data ){
				changeRoom.call(
					thos,
					'old_cache', 
					thos.key,
					'',
					rabota.call( thos, data ),
					false 
				);
			}
		);
	};
	
	ac.initi = function( key, room ){
		ac.key = key;
		ac.room = room.trigger("ajok:attach");
		ac.cache[ key ] = room;

		changeRoom0.call( this );
		
		var state = ( history.state ) ? history.state : {};
		state[ selector ] = key;
		history.replaceState( state, document.title );
	};
	
	ac.cache = {};
	ac.room = {};

	function changeRoom( position, key, url, room, cache ){
		this.room.trigger("ajok:detach");
		this.room.detach();
		
		this.room = $( room );

		this.room.appendTo( this.house );
		this.room.trigger("ajok:attach");
		
		changeRoom0.call( this, { position: position, key: key, url: url, room: room, cache: cache } );
		
		this.remember( position, key, url );
		
		if( !cache ) this.cache[ key ] = this.room;
	}
	
	return ac;
}

window.addEventListener('popstate', function(event) {
	if (
		event.state != undefined && 
		event.state.who != undefined
	){
		var who = ( event.state.i > ajok.state.i ) ? event.state.who : ajok.state.who;
		
		$( who ).data("container").request( 'old', event.state[who] );
	}
});

// local

var aj = {};

doc.on('mousedown', 'a', function(e){
	var t = $(this);

	if( 
		t.attr("href") != undefined && 
		t.attr("href")[0] == "/" &&
		t.attr("j") == undefined
	){
		t
		.attr("j", 1)
		.on('click', function(e){
			if( e.which != undefined && e.which != 1 ) return;
			if( t.attr("href") ) aj.request( 'new', t.attr('href'), t.attr('href') );
			return false;
		});
	}
});

if ( history.pushState ) {
	doc.ready( function(){
		aj = ajok_container(
			"#content",
			
			function rabota( data ){ 
				return data; 
			},
			
			function changeRoom0( args ){
				$("body").animate({ scrollTop: 0 }, 300);

				var ajok_data = this.house.children('.ajok_data');

				var background = $('#_background');

				if( ajok_data.data('back') )
					background
					.css('background-image', 'url('+ ajok_data.data('back') +')')
					.css({ opacity: 0.9 })
					.animate({ opacity: 1 }, 700 );
				else
					background.hide();

				$('#menu a').removeClass('active').eq( ajok_data.data('menu') ).addClass('active');
			}
		);
		aj.remember( 2, window.location.pathname.toString(), window.location.pathname.toString() );
		aj.initi( window.location.pathname.toString(), aj.house.children() );
	});
}