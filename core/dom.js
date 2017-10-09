core.dom = {};

core.dom.setElementTextById = function(id, text){
  var ele = document.getElementById(id);
  ele.innerHTML = text;
}

//Based loosely off of: https://stackoverflow.com/questions/17636528/how-do-i-load-an-html-page-in-a-div-using-javascript
core.dom.injectPage = function(id, url, callback){
  var ele = document.getElementById(id);
  request = new XMLHttpRequest();
  request.open("GET", url);
  request.send(null);
  request.onreadystatechange = function(){
    if(request.readyState == 4){
      ele.innerHTML = request.responseText;
      callback();
    }
  }
}

core.dom.processVisible = function(){
  var allElements = document.getElementsByTagName("*");

  for (var i = 0; i < allElements.length; i++) {
    var ele = allElements[i];
    var visAttr = ele.getAttribute("visible");
    if(visAttr){
      if(!eval(visAttr)){
        ele.style.display = "none";
      }
    }
  }
}
