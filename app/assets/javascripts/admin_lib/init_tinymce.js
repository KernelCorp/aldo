$(document).ready( function() {
    tinymce.init({
        selector: "textarea",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table contextmenu paste"
        ],
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        setup : function(ed) {
            // Add a custom button
            ed.addButton('insertfile', {
                title : 'Insert Image',
                image : 'http://lorempixel.com/100/100/cats',
                onclick : function() {
                    $('#modal').modal();
                    ed.focus();
                    ed.selection.setContent('<img style="display: inline" src="http://lorempixel.com/400/200/cats">');
                }
            });
        }

    });
});