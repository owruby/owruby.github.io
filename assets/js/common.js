/*******************************Init*******************************/
var UA = getUA();
var configs = {
	pc : {
		stk_start : 500,
		stk_state : false,
		stk_name : '#sticky',
		mv_dist : 700,
		mv_dur : 800,
		mv_ease : 'easeInOutCubic',
		mv_name : 'move',
		mv_after : 'moved',
		ft_name : '#footer',
		menu_opener : '.humberger',
		menu_state : false,
		menu_fil : '#menu_filter',
		menu_name : '#menu',
		menu_dur : 500,
	},
	mobile : {
		menu_opener : '.humberger',
		menu_state : false,
		menu_fil : '#menu_filter',
		menu_name : '#menu',
		menu_dur : 500,
		mv_dist : 700,
		mv_dur : 800,
		mv_ease : 'easeInOutCubic',
		mv_name : 'move',
		mv_after : 'moved',

	}
};

if(UA.type === 'modern' || UA.type === 'IE') 
{
	
	/********************************************** for PC **********************************************/
	var conf = configs.pc;
	
	//NavHover
	$(document).on('mouseover', '#header li, #sticky li, #footer li', function(){
		if(!$(this).hasClass('logo') && !$(this).hasClass('thispage'))
		{
			$(this).find('.nav').css({backgroundPosition: 'center top'});
		}else{
			return false;		
		}
	});
	
	//fade
	$(document).on('mouseover','.fade', function(){
		$(this).stop().fadeTo(200, 0.6);
	});
	$(document).on('mouseout','.fade', function(){
		$(this).stop().fadeTo(200, 1.0);
	});

	//NavHover
	$(document).on('mouseover', '.nav_title', function(e){
		
		$(this).prev().animate({height: '20px'}, 200);
		
	});
	$(document).on('mouseout', '.nav_title', function(e){
		
		$(this).prev().animate({height: '10px'}, 200);
		
	});		
	
	function scroll_to(obj){
    	var now = $(window).scrollTop();
    	var name = obj.data('name'),
    		trg = $('#' + name),
			h = trg.offset().top,
			duration = (h - now) / 3000 * 1000;
		
    	if(duration < 0){
    		duration = -duration;
    }

    $('html, body').animate({scrollTop : h}, duration);
	}
	
	$(document).on('click', '#nav li', function(){
		scroll_to($(this));
	});
}
else
{
	/********************************************** for Mobile Device **********************************************/
	var conf = configs.mobile;
		
	//Menu 
	$(document).on('touchstart', conf.menu_opener, function(){
		if(!conf.menu_state){
			$(this).addClass('open');
			$('#menu').css({display: 'block'});
			$('#menu li').each(function(i){
				$(this).stop().delay(150 * i).animate({left: -100},250).animate({left: 0}, 300, function(){
					if(i === 6){
						conf.menu_state = true;
					}
				});
			});
			$('div').not('#menu').on('touchmove.noScroll', function(e) {
			    e.preventDefault();
			});
		}else{
			$(this).removeClass('open');
			$('#menu li').each(function(i){
				$(this).stop().delay(50 * i).animate({left: '100%'},100,function(){
					if(i === 6){
						conf.menu_state = false;
						$('div').not(conf.menu_name).off('.noScroll');
					}
				});
			});
			$('#menu').fadeOut(500);
		}
	});
	
	function scroll_to(obj){
    	var now = $(window).scrollTop();
    	var name = obj.data('name'),
    		trg = $('#' + name),
			h = trg.offset().top -70,
			duration = (h - now) / 3000 * 1000;
		
    	if(duration < 0){
    		duration = -duration;
    }

    $('html, body').animate({scrollTop : h}, duration);
    
	}
	
	$(document).on('click', '#menu li', function(){
		
		if($(this).data('name') != ''){
			$(conf.menu_opener).removeClass('open');
			$('#menu li').each(function(i){
				$(this).stop().delay(150 * i).animate({left: '100%'},100,function(){
					if(i === 6){
						conf.menu_state = false;
						$('div').not(conf.menu_name).off('.noScroll');
					}
				});
			});
			$('#menu').fadeOut(600);
			scroll_to($(this));
		}else{
			return false;
		}
	});

}

	/********************************************** for All **********************************************/


$(function () {
	setTimeout('jump()'); //アニメーションを実行
	setTimeout('slide()'); //アニメーションを実行
});

function jump() {
    $('.jump').animate({top: '+=5px'}, 300).animate({top: '-=5px'}, 100);
    setTimeout('jump()', 1800);
}

$(window).scroll(function(){
	var scrl = $(this).scrollTop();
	
	//Move Contents
	$('.'+conf.mv_name).not('.'+conf.mv_after).each(function(){
		var oft = $(this).offset().top;
		if(scrl > oft - conf.mv_dist){
			$(this).stop().animate({top: 0, opacity: 1}, conf.mv_dur,conf.mv_ease);
			$(this).addClass(conf.mv_after);
		}
		
		
	});

	$('.box').not('.'+conf.mv_after).each(function(){
		var title = $(this).next();
		if( title.hasClass(conf.mv_after)){
			$(this).stop().delay(500).animate({top: -50, opacity: 1}, conf.mv_dur,conf.mv_ease);
			$(this).addClass(conf.mv_after);
		}
	});
	
	//delay fadein
	$('#how .step').each(function(i) {
		var oft = $(this).offset().top;
		if(scrl > oft - conf.mv_dist){
			$(this).delay(500 * i).animate({top: 0, opacity: 1}, conf.mv_dur,conf.mv_ease);
		}
	});
	
	//delay fadein
	$('#about .features li').each(function(i) {
		var oft = $(this).offset().top;
		if(scrl > oft - conf.mv_dist){
			$(this).delay(500 * i).animate({top: 0, opacity: 1}, conf.mv_dur,conf.mv_ease);
		}
	});
	
	
});

$(document).on('click', '.inactive', function(){
	swal({title: "Sorry!", text: "Coming Soon", type: "warning", confirmButtonColor : "#ffcc29",});
});

$(document).on('click', '.totop', function(){
	var top = $(this).offset().top;
    var duration = Math.floor(top / 500 * 100);
    $('body,html').stop().animate({scrollTop: 0}, duration);
});

