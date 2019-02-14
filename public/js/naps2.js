this.songArr = [];
this.top5 = " ";
this.blurb = " ";
this.image = " ";

$(document).ready(function () {
    //napster metadata APIs
    //event handler that will clear the search bar, search results and wipes out the trakcs loaded onto the array
    $("#search").on("click", function () {
        document.getElementById('search').value = " "

    });
});

var jukebox = { player: document.getElementById('audio') };

let i = 0;

$('#form').submit(function (e) {
    $('.list').remove()
    $('.head').remove()
    $('.topTracks').remove()
    $('#des').remove()
    $('#a').remove()

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
            // console.log(this.blurb);

            //below we set the url to retrieve the artist images
            this.image = (e.artists[0].links.images.href + "?apikey=YjM2NjkyY2MtZmE0Zi00NjEyLWE4ZDUtZDE5MWEzOTM3NmEz")

            //below we build a url to retrieve the artists top tracks and limit the search results to 5
            this.top5 = (e.artists[0].href + '/tracks/top?apikey=YjM2NjkyY2MtZmE0Zi00NjEyLWE4ZDUtZDE5MWEzOTM3NmEz&limit=5')

            jukeboxCatalog(this.blurb, this.image, this.top5);
        }
    });

    function jukeboxCatalog(blurb, image, top5) {
        this.songArr = [];

        $('#blurb').append("<p id='des'>" + "Artist info: " + blurb + "</p>").css('color', 'white').css('border', 'solid').css('border-color', 'white').css('background-color', '#666').css('text-align', 'justify').css('padding', '5px')

        $.get(image, (r) => {
            //here we retrieve the disired image which was the biggest one in the JSON call and set it to the background of the jukebox container
            let set = r.images[3].url
            $('#box').css('background-image', 'url(' + set + ')').css('border', 'solid').css('border-color', 'aqua').css('border-width', '5px')

        })

        $.get(top5, (d) => {
            $('#yo').append("<p class='head' style = 'text-decoration: underline; font-style: italtic' ><b>" + d.tracks[0].artistName + "</b></p>")
            for (let i = 0; i < d.tracks.length; i++) {
                // console.log(d.tracks[i].previewURL);
                $('#yo').append("<li class='list'>" + d.tracks[i].name + "</li>");
                $('.list').css("border", "solid").css("border-color", "white").css("border-width", "3px").css("color", "white");
                this.songArr.push(d.tracks[i].previewURL)
            }
            jukebox.player.src = songArr[i];
            jukebox.player.autoplay = true;
        });
    }

    this.play = $('#play').click((r) => {
        r.preventDefault();
        jukebox.player.play();
        $("#play").css('border-color', 'black').css('border-width', '3px');
        $('#pause').css('border-width', '0px');
        $('#stop').css('border-width', '0px');

    });

    this.pause = $('#pause').click((e) => {
        e.preventDefault();
        jukebox.player.pause();
        $("#pause").css('border-color', 'black').css('border-width', '3px');
        $("#play").css('border-width', '0px');
        $("#stop").css('border-width', '0px');
    });

    this.stop = $('#stop').click((e) => {
        e.preventDefault();
        jukebox.player.pause();
        jukebox.player.currentTime = 0;
        $('#stop').css('border-color', 'black').css('border-width', '3px');
        $('#play').css('border-width', '0px');
        $('#pause').css('border-width', '0px');
    });


    this.next = $('.next_controls').click((e) => {
        e.preventDefault();

        if (i == songArr.length - 1) {
            i = 0
            jukebox.player.pause();
        } else {
            i++;
            jukebox.player.src = songArr[i];
            jukebox.player.play();
        }
        $("#play").css('border-color', 'blue').css('border-width', '3px');
        $('#stop').css('border', 'none');
        $('pause').css('border', 'none');

    });

    this.back = $('.back_controls').click((e) => {
        //current bug has to play the next song in the playlist in  order to previous song
        e.preventDefault();
        if (i == 0) {
            jukebox.player.pause();
        } else {
            i--;
            jukebox.player.src = songArr[i];
            jukebox.player.play()
        }
        $("#play").css('border-color', 'blue').css('border-width', '3px');
        $('#stop').css('border', 'none');
        $('pause').css('border', 'none');
    });

    //TODO: figure out how to select and play the tracks from a playlist on screen
    $('.list').click(function () {

        jukebox.player.pause();
        // let arrSongs = $('.list')
        // console.log(arrSongs)
        // jukebox.src = arrSongs.auidourl
        // jukebox.play();

    });


});









