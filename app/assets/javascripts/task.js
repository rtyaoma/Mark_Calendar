$(document).on('turbolinks:load', function() {

  // タスクをチェックしたときの動作 -------------------------
  $('.inner-right').on('change','input[name="status"]',function(){
    var id = $(this).data('id');
    var done_url = "/tasks/"+id+"/done";
    var begin_url = "/tasks/"+id+"/begin";
    var chk = $(this).prop('checked');
    
    if (chk == true){
        $.ajax({
          type: "POST",
          url: done_url,
        })
        alert("チェックしました");
    } else {
        $.ajax({
          type: "POST",
          url: begin_url,
        })
        alert("チェックを外しました");
    }
  });

  // サブタスクをチェックした時の動作 -------------------------
  $('.inner-right').on('change','input[name="sub_status"]',function(){
    var id = $(this).data('id');
    var task_id = $(this).data('task_id')
    var sub_task_not = "input[class=" + '"' + "sub_status_" + task_id + '"' + "]:not(:checked)"
    var maintask_checked = "input[class=" + '"' + "status_" + task_id + '"' + "]:checked"
    var maintask_not = "input[class=" + '"' + "status_" + task_id + '"' + "]:not(:checked)"
    var maintask = "input[class=" + '"' + "status_" + task_id + '"' + "]"
    var done_url = "/sub_tasks/"+id+"/done";
    var begin_url = "/sub_tasks/"+id+"/begin";
    var chk = $(this).prop('checked');

    if (chk == true) {
      alert("チェックしました");
        $.ajax({
          type: "POST",
          url: done_url,
        }).done(function (){
          if ($(sub_task_not).size() == 0 && $(maintask_not).size() == 1) {
            $(maintask).attr('checked',true).prop('checked',true).change();
          }
        });
    } else {
      alert("チェックを外しました");
        $.ajax({
          type: "POST",
          url: begin_url,
        }).done(function (){
          if ($(maintask_checked).size() > 0 ) {
            $(maintask).attr('checked',false).prop('checked',false).change();
          }
        });
    }
  });

  // タスクのタイトルをクリックしたときに詳細画面へ移動 ---------------------------
  $('.inner-right').on('click','.main-task-inner',function(){
    var id = $(this).data('id');
    location.href = "/tasks/"+id;
    var position = $(".inner-right").offset().top -50;
    var speed = 500;
    $("html, body").animate({scrollTop:position}, speed, "swing");
  });

  // サブタスクを開く --------------------------------------------------------
 $('.sub-task-plus').on('click',function(){
  $(this).next().slideToggle();
 });

// サブタスクの追加、削除 ----------------------------------------------------
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
    $('.filter-table').css({
      top: o.top-40,
      left: o.left
    });
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
      $('.task-not').css('display','block');
      $('.task-not p').text('タスクは全て達成されてます！！')
    }
  });

  // taskの予定表から、完了のみを表示--------------------------------
  $('.inner-right').on('click','.filter3', function(){
    var size = $('.filter-task').filter('[data-status="true"]').size();
    $('.task-not').css('display','none');
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
    $('.task-not').css('display','none');
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
    $('.task-not').css('display','none');
    $('.filter-task').show();
    var newtext =  $('.filter1').text();
    $('.filter-icon').text(newtext);
    $('.filter-table').toggle();
  })

});