
'use strict';
var BpmnViewer = window.BpmnJS;
var viewer = new BpmnViewer({ container: '#canvas'});

var xhr = new XMLHttpRequest();
var dieXml;
xhr.onreadystatechange = function(){
  if(xhr.readyState === 4){
    viewer.importXML(xhr.response, function(err){
      dieXml = xhr.response;
      console.log(dieXml);
      if(!err){
        console.log('Erfolg!');
        viewer.get('canvas').zoom('fit-viewport');
      }else{
        console.log('Fehler', err)
      }
    });
  }
};

xhr.open('GET','/diagram.bpmn', true);
xhr.send(null);

//ZWEITE BPMN DIAGRAMM HOLEN
'use strict';
var BpmnViewer2 = window.BpmnJS;
var viewer2 = new BpmnViewer2({ container: '#canvas2'});

var xhr2 = new XMLHttpRequest();
var dieXml2;
xhr2.onreadystatechange = function(){
  if(xhr2.readyState === 4){
    viewer2.importXML(xhr2.response, function(err){
      dieXml2 = xhr2.response;
      console.log(dieXml2);
      if(!err){
        console.log('Erfolg!');
        viewer2.get('canvas2').zoom('fit-viewport');
      }else{
        console.log('Fehler', err)
      }
    });
  }
};

xhr2.open('GET','/B_01.bpmn', true);
xhr2.send(null);

//DRITTE BPMN DIAGRAMM HOLEN
'use strict';
var BpmnViewer3 = window.BpmnJS;
var viewer3 = new BpmnViewer2({ container: '#canvas3'});

var xhr3 = new XMLHttpRequest();
var dieXml3;
xhr3.onreadystatechange = function(){
  if(xhr3.readyState === 4){
    viewer3.importXML(xhr3.response, function(err){
      dieXml3 = xhr3.response;
      console.log(dieXml3);
      if(!err){
        console.log('Erfolg!');
        viewer3.get('canvas3').zoom('fit-viewport');
      }else{
        console.log('Fehler', err)
      }
    });
  }
};

xhr3.open('GET','/B_02.bpmn', true);
xhr3.send(null);

//Variable definieren um die Dreiecke zu setzen
var dreieckSetzen;
var dreieckSetzen2;
var dreieckSetzen3;
//HIER WIRD NACH DEM MODDELLIEREN DES BENUTZERS DIE FERTIGE XML DATEI GESPEICHERT
//Die Datei mit dem aktuellen Diagramm
var fertigeXmlDatei;
var fertigeXmlDatei2;
var fertigeXmlDatei3;
//Hier werden die Schlüsselwörter gespeichert
var dieKeyWords;
var valueDesKeywords = [];
//Hier sind die ganzen Bedrohungen etc drinne die vorgekommen sind
//Für Arbeitsablauf1
var bedrohungen = [];
var bedrohungenBeschreibung = [];
var risiken = [];
var risikenBeschreibung = [];
var maßnahmen = [];
var akteure = [];
//Für Arbeitsablauf2
var bedrohungen2 = [];
var bedrohungenBeschreibung2 = [];
var risiken2 = [];
var risikenBeschreibung2 = [];
var maßnahmen2 = [];
var akteure2 = [];
//Für Arbeitsablauf3
var bedrohungen3 = [];
var bedrohungenBeschreibung3 = [];
var risiken3 = [];
var risikenBeschreibung3 = [];
var maßnahmen3 = [];
var akteure3 = [];



