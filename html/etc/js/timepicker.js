/*!
 * @todo timepicker  
 * @author wanhappy@163.com
 * $('input').timepicker(); 
**/
 (function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.$ = factory(root.jQuery);
  }
}(this, function($) {

'use strict';

// 한 자리 숫자 앞에 0 추가  
var twobit = function( num ) {
	return num >= 10 ? num + '' : '0' + num;
};
// 검사 시간이 요구 사항에 부합하는지 여부
var regTime = /^[0-9]{1,2}:[0-9]{1,2}$/;
var timepicker = {};

// 공함수
var nullFun = function () {};

// 시간
var hourStr = new Array( 24 ).fill( null ).map(function(t,i){
	var val = twobit( i ); 
	return '<li class="cell-2 js-hour-cell" data-val="' + val + '">' + val + '</li>';
}).join('');

// 분
var minuteStr = new Array( 60 ).fill( null ).map(function(t,i){
	var val = twobit( i *1 ); 
	return  '<li class="cell-2 js-minute-cell" data-val="' + val + '">' + val + '</li>';
}).join('');

var content = $('<div class="timepicker">\
		<div v-show class="title">선택하세요</div>\
			<div class="chose-all">\
				<div class="handle">\
					<div class="cell-4"><a class="icon-up js-plus-houer"></a></div>\
					<div class="cell-2"></div>\
					<div class="cell-4"><a class="icon-up js-plus-minute"></a></div>\
				</div>\
				<div class="text">\
					<div class="cell-4"><a class="js-hour-show" title="选择时"></a></div>\
					<div class="cell-2">:</div>\
					<div class="cell-4"><a class="js-minute-show" title="选择分"></a></div>\
				</div>\
				<div class="handle">\
					<div class="cell-4"><a class="icon-down js-minus-houer"></a></div>\
					<div class="cell-2"></div>\
					<div class="cell-4"><a class="icon-down js-minus-minute"></a></div>\
				</div>\
			</div>\
			<div class="chose-hour">\
				<ul class="handle">' + hourStr + '</ul>\
			</div>\
			<div class="chose-minute">\
				<ul class="handle">' + minuteStr + '</ul>\
			</div>\
		</div>\
	</div>');
content.find('a').attr('href','javascript:void(0);');
timepicker.content = content;
timepicker.title = content.find('.title');
timepicker.choseAll = content.find('.chose-all');
timepicker.choseMinute = content.find('.chose-minute');
timepicker.choseHour = content.find('.chose-hour');
timepicker.hourShow = content.find('.js-hour-show');
timepicker.minuteShow = content.find('.js-minute-show');

// 업데이트 시간
timepicker.update = function () {
	this.inputTarget.val( twobit( this.hour ) + ':' + twobit( this.minute ) );
	this.minuteShow.text( twobit( this.minute ) );
	this.hourShow.text( twobit( this.hour ) );
	this.inputTarget.$timepickerUpdate();
	return this;
};

// 이벤트 바인딩
timepicker.bindEvent = function () {
	var thisTimePicker = this;
	if( thisTimePicker.hasBind ) return;
	thisTimePicker.hasBind = true;
	// 분--
	this.content.on('click','.js-minus-minute',function() {
		var minute = thisTimePicker.minute;
		if( minute <= 0 ){
			thisTimePicker.minute = 59;
		} else {
			thisTimePicker.minute--;
		}
		thisTimePicker.update();
	
	// 분++
	}).on('click','.js-plus-minute',function() {
		var minute = thisTimePicker.minute;
		if( minute >= 59 ){
			thisTimePicker.minute = 0;
		} else {
			thisTimePicker.minute++;
		}

		thisTimePicker.update();
	// 
	// 시간++
	}).on('click','.js-plus-houer',function() {
		var hour = thisTimePicker.hour;
		if( hour >= 23 ){
			thisTimePicker.hour = 0;
		} else {
			thisTimePicker.hour++;
		}
		thisTimePicker.update();
	
	// 시간--
	}).on('click','.js-minus-houer',function() {
		var hour = thisTimePicker.hour;
		if( hour <= 0 ){
			thisTimePicker.hour = 23;
		} else {
			thisTimePicker.hour--;
		}
		thisTimePicker.update();
	
	// 분 선택
	}).on('click','.js-minute-cell',function () {
		thisTimePicker.minute = +this.getAttribute('data-val');
		thisTimePicker.update();
		thisTimePicker.choseMinute.hide();
		thisTimePicker.choseAll.show();
		thisTimePicker.title.text('선택하세요');
	
	// 시간 선택
	}).on('click','.js-hour-cell',function () {
		thisTimePicker.hour = +this.getAttribute('data-val');
		thisTimePicker.update();
		thisTimePicker.choseHour.hide();
		thisTimePicker.choseAll.show();
		thisTimePicker.title.text('선택하세요');
	// 버블링
	}).on('click',function(e) {
		e.stopPropagation();
	});

	// 선택한 시간으로 전환
	thisTimePicker.hourShow.on('click',function() {
		thisTimePicker.choseAll.hide();
		thisTimePicker.choseHour.show();
		thisTimePicker.title.text('시간을 선택하세요');
	});

	// 분 선택으로 전환
	thisTimePicker.minuteShow.on('click',function() {
		thisTimePicker.choseAll.hide();
		thisTimePicker.choseMinute.show();
		thisTimePicker.title.text('분을 선택하세요');
	});
};

// 시간 선택 객체를 다음에 마운트
$.timepicker = timepicker;

// jquery에 timepicket 기능 추가
$.fn.timepicker = function( option ) {
	var t = this;
	var hour;
	var minute;
	var timepickerObj = $.timepicker;
	var $body = $('html');
	
	// input
	if( !this[0].nodeName || this[0].nodeName !== 'INPUT' ){
		return;
	}
	// 오류 방지
	this.$timepickerUpdate = nullFun;
	
	// 이벤트 바인딩
	this.off('click').on('click',function(e) {
		var val = this.value;
		if( regTime.test( val ) ){
			val = val.split(':');
			hour = +val[0];
			minute = +val[1];
		} else {
			val = new Date();
			hour = val.getHours();
			minute = val.getMinutes();
		}
		var left = this.offsetLeft + 'px';
		var top = ( this.offsetTop + this.offsetHeight ) + 'px';
		
		timepickerObj.inputTarget = t;
		timepickerObj.content.appendTo( this.offsetParent ).css( { left : left, top : top } );
		timepickerObj.hour = hour;
		timepickerObj.minute = minute;
		timepickerObj.choseAll.show();
		timepickerObj.choseHour.hide();
		timepickerObj.choseMinute.hide();
		timepickerObj.update();
		$.timepicker.bindEvent();
		e.stopPropagation();
		$body.one('click',function() {
			timepickerObj.content.off().remove();
			timepickerObj.hasBind = false;
		});
	});
	this.off('keydown').on('keydown',function() {
		return false;
	});
	this.update = function( fun ) {
		if( $.isFunction( fun ) ) this.$timepickerUpdate = fun;
		else this.$timepickerUpdate = nullFun;
	};
	return this;
};


return $;
}));
 