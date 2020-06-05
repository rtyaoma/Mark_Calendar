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

  // event作成時に、バリテーションを設定 --------------------------
  $(".inner-right").on('input',function (event){
    var $input = $("input[name='event[title]']");
    var start_year = $("select[name='event[start(1i)]']").val();
    var start_month = $("select[name='event[start(2i)]']").val();
    var start_day = $("select[name='event[start(3i)]']").val();
    var start_hour = $("select[name='event[start(4i)]']").val();
    var start_min = $("select[name='event[start(5i)]']").val();
    var  check_start = start_year + "-" + start_month + "-" + start_day + " " + start_hour + ":" + start_min 
    var end_year = $("select[name='event[end(1i)]']").val();
    var end_month = $("select[name='event[end(2i)]']").val();
    var end_day = $("select[name='event[end(3i)]']").val();
    var end_hour = $("select[name='event[end(4i)]']").val();
    var end_min = $("select[name='event[end(5i)]']").val();
    var check_end = end_year + "-" + end_month + "-" + end_day + " " + end_hour + ":" + end_min 
    var date_start = new Date(check_start)
    var date_end = new Date(check_end)
    value = $input.val();
    var check = $("input[name='event[calendar_id]']").map(function() {
      return $(this).val();
    }).get();
    var checked =  $("input[name='event[calendar_id]']:checked").val();
    var set = $.inArray(checked, check);
    if (value != '' && date_start <= date_end && set != -1  ) {
      $('.event_sub').addClass('check_submit');
    } else {
      $('.event_sub').removeClass('check_submit');
    }
  });

  $('.inner-right').on('click','.show_hide_row i',function(){
     $('.select-description').toggle();
    });
   


  $('.chart_link').on('click', function (){
    $.ajax ({
      type:'GET',
      url: '/chart',
    }).done(function(res){
      $('.inner_right').html(res);
    });

  })

  $('.chart_btn').on('click', function(){
    var v = $('input[type="month"]').val();
    var tt = v + "-" + "1";
    var ss = new Date(tt);
    var y = (new Date(v)).getFullYear();
    var m = (new Date(v)).getMonth() + 2;
    var sr = y + "-" + m + "-" + 1;
    var tr = new Date(sr);
    var chart_vals = $('input[class="chart-select"]:checked').map( function() {
      return $(this).val();
    }).get();
    console.log(ss + "  " + tr);
    var data = {
      chart: {
        start: ss,
        end: tr,
        calendar_id: chart_vals,
      }
    };
    $.ajax ({
      type: 'GET',
      data: data,
      url: '/chart_filter',
    })
  })

});