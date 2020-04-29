$(document).on('change', '#event_allDay', function(){
    var form = $('.new_event,.index_event,.edit_event');
    var checkBox = $('#event_allDay');
    var allDay = checkBox.prop('checked');
    form.find('.visible-if-allday').toggle(allDay);
    form.find('.hidden-if-allday').toggle(!allDay);  
});

$(document).on('turbolinks:load', function() {
$('#login-show').click(function(e){
    e.preventDefault(); //ブラウザのデフォルトのイベントを動作しないようにする
    $('#login-modal').fadeIn();
});
$('.signup-show').click(function(e){
	e.preventDefault(); //ブラウザのデフォルトのイベントを動作しないようにする
	$('#signup-modal').fadeIn();
});

$('.fa-ellipsis-v').click(function(){
		$('#login-modal').fadeOut();
		$('#signup-modal').fadeOut();
    });

$('.show_hide_row').on('click',function(){
 $('.hidden_row td').toggle();
});

$(document).on('click','.show_hide_row i',function(){
  $('.select-description').toggle();
 });
});

$(document).on('nested:fieldAdded', function(e) {
    var link = $(e.currentTarget.activeElement);
    if (!link.data('limit')) {
      return;
    }
    if (link.siblings('.fields:visible').length >= link.data('limit')) {
      link.hide();
    }
  });

  $(document).on('nested:fieldRemoved', function(e) {
    var link = $(e.target).siblings('a.add_nested_fields');
    if (!link.data('limit')) {
      return;
    }
    if (link.siblings('.fields:visible').length < link.data('limit')) {
      link.show();
    }
  });

//document.addEventListener(
    //"DOMContentLoaded", e => {
      //let modal_open = document.getElementById("login-show");
      //modal_open.onclick = function () {
        //$('#login-modal').fadeIn();
       // document.getElementById('.close-modal').onclick = function () {
          //$('#login-modal').fadeOut();
       // };
      //};
    //},
   // false
  //);
   //$(document).on('turbolinks:load', function(){
    //var form = $('.new_event');
    //if (form.length > 0) {
        //var checkBox = $('#event_allDay');
        //var allDay = checkBox.prop('checked');
        //form.find('.visible-if-allday').toggle(allDay);
        //form.find('.hidden_if_allday').toggle(!allDay);

       // checkBox.on('change', function(){
        //var allDay = checkBox.prop('checked');
         //form.find('.visible-if-allday').toggle(allDay);
         //form.find('.hidden-if-allday').toggle(!allDay);  
        //});
    //}
//});