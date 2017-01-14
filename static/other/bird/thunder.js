$(document).ready(function() {
  //count every second
  setInterval(totalTimer, 1000);
  var countTime = 0;
  //styling regular Killers
  var flyKiller = {
    "top": '10vh',
  };
  var middleKiller = {
    "top": '45vh',
  }
  var groundKiller = {
    "bottom": '0',
  };
  //function show couting times and create regular Killers
  function totalTimer(){
    //show total time this game lasting
    countTime += 1;
    $("#timer").html(countTime + "s");
    //create a regular Killer
    var nextWork = countTime%3;
    var rugularKiller;
    if(nextWork===0){
      regularKiller = $("<img/>").addClass("regular-killer").css(flyKiller).attr("src","./bird/wind.png");;
    }
    else if(nextWork===1){
      regularKiller = $("<img/>").addClass("regular-killer").css(middleKiller).attr("src","./bird/wind.png");;
    }
    else{
      regularKiller = $("<img/>").addClass("regular-killer").css(groundKiller).attr("src","./bird/wind.png");;
    }
    $( "#main" ).append(regularKiller);
  }
  //set timer to change bird image and deal with Killer action
  var birdTime = 0;
  setInterval(birdTimer, 100);
  function birdTimer(){
    //change bird image
    birdTime += 1;
    var wingsBird = birdTime%2;
    if(wingsBird===0){
      $("#bird").attr("src","./bird/bird1.png");
    }
    else{
      $("#bird").attr("src","./bird/bird2.png");
    }
    //Regular Killer get bird
    var regularCount = $(".regular-killer").length;
    var birdLeft = $("#bird").position().left;
    var birdRight = birdLeft + $("#bird").width();
    var birdTop = $("#bird").position().top;
    var birdBottom = $("#bird").position().top +$("#bird").height();
    function birdCatch(){
      $("#bird").css({animation:'drop ' + '1s'});
      $("#cover-over").html("Game over! We catch you in " + countTime + "s");
      $("#cover").css({animation:'cover ' + '4s'});
    }
    for(var i = 0; i<regularCount-1;i++){
      var regularLeft = $(".regular-killer").eq(i).position().left;
      var regularRight = regularLeft + $(".regular-killer").eq(i).width();
      var regularTop = $(".regular-killer").eq(i).position().top;
      var regularBottom = regularTop + $(".regular-killer").eq(i).height();
      if(regularLeft<birdRight&&regularRight>birdLeft&&regularTop<birdBottom&&regularTop>birdTop){
        birdCatch();
      }
      else if(regularLeft<birdRight&&regularRight>birdLeft&&regularBottom<birdBottom&&regularBottom>birdTop){
        birdCatch();
      }
      else if(regularLeft<birdRight&&regularRight>birdLeft&&regularTop<birdTop&&regularBottom>birdTop){
        birdCatch();
      }
      else if(regularLeft<birdRight&&regularRight>birdLeft&&regularTop<birdBottom&&regularBottom>birdBottom){
        birdCatch();
      }
    }
    //Special Killer get bird
    var specialCount = $(".special-killer").length;
    for(var j = 0; j<specialCount;j++){
      var specialLeft = $(".special-killer").eq(j).position().left;
      var specialRight = specialLeft + $(".special-killer").eq(j).width();
      var specialTop = $(".special-killer").eq(j).position().top;
      var specialBottom = specialTop + $(".special-killer").eq(j).height();
      if(specialLeft<birdRight&&specialRight>birdLeft&&specialTop<birdBottom&&specialTop>birdTop){
        birdCatch();
      }
      else if(specialLeft<birdRight&&specialRight>birdLeft&&specialBottom<birdBottom&&specialBottom>birdTop){
        birdCatch();
      }
      else if(specialLeft<birdRight&&specialRight>birdLeft&&specialTop<birdTop&&specialBottom>birdTop){
        birdCatch();
      }
      else if(specialLeft<birdRight&&specialRight>birdLeft&&specialTop<birdBottom&&specialBottom>birdBottom){
        birdCatch();
      }
    }
  }
  //change positon of bird for up and down keys
  $(document).keydown(function(event){
    var mainWidth = $('#main').width();
    var birdWidth = $('#bird').width();
    var maxLeft = mainWidth-birdWidth*5;
    var minTop = $("#main").position().top;
    var birdHeight = $('#bird').height();
    var mainHeight = $('#main').height();
    var maxTop = mainHeight + minTop - birdHeight;
    if(event.which === 38){
      var changeTop = $("#bird").position().top - 40;
      if (changeTop>minTop){
        $("#bird").css('top', changeTop + 'px');
      }
    }
    else if(event.which === 40){
      var changeTop = $("#bird").position().top + 40;
      if (changeTop < maxTop){
        $("#bird").css('top', changeTop + 'px');
      }
    }
    else if(event.which === 37){
      var changeLeft = $("#bird").position().left - 40;
      if(changeLeft>=0){
        $("#bird").css('left', changeLeft + 'px');
      }
    }
    else if(event.which === 39){
      var changeLeft = $("#bird").position().left + 40;
      if(maxLeft>=changeLeft){
        $("#bird").css('left', changeLeft + 'px');
      }
    }
  })
  //constructor for Killers
  function createKiller(){
    this.width = Math.floor(Math.random() * 3) + 2;
    this.height = Math.floor(Math.random() * 36) + 10;
    this.speed = Math.floor(Math.random() * 8) + 5;
  }
  //function create new Killers
  function goKiller(){
    var bornKiller = new createKiller();
    var typeKiller = Math.floor(Math.random() * 8);
    var surpriseLeft = Math.floor(Math.random() * 76)+15;
    var styleKiller = {};
    switch (typeKiller){
      case 0:
      case 1:
      case 2:
        styleKiller = {
          "width": bornKiller.width +'%',
          "top": '10vh',
          "height": bornKiller.height + 'vh',
          "animation": 'move ' + bornKiller.speed + 's'
        };
        break;
      case 3:
      case 4:
        styleKiller = {
          "width": '3%',
          "top": '10vh',
          "height": '30vh',
          "animation": 'surprise ' + '2s',
          "left": surpriseLeft +'%'
        };
        break;
      default:
        styleKiller = {
          "width": bornKiller.width +'%',
          "bottom": '0',
          "height": bornKiller.height + 'vh',
          "animation": 'move ' + bornKiller.speed + 's'
        };
    }
    //var newKiller = $("<div/>").addClass("special-killer").css(styleKiller);
    var newKiller = $("<img/>").addClass("special-killer").css(styleKiller).attr("src","./bird/wind.png");
    $( "#main" ).append(newKiller);
    setTimeout(goKiller, 1000);
  }
  //start by a Killer created;
  goKiller();
});