function getLayers(){

  //Arrays Clearen bevor alles doppelt drin Besteht/////////////////////////////////////////////////////////////////////////////////////////////////////////
   bedrohungen.length = 0;
   bedrohungenBeschreibung.length = 0;
   risiken.length = 0;
   risikenBeschreibung.length = 0;
   maßnahmen.length = 0;
   akteure.length = 0;
  //Für Arbeitsablauf2
   bedrohungen2.length = 0;
   bedrohungenBeschreibung2.length = 0;
   risiken2.length = 0;
   risikenBeschreibung2.length = 0;
   maßnahmen2.length = 0;
   akteure2.length = 0;
  //Für Arbeitsablauf3
   bedrohungen3.length = 0;
   bedrohungenBeschreibung3.length = 0;
   risiken3.length = [];
   risikenBeschreibung3.length = 0;
   maßnahmen3.length = 0;
   akteure3.length = 0;



  //PROZESSE SPEICHERN///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  saveXML();

  //HIER WIRD DIE XML AUSGEWERTET UND GESCHAUT WELCHE TASK HABE ICH & FÜR WELCHE BRAUCHE ICH EIN DREIECK
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //DA WIR LEIDER DIE XML ALS STRING ABGESPEICHERT HABEN BRAUCHE ICH EINEN PARSER

  /////////////////////////FÜR DEN 1 ARBEITSABLAUF TASKS RAUSFINDEN//////////////////////////////////////////////////////////////////////////////////////////
    var parser = new DOMParser();
    var xmlDocument = parser.parseFromString(fertigeXmlDatei,"text/xml");
    var tagElements = xmlDocument.getElementsByTagName('task');
    console.log(tagElements);

    //JETZT AUF DIE TASK ZUGREIFEN UND NAMEN AUSLESEN
    var i;
    var tasks = [];
    for(i = 0; i < tagElements.length; i++){
      var taskName;
      taskName = tagElements[i].getAttribute('name');
      tasks[i] = taskName;
      taskName = '';
    }
    console.log(tasks);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // ////////////////////////FÜR DEN 2 ARBEITSABLAUF TASKS RAUSFINDEN///////////////////////////////////////////////////////////////////////////////////////
    var parser2 = new DOMParser();
    var xmlDocument2 = parser2.parseFromString(fertigeXmlDatei2,"text/xml");
    var tagElements2 = xmlDocument2.getElementsByTagName('task');
    console.log(tagElements2);

    //JETZT AUF DIE TASK ZUGREIFEN UND NAMEN AUSLESEN
    var i;
    var tasks2 = [];
    for(i = 0; i < tagElements2.length; i++){
      var taskName2;
      taskName2 = tagElements2[i].getAttribute('name');
      tasks2[i] = taskName2;
      taskName2 = '';
    }
    console.log(tasks2);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////FÜR DEN 3 ARBEITSABLAUF TASKS RAUSFINDEN///////////////////////////////////////////////////////////////////////////////////////
    var parser3 = new DOMParser();
    var xmlDocument3 = parser3.parseFromString(fertigeXmlDatei3,"text/xml");
    var tagElements3 = xmlDocument3.getElementsByTagName('task');
    console.log(tagElements3);

    //JETZT AUF DIE TASK ZUGREIFEN UND NAMEN AUSLESEN
    var i;
    var tasks3 = [];
    for(i = 0; i < tagElements3.length; i++){
      var taskName3;
      taskName3 = tagElements3[i].getAttribute('name');
      tasks3[i] = taskName3;
      taskName3 = '';
    }
    console.log(tasks3);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //SCHLÜSSELWORTER VON SERVER HOLEN UND IN DIEKEYWORDS SPEICHERN
    var xhr = new XMLHttpRequest();
    //var dieKeyWords;
    //var valueDesKeywords = [];
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){

        dieKeyWords = JSON.parse(xhr.response);
      //  console.log(dieKeyWords);
        //Jezt die Beschreibung aus dieKeyWords holen und den Wert in variable SPEICHERN
        //sollten mehrere später da sein mit For schleife durch das array itterieren **TO DOOO*
      //  console.log(dieKeyWords);
        valueDesKeywords = dieKeyWords;


            //JETZT MÜSSEN DIE SCHLÜSSELWÖRTER IN valueDesKeywords MIT DEN tasks VERGLICHEN WERDEN UND GESCHAUT WERDEN OB EINE BEDROHUNG Besteht
            //tasks
            //valueDesKeywords
            ///////////////////////////////////////HIER FÜR 1 ARBEITSABLAUF DURCHSUCHEN//////////////////////////////////////////////////////////////////////////////////////////////////
            var j;
            var k;
            for(j = 0; j < tasks.length; j++){
              for(k = 0; k < valueDesKeywords.length; k++){
                if(tasks[j] == valueDesKeywords[k].Keywörter){
                  console.log(tasks[j]);
                  //Jetzt ID von dieser Stelle HOLEN
                  var idDerTask;
                  idDerTask = tagElements[j].getAttribute('id');

                  dreieckSetzen = idDerTask;
                  console.log(dreieckSetzen);
                  //HIER JETZT DAS ERSTELLEN DES LAYERS
                  //um zu wissen welche stelle wir gerade sind definieren wir eine variable die anzeigt welche Stelle
                  var welcheStelle = k;
                  //Hier werden die variablen gesetzt und mit den Datenbankeinträgen befüllt
                  /*var bedrohungen = [];
                  var bedrohungenBeschreibung = [];
                  var risiken = [];
                  var risikenBeschreibung = [];
                  var maßnahmen = [];
                  var akteure = [];*/
                  bedrohungen.push(dieKeyWords[welcheStelle].Bedrohungen);
                  bedrohungenBeschreibung.push(dieKeyWords[welcheStelle].Bedrohung_beschreibung);
                  risiken.push(dieKeyWords[welcheStelle].Risiken);
                  risikenBeschreibung.push(dieKeyWords[welcheStelle].Risiken_beschreibung);
                  maßnahmen.push(dieKeyWords[welcheStelle].Maßnahmen);
                  akteure.push(dieKeyWords[welcheStelle].Akteure);

                  console.log(welcheStelle);
                  console.log(bedrohungen);
                  console.log(bedrohungenBeschreibung);
                  console.log(risiken);
                  console.log(risikenBeschreibung);
                  console.log(maßnahmen);
                  console.log(akteure);
                  var index = 0;
                  //hier war früher das pop up
                  var overlays = viewer.get('overlays');
                  var overlayHtml = $('<div><img src="images/ElectricDangerKlein.png" alt="" id= /></div>');
                  // attach the overlayHtml to a node
                  overlays.add(dreieckSetzen, {
                    position: {
                      bottom: 25,
                      right: 25,
                    },
                    html: overlayHtml

                  });
                  //dreieckSetzen variable wieder löschen damit sie beim nächsten durchlauf Leer ist
                  dreieckSetzen = '';
                }else{
                  console.log('Keine Übereinstimmung');
                }
              }
            }

            //////////////////////////////////ARBEITSABLAUF 2 ÜBERPRÜFEN UND LAYER LEGEN///////////////////////////////////////////////////////////////////////////////////////////
            var l;//j
            var m;//k
            for(l = 0; l < tasks2.length; l++){
              for(m = 0; m < valueDesKeywords.length; m++){
                if(tasks2[l] == valueDesKeywords[m].Keywörter){
                  console.log(tasks2[l]);
                  //Jetzt ID von dieser Stelle HOLEN
                  var idDerTask2;
                  idDerTask2 = tagElements2[l].getAttribute('id');

                  dreieckSetzen2 = idDerTask2;
                  console.log(dreieckSetzen2);
                  //HIER JETZT DAS ERSTELLEN DES LAYERS
                  //um zu wissen welche stelle wir gerade sind definieren wir eine variable die anzeigt welche Stelle
                  var welcheStelle2 = m;
                  //Hier werden die variablen gesetzt und mit den Datenbankeinträgen befüllt
                  /*var bedrohungen = [];
                  var bedrohungenBeschreibung = [];
                  var risiken = [];
                  var risikenBeschreibung = [];
                  var maßnahmen = [];
                  var akteure = [];*/
                  bedrohungen2.push(dieKeyWords[welcheStelle2].Bedrohungen);
                  bedrohungenBeschreibung2.push(dieKeyWords[welcheStelle2].Bedrohung_beschreibung);
                  risiken2.push(dieKeyWords[welcheStelle2].Risiken);
                  risikenBeschreibung2.push(dieKeyWords[welcheStelle2].Risiken_beschreibung);
                  maßnahmen2.push(dieKeyWords[welcheStelle2].Maßnahmen);
                  akteure2.push(dieKeyWords[welcheStelle2].Akteure);

                  console.log(welcheStelle2);
                  console.log(bedrohungen2);
                  console.log(bedrohungenBeschreibung2);
                  console.log(risiken2);
                  console.log(risikenBeschreibung2);
                  console.log(maßnahmen2);
                  console.log(akteure2);
                  var index = 0;
                  //hier war früher das pop up
                  var overlays2 = viewer2.get('overlays');
                  var overlayHtml2 = $('<div><img src="images/ElectricDangerKlein.png" alt="" id= /></div>');
                  // attach the overlayHtml to a node
                  overlays2.add(dreieckSetzen2, {
                    position: {
                      bottom: 25,
                      right: 25,
                    },
                    html: overlayHtml2

                  });
                  //dreieckSetzen variable wieder löschen damit sie beim nächsten durchlauf Leer ist
                  dreieckSetzen2 = '';
                }else{
                  console.log('Keine Übereinstimmung');
                }
              }
            }
            ////////////////////////////////////////////////////////ARBEITSABLAUF 3 ÜBERPRÜFEN///////////////////////////////////////////////////////////////////////////////////////////////

            var a;//j
            var b;//k
            for(a = 0; a < tasks3.length; a++){
              for(b = 0; b < valueDesKeywords.length; b++){
                if(tasks3[a] == valueDesKeywords[b].Keywörter){
                  console.log(tasks3[a]);
                  //Jetzt ID von dieser Stelle HOLEN
                  var idDerTask3;
                  idDerTask3 = tagElements3[a].getAttribute('id');

                  dreieckSetzen3 = idDerTask3;
                  console.log(dreieckSetzen3);
                  //HIER JETZT DAS ERSTELLEN DES LAYERS
                  //um zu wissen welche stelle wir gerade sind definieren wir eine variable die anzeigt welche Stelle
                  var welcheStelle3 = b;
                  //Hier werden die variablen gesetzt und mit den Datenbankeinträgen befüllt
                  /*var bedrohungen = [];
                  var bedrohungenBeschreibung = [];
                  var risiken = [];
                  var risikenBeschreibung = [];
                  var maßnahmen = [];
                  var akteure = [];*/
                  bedrohungen3.push(dieKeyWords[welcheStelle3].Bedrohungen);
                  bedrohungenBeschreibung3.push(dieKeyWords[welcheStelle3].Bedrohung_beschreibung);
                  risiken3.push(dieKeyWords[welcheStelle3].Risiken);
                  risikenBeschreibung3.push(dieKeyWords[welcheStelle3].Risiken_beschreibung);
                  maßnahmen3.push(dieKeyWords[welcheStelle3].Maßnahmen);
                  akteure3.push(dieKeyWords[welcheStelle3].Akteure);

                  console.log(welcheStelle3);
                  console.log(bedrohungen3);
                  console.log(bedrohungenBeschreibung3);
                  console.log(risiken3);
                  console.log(risikenBeschreibung3);
                  console.log(maßnahmen3);
                  console.log(akteure3);
                  var index = 0;
                  //hier war früher das pop up
                  var overlays3 = viewer3.get('overlays');
                  var overlayHtml3 = $('<div><img src="images/ElectricDangerKlein.png" alt="" id= /></div>');
                  // attach the overlayHtml to a node
                  overlays3.add(dreieckSetzen3, {
                    position: {
                      bottom: 25,
                      right: 25,
                    },
                    html: overlayHtml3

                  });
                  //dreieckSetzen variable wieder löschen damit sie beim nächsten durchlauf Leer ist
                  dreieckSetzen3 = '';
                }else{
                  console.log('Keine Übereinstimmung');
                }
              }
            }


      }
    };
    xhr.open('GET','/getKeyWords', true);
    xhr.send(null);

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function saveXML(){
  //Arbeitsablauf1 speichern
  viewer.moddle.toXML(viewer.definitions, {format: true},function (err,updatedXML){
    fertigeXmlDatei = updatedXML;
    console.log(fertigeXmlDatei);
    alertify.success('Areitsablauf 1 erfolgreich gespeichert');
  });
  //Arbeitsablauf2 SPEICHERN
  viewer2.moddle.toXML(viewer2.definitions, {format: true},function (err,updatedXML2){
    fertigeXmlDatei2 = updatedXML2;
    console.log(fertigeXmlDatei2);
    alertify.success('Areitsablauf 2 erfolgreich gespeichert');
  });
  //Arbeitsablauf3 SPEICHERN
  viewer3.moddle.toXML(viewer3.definitions, {format: true},function (err,updatedXML3){
    fertigeXmlDatei3 = updatedXML3;
    console.log(fertigeXmlDatei3);
    alertify.success('Areitsablauf 3 erfolgreich gespeichert');
  });

}

