var moviesUrl = "http://apify.heroku.com/api/imdb_top250_movies.json?callback=?"
var movies = [];
var seenMovies = [];

$(function(){
  var source   = $("#movies-template").html();
  var template = Handlebars.compile(source);
  if(!stash.get('imdb_movies')){
    stash.set('imdb_movies', []);
  }
  var imdbMovies = stash.get('imdb_movies');

  $.getJSON(moviesUrl, function(data){
    movies = JSON.parse(data);
    fillMovies();
    checkMovies();
  });

  function fillMovies(){
    $('.movierows').append(template({movies: movies}));
  }

  function checkMovies(){
    _.each(imdbMovies, function(imdbMovie){
      $('.movie-check[value="' + imdbMovie + '"]').attr('checked', 'checked');
      $('.movie-check[value="' + imdbMovie + '"]').closest('tr').find('td:nth-child(2),td:nth-child(3),td:nth-child(4)').addClass('checked');
    });
  }

  $('.movie-check').live('click', function(){
    if($(this).attr('checked')){
      $(this).closest('tr').find('td:nth-child(2),td:nth-child(3),td:nth-child(4)').addClass('checked');
      addMovie($(this).val());
    } else {
      $(this).closest('tr').find('td:nth-child(2),td:nth-child(3),td:nth-child(4)').removeClass('checked');
      removeMovie($(this).val());
    }
  });

  function addMovie(movie){
    if(!_.include(imdbMovies, movie)){
      imdbMovies.push(movie);
      stash.set('imdb_movies', imdbMovies);
    }
  }

  function removeMovie(movie){
    imdbMovies = _.reject(imdbMovies, function(imdbMovie){return imdbMovie == movie});
    stash.set('imdb_movies', imdbMovies);
  }
});