window.onload = function loadFrame() {
    setTimeout(function () {
        var postfach = document.getElementById("rotPostfach");
        var newsLetter = document.getElementById("rotNewsFeed");
        postfach.style.visibility="visible";
        newsLetter.style.visibility="visible";
    }, 4000);
};


function popUpMaßnahmeUmsetzen(){
  console.log("postfach");
  //Bedrohungen und Risiken werden durch Pop-up Fenster angezeigt.
  alertify.alert('<font size="3">' + "Erinnerung: Maßnahmen ergreifen!" +
  '</font>',
  '<img style="margin: auto; display: block;" src="images/maßnahmeKlein.png" alt="" id= /> '+'<b style="color: black";font-size: inherit;>'+ '<br/>' +
  "Bitte ergreifen Sie die Maßnahmen aus dem letzten Report. Nur durch die Umsetzung geeigneter Maßnahmen sind Ihre Arbeitsabläufe sicher vor einer Bedrohung." +'</b>');


  document.getElementById('rotPostfach').style.visibility="hidden";

}

function popUpNewsFeed(){
  console.log("newsfeed");
  //Bedrohungen und Risiken werden durch Pop-up Fenster angezeigt.
  if(!alertify.errorAlert){
    console.log("newsfeed if");
    //define a new errorAlert base on alert
    alertify.dialog('errorAlert',function factory(){
      return{
              build:function(){
                  var errorHeader = '<span class="fa fa-times-circle fa-2x" '
                  +    'style="vertical-align:middle;color:#e10000;">'
                  + '</span> Achtung!';
                  this.setHeader(errorHeader);
              }
          };
      },true,'alert');

  }
  alertify.errorAlert('<font size="3">' + "Holzbranche: Neue Bedrohung identifiziert!" + '</font>' +'<br/><br/>' +
  "Es wurde eine neue Bedrohung identifiziert die Ihre Arbeitsabläufe gefährdet. Bitte ergreifen Sie schnellstmöglich folgende Maßnahmen" + '<br/>' +'<br/>' +
  '<img src="images/ElectricDangerKlein.png" alt="" id= /> '+'<b style="color: black">'+ "Bedrohung: " +'</b>'+ "MakeDamageInIndustrie4.0" + '<br/>' +'<br/>' +
  '<img src="images/beschreibungRichtigRichtig.png" alt="" id= /> '+'<b style="color: black">'+ "Beschreibung: "+'</b>' + "Diese Bedrohung greift in den Mailverkehr des Unternehmens ein und verändert die Maschinenconfiguration" + '<br/>' + '<br/>' +
  '<img src="images/maßnahmeKlein2.png" alt="" id= /> '+'<b style="color: black">'+ "Maßnahme: "+'</b>' + "Antivirus Software aktualisieren" + '<br/>'
);


  document.getElementById('rotNewsFeed').style.visibility="hidden";

}
