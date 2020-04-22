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

$(document).on('turbolinks:load', function() {
  // 
  var duration = 300; //アニメーションにかける時間

  // aside ----------------------------------------
  var $aside = $('.page-main > aside');　//objを格納
  var $asidButton = $aside.find('button') //button要素を格納
    .on('click', function(){ //格納したbuttonをクリックしたら以下を処理
      $aside.toggleClass('open'); //'open'が$asideのclass属性に指定されてなかったら追加、追加されてたら削除
        if($aside.hasClass('open')){
          $aside.stop(true).animate({left: '-70px'}, duration, 'easeOutBack'); //開いた状態の位置までアニメーション
          $asidButton.find('i').attr('class', 'far fa-2x fa-calendar-times'); //閉じるiconに変更
        }else{
          $aside.stop(true).animate({left: '-280px'}, duration, 'easeInBack'); //サイドバーを隠すアニメーション
          $asidButton.find('i').attr('class', 'far fa-2x fa-calendar-alt');  //openのiconに戻す処理
        };
		});
	
	//$('.calendar-label').on('click',function(){
		//$(this).css('background-color','rgba(255, 255, 255, 0.5)');
		//$(this).css('border-bottom','1px solid rgba(34, 49, 52, 0.9)');
	//});

  $('.calendar-label').on('click',function(){
    if ($('input[name="event[calendar_id][]"]').prop('checked') == true) {
      $('input[name="event[calendar_id][]"]').prop('checked', false); 
      $(this).css('background-color','rgba(34, 49, 52, 0.9)');
    } else
    $('input[name="event[calendar_id][]"]').prop('checked', true); 
		$(this).css('background-color','rgba(255, 255, 255, 0.5)');
		$(this).css('border-bottom','1px solid rgba(34, 49, 52, 0.9)');
	});

});
