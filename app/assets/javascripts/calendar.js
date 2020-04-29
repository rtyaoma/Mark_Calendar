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
      //location.href = "/events/index";
      calendar.fullCalendar('refetchEvents');　//再レンダリング
    });
    calendar.fullCalendar('unselect'); // 現在の選択を解除
    $.ajax({
      type: "GET",
      url: "/events/refetch"
    }).done(function(res){
    $('.inner-right').html(res);
    })
  });

  $('.button1').on('click',function(){
    $('input[name="event[calendar_id][]"]').attr('checked',true).prop('checked',true).change();
  });
  $('.button1').click(function(){
    $('[name="event[calendar_id][]"]').prop('checked', true);
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
    $.ajax({
      type: "GET",
      url: "/display"
    })   
  });
  $('.botton2').on('click',function(){
    $('input[name="event[calendar_id][]"]').removeAttr('checked').prop('checked',false).change();
  });

// calendarの全体の表示
  var calendar = $('#calendar').fullCalendar({
    events: '/events/index.json',
    timeFormat: 'H:mm',
    header: {
      right: 'addEventButton prevYear,prev,next,nextYear listDay,listWeek',
      center: 'title',
      left: 'month,agendaWeek,agendaDay today'
    },
    customButtons: {
      addEventButton: {
        text: 'new',
        click: function() {
          location.href = '/events/new';
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
      month:    'month',
      week:     'week',
      day:      'day',
      listDay:  'list(day)',
      listWeek:  'list(week)'
    },
    //eventDataTransform: function(event){
      //if(event.allDay){
        //event.end = moment(event.end).add(-1,'day')
      //}
      //return event;
    //},
    height: 700,                           // 高さ
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
    allDaySlot: TextTrackCue,                     // 終日スロットを非表示
    allDayText:'allday',                   // 終日スロットのタイトル
    slotMinutes: 15,                       // スロットの分
    snapMinutes: 15,                       // 選択する時間間隔
    alldayMaintainDuration: false,
    noEventsMessage: "予定がありません",
    scrollTime: "00:00:00",

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
        var position = $(".warapper").offset();
        alert(position);
      }).fail(function(){
        alert('エラーが発生しました')
      });
    },
    select: function(startDate, endDate, allDay) {
      var allDay = !startDate.hasTime() && !endDate.hasTime();
      alert('selected' + startDate.format() + 'to' + endDate.format() + "+" + allDay + "+" + endDate.hasTime());
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
        $('.inner-right').html(res);
        if (allDay == true) {
            $('#event_allDay').prop('checked', true);
        };
        $('#event_allDay').val(allDay);
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
        $('.inner-right').html(res);
      });
    },
    eventDrop: function(info) { //イベントをドラッグ&ドロップした際に実行
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
        alert('eventDrop' + "+" + moment_start + "+" +info.end+ "or" + moment_end + "+" + info.title + "+" + info.allDay + "+" + info.color);
        var data = {
        eventBorderColor: "#000000",
          event: {
            title: info.title,
            start: moment_start,
            end: moment_end,
            allDay: info.allDay,
            color: info.color
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
          color: info.color
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
  //var select = function(info) {
    //start_time = info.startStr()
    //end_time = end.unix()
    //var d = new Date( start_time * 1000 );
  //console.log(start_time);
  //}
});
// カレンダー表示部分
//<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      //var id = info.id;
      //var update_url = "/api/v1/events/"+id;
      //var start_at = info.hasTime();
      //var start = info.start.toISOString();
      //var end = info.end.toISOString();
      //var start_year = moment(start).year();
      //var end_year = moment(end).year();
      //var start_month = moment(start).month()+1;
      //var end_month = moment(end).month()+1;
      //var start_day = moment(start).date();
      //var end_day = moment(end).date();
      //var start_hour = (moment(start).hours()   < 10 ) ? '0' + moment(start).hours() : moment(start).hours();
      //var end_hour = (moment(end).hours()   < 10 ) ? '0' + moment(end).hours() : moment(end).hours();
      //var start_min = (moment(start).minutes()   < 10 ) ? '0' + moment(start).minutes() : moment(start).minutes();
      //var end_min = (moment(end).minutes()   < 10 ) ? '0' + moment(end).minutes() : moment(end).minutes();
      //var moment_start = start_year+"-"+start_month+"-"+start_day+" "+start_hour+":"+start_min;
      //var moment_end = end_year+"-"+end_month+"-"+end_day+" "+end_hour+":"+end_min;
      //alert('eventDrop' + "+"+start_at+"+" + moment_start + "+" +moment_end + "+" + info.title + "+" + info.allDay);
      //allDay: info.allDay ? true : false,