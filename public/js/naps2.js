$(document).ready(function () {
//napster metadata APIs
    //event handler that will clear the search bar, search results and wipes out the trakcs loaded onto the array
    $("#search").on("click", function () {
        document.getElementById('search').value = " "
        $('.list').remove()
        $('.head').remove()
        $('.topTracks').remove()
        $('#des').remove()
        $('#a').remove()
    });
});
$('#form').submit(function (e) {
    //before the first ajax call will retrieve the value from the serach bar and bulid the url using that value
    q = $('#search').val();

    //saves the value  of the search bar on submit in this varable(who is the user searching for)
    e.preventDefault();

    //below we bulid artist URL based on the users desired interest
    newQ = ("http://api.napster.com/v2.2/artists/" + q + "?apikey=YjM2NjkyY2MtZmE0Zi00NjEyLWE4ZDUtZDE5MWEzOTM3NmEz")
    console.log(newQ);

    $.ajax({
        //first call to retrieve data based on the url we built, we will search for the artist the user wants
        type: 'GET',
        url: newQ,
        success: function (e) {
            this.blurb = e.artists[0].blurbs[0]
            console.log(this.blurb);

            //below we set the url to retrieve the artist images
            this.image = (e.artists[0].links.images.href + "?apikey=YjM2NjkyY2MtZmE0Zi00NjEyLWE4ZDUtZDE5MWEzOTM3NmEz")
            console.log(this.image)
            
            //below we build a url to retrieve the artists top tracks and limit the search results to 5
            this.top5 = (e.artists[0].href + '/tracks/top?apikey=YjM2NjkyY2MtZmE0Zi00NjEyLWE4ZDUtZDE5MWEzOTM3NmEz&limit=5')
            console.log(this.top5)
        }
    });
});


