// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require jquery
//= require moment
//= require bootstrap-sprockets
//= require popper
//= require fullcalendar
//= require_tree .

$(document).on('turbolinks:load', function(){
    setTimeout("$('.time-limit').fadeOut('slow')", 1000),
    $('input[name="event[calendar_id][]"]').change(function() {
      var vals = $('input[name="event[calendar_id][]"]:checked').map(function() {
        return $(this).val();
      }).get();
      $.ajax({
        type: "POST",
        url: "/select",
        data:{'calendar_id': vals},
        dataType: "json"
      }).done(function() {
        calendar.fullCalendar('refetchEvents');
      });
      calendar.fullCalendar('unselect');
      //console.log(vals);
        //var v = $(this).val();
        //var vlist = $.makeArray(v);
        //console.log(v);
    });
    //window.alert('チェックされたよ！');
  });