$(document).on('change', '#event_allDay', function(){
    var form = $('.new_event,.index_event,.edit_event');
    var checkBox = $('#event_allDay');
    var allDay = checkBox.prop('checked');
    form.find('.visible-if-allday').toggle(allDay);
    form.find('.hidden-if-allday').toggle(!allDay);  
});

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