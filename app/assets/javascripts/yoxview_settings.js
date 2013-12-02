function yoxview_call( yox_container ){
  yox_container
  .yoxview({
    renderButtons: false,
    renderMenu: false,
    autoHideInfo: false,
    backgroundOpacity: 0.95,
    onClose: function(){ $('#yoxviewButtons').fadeOut() },
    onOpen: function(){ $('#yoxviewButtons').fadeIn() },
    renderInfoExternally: false,
    renderInfoPin: false,
    popupMargin: '120 50 27'
  });
}

$(document).on('mousedown', '#yoxviewButtons', function(e){
  var t = $(e.target);

  switch( e.target.className ){
    case 'leftButton':
      $.yoxview.prev();
    break;
    case 'rightButton':
      $.yoxview.next();
    break;
    default:
      $.yoxview.close(); 
      $(this).fadeOut();
    break;
  }
});