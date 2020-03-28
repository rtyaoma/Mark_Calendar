$(document).on('turbolinks:load', function() {

    var calendar = $('#calendar').fullCalendar({
    events: '/events/index.json',
    timeFormat: 'H:mm',
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    setAllDay: "false",
    axisFormat: 'H:mm',
    monthNames: ['１月','２月','３月','４月','５月','６月','７月','８月','９月','１０月','１１月','１２月'],
    monthNamesShort: ['１月','２月','３月','４月','５月','６月','７月','８月','９月','１０月','１１月','１２月'],
    dayNames: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
    editable: true,        // 編集可
    selectable: true,      // 選択可
    //selectHelper: true,    // 選択時にプレースホルダーを描画
    ignoreTimezone: false, // 自動選択解除
   //select: select,        // 選択時に関数にパラメータ引き渡す
    buttonText: {
      prev:     '<',   // &lsaquo;
      next:     '>',   // &rsaquo;
      prevYear: '<<',  // &laquo;
      nextYear: '>>',  // &raquo;
      today:    'Today',
      month:    '月',
      week:     '週',
      day:      '日'
    },
    height: 800,                           // 高さ
    defaultView: 'month',             // 初期表示ビュー
    eventLimit: true,                      // allow "more" link when too many events
    firstDay: 0,                           // 最初の曜日, 0:日曜日
    weekends: true,                        // 土曜、日曜を表示
    weekMode: 'fixed',                     // 週モード (fixed, liquid, variable)
    weekNumbers: false,                    // 週数を表示
    slotDuration: '00:30:00',              // 表示する時間軸の細かさ
    snapDuration: '00:15:00',              // スケジュールをスナップするときの動かせる細かさ
    minTime: "00:00:00",                   // スケジュールの開始時間
    maxTime: "24:00:00",                   // スケジュールの最終時間
    defaultTimedEventDuration: '10:00:00', // 画面上に表示する初めの時間(スクロールされている場所)
    //allDaySlot: false,                     // 終日スロットを非表示
    allDayText:'allday',                   // 終日スロットのタイトル
    slotMinutes: 15,                       // スロットの分
    snapMinutes: 15,                       // 選択する時間間隔
    firstHour: 9,
    dayClick: function(start) {
      const year = moment(start).year();
      const month = moment(start).month()+1
      const day = moment(start).date();
      $.ajax ({
        type: 'GET',
        url: '/events/click',
      }).done(function (res){
        $('.content_right').html(res);
        //window.location.href = '/events/new';
        $('#event_starts_at_1i').val(year);
        $('#event_starts_at_2i').val(month);
        $('#event_starts_at_3i').val(day);
        $('#event_ends_at_3i').val(day);
        }).fail(function (result){
          alert('エラーが発生しました')
        });
    },
    eventClick: function(event) { //イベントをクリックしたときに実行
      var id = event.id
      var show_url = "/events/click/"+id;
      $.ajax ({
        type:'GET',
        url: show_url,
      }).done(function(res){
        $('.content_right').html(res);
      });
      //location.href = show_url;
    },
    eventDrop: function(event) { //イベントをドラッグ&ドロップした際に実行
      var id = event.id
      var update_url = "/api/v1/events/"+id
      var start = moment(start).format("YYYY-MM-DD HH:mm");
      var end = start.clone();
      var event_start_time = event._start._d
      var year = event_start_time.getYear() + 1900;
      var month = event_start_time.getMonth() + 1;
      var day   = event_start_time.getDate();
      var hour  = ( event_start_time.getHours()   < 10 ) ? '0' + event_start_time.getHours()   : event_start_time.getHours();
      var min   = ( event_start_time.getMinutes() < 10 ) ? '0' + event_start_time.getMinutes() : event_start_time.getMinutes();
      var event_end_time = event._end._d
      var year = event_end_time.getYear() + 1900;
      var month = event_end_time.getMonth() + 1;
      var day   = event_end_time.getDate();
      var hour  = ( event_end_time.getHours()   < 10 ) ? '0' + event_end_time.getHours()   : event_end_time.getHours();
      var min   = ( event_end_time.getMinutes() < 10 ) ? '0' + event_end_time.getMinutes() : event_end_time.getMinutes();
      var moment_end = year+"-"+month+"-"+day+" "+hour+":"+min;
      var end_time = moment(moment_end).add(-9, 'hour').format("YYYY-MM-DD HH:mm");
      var data = {
        event: {
          title: event.title,
          starts_at: start,
          ends_at: end_time,
          allday: false
        }
      }
      $.ajax({
       type: "PATCH",
       url: update_url,
       data: data,
       success: function() {
         calendar.fullCalendar('refetchEvents');
       }
      });
      calendar.fullCalendar('unselect');
    },
  });
});
// カレンダー表示部分
