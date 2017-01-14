var project = document.getElementById("main-projects-container");
var projects = document.getElementsByClassName("main-projects-container");
projects[0].style.display = "block";

function changeProject(projectId){
    for(var i=0; i<projects.length; i++){
        if(i===projectId){
            projects[i].style.display = "block";
            if(projects[i].clientHeight<project.children[0].clientHeight){
                projects[i].style.height = project.children[0].clientHeight + "px";
            }
        }
        else{
            projects[i].style.display = "none";
        }        
    }
}

$(".main-banner-img").eq(0).show();

$(document).ready(function(){
    var i = 0;
    setInterval(changeBanner, 5000);
    $("#main-banner-round-1").click(function(){
        $(".main-banner-img").eq(0).show();
        $(".main-banner-img").eq(1).hide();
        $("#main-banner-1").show();
        $("#main-banner-round-2").css({'width':'15px','height':'15px','background-color':'transparent','border':'2px solid black'});
        $("#main-banner-round-1").css({'width':'19px','height':'19px','background-color':'black','border':'0'});
    });
    $("#main-banner-round-2").click(function(){
        $(".main-banner-img").eq(1).show();
        $(".main-banner-img").eq(0).hide();
        $("#main-banner-1").hide();
        $("#main-banner-round-1").css({'width':'15px','height':'15px','background-color':'transparent','border':'2px solid black'});
        $("#main-banner-round-2").css({'width':'19px','height':'19px','background-color':'black','border':'0'});
    });
    function changeBanner(){
        if(i===0){
            $("#main-banner-1").fadeOut("slow");
            $(".main-banner-img").eq(0).fadeOut("slow",function(){
                $(".main-banner-img").eq(1).fadeIn("slow");
                $("#main-banner-round-1").css({'width':'15px','height':'15px','background-color':'transparent','border':'2px solid black'});
                $("#main-banner-round-2").css({'width':'19px','height':'19px','background-color':'black','border':'0'});
            });
            i=1;
        }
        else{
            $(".main-banner-img").eq(1).fadeOut("slow",function(){
                $(".main-banner-img").eq(0).fadeIn("slow");
                $("#main-banner-1").fadeIn("slow");
                $("#main-banner-round-2").css({'width':'15px','height':'15px','background-color':'transparent','border':'2px solid black'});
                $("#main-banner-round-1").css({'width':'19px','height':'19px','background-color':'black','border':'0'});
            });
            i=0;
        }
    }
    $("#header-hamburger-icon").click(function(){
        $("#wrapper").toggleClass("wrapper");
        $("#mobile-nav").toggle();
        $("#mobile-nav").toggleClass("mobile-nav");
    })
});
