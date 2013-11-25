var doc = $(document);

jQuery.fn.extend({
  ajok_append: function( fun ) {
    return this.each(function() {
    	$(this).on('ajok:append', function(e){
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

doc.on('ajok:append', function(e){
	var t = $(e.target);
	if( t.attr('data-menu') != undefined ) ajok_menu( t.attr('data-menu') );
})

var ajok = 
{
	i : 1,
	state: { i : 0 },
	containers: {}
}

function history_container( selector, request0 ){
	if( ! history.pushState ) return false;
	
	if( $( selector ).data("container") != undefined ){
		log( selector + "container two times" );
		return false;
	}
	
	var hc =
	{
		currentKey: "",
		house: $( selector ),
		
		request: function( his, requestKey, requestUrl ) {
			if( requestKey == this.currentKey ) return;
		
			request0.call( this, his, requestKey, requestUrl );
		},
		
		remember: function( his, key, url ){
			this.currentKey = key;
	
			if( his ){
				var state = 
				{ 
					who : selector,
					i : ( his == 1 ) ? ajok.i++ : ajok.state.i
				};
				
				for( c in ajok.containers ){
					if( ajok.containers[ c ] ){
						state[ c ] = $( c ).data("container").currentKey;
					}
				}
				
				if( his == 1 ) history.pushState( state, document.title, url);
				else
				if( his == 2 ) history.replaceState( state, document.title, url);
			}
			
			ajok.state = history.state;
		},
		
		attachTo: function( room ){
			room.on("ajok:append", function(){
				ajok.containers[ selector ] = true;
			});
			
			room.on("ajok:detach", function(){
				ajok.containers[ selector ] = false;
			});
			
			return this;
		}
	}
	
	$( selector ).data({ container : hc });
	
	return hc;
}

function ajok_container( selector, rabota, changeRoom0 ){
	function changeRoom( his, requestKey, requestUrl, room, nov ){
			
		this.room.trigger("ajok:detach");
		this.room.detach();
		
		this.room = $( room );
		this.room.appendTo( this.house );
		this.room.trigger("ajok:append");
		
		changeRoom0.call( this, his, requestKey, requestUrl, room, nov );
		
		this.remember( his, requestKey, requestUrl );
		
		if( nov ) this.cache[ requestKey ] = this.room;
	}

	var ac = history_container(
		selector,
		
		function request0( his, requestKey, requestUrl ) {
			
			if( this.cache[ requestKey ] != undefined )
			{
				changeRoom.call(
					this,
					2 - his, 
					requestKey,
					requestUrl,
					this.cache[ requestKey ], 
					false
				);
			}
			else 
			{
				var thos = this;
				$.get(
					requestKey,
					function( data ){
						changeRoom.call(
							thos,
							his, 
							requestKey,
							requestUrl,
							rabota.call( thos, data ),
							true 
						);
					}
				);
			}
		}
	);
	
	ac.cache = {};
	ac.room = {};

	ac.reload = function(){
		var thos = this;
		$.get(
			thos.currentKey,
			function( data ){
				changeRoom.call(
					thos,
					0, 
					thos.currentKey,
					"",
					rabota.call( thos, data ),
					true 
				);
			}
		);
	}
	
	ac.initi = function( currentKey, room, attach ){
		if( attach != undefined ){
			ac.attachTo( attach );
		}
		
		ac.currentKey = currentKey;
		ac.room = room.trigger("ajok:append");
		ac.cache[ currentKey ] = room;
		
		var state = ( history.state ) ? history.state : {};
		state[ selector ] = currentKey;
		history.replaceState( state, document.title );
	}
	
	return ac;
}

var aj = {};

if ( history.pushState ) {
	doc.ready( function(){
		aj = ajok_container(
			"#content",
			
			function rabota( data ){ 
				return data; 
			},
			
			function changeRoom0( his, requestKey, requestUrl, room, nov ){
				$("body").animate({ scrollTop: 0 }, 300);
				this.house.children().css("opacity", "0.01").animate({opacity: 1}, 500);
				//document.title = this.room.attr("data-title");
			}
		);
		aj.remember( 2, window.location.pathname.toString(), window.location.pathname.toString() );
		aj.initi( window.location.pathname.toString(), aj.house.children(), undefined );
		ajok.containers["#content"] = true;
	});

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
				if( t.attr("href") ) aj.request( 1, t.attr('href'), t.attr('href') );
				return false;
			});
		}
	});
}

window.addEventListener('popstate', function(event) {
	if (
		event.state != undefined && 
		event.state.who != undefined
	){
		var a = ( event.state.i > ajok.state.i ) ? event.state : ajok.state;
		
		$( a.who ).data("container").request( 2, event.state[a.who] );
	}
});