$(document).ready(function(){
		
	//When mouse rolls over
	$(".nav").mouseover(function(){
		$(this).stop().animate({height:'200px'},{queue:false, duration:600, easing: 'easeOutBounce'});
		$(this).find('p').text('Select city');
	});
	
	//When mouse is removed
	$(".nav").mouseout(function(){
		$(this).stop().animate({height:'50px'},{queue:false, duration:600, easing: 'easeOutBounce'});
		$(this).find('p').text('Forecast');
	});

	$('li').hover(function(){
		$(this).css("background","rgba(139, 137, 137, 0.5)");
	}, function(){
		$(this).css("background","");
	});
	
});
