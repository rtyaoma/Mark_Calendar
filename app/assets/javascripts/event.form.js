$(document).on('turbolinks:load', function() {

//$('.main-task').next('.sub-task').val(e)
//var tdLen = $('.sub-task').parent('.main-task').length;
//if (tdLen < 0) {
  //$(this).css('display','none');
//}
$(document).on('change', '#event_allDay', function(){
  //var form = $('.new_event,.index_event,.edit_event');
  var checkBox = $('#event_allDay');
  var allDay = checkBox.prop('checked');
  if(allDay == true){
    $('#event_end_4i,#event_end_5i,#event_start_4i,#event_start_5i').addClass('one');
} else {
    $('#event_end_4i,#event_end_5i,#event_start_4i,#event_start_5i').removeClass('one');
}
return true;
  //form.find('#event_start_4i,#event_start_5i').toggleClass('one');  
});

//$(document).on('change', '#event_allDay', function(){
  //var form = $('.new_event,.index_event,.edit_event');
  //var checkBox = $('#event_allDay');
  //var allDay = checkBox.prop('checked');
  //form.find('.visible-if-allday').toggle(allDay);
  //form.find('.hidden-if-allday').toggle(!allDay);  
//});



//$('input[name="event[allDay]"]').on('click', function(){
  //if ($(this).prop('checked',true)) {
  //var form = $('body');
  //var checkBox = $('#event_allDay');
  //var allDay = checkBox.prop('checked');
  //form.find('#event_start_4i,#event_start_5i,#text').toggle(allDay);
  //form.find('#event_start_4i,#event_start_5i,#text').toggle(!allDay);
  //$('#event_end_4i,#event_end_5i').toggleClass('one');
  //$('#event_start_4i,#event_start_5i').toggleClass('one');
  
//});




$('.row-task').on('click',function(){
  var id = $(this).parent().data('id');
  var sub_id = ".sub-task-" + id
  //$(this).next('.hidden_row').children().slideToggle();
  
  $(this).parent().nextAll(sub_id).slideToggle();
});

$('.show_hide_row i').on('click',function(){
  alert("hahaha");
  $('.select-description').Toggle();
 });

 $('.sub-task-plus').on('click',function(){
  $(this).next().slideToggle();
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

$(document).on('nested:fieldRemoved', function(e) {
  var link = $(e.target).siblings('a.add_nested_fields');
    if (!link.data('limit')) {
      return;
    }
    if (link.siblings('.fields:visible').length < link.data('limit')) {
      link.show();
    }
});

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