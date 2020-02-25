$(document).ready(function(){
  myKey = JSON.parse(apiKey);
  //console.log(myKey[0]);
  myKey = myKey[0].key;
  //console.log(myKey);
  testApiKey(myKey);
  //first action, what happen on submit
  document.getElementById('submit1').addEventListener('click', function(){
      var country = document.getElementById('inputCountry').value;
      var category = document.getElementById('inputCategory').value;
      saveData(country, category);
      var url = buildUrl();
      queryApi(url);
  });

  document.getElementById('submit2').addEventListener('click', function(){
    var valueSelectedSource = $("#inputSource option:selected").html();
    saveDataSource();
    console.log(valueSelectedSource);
    console.log(typeof(valueSelectedSource));
  });
});//document.ready


function queryApi(url){
  $.ajax({
    url: url,
    type:'GET',
    data:'json',
    success: function(data){
      console.log(data);
      console.log(data.articles[0]);
      // console.log(data.articles[0].source);
      //call function to create array with sources object
      createSourceList(data.articles);
      displayAllNews(data.articles);
      displayNewsBySource(data.articles);
    },
    error: function(){
      console.log('error');
    }
  });
}
//==============================================================================

function StoreUserInputData(){
  this.countryCode = null;
  this.categoryCode = null;
  this.sourceCode = null;
}
var userInput = new StoreUserInputData();

function saveData(country, category){
  if(country !== ""){
    var valueSelectedCountry = $("#inputCountry option:selected").val();
    userInput.countryCode = valueSelectedCountry;
  }
  if (category !== ""){
    var valueSelectedCategory = $( "#inputCategory option:selected").val();
    userInput.categoryCode = valueSelectedCategory;
  }
  
  console.log(userInput);
}

function saveDataSource(source){
  if(source !== ""){
    var valueSelectedSource = $("#inputSource option:selected").html();
    userInput.sourceCode = valueSelectedSource;
  }
  
  console.log(userInput);
}


//==============================================================================
function buildUrl(){
  var url = 'http://newsapi.org/v2/top-headlines?' + 'apiKey=' + myKey;
  if(userInput.countryCode != null){
    url +=  '&country=' + userInput.countryCode;
  }
  if(userInput.categoryCode != null){
    url +=  '&category=' + userInput.categoryCode;
  }
  console.log(url);
  return url;
}

function buildUrlSource(){
  var url = 'http://newsapi.org/v2/top-headlines?' + 'apiKey=' + myKey;
  
  if(userInput.categoryCode != null){
    url +=  '&category=' + userInput.categoryCode;
  }
  console.log(url);
  return url;
}



var sources = [];
var articles = [];

function createSourceDropdown(arr){
  $.each(arr, function(key, value) {
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
  console.log(sources);
}

function selectCountryOnChange(){
  $('#inputCountry').on('change', function(){
    userInput.countryCode = this.value;
    console.log(userInput.countryCode);
  });
}

selectCountryOnChange();

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

function displayNewsBySource(array){
  var i;
  // document.getElementById('result2').innerHTML = '';
  for(i=0; i<array.length; i++){
    if(array[i].source.name === userInput.sourceCode){
      sources[i] = array[i];
      console.log(sources);
    }
    document.getElementById('result2').innerHTML +=
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