//FUNKTION UM DIE GEFUNDENEN BEDROHUNGEN ETC AUSZUGEBEN//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function gebeGefahrenAus(){
  // Pop-up Fenster.
  //Bedrohungen und Risiken werden durch Pop-up Fenster angezeigt.
  if(!alertify.errorAlert){
    //define a new errorAlert base on alert
    alertify.dialog('errorAlert',function factory(){
      return{
              build:function(){
                  var errorHeader = '<span class="fa fa-times-circle fa-2x" '
                  +    'style="vertical-align:middle;color:#e10000;">'
                  + '</span> Achtung! Bedrohungen gefunden';
                  this.setHeader(errorHeader);
              }
          };
      },true,'alert');

  }

  alertify.errorAlert('Arbeitsschritt: ' + ' ' + '<b style="color: black">' + " Standard Arbeitsablauf 1" + '</b>' + '</div>' +  '<br/><br/>' +
          "Bedrohung: " + bedrohungen + '<br/>' +
          "Bedrohungs-Beschreibung: " + bedrohungenBeschreibung + '<br/>' +
          "Risiken: " + risiken + '<br/>' +
          "Risiken-Beschreibung: " + risikenBeschreibung + '<br/>' +
          "Maßnahmen: " + maßnahmen + '<br/>' +
          "Akteure: " + akteure +
          '<br/><br/>' +

          'Arbeitsschritt: ' + ' ' + '<b style="color: black">' + " Standard Arbeitsablauf 2" + '</b>' + '</div>' +  '<br/><br/>' +
          "Bedrohung: " + bedrohungen2 + '<br/>' +
          "Bedrohungs-Beschreibung: " + bedrohungenBeschreibung2 + '<br/>' +
          "Risiken: " + risiken2 + '<br/>' +
          "<b2>Risiken-Beschreibung:</b2>" + risikenBeschreibung2 + '<br/>' +
          "Maßnahmen: " + maßnahmen2 + '<br/>' +
          "Akteure: " + akteure2 + '<br/>' +
          '<br/><br/>' +
          'Arbeitsschritt: ' + ' ' + '<b style="color: black">' + " Standard Arbeitsablauf 3" + '</b>' + '</div>' +  '<br/><br/>' +
          "Bedrohung: " + bedrohungen3 + '<br/>' +
          "Bedrohungs-Beschreibung: " + bedrohungenBeschreibung3 + '<br/>' +
          "Risiken: " + risiken3 + '<br/>' +
          "Risiken-Beschreibung: " + risikenBeschreibung3 + '<br/>' +
          "Maßnahmen: " + maßnahmen3 + '<br/>' +
          "Akteure: " + akteure3);
}



