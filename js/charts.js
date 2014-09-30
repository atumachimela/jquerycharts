Charts = 
{		
		base : "http://ws.audioscrobbler.com/2.0/",
		params: {api_key : 'dc1a93c2536e0b852a301a56303abb92', format : 'json'},
		user_input : "" , 
	start : function ()
	{	
		// fetches Top Fifty Tracks
			Charts.fetchTopTracks ();

		// fetches Top Fifty Artists
			Charts.fetchTopArtists ();
		
			
			Charts.enableKeyUp ();
			$("button").click(Charts.fetchAll);

		

	},
	isCountryValid  : function ()
	{	
		//var CountryExp = /^[a-z]+$/i;
		if ((isNaN($(".user_input").val())) && ($('.user_input').val().length > 3))
		{
			console.log("validInput");
			return true;
		}
		else 
		{
			console.log("invalidInput");
			return false;
		}

	},
	// Accepts input is the enter key is pressed
	enableKeyUp : function ()
	{
		$(".user_input").on("keydown",function(event)     
		{
			if(event.keyCode === 13)
			{
				Charts.fetchAll ();
			}
		});
	},
	fetchAll : function()
	{	
		//gets user_input in stores it
			Charts.user_input = $('.user_input').val();
		$('.toptracks ,.artistList').hide('fast');
			if (Charts.isCountryValid)
		{
			// fetches Top Fifty Tracks around you 
			Charts.fetchTopTracksFromLocation ();

			// fetches Top Fifty Artists around you
			Charts.fetchTopArtistsFromLocation ();
		}
			
	},	// method that fetches Top Fifty Tracks
	fetchTopTracks : function () 
	{	
		var TracksHeading = "";
		TracksHeading += '<h1>'+ 'Top Five Tracks in The World' +'</h1>';
		$('.toptracks').append(TracksHeading);
		Charts.params.method ='chart.gettoptracks' ;
		Charts.params.limit = 5;
		$.getJSON(Charts.base,Charts.params, function(response)
		{	
			console.log(response);
			$.each(response.tracks.track,(function(i,value){
				var displaytracks = "";
				
				if(value.image){
				displaytracks += '<li><img src = "'+ value.image[3]['#text']+'"><a href="'+ value.artist.url+'"><p>'+ value.artist.name +'</p></a></li>';
				$('.toptracks').append(displaytracks);
				}

			}));
			
		});

	},
		// method that fetches Top Five Artists
	fetchTopArtists : function () 
	{
		var ArtistsHeading = "";
		ArtistsHeading += '<h1>'+ 'Top Ten Tracks in The World' +'</h1>';
		$('.artistList').append(ArtistsHeading);
		Charts.params.method = 'chart.gettopartists';
		Charts.params.limit = 10;
		$.getJSON(Charts.base,Charts.params, function(response)
		{
			console.log(response);
			$.each(response.artists.artist, function(i,value){
				if(value.image){
					var displayartists = "";
					displayartists += '<li><img src = "'+ value.image[3]['#text']+'"><a href="'+ value.url+'"><p>'+ value.name +'</p></a></li>';
					$('.artistList').append(displayartists);
				}
			});
		});
	},
	// method that fetches Top Five Tracks from a particular Country
	fetchTopTracksFromLocation : function ()
	{	
		Charts.params.method =  'geo.gettoptracks';
		Charts.params.country = Charts.user_input;
		Charts.params.limit = 5;
		// Charts.params.country = user_input;
		$.getJSON(Charts.base ,Charts.params , function(response)
		{
			//console.log(response);
			Charts.loadTracks(response);


		});
		// method that fetches Top Fifty Artist from a particular Country
	},
	fetchTopArtistsFromLocation : function ()
	{	
		Charts.params.method = 'geo.gettopartists';
		Charts.params.country = Charts.user_input;
		Charts.params.limit = 10;
		// Charts.params.country = user_input;
		$.getJSON(Charts.base ,Charts.params , function(response)
		{
			// console.log(response);
			Charts.loadArtist(response);

		});
		
	},
	// send retrieved data from Last.Fm to Web Page
	loadTracks : function(response){		
		var countrytoptrackslist = '';
		var heading = "";
		heading +='<h1>Top Five Tracks from  '+ Charts.user_input+'</h1>';
		$.each(response.toptracks.track,function(j,info){
			if(info.image){
			 countrytoptrackslist +='<li><img src =\"'+ info.image[3]['#text']+'\">'+'<p><a href =\"'+ info.artist.url +'\">'+ info.artist.name+'</a></p></li>';	
			}
		});
		$('.ChartsHeading').html(heading);
		$('.countrytoptrackslist').html(countrytoptrackslist);
			
	},
	
	loadArtist : function(response){	
		var countrytopartistlist = '' ;
		var title = '';
		title +='<h1>Top Ten Artist from '+ Charts.user_input +'</h1>';
		$('.CountryHeading').html(title);
		$.each(response.topartists.artist,function(i,value){
			countrytopartistlist +='<li><img src =\"'+ value.image[3]['#text']+'\">'+'<p><a href =\"'+ value.url +'\">'+ value.name +'</a></p></li>';
			$('.countryartsistcharts').html(countrytopartistlist);
		});
		
		
		
	}
};
$(document).ready(Charts.start);

