function StoreUserInputData(){
  this.country = null;
  this.category = null;
  this.source = null;
}

var userInput = new StoreUserInputData();

  function saveData(country, category, source){
    if(country !== ""){
      userInput.country = country;
    }
    if (category !== ""){
      userInput.category = category;
    }
    if(source !== ""){
      userInput.source = source;
    }
    console.log(userInput.country, userInput.category, userInput.source)
  }

  var url = 'http://newsapi.org/v2/top-headlines?'+
  'country=nz&'+
  'apiKey=' + apiKey;
  queryApi(url);


  function createRequestUrl(){
    var url = '';
    var selectNameValue = $(#)
    console.log()
    var baseUrl = 'http://newsapi.org/v2/top-headlines?';
    // var endpoint;
    url = baseUrl + 'country' + ''
  }

  function displayAllNews(array){
    var i;
    document.getElementById('result').innerHTML = '';
    for(i=0; i<array.length; i++){
      if(array[i].urlToImage === null){
        array[i] = array[i+1];
      }
      document.getElementById('result').innerHTML +=
        '<div class="card col-md-4 col-lg-4 mb-5">'+
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

function testApiKey(apiKey){
  var url = 'http://newsapi.org/v2/top-headlines?'+
  'country=nz&'+
  'apiKey=' + apiKey;
  queryApi(url);
}


function queryApi(url){
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
  });
}

$(document).ready(function(){
  var myKey = JSON.parse(apiKey);
  console.log(myKey[0]);
  myKey = myKey[0].key;
  console.log(myKey);
  testApiKey(myKey);

  document.getElementById('submit').addEventListener('click', function(){
      var country = document.getElementById('inputCountry').value;
      var category = document.getElementById('inputCategory').value;
      var source = document.getElementById('inputSource').value;
      saveData(country, category, source);
  });


});//document.ready

