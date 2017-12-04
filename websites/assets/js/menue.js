window.onload = function loadFrame() {
    setTimeout(function () {
        var postfach = document.getElementById("rotPostfach");
        var newsLetter = document.getElementById("rotNewsFeed");
        postfach.style.visibility="visible";
        newsLetter.style.visibility="visible";
    }, 10000);
};


function popUpMaßnahmeUmsetzen(){
  console.log("postfach");
  //Bedrohungen und Risiken werden durch Pop-up Fenster angezeigt.
  if(!alertify.errorAlert){
    //define a new errorAlert base on alert
    alertify.dialog('errorAlert',function factory(){
      return{
              build:function(){
                  var errorHeader = '<span class="fa fa-times-circle fa-2x" '
                  +    'style="vertical-align:middle;color:#e10000;">'
                  + '</span> Erinnerung! Maßnahmen ergreifen';
                  this.setHeader(errorHeader);
              }
          };
      },true,'alert');

  }
  alertify.errorAlert('hallo')

  document.getElementById('rotPostfach').style.visibility="hidden";

}

function popUpNewsFeed(){
  console.log("newsfeed");
  //Bedrohungen und Risiken werden durch Pop-up Fenster angezeigt.
  if(!alertify.errorAlert){
    //define a new errorAlert base on alert
    alertify.dialog('errorAlert',function factory(){
      return{
              build:function(){
                  var errorHeader2 = '<span class="fa fa-times-circle fa-2x" '
                  +    'style="vertical-align:middle;color:#e10000;">'
                  + '</span> Neue Bedrohung gefunden!';
                  this.setHeader(errorHeader2);
              }
          };
      },true,'alert');

  }
  alertify.errorAlert('hallo')

  document.getElementById('rotNewsFeed').style.visibility="hidden";

}
