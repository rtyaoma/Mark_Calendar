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
//= require Chart.min
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require jquery
//= require moment
//= require bootstrap-sprockets
//= require popper
//= require fullcalendar
//= require jquery_nested_form
//= require_tree .

$(document).on('turbolinks:load', function() {
  
  // エラーの表示時間 ------------------------------------
  setTimeout("$('.time-limit').fadeOut('slow')", 1000);

  // アニメーションにかける時間 --------------------------------
  var duration = 300; 

  //  カレンダー選択画面の出し入れ　----------------------------
  var $leftAside = $('.main-header > .left-sidebar');
  var $asidButton = $leftAside.find('button').on('click', function(){
      $leftAside.toggleClass('open');
        if($leftAside.hasClass('open')){
          $leftAside.stop(true).animate({
            left: '-70px'
          }, 
          duration, 'easeOutBack'
          );
          $asidButton.find('i').attr('class', 'far fa-2x fa-calendar-times'); 
        }else{
          $leftAside.stop(true).animate({
            left: '-280px'
          },
           duration, 'easeInBack'
          );
          $asidButton.find('i').attr('class', 'far fa-2x fa-calendar-alt');
        };
		});
  
  // headerの出し入れ ------------------------------------------
  var $aside = $('.page-main > .right-sidebar');　
    $('#menu-icon').on('click', function(){
      $aside.toggleClass('open');
        if($aside.hasClass('open')){
          $aside.stop(true).animate({right: '-70px'}, duration, 'easeOutBack');
        }else{
          $aside.stop(true).animate({right: '-280px'}, duration, 'easeInBack');
        };
    });
    

});
