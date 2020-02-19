



$(document).ready(function(){
  var myKey = JSON.parse(apiKey);
  console.log(myKey[0]);
  myKey = myKey[0].key;
  console.log(myKey);

  var url;

  var url = 'http://newsapi.org/v2/top-headlines?'+
    'country=nz&'+
    'apiKey=' + myKey;


  //console.log(url);

  //reading user's choice

  function displayAllNews(array){
    var i;
    document.getElementById('result').innerHTML = '';
    for(i=0; i<array.length; i++){
      if(array[i].urlToImage === null){
        array[i] = array[i+1];
      }
      document.getElementById('result').innerHTML +=
        '<div class="card col-lg-4 mb-5">'+
        '<img src="'+ array[i].urlToImage +'" class="card-img-top" alt="Image">'+
        '<div class="card-body">'+
          '<h5 class="card-title"><a href="'+ array[i].url + '" target="blank">'+array[i].title + '</a></h5>'+
          '<p class="card-text">'+array[i].description+'</p>'+
          '<div class"d-inline">'+
          '<small class="d-inline">'+array[i].source.name+'</small>'+
        '</div>'+
      '</div>';
    }
  };

  var req = new Request(url);
      fetch(req)
          .then(function (response) {
              console.log(response.json());
          });

      $.ajax({
        url: url,
        type:'GET',
        data:'json',
        success: function(data){
          console.log(data);
          console.log(data.articles[0]);
          displayAllNews(data.articles);
        },
        error: function(){
          console.log('error');
        }
    }); //ajax

});//document.ready
