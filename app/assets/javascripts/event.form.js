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
$('.filter').on('click',function(){
  $.ajax ({
    type: 'GET',
    url: '/filter'
  }).done(function (res){
  $('.inner-right').html(res);
  });
});

$(document).on('click','.task-table-title .filter-icon', function(){
  $('.filter-table').toggleClass('filter-display');
});

$(document).on('click','.filter1', function(){
  $('.filter-task').filter('[data-status="true"]').toggleClass('filter-select');
  //$('.filter-task').filter('[data-status="false"]').toggleClass('filter-select');
});


$(document).on('click','.filter2', function(){
  var now = new Date();
  var y = now.getFullYear();
  var m = now.getMonth() + 1;
  var d = now.getDate();
  var date = y + '/' + m + '/' + d 
  //var h = $('.filter-task').data('[deadline]');
  //var f = ($(this).data('[deadline]') > date);
  //alert(f)
  $('.filter-task').filter(function(){
    return ($(this).data('[deadline]') > date);
  }).toggleClass('filter-select');
}),







$('.row-task').on('click',function(){
  var id = $(this).parent().data('id');
  var sub_id = ".sub-task-" + id
  //$(this).next('.hidden_row').children().slideToggle();
  
  $(this).parent().nextAll(sub_id).slideToggle();
});

$(document).on('click','.show_hide_row i',function(){
 // alert("hahaha");
  $('.select-description').toggle();
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