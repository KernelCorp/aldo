//select
//select_current
//select_input
//select_list

//empty_list
//not_matching
//unselectable

doc.on('mousedown focusin change', '.select', function(e){
  var q = $(e.target);
  var select = $( this );
  var input = select.children('.select_input');
  var current = select.children('.select_current');

  if( current.prop('disabled') ) return;

  if( !select.data('select_activated') ){
    select.data('select_activated', true);

    var listki = select.children('.select_list').children('.select_option');

    current.on('keyup', function(){
      if( !select.hasClass('select') ) return;

      var regexp_part = new RegExp(     current.val(),    'i' );
      var regexp_full = new RegExp( '^'+current.val()+'$','i' );
      var empty_list = true;

      listki.each( function(){
        var q = $(this);

        if( q.hasClass('unselectable') ) return;

        var text = q.text();
        var matching = regexp_part.test(text);

        if( matching ){
          empty_list = false;
          q.toggleClass('on', regexp_full.test(text) );
          q.removeClass('not_matching');
        } else {
          q.addClass(   'not_matching');
          q.removeClass('on');
        }
      });

      select.toggleClass( 'empty_list', empty_list );
    });

    current.on('focusout', function(){
      listki.removeClass('not_matching');
      select.toggleClass( 'empty_list', !listki.is(':not(.unselectable)') );
    });

    current.on('change', function(e, listok){
      if( !select.hasClass('select') ) return;

      if( listok ){ 
        listki.removeClass('not_matching');
        listok.choosen('on');
        current.val( listok.text() );
      } else {
        listok = listki.filter('.on').not('.unselectable').eq(0);
      }

      if( listok.length ){
        input.val( listok.data('select') ).trigger('change', [ listok ]);
      } else {
        input.val('').trigger('change', [false]);
      }
    });

    current.trigger('keyup');
    if( e.type == 'change' ){
      current.trigger('change');
      return false;
    } 
  }

  if( e.type == 'change' ) return;
  if( e.type == 'mousedown' && e.which != undefined && e.which != 1 ) return false;

  if( q.is('.select_option') ) current.trigger( 'change', [ q ] );

  function unselect(e){
    if( e.which != undefined && e.which != 1 ) return;

    var q = $(e.target);
    var s = q.closest('.select');

    if( s.length && s.is(select) && !q.is('.select_option') ) return;

    select.removeClass('on');
    doc.off('mousedown', unselect);
  }

  if( !select.hasClass('on') ){
    select.addClass('on');
    doc.on('mousedown', unselect);
  }
});
