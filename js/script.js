var sources = [];

function StoreUserInputData(){
  this.countryCode = null;
  this.categoryCode = null;
  this.sourceCode = null;
}

var userInput = new StoreUserInputData();

function saveData(country, category, source){
  if(country !== ""){
    var valueSelectedCountry = $("#inputCountry option:selected").val();
    userInput.countryCode = valueSelectedCountry;
  }
  if (category !== ""){
    var valueSelectedCategory = $( "#inputCategory option:selected").val();
    userInput.categoryCode = valueSelectedCategory;
  }
  if(source !== ""){
    var valueSelectedSource = $( "#inputSource option:selected" ).val();
    userInput.sourceCode = valueSelectedSource;
  }
  // console.log(userInput);
}

function selectOnChange(){
  $('#inputCountry').on('change', function(){
    userInput.countryCode = this.value;
    // console.log(userInput.countryCode);
  });
}

selectOnChange();

function buildUrl(){
  var url = 'http://newsapi.org/v2/top-headlines?' + 'apiKey=' + myKey;
  if(userInput.countryCode != null){
    url +=  '&country=' + userInput.countryCode;
  }
  if(userInput.categoryCode != null){
    url +=  '&category=' + userInput.categoryCode;
  }
  if(userInput.sourceCode != null){
    url += '&sources=' + userInput.sourceCode;
  }

  return url;
  // console.log(url);
}

function displayAllNews(array){
  var i;
  document.getElementById('result').innerHTML = '';
  for(i=0; i<array.length; i++){
    if(array[i].urlToImage === null){
      array[i] = array[i+1];
    }
    document.getElementById('result').innerHTML +=
      '<div class="col-md-4 col-lg-4 mb-5">'+
      '<div class="card">'+
      '<img src="'+ array[i].urlToImage +'" class="card-img-top" alt="Image">'+
      '<div class="card-body">'+
        '<h5 class="card-title"><a href="'+ array[i].url + '" target="blank">'+array[i].title + '</a></h5>'+
        '<p class="card-text">'+array[i].description+'</p>'+
        '<div class"d-inline">'+
        '<small class="d-inline">Source: '+array[i].source.name+'</small>'+
      '</div>'+
    '</div>'
    '</div>';
  }
};

function testApiKey(apiKey){
  var url = 'http://newsapi.org/v2/top-headlines?'+
  'country=nz&'+
  'apiKey=' + apiKey;
  queryApi(url);
}


function createSourceDropdown(sourcesArray){
  $.each(sourcesArray, function(key, value) {
    $('#inputSource')
      .append($("<option></option>")
      .attr("value",key)
      .text(value));
  });
}

function createSourceList(arr){
  var allSources = [];
  for(var i=0; i<arr.length; i++){
    allSources.push(arr[i].source.name);
  }
  sources = [...new Set(allSources)];
  createSourceDropdown(sources);
}

function queryApi(url){
  $.ajax({
    url: url,
    type:'GET',
    data:'json',
    success: function(data){
      // console.log(data);
      // console.log(data.articles[0]);
      // console.log(data.articles[0].source);
      //call function to create array with sources object
      createSourceList(data.articles);
      displayAllNews(data.articles);
    },
    error: function(){
      console.log('error');
    }
  });
}

$(document).ready(function(){
  myKey = JSON.parse(apiKey);
  // console.log(myKey[0]);
  myKey = myKey[0].key;
  // console.log(myKey);
  testApiKey(myKey);

  document.getElementById('submit').addEventListener('click', function(){
      var country = document.getElementById('inputCountry').value;
      var category = document.getElementById('inputCategory').value;
      var source = document.getElementById('inputSource').value;
      saveData(country, category, source);
      var url = buildUrl();
      queryApi(url);
  });

});//document.ready
