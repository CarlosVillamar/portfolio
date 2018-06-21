//async functions in a revision
$(document).ready(function () {

    //event handler that will clear the search bar, search results and wipes out the trakcs loaded onto the array
    $("#search").on("click", function () {
        document.getElementById('search').value = " "
        $('.list').remove()
        $('.head').remove()
        $('.topTracks').remove()
        $('#des').remove()
        $('#a').remove()
    });
    var i = 0;

    //Ajax Calls that will be send on sumbission of the desired search
    $('#form').submit(function (e) {
        //before the first ajax call will retrieve the value from the serach bar and bulid the url using that value
        q = $('#search').val();
        
        //saves the value  of the search bar on submit in this varable(who is the user searching for)
        e.preventDefault();
        
        //below we bulid artist URL based on the users desired interest
        qu = ('http://api.napster.com/v2.2/search?apikey=YjM2NjkyY2MtZmE0Zi00NjEyLWE4ZDUtZDE5MWEzOTM3NmEz&query=' + q + '&type=artist')
        // console.log(q)
       
        $.ajax({
            //first call to retrieve data based on the url we built, we will search for the artist the user wants
            type: 'GET',
            url: qu,
            success: function (e) {
                //once successful we will retrieve the top result to work with a fixed data set
                //retrieve the artist information
                let blurb = e.search.data.artists[0].blurbs[0]

                //below we set the url to retrieve the artist images
                let image = (e.search.data.artists[0].links.images.href + "?apikey=YjM2NjkyY2MtZmE0Zi00NjEyLWE4ZDUtZDE5MWEzOTM3NmEz")

                //below we build a url to retrieve the artists top tracks and limit the search results to 5
                let top5 = (e.search.data.artists[0].href + '/tracks/top?apikey=YjM2NjkyY2MtZmE0Zi00NjEyLWE4ZDUtZDE5MWEzOTM3NmEz&limit=5')


                $.get(image, (r) => {
                    //here we retrieve the disired image which was the biggest one in the JSON call and set it to the background of the jukebox container
                    let set = r.images[3].url
                    $('#box').css('background-image', 'url(' + set + ')').css('border', 'solid').css('border-color', 'aqua').css('border-width', '5px')

                })

                $.get(top5, (d) => {
                    //here we build our playlist of the top 5 tracks and retrive the sources to build the audio elements in html

                    $('#yo').append("<p class='head' style = 'text-decoration: underline; font-style: italtic' ><b>" + d.tracks[0].artistName + "</b></p>")
                    var i = 0;
                    for (var s in d.tracks) {
                        $('#yo').append("<li class='list'>" + d.tracks[i].name + "</li>")
                        $('audio').append("<source class='topTracks' src='" + d.tracks[i].previewURL + "'type='audio/mpeg'>")
                        $('.list').css("border", "solid").css("border-color", "white").css("border-width", "3px").css("color", "white");
                        i++;
                    }
                    //prints out the artist description at the end of the call
                    $('#blurb').append("<p id='des'>" + "Artist info: " + blurb + "</p>").css('color', 'white').css('border', 'solid').css('border-color', 'white').css('background-color', '#666').css('text-align', 'justify').css('padding', '5px')

                    ///links generated does not always work
                    artistLink = ('https://us.napster.com/artist/' + q)
                    console.log(artistLink)
                    $('body').append("<a id='a' href=" + artistLink + "> Learn more about " + q + "</a>")
                    $('#a').css('color', 'white')
                })

            },

        });
    })



    var jukebox = document.getElementById('audio');

    this.play = $('#play').click((r) => {
        r.preventDefault();
        jukebox.play();
        $("#play").css('border-color', 'black').css('border-width', '3px');
        $('#pause').css('border-width', '0px');
        $('#stop').css('border-width', '0px');



    });
    this.pause = $('#pause').click((e) => {
        e.preventDefault();
        jukebox.pause();
        $("#pause").css('border-color', 'black').css('border-width', '3px');
        $("#play").css('border-width', '0px');
        $("#stop").css('border-width', '0px');
    }
    );

    this.stop = $('#stop').click((e) => {
        e.preventDefault();
        jukebox.pause();
        jukebox.currentTime = 0;
        $('#stop').css('border-color', 'black').css('border-width', '3px');
        $('#play').css('border-width', '0px');
        $('#pause').css('border-width', '0px');


    });


    this.next = $('.next_controls').click((e) => {

        //navigate the index of the empty array and set jukebox.src = new index
        e.preventDefault();
        const arrSongs = $('.topTracks');

        jukebox.src = arrSongs[i++].src;

        jukebox.play();
        // if(jukebox.src===arrSongs[4].src){
        //    jukebox.src = arrSongs[i].src
        // }
        console.log(jukebox.src)


        $("#play").css('border-color', 'blue').css('border-width', '3px');
        $('#stop').css('border', 'none');
        $('pause').css('border', 'none');

        //figure out how to loop things together
    });

    this.back = $('.back_controls').click((e) => {
        //current bug has to play the next song in the playlist in  order to previous song
        e.preventDefault();

        let arrSongs = $('.topTracks')
        jukebox.src = arrSongs[i--].src;
        jukebox.play()

        $("#play").css('border-color', 'blue').css('border-width', '3px');
        $('#stop').css('border', 'none');
        $('pause').css('border', 'none');

    });


    // $('.list').click(function () {

    //     jukebox.pause();
    //     let arrSongs = $('.list')
    //     console.log(arrSongs)
    //     jukebox.src = arrSongs.auidourl
    //     jukebox.play();

    // });


});