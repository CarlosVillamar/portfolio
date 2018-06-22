$(document).ready(function(){
//submit via github link
$("#results").hide();
var searchBar = document.getElementById("movieSearcher");
    
//function to clear searchbar
$("#movieSearcher").on("click", function()
{   
    searchBar.value = " ";
    $('body').css('background-image','url(images/wallpaper2.jpg)')

});


    $("#mainForm").submit(function(evt){
          evt.preventDefault();

     });



  

    $("#movieSearcher").keyup(function(e){
        var value = $("#movieSearcher").val();
        if(value.length>=3){
            $.ajax({
                type: "GET",
                url: "http://www.omdbapi.com/?apikey=7720d9b0&",
                data:{
                       t: searchBar.value 
                },
                dataType: "json",
            
                success: function(d){ 
                    $("#mainForm").css('border','solid').css('border-color','blue').css('border-width','5px');
                    $("#movie-title").html(d.Title).css('text-align','center');
                    $("#poster").attr("src",d.Poster).css('display','block').css('margin-left','auto').css('margin-right','auto').css('text-align','justify').css('min-width','5%');
                    $("#para").html(d.Plot).css('text-align' ,'justify');
                    $("#results").show().css('background-color','teal').css('color','white');
                    $("body").css('background-image',"url("+d.Poster+")")
                }
            }
            );
        }
        });

});