$(document).ready(function(){
	var $fourth_click_1=0,$fourth_click_2=0,$fourth_click_3=0,$fourth_box=0;
	var $fourth_check_1=0,$fourth_check_2=0,$fourth_check_3=0,$fourth_check_4=0,$fourth_check_5=0,$fourth_check_6=0;
	var $fourth_left_9=0;
	$("#fourth_screen_blackbox_1").click(function(){
		if ($fourth_click_1==0 && $fourth_click_2==0 && $fourth_click_3==0 && $fourth_box==0){
			$("#fourth_screen_blackbox_1").attr("src","./cti/fourth_screen_greenbox.png");
			$("#fourth_screen_right").animate(
  				{left:"70%"},
  				"slow"
  	 		);	 
			$("#fourth_screen_close").animate(
  				{left:"71.5%"},
  				"slow"
  		 	);	
			$(".fourth_screen_blackbox_hide").animate(
  				{left:"73%"},
  				"slow"
  		 	);	
  		 	$fourth_click_1=1;
  		 	$fourth_box=1;
		}	
		else if ($fourth_click_1==1 && $fourth_click_2==0 && $fourth_click_3==0 && $fourth_box==0){
			$("#fourth_screen_blackbox_1").attr("src","./cti/fourth_screen_blackbox.png");
			$fourth_click_1=0;
		}
		else if ($fourth_click_1==1 &&( $fourth_click_2==1 || $fourth_click_3==1) && $fourth_box==0){
			$("#fourth_screen_blackbox_1").attr("src","./cti/fourth_screen_blackbox.png");
			$fourth_click_1=0; $fourth_click_2=0; $fourth_click_3=0;
			$("#fourth_screen_blackbox_8").attr("src","./cti/fourth_screen_blackbox.png");
			$("#fourth_screen_blackbox_9").attr("src","./cti/fourth_screen_blackbox.png");
			$("#fourth_screen_charcoal_1").hide();
			$("#fourth_screen_charcoal_2").hide();
		}
	});
	$("#fourth_screen_blackbox_8").click(function(){
		$("#fourth_screen_blackbox_8").attr("src","./cti/fourth_screen_greenbox.png");
		$("#fourth_screen_charcoal_1").show();
		$("#fourth_screen_right").animate(
  			{left:"100%"},
  			"slow"
  	 	);	 
		$("#fourth_screen_close").animate(
  			{left:"101.5%"},
  			"slow"
  	 	);	
		$(".fourth_screen_blackbox_hide").animate(
  			{left:"103%"},
  			"slow"
  	 	);
  	 	$fourth_box=0;
		$fourth_click_2=1;
	});
	$("#fourth_screen_blackbox_9").click(function(){
		$("#fourth_screen_blackbox_9").attr("src","./cti/fourth_screen_greenbox.png");
		$("#fourth_screen_charcoal_2").show();
		$("#fourth_screen_right").animate(
  			{left:"100%"},
  			"slow"
  	 	);	 
		$("#fourth_screen_close").animate(
  			{left:"101.5%"},
  			"slow"
  	 	);	
		$(".fourth_screen_blackbox_hide").animate(
  			{left:"103%"},
  			"slow"
  	 	);
  	 	$fourth_box=0;
		$fourth_click_3=1;
	});
	$("#fourth_screen_blackbox_2").click(function(){
		if($fourth_check_1==0&& $fourth_box==0){
			$("#fourth_screen_blackbox_2").attr("src","./cti/fourth_screen_greenbox.png");
			$fourth_check_1=1;
		}
		else if($fourth_check_1==1&& $fourth_box==0){
			$("#fourth_screen_blackbox_2").attr("src","./cti/fourth_screen_blackbox.png");
			$fourth_check_1=0;
		}
	});
	$("#fourth_screen_blackbox_3").click(function(){
		if($fourth_check_2==0&& $fourth_box==0){
			$("#fourth_screen_blackbox_3").attr("src","./cti/fourth_screen_greenbox.png");
			$fourth_check_2=1;
			$("#fourth_screen_blackbox_7").attr("src","./cti/fourth_screen_blackbox.png");
			$fourth_check_6=0;
		}
		else if($fourth_check_2==1&& $fourth_box==0){
			$("#fourth_screen_blackbox_3").attr("src","./cti/fourth_screen_blackbox.png");
			$fourth_check_2=0;
		}
	});
	$("#fourth_screen_blackbox_7").click(function(){
		if($fourth_check_6==0&& $fourth_box==0){
			$("#fourth_screen_blackbox_7").attr("src","./cti/fourth_screen_greenbox.png");
			$fourth_check_6=1;
			$("#fourth_screen_blackbox_3").attr("src","./cti/fourth_screen_blackbox.png");
			$fourth_check_2=0;
		}
		else if($fourth_check_6==1&& $fourth_box==0){
			$("#fourth_screen_blackbox_7").attr("src","./cti/fourth_screen_blackbox.png");
			$fourth_check_6=0;
		}
	});
	$("#fourth_screen_blackbox_4").click(function(){
		if($fourth_check_3==0&& $fourth_box==0){
			$("#fourth_screen_blackbox_4").attr("src","./cti/fourth_screen_greenbox.png");
			$fourth_check_3=1;
		}
		else if($fourth_check_3==1&& $fourth_box==0){
			$("#fourth_screen_blackbox_4").attr("src","./cti/fourth_screen_blackbox.png");
			$fourth_check_3=0;
		}
	});
	$("#fourth_screen_blackbox_5").click(function(){
		if($fourth_check_4==0&& $fourth_box==0){
			$("#fourth_screen_blackbox_5").attr("src","./cti/fourth_screen_greenbox.png");
			$fourth_check_4=1;
		}
		else if($fourth_check_4==1&& $fourth_box==0){
			$("#fourth_screen_blackbox_5").attr("src","./cti/fourth_screen_blackbox.png");
			$fourth_check_4=0;
		}
	});
	$("#fourth_screen_blackbox_6").click(function(){
		if($fourth_check_5==0&& $fourth_box==0){
			$("#fourth_screen_blackbox_6").attr("src","./cti/fourth_screen_greenbox.png");
			$fourth_check_5=1;
		}
		else if($fourth_check_5==1&& $fourth_box==0){
			$("#fourth_screen_blackbox_6").attr("src","./cti/fourth_screen_blackbox.png");
			$fourth_check_5=0;
		}
	});
	$("#fourth_screen_close").click(function(){
		$("#fourth_screen_right").animate(
  			{left:"100%"},
  			"slow"
  	 	);	 
		$("#fourth_screen_close").animate(
  			{left:"101.5%"},
  			"slow"
  	 	);	
		$(".fourth_screen_blackbox_hide").animate(
  			{left:"103%"},
  			"slow"
  	 	);
  	 	$fourth_box=0;
	});
	$("#fourth_screen_barbecue").click(function(){
		if($fourth_box==0){
    		$("#fourth_screen_background_blur").show();
    		$("#fourth_screen_product_box").show();
    		$("#fourth_screen_product_close").show();
    		$("#fourth_screen_video_click").show();
    		$("#black_bar_time").toggleClass("black_bar_time");
   		}
    });

    $("#fourth_screen_video_click").click(function(){
		$("#fourth_screen_product_video").show();
		$("#fourth_screen_product_box").hide();
		$("#fourth_screen_product_close").hide();
		$("#fourth_screen_close_video").show();
		document.getElementById("fourth_screen_product_video").currentTime=0;
		document.getElementById("fourth_screen_product_video").play();
    });
    $("#fourth_screen_close_video").click(function(){
		$("#fourth_screen_product_video").hide();
		document.getElementById("fourth_screen_product_video").pause();
		$("#fourth_screen_product_box").show();
		$("#fourth_screen_product_close").show();
		$("#fourth_screen_close_video").hide();
    });
    $("#fourth_screen_product_close").click(function(){
    	$("#fourth_screen_background_blur").hide();
    	$("#fourth_screen_product_box").hide();
    	$("#fourth_screen_product_close").hide();
    	$("#fourth_screen_sendto").hide();
    	$(".fourth_screen_list").attr("src","");
    	$(".fourth_screen_list").hide();
    	$(".fourth_screen_greenmark").hide();
    	$("#fourth_screen_video_click").hide();
    	$("#fourth_screen_product_video").hide();
    	$("#black_bar_time").toggleClass("black_bar_time");
    });
    $("#fourth_screen_email").click(function(){
    	$("#fourth_screen_background_blur").show();
    	$("#fourth_screen_sendto").show();
    	$("#fourth_screen_product_close").show();
    	$("#black_bar_time").toggleClass("black_bar_time");
    	var $check_number = new Array(6);
    	if($fourth_click_1==1 && $fourth_click_2==0 && $fourth_click_3==0){
    		$check_number[0]="fourth_screen_check_1.jpg";
    	}   
    	if($fourth_click_2==1){
    		$check_number[0]="./cti/fourth_screen_charcoal_1.jpg";
    	}
    	if($fourth_click_3==1){
    		$check_number[0]="./cti/fourth_screen_charcoal_2.jpg";
    	}
    	if($fourth_check_1==1){
    		$check_number[1]="./cti/fourth_screen_check_2.jpg";
    	}
    	if($fourth_check_2==1){
    		$check_number[2]="./cti/fourth_screen_check_3.jpg";
    	}
    	if($fourth_check_6==1){
    		$check_number[2]="./cti/fourth_screen_check_7.jpg";
    	}
    	if($fourth_check_3==1){
    		$check_number[3]="./cti/fourth_screen_check_4.jpg";
    	}
    	if($fourth_check_4==1){
    		$check_number[4]="./cti/fourth_screen_check_5.jpg";
    	}
    	if($fourth_check_5==1){
    		$check_number[5]="./cti/fourth_screen_check_6.jpg";
    	}
    	var $j=0;
    	for(var $i=0;$i<6;$i++){
    		if($check_number[$i]!=""&&$check_number[$i]!=null){
    			$("#fourth_screen_list_"+$j).attr("src",$check_number[$i]);
    			$("#fourth_screen_list_"+$j).show();
    			$("#fourth_screen_greenmark_"+$j).show();
    			$j++;
    		}
    	}
    });
    $("#fourth_screen_left_box").click(function(){
    	if($fourth_left_9==0){
    		$("#fourth_screen_left_box").attr("src","./cti/fourth_screen_greenbox.png");
    		$("#fourth_screen_sendto").attr("src","./cti/fourth_screen_sendto_with.jpg");	
    		$fourth_left_9=1;
    	}
    	else if($fourth_left_9==1){
    		$("#fourth_screen_left_box").attr("src","./cti/fourth_screen_blackbox.png");
    		$("#fourth_screen_sendto").attr("src","./cti/fourth_screen_sendto_no.jpg");	
    		$fourth_left_9=0;
    	}
    });
    $("#fourth_screen_back").click(function(){
    	$("#fourth_screen_box").animate(
  			{top:"113%"},
  			"slow"
  	 	);
		$("#fourth_screen_blackbox_1").animate(
  			{top:"134.5%"},
  			"slow"
  	 	);
  	 	$("#fourth_screen_blackbox_2").animate(
  			{top:"142.7%"},
  			"slow"
  	 	);
  	 	$("#fourth_screen_blackbox_3").animate(
  			{top:"150.9%"},
  			"slow"
  	 	);
  	 	$("#fourth_screen_blackbox_4").animate(
  			{top:"159.1%"},
  			"slow"
  	 	);
  	 	$("#fourth_screen_blackbox_5").animate(
  			{top:"167.3%"},
  			"slow"
  	 	);
  	 	$("#fourth_screen_blackbox_6").animate(
  			{top:"175.5%"},
  			"slow"
  	 	);
  	 	$("#fourth_screen_blackbox_7").animate(
  			{top:"150.9%"},
  			"slow"
  	 	);
   		$("#fourth_screen_left_box").hide();
   		$("#fourth_screen_email").animate(
  			{top:"185.7%"},
  			"slow"
  	 	);
   		$("#fourth_screen_barbecue").animate(
  			{top:"126.6%"},
  			"slow"
  	 	);
   		$("#fourth_screen_back").animate(
  			{top:"109.5%"},
  			"slow",
  			function(){
  				$("#fourth_screen").hide();	
  	 	});
   		$("#third_screen_back").show("slow");
   		$("#third_screen_background")[0].src="./cti/third_screen_background.jpg";
   		$("#third_screen_box").animate(
  			{top:"50.3%"},
  			"slow"
  	 	);
   		$("#third_screen_barbecue").animate(
  			{top:"51.625%"},
  			"slow"
  	 	);
    });
	function currentTime(){
  		var now_time = new Date(), show_time="",now_hour,now_minute;
  	    	now_hour = now_time.getHours();
  	    	now_minute = now_time.getMinutes();
        	show_time = now_hour + ':' + now_minute;
    	return show_time;
    }
	setInterval(function(){$('#black_bar_time').html(currentTime)},1000);
	$("#black_bar_home").click(function(){
		$("#second_screen").hide();
		$("#second_screen_background_pic").css('left', "100%");
		$("#second_screen_drop_1").css('top', "-60%");
		$("#second_screen_drop_2").css('top', "-95%");
		$(".second_screen_button").css('left', "104%");
		$(".second_screen_click_type").css("visibility","hidden");
		$("#third_screen").hide();
		$("#third_screen_background").css('left', "100%");
		$("#third_screen_box").css({"left":"110%","top":"50.3%"});
		$("#third_screen_barbecue").css({"left":"125.7%","top":"51.625%"});
		$("#third_screen_back").show();
		$("#third_screen_back").css('left', "100%");
		$("#fourth_screen").hide();
		$("#third_screen_background")[0].src="./cti/third_screen_background.jpg";  
		$("#fourth_screen_box").css('top', "113%");
		$("#fourth_screen_barbecue").css('top', "126.6%");
		$("#fourth_screen_email").css('top', "185.7%");
		$("#fourth_screen_back").css('top', "109.5%");
		$("#fourth_screen_blackbox_1").css('top', "134.5%");
		$("#fourth_screen_blackbox_2").css('top', "142.7%");
		$("#fourth_screen_blackbox_3").css('top', "150.9%");
		$("#fourth_screen_blackbox_4").css('top', "159.1%");
		$("#fourth_screen_blackbox_5").css('top', "167.3%");
		$("#fourth_screen_blackbox_6").css('top', "175.5%");
		$("#fourth_screen_blackbox_7").css('top', "150.9%");
		$("#fourth_screen_right").css('left', "100%");
		$("#fourth_screen_close").css('left', "101.5%");
		$(".fourth_screen_blackbox_hide").css('left', "103%");
		$("#fourth_screen_charcoal_1").hide();
		$("#fourth_screen_charcoal_2").hide();
		$fourth_click_1=0; $fourth_click_2=0; $fourth_click_3=0; $fourth_box=0;
		$fourth_check_1=0;$fourth_check_2=0;$fourth_check_3=0;$fourth_check_4=0;$fourth_check_5=0;$fourth_check_6=0;
		$(".fourth_screen_blackbox").attr("src","./cti/fourth_screen_blackbox.png");
		$(".fourth_screen_blackbox_hide").attr("src","./cti/fourth_screen_blackbox.png");
		$("#fourth_screen_blackbox_7").attr("src","./cti/fourth_screen_blackbox.png");
		$("#fourth_screen_left_box").hide();
		$("#fourth_screen_left_box").attr("src","./cti/fourth_screen_blackbox.png");
    	$("#fourth_screen_sendto").attr("src","./cti/fourth_screen_sendto_no.jpg");	
    	$fourth_left_9=0;
		$("#black_bar").hide();
		$("#first_screen").show();
    });
});