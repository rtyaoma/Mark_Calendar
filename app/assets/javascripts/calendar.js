$(document).on('turbolinks:load', function() {
  setTimeout("$('.time-limit').fadeOut('slow')", 1000), //　エラーの表示時間

  $('input[name="event[calendar_id][]"]').change(function() {　//　calendarの選択
    var vals = $('input[name="event[calendar_id][]"]:checked').map(function() {
      return $(this).val();
    }).get();
    $.ajax({
      type: "POST",
      url: "/select",
      data:{'calendar_id': vals},
      dataType: "json"
    }).done(function() {
      calendar.fullCalendar('refetchEvents');　//再レンダリング
    });
    calendar.fullCalendar('unselect'); // 現在の選択を解除
  });
  $('.button1').click(function(){
    $('[name="event[calendar_id][]"]').prop('checked', true);
  });

// calendarの全体の表示
  var calendar = $('#calendar').fullCalendar({
    events: '/events/index.json',
    timeFormat: 'H:mm',
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay listDay,listWeek addEventButton'
    },
    customButtons: {
      addEventButton: {
        text: 'add event...',
        click: function() {
          //var dateStr = prompt('Enter a date in YYYY-MM-DD format');
          var title = prompt();
          //var date = new Date(dateStr + 'T00:00:00'); // will be in local time
          //var data = {
            //event: {
              //title: title,
              //start: date,
              //end: date,
              //allDay: true
            //}
          //}
            //$.ajax({
              //type: "POST",
              //url: '/events/create',
              //data: data,
            //})
            $('#calendar').fullCalendar('renderEvent', {
              title: 'dynamic event',
              //start: date,
              daysOfWeek: [4],
              //allDay: true
            });
            alert('Great. Now, update your database...');
        },
      },
    },
    setAllDay: "true",
    axisFormat: 'H:mm',
    monthNames: ['１月','２月','３月','４月','５月','６月','７月','８月','９月','１０月','１１月','１２月'],
    monthNamesShort: ['１月','２月','３月','４月','５月','６月','７月','８月','９月','１０月','１１月','１２月'],
    dayNames: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
    editable: true,        // 編集可
    selectable: true,      // 選択可
    droppable: true,
    selectHelper: false,    // 選択時にプレースホルダーを描画
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
    //eventDataTransform: function(event){
      //if(event.allDay){
        //event.end = moment(event.end).add(1,'day')
      //}
      //return event;
    //},
    height: 960,                           // 高さ
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
    allDaySlot: true,                     // 終日スロットを非表示
    allDayText:'allday',                   // 終日スロットのタイトル
    slotMinutes: 15,                       // スロットの分
    snapMinutes: 15,                       // 選択する時間間隔
    firstHour: 9,
    alldayMaintainDuration: true,
    //contentHeight: auto,

    dayClick: function(date){
      var start = date.format();
      var end = date.format();
      var start_year = moment(start).year();
      var end_year = moment(end).year();
      var start_month = moment(start).month()+1;
      var end_month = moment(end).month()+1;
      var start_day = moment(start).date();
      var end_day = moment(end).date();
      var start_hour = (moment(start).hours()   < 10 ) ? '0' + moment(start).hours() : moment(start).hours();
      var end_hour = (moment(end).hours()   < 10 ) ? '0' + moment(end).hours() : moment(end).hours();
      var start_min = (moment(start).minutes()   < 10 ) ? '0' + moment(start).minutes() : moment(start).minutes();
      var end_min = (moment(end).minutes()   < 10 ) ? '0' + moment(end).minutes() : moment(end).minutes();
      $.ajax ({
        type: 'GET',
        url: '/events/click',
      }).done(function (res){
        $('.content_right').html(res);
        $('#event_start_1i').val(start_year);
        $('#event_start_2i').val(start_month);
        $('#event_start_3i').val(start_day);
        $('#event_start_4i').val(start_hour);
        $('#event_start_5i').val(start_min);
        $('#event_ens_1i').val(end_year);
        $('#event_end_2i').val(end_month);
        $('#event_end_3i').val(end_day);
        $('#event_end_4i').val(end_hour);
        $('#event_end_5i').val(end_min);
      }).fail(function(result){
        alert('エラーが発生しました')
      });
    },
    select: function(startDate, endDate) {
      alert('selected ' + startDate.format() + ' to ' + endDate.format());
      var start = startDate.format();
      var end = endDate.format();
      var start_year = moment(start).year();
      var end_year = moment(end).year();
      var start_month = moment(start).month()+1;
      var end_month = moment(end).month()+1;
      var start_day = moment(start).date();
      var end_day = moment(end).date();
      var start_hour = (moment(start).hours()   < 10 ) ? '0' + moment(start).hours() : moment(start).hours();
      var end_hour = (moment(end).hours()   < 10 ) ? '0' + moment(end).hours() : moment(end).hours();
      var start_min = (moment(start).minutes()   < 10 ) ? '0' + moment(start).minutes() : moment(start).minutes();
      var end_min = (moment(end).minutes()   < 10 ) ? '0' + moment(end).minutes() : moment(end).minutes();
      $.ajax ({
        type: 'GET',
        url: '/events/click',
      }).done(function (res){
        $('.content_right').html(res);
        $('#event_start_1i').val(start_year);
        $('#event_start_2i').val(start_month);
        $('#event_start_3i').val(start_day);
        $('#event_start_4i').val(start_hour);
        $('#event_start_5i').val(start_min);
        $('#event_ens_1i').val(end_year);
        $('#event_end_2i').val(end_month);
        $('#event_end_3i').val(end_day);
        $('#event_end_4i').val(end_hour);
        $('#event_end_5i').val(end_min);
      }).fail(function(result){
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
    },
    eventDrop: function(info) { //イベントをドラッグ&ドロップした際に実行
      var id = info.id;
      var update_url = "/api/v1/events/"+id;
      var data = {
      eventBorderColor: "#000000",
        event: {
          title: info.title,
          start: info.start.toISOString(),
          end: info.end.toISOString(),
          allDay: false,
          color: "#F596AA"
        }
      }
      if (confirm("移動しますか?")){
      $.ajax({
       type: "PATCH",
       url: update_url,
       data: data,
       success: function() {
         calendar.fullCalendar('refetchEvents');
       }
      }),
      calendar.fullCalendar('unselect');
    }
    else
    calendar.fullCalendar('refetchEvents');
    },
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
          allDay: false
        }
      }
      if (confirm("登録しますか?")){
      $.ajax({
       type: "PATCH",
       url: update_url,
       data: data,
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
  //var select = function(info) {
    //start_time = info.startStr()
    //end_time = end.unix()
    //var d = new Date( start_time * 1000 );
  //console.log(start_time);
  //}
});
// カレンダー表示部分
//<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

