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
});