$(document).on('turbolinks:load', function() {

// allDayのcheckboxの動作---------------------------------------
$(document).on('change', '#event_allDay', function(){
  var checkBox = $('#event_allDay');
  var allDay = checkBox.prop('checked');
  if(allDay == true){
    $('#event_end_4i,#event_end_5i,#event_start_4i,#event_start_5i').addClass('one');
    $('label[for="event_allDay"]').parent().addClass('checked-allDay');
} else {
    $('#event_end_4i,#event_end_5i,#event_start_4i,#event_start_5i').removeClass('one');
    $('label[for="event_allDay"]').parent().removeClass('checked-allDay');
}
});

// taskの予定表をクリックしたときの動作------------------------------
$('.filter').on('click',function(){
  $.ajax ({
    type: 'GET',
    url: '/filter'
  }).done(function (res){
  $('.inner-right').html(res);
  });
});

// taskの予定表から、絞り込みメニューを表示---------------------------
$(document).on('click','.task-table-title .filter-icon', function(){
  $('.filter-table').toggleClass('filter-display');
});

// taskの予定表から、未完了のみを表示--------------------------------
$(document).on('click','.filter1', function(){
  $('.filter-task').filter('[data-status="true"]').toggleClass('filter-select');
});


$(document).on('click','.filter2', function(){
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var ww = $('.filter-task').find('.deadline').text()
    var date = y + '/' + m + '/' + d 
   console.log(now + "+" + ww)
   var mm = $('.filter-task').data('status')
 
    //alert(data);
    $('.filter-task').filter(function(){
      return new Date(ww) > new Date(date)
    }).toggleClass('filter-select');
    //console.log(res.length);

    
      //if ($(this).('[deadline]') > date){
        //return true;
      //} else {
        //return false;
      //}
    //}
  //var h = $('.filter-task').data('[deadline]');
  //var f = ($(this).data('[deadline]') > date);
  //alert(f)
  //$('.filter-task').filter(filterSelect).toggleClass('filter-select');
})





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
