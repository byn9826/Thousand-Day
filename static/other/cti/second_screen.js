$(document).ready(function(){
	$("#second_screen_click_1").click(function(){
    	$("#third_screen").show();
    	$("#third_screen_background").animate(
  			{left:"0%"},
  			"slow"
  		);
  		$("#third_screen_box").animate(
  			{left:"10%"},
  			"slow"
  		);
		$("#third_screen_barbecue").animate(
  			{left:"26.8%"},
  			"slow"
  		);
  		$("#third_screen_back").animate(
  			{left:"0%"},
  			"slow",
  			function(){
  				$("#second_screen").hide();	
  	 	});
  	});
});



