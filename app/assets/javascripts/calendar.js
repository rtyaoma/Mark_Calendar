$(document).on('turbolinks:load', function() {

  // カレンダーを選択した時の動作　----------------------------------------------
  $('.calendar-select').change( function() {
    var vals = $('input[class="calendar-select"]:checked').map(function() {
      return $(this).val();
    }).get();
    $.ajax({
      type: "POST",
      url: "/select",
      data:{'calendar_id': vals},
      dataType: "json"
    }).done(function() {
      $.ajax({
        type: "GET",
        url: "/display"
      })   
      calendar.fullCalendar('refetchEvents');　
    });
    calendar.fullCalendar('unselect'); 
    var chk = $(this).prop('checked');
    if(chk == true){
        $(this).parent().addClass('checkedcolor');
    } else {
        $(this).parent().removeClass('checkedcolor');
    }
    return true;
  });

  // カレンダーを全てチェックをクリック -------------------------------
  $('.calendar-check').on('click',function(){
    $('input[name="event[calendar_id][]"]').attr('checked',true).prop('checked',true).change();
  });
 
  // カレンダーを全て外すをチェック ----------------------------------
  $('.calendar-minus').on('click',function(){
    $('input[name="event[calendar_id][]"]').removeAttr('checked').prop('checked',false).change();
  });

  // カレンダーを作るをクリック -------------------------------------
  $('.calendar-plus').on('click',function(){
    location.href = "/calendars/new";
  });


  // fulcalendar ------------------------------------------------
  var calendar = $('#calendar').fullCalendar({
    events: '/events.json',
    timeFormat: 'H:mm',
    header: {
      right: 'prevYear,prev,next,nextYear listDay,listWeek',
      center: 'title',
      left: 'month,agendaWeek,agendaDay today'
    },
    setAllDay: "true",
    axisFormat: 'H:mm',
    monthNames: ['１月','２月','３月','４月','５月','６月','７月','８月','９月','１０月','１１月','１２月'],
    monthNamesShort: ['１月','２月','３月','４月','５月','６月','７月','８月','９月','１０月','１１月','１２月'],
    dayNames: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
    editable: true,        // 編集可
    selectable: true, 
    droppable: true,
    selectHelper: false,    // 選択時にプレースホルダーを描画
    ignoreTimezone: false, // 自動選択解除
    buttonText: {
      prev:     '<', 
      next:     '>',
      prevYear: '<<',
      nextYear: '>>',
      today:    'Today',
      month:    'month',
      week:     'week',
      day:      'day',
      listDay:  'list(day)',
      listWeek:  'list(week)'
    },
    height: 700,                           // 高さ
    defaultView: 'month',             // 初期表示ビュー
    eventLimit: true,                      
    firstDay: 0,                           // 最初の曜日, 0:日曜日
    weekends: true,                        // 土曜、日曜を表示
    weekMode: 'fixed',                     // 週モード (fixed, liquid, variable)
    weekNumbers: false,                    // 週数を表示
    slotDuration: '00:30:00',              // 表示する時間軸の細かさ
    snapDuration: '00:15:00',              // スケジュールをスナップするときの動かせる細かさ
    minTime: "00:00:00",                   // スケジュールの開始時間
    maxTime: "24:00:00",                   // スケジュールの最終時間
    defaultTimedEventDuration: '10:00:00', // 画面上に表示する初めの時間(スクロールされている場所)
    allDaySlot: TextTrackCue,              // 終日スロットを非表示
    allDayText:'allday',                   // 終日スロットのタイトル
    slotMinutes: 15,                       // スロットの分
    snapMinutes: 15,                       // 選択する時間間隔
    alldayMaintainDuration: false,
    noEventsMessage: "予定がありません",
    scrollTime: "00:00:00",

    // 日付を選択した時の動作 --------------------------------------------
    select: function(startDate, endDate, allDay, view) {
      var v = view.type
      var allDay = !startDate.hasTime() && !endDate.hasTime();
      var start = startDate.format();
      var end = endDate.format();
      var position = $(".inner-right").offset().top -50;
      var speed = 500;
      var data = {
        event: {
          start: start,
          end: end,
          allDay: allDay,
        }
      };
      $.ajax ({
        type: 'GET',
        data: data,
        url: '/new_select',
      }).done(function (){
        $("html, body").animate({scrollTop:position}, speed, "swing");
        if (allDay == true) {
          $('#event_allDay').attr('checked',true).prop('checked', true).change();
        };
      }).fail(function(){
        alert('エラーが発生しました')
      });
    },

    //イベントをクリックしたときに動作 --------------------------------------
    eventClick: function(event) {
      var id = event.id
      var show_url = "/events/click/"+id;
      var position = $(".inner-right").offset().top -50;
      var speed = 500;
      $("html, body").animate({scrollTop:position}, speed, "swing");
      $.ajax ({
        type:'GET',
        url: show_url,
      }).done(function(res){
        $('.inner-right').html(res);
      });
    },

    //イベントをドラッグ&ドロップした際に動作 --------------------------------
    eventDrop: function(info) {
        var id = info.id;
        var update_url = "/api/v1/events/"+id;
        var start_year = moment(info.start).year();
        var end_year = moment(info.end).year();
        var start_month = moment(info.start).month()+1;
        var end_month = moment(info.end).month()+1;
        var start_day = moment(info.start).date();
        var end_day = moment(info.end).date();
        var edit_end_day = moment(info.start).date()+1;
        var start_hour = (moment(info.start).hours()   < 10 ) ? '0' + moment(info.start).hours() : moment(info.start).hours();
        var end_hour = (moment(info.end).hours()   < 10 ) ? '0' + moment(info.end).hours() : moment(info.end).hours();
        var edit_end_hour = (moment(info.start).hours()   < 10 ) ? '0' + (moment(info.start).hours()+1) : moment(info.start).hours()+1;
        var start_min = (moment(info.start).minutes()   < 10 ) ? '0' + moment(info.start).minutes() : moment(info.start).minutes();
        var end_min = (moment(info.end).minutes()   < 10 ) ? '0' + moment(info.end).minutes() : moment(info.end).minutes();
        var moment_start = start_year+"-"+start_month+"-"+start_day+" "+start_hour+":"+start_min;
        if (info.end == null && info.allDay == false){
          var moment_end = start_year+"-"+start_month+"-"+start_day+" "+edit_end_hour+":"+start_min;
        } else if (info.end == null && info.allDay == true) {
          var moment_end = start_year+"-"+start_month+"-"+edit_end_day+" "+start_hour+":"+start_min;
        }else {
          var moment_end = end_year+"-"+end_month+"-"+end_day+" "+end_hour+":"+end_min;
        }
        var data = {
        eventBorderColor: "#000000",
          event: {
            title: info.title,
            start: moment_start,
            end: moment_end,
            allDay: info.allDay,
            color: info.color,
            calendar_id: info.calendar_id
          }
        }
        if (confirm("移動しますか?")){
        $.ajax({
         type: "PATCH",
         url: update_url,
         data: data,
         dataType: "json",
         success: function() {
           calendar.fullCalendar('refetchEvents');
         }
        }),
        calendar.fullCalendar('unselect');
      }
      else
      calendar.fullCalendar('refetchEvents');
      },

     //イベントのサイズを変更した際に動作 --------------------------------
    eventResize: function(info) {
      var title = info.title;
      var start = info.start.toISOString();
      var end = info.end.toISOString();
      var id = info.id;
      var update_url = "/api/v1/events/"+id;
      var data = {
        event: {
          title: title,
          start: start,
          end: end,
          allDay: false,
          color: info.color,
        }
      }
      if (confirm("登録しますか?")){
      $.ajax({
       type: "PATCH",
       url: update_url,
       data: data,
       dataType: "json",
       success: function() {
         calendar.fullCalendar('refetchEvents');
       }
      });
      calendar.fullCalendar('unselect');
    }
    else
    calendar.fullCalendar('refetchEvents');
    },
  });

});