// Arbeitsabläufe können durch Button geöffnet werden//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){
  $("#show").click(function(){
      $("#canvas").toggle(1000);
  });
  });

  $(document).ready(function(){
    $("#show2").click(function(){
        $("#canvas2").toggle(1000);
    });
    });

    $(document).ready(function(){
      $("#show3").click(function(){
          $("#canvas3").toggle(1000);
      });
      });


/* Hilfestellung BPMN Tool
function hilfeBPMN(){
  window.open("images/hilfe.pdf");
}*/

function hilfeBPMN() {
var pre = document.createElement('pre');
//custom style.
pre.style.maxHeight = "400px";
pre.style.margin = "0";
pre.style.padding = "24px";
pre.style.whiteSpace = "pre-wrap";
pre.style.textAlign = "justify";
pre.appendChild(document.createTextNode((text)));
//show as confirm
alertify.confirm(pre, function(){
        alertify.success('Accepted');
    },function(){
        alertify.error('Declined');
    }).set({labels:{ok:'Accept', cancel: 'Decline'}, padding: false});
}



var text = document.write('<img src="https://comps.canstockphoto.com/java-green-round-button-stock-illustrations_csp50057757.jpg">');






/* Ein Bild wird dynamisch im Javascript erzeugt

  var divWrapper = document.getElementById('wrapper');
  var image = document.createElement('img');
  image.setAttribute('src', './images/papierkorb.png');
  image.src = './images/papierkorb.png'; // Alternative!
  divWrapper.appendChild(image);*/
