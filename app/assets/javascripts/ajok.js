jQuery.fn.extend({
  ajok_attach: function( fun ) {
    return this.on('ajok:attach', function(e){
      if( e.target == this ) fun();
    });
  },
  ajok_detach: function( fun ) {
    return this.on('ajok:detach', function(e){
      if( e.target == this ) fun();
    });
  }
});

var ajok = 
{
  i : 1,
  state: { i : 0 },
  containers: {}
};

History_Container = function( selector ){
  var house = $( selector );
  if( house.data('container') ){
    log( selector + ' container two times' );
  } else {
    house.data('container', this);
  }

  this.selector = selector;
  this.house = house;
}

History_Container.prototype = 
  {
    key: '',
    
    request: function( position, key, url ) {
      if( key == this.key ) return;

      this._request( position, key, url );
    },
    
    remember: function( position, key, url ){
      this.key = key;
      ajok.containers[ this.selector ] = true;

      if( position != 'old_cache' ){
        var state = 
        { 
          who : this.selector,
          i : ( position == 'new' ) ? ajok.i++ : ajok.state.i
        };
        
        for( c in ajok.containers )
          if( ajok.containers[ c ] != undefined )
            state[ c ] = $( c ).data('container').key;
        
        if( position == 'new' ) history.pushState( state, document.title, url);
        else
        if( position == 'old' ) history.replaceState( state, document.title, url);
      }
      
      ajok.state = history.state;
    },

    forget: function(){
      ajok.containers[ this.selector ] = undefined;
    }
  };

Ajok_Container = function( selector, key, room ){
  History_Container.call(this, selector);

  this.key = key;
  this.room = room.trigger('ajok:attach');
  this.cache[ key ] = room;

  this._changeRoom();
  
  var state = ( history.state ) ? history.state : {};
  state[ selector ] = key;
  history.replaceState( state, document.title );
}

Ajok_Container.prototype = 
  $.extend({}, History_Container.prototype,
  {
    cache: {},
    room: {},

    _request: function( position, key, url ) {
      if( this.cache[ key ] )
      {
        this.changeRoom(
          ( position == 'old' ) ? 'old_cache' : position, 
          key,
          url,
          this.cache[ key ], 
          false
        );
      }
      else 
      {
        var thos = this;
        $.get(
          key,
          function( data ){
            thos.changeRoom(
              position, 
              key,
              url,
              thos._build( data ),
              true 
            );
          },
          'html'
        );
      }
    },

    reload: function(){
      var thos = this;
      $.get(
        thos.key,
        function( data ){
          this.changeRoom(
            'old_cache', 
            thos.key,
            '',
            thos._build( data ),
            true 
          );
        },
        'html'
      );
    },

    changeRoom: function( position, key, url, room, for_cache ){
      this.room.trigger('ajok:detach');
      this.room.detach();
      
      this.room = $( room );

      this.room.appendTo( this.house );
      this.room.trigger('ajok:attach');
      
      this._changeRoom({ position: position, key: key, url: url, room: room, for_cache: for_cache });
      
      this.remember( position, key, url );
      
      if( for_cache ) this.cache[ key ] = this.room;
    }
  });

window.addEventListener('popstate', function(event) {
  if ( !event.state || !event.state.who ) return;
  var who = ( event.state.i > ajok.state.i ) ? event.state.who : ajok.state.who;
  $( who ).data('container').request( 'old', event.state[who] );
});

//local

if ( history.pushState ) {
  var aj, AJ = function( selector, key, room ){
    Ajok_Container.call( this, selector, key, room );

    this.remember( 'old', window.location.pathname.toString(), window.location.pathname.toString() );
  }

  AJ.prototype = 
    $.extend({}, Ajok_Container.prototype, {
      _build: function( data ){
        return $(data).find( this.selector ).children();
      },

      _changeRoom: function( args ){
        var ajok_data = this.house.children('.ajok_data');

        $("body").animate({ scrollTop: 0 }, 300);

        var current_url = args ? args.url : window.location.pathname.toString();

        var background = $('#_background');

        if( ajok_data.data('back') )
          background
          .show()
          .css('background-image', 'url('+ ajok_data.data('back') +')')
          .css({ opacity: 0.9 })
          .animate({ opacity: 1 }, 700 );
        else
          background.hide();

        if( ajok_data.data('menu') ){
          $('#menu a').removeClass('active').eq( ajok_data.data('menu') ).addClass('active');
        } else {
          $('#menu a').removeClass('active').filter('[href="'+current_url+'"]').addClass('active');
        }
      }
    });

  $(function(){
    aj = new AJ( '#content', window.location.pathname.toString(), $('#ajok_house').children() );
  });

  $(document).on('mousedown', 'a[href^="/"]', function(e){
    var t = $(this);

    if( !t.attr('target') && !t.data('remote') ){
      t
      .attr('target', '_self')
      .on('click', function(e){
        if( e.which && e.which != 1 ) return;
        if( t.attr('href') ) aj.request( 'new', t.attr('href'), t.attr('href') );
        return false;
      });
    }
  });
}
