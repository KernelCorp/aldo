var doc = $(document);

function jso( obj ){
  return JSON.stringify( obj );
}

function log( message ){
  console.log( message );
}

function random( max ){
  return Math.floor( Math.random() * max );
}

function sendAjax( type, element, url, message, reaction ){
  if( element.data('respond_wait') ) return;
  element.data('respond_wait', 1);

  $[type](
    url,
    message,
    function( data ){
      if( !data._no_more ) setTimeout( function(){ element.removeData('respond_wait'); }, 1000 );
      if( reaction ) reaction( data );
    },
    'json'
  );
}

function sendPost( element, url, message, reaction ){
  sendAjax( 'post', element, url, message, reaction );
}

function sendGet( element, url, message, reaction ){
  sendAjax( 'get', element, url, message, reaction );
}

jQuery.fn.extend({
  left: function( fun ) {
    return this.on('mousedown', function(e){
      if( e.which != undefined && e.which != 1 ) return;
      return fun(e);
    });
  },
  choosen: function( className ) {
    this.addClass( className ).siblings().removeClass( className );
    return this;
  },
  rad: function( eq, className ){
    this.removeClass(on).eq(nomer).addClass(on);
    return this;
  }
});
