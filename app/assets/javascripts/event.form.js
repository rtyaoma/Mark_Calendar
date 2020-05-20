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
$('.inner-right').on('click','.filter-icon', function(){
  var o = $(this).offset();
  $('.filter-table').toggle();
  $('.filter-table').css({top: o.top-40, left: o.left });
});

// taskの予定表から、未完了のみを表示--------------------------------
$('.inner-right').on('click','.filter4', function(){
  var size = $('.filter-task').filter('[data-status="false"]').size();
  var newtext =  $('.filter4').text();
  $('.task-not').css('display','none')
  $('.filter-task').show();
  $('.filter-icon').text(newtext);
  $('.filter-table').toggle();
  $('.filter-task').filter('[data-status="true"]').toggle();
  if (size == 0){
    $('.task-not').css('display','block')
    $('.task-not p').text('タスクは全て達成されてます！！')
  }
});

// taskの予定表から、完了のみを表示--------------------------------
$('.inner-right').on('click','.filter3', function(){
  var size = $('.filter-task').filter('[data-status="true"]').size();
  $('.task-not').css('display','none')
  $('.filter-task').show();
  $('.filter-task').filter('[data-status="false"]').toggle();
  var newtext =  $('.filter3').text();
  $('.filter-icon').text(newtext);
  $('.filter-table').toggle();
  if (size == 0){
    $('.task-not').css('display','block')
    $('.task-not p').text('完了したタスクはありません。')
  }
});

// taskの予定表から、期限切れを表示--------------------------------
$('.inner-right').on('click','.filter2', function(){
  $('.task-not').css('display','none')
  $('.filter-task').show();
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate() - 1;
    var date = y + '/' + m + '/' + d 
     $('.filter-task').filter(function(){
      var deadline = $(this).find('.deadline').text();
      return new Date(deadline) > new Date(date) 
    }).toggle();
    var newtext =  $('.filter2').text();
    $('.filter-icon').text(newtext);
    $('.filter-table').toggle();
});

// taskの予定表から、明日以降を表示--------------------------------
$('.inner-right').on('click','.filter5', function(){
  $('.task-not').css('display','none')
  $('.filter-task').show();
  var now = new Date();
  var y = now.getFullYear();
  var m = now.getMonth() + 1;
  var d = now.getDate() + 1;
  var date = y + '/' + m + '/' + d 
  var cut = $('.filter-task').filter(function(){
    var deadline = $(this).find('.deadline').text();
    return new Date(deadline) > new Date(date)
  }).size();
  $('.filter-task').filter(function(){
    var deadline = $(this).find('.deadline').text();
    return new Date(deadline) < new Date(date)
  }).toggle();
  var newtext =  $('.filter5').text();
  $('.filter-icon').text(newtext);
  $('.filter-table').toggle();
  if (cut == 0){
    $('.task-not').css('display','block')
    $('.task-not p').text('タスクはありません。タスクを作成しましょう！！')
  }
})

// taskの予定表から、全てを表示--------------------------------
$('.inner-right').on('click','.filter1', function(){
  $('.task-not').css('display','none')
  $('.filter-task').show();
  var newtext =  $('.filter1').text();
  $('.filter-icon').text(newtext);
  $('.filter-table').toggle();
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
