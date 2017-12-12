
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
var task = [];
var bedrohungen = [];
var bedrohungenBeschreibung = [];
var risiken = [];
var risikenBeschreibung = [];
var maßnahmen = [];
var akteure = [];
//Für Arbeitsablauf2
var task2 = [];
var bedrohungen2 = [];
var bedrohungenBeschreibung2 = [];
var risiken2 = [];
var risikenBeschreibung2 = [];
var maßnahmen2 = [];
var akteure2 = [];
//Für Arbeitsablauf3
var task3 = [];
var bedrohungen3 = [];
var bedrohungenBeschreibung3 = [];
var risiken3 = [];
var risikenBeschreibung3 = [];
var maßnahmen3 = [];
var akteure3 = [];



function getLayers(){
  localStorage.clear();

  //Arrays Clearen bevor alles doppelt drin Besteht/////////////////////////////////////////////////////////////////////////////////////////////////////////
   task.length = 0;
   bedrohungen.length = 0;
   bedrohungenBeschreibung.length = 0;
   risiken.length = 0;
   risikenBeschreibung.length = 0;
   maßnahmen.length = 0;
   akteure.length = 0;
  //Für Arbeitsablauf2
   task2.length = 0;
   bedrohungen2.length = 0;
   bedrohungenBeschreibung2.length = 0;
   risiken2.length = 0;
   risikenBeschreibung2.length = 0;
   maßnahmen2.length = 0;
   akteure2.length = 0;
  //Für Arbeitsablauf3
   task3.length = 0;
   bedrohungen3.length = 0;
   bedrohungenBeschreibung3.length = 0;
   risiken3.length = [];
   risikenBeschreibung3.length = 0;
   maßnahmen3.length = 0;
   akteure3.length = 0;

   //NACH PRIORITÄT FRAGEN///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  //PROZESSE SPEICHERN///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  saveXML();

  ///////////////////////////Button richtig anzeigen ///////////////////////////////////////////////////////////////////////////////////////////////////////
  var ergebnisseAusgebenButton = document.getElementById("ergebnisseAusgebenButton");
  ergebnisseAusgebenButton.style.visibility = "visible";

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
                  task.push(tasks[j]);
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
                      bottom: 30,
                      right: 35,
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
                  task2.push(tasks2[l]);
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
                  console.log(task);
                  var index = 0;
                  //hier war früher das pop up
                  var overlays2 = viewer2.get('overlays');
                  var overlayHtml2 = $('<div><img src="images/ElectricDangerKlein.png" alt="" id= /></div>');
                  // attach the overlayHtml to a node
                  overlays2.add(dreieckSetzen2, {
                    position: {
                      bottom: 30,
                      right: 35,
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
                  task3.push(tasks3[a]);
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
                      bottom: 30,
                      right: 35,
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
            localStorage.setItem("task", JSON.stringify(task));
            localStorage.setItem("bedrohungen", JSON.stringify(bedrohungen));
            localStorage.setItem("bedrohungenBeschreibung", JSON.stringify(bedrohungenBeschreibung));
            localStorage.setItem("risiken", JSON.stringify(risiken));
            localStorage.setItem("risikenBeschreibung", JSON.stringify(risikenBeschreibung));
            localStorage.setItem("maßnahmen", JSON.stringify(maßnahmen));
            localStorage.setItem("akteure", JSON.stringify(akteure));

            localStorage.setItem("task2", JSON.stringify(task2));
            localStorage.setItem("bedrohungen2", JSON.stringify(bedrohungen2));
            localStorage.setItem("bedrohungenBeschreibung2", JSON.stringify(bedrohungenBeschreibung2));
            localStorage.setItem("risiken2", JSON.stringify(risiken2));
            localStorage.setItem("risikenBeschreibung2", JSON.stringify(risikenBeschreibung2));
            localStorage.setItem("maßnahmen2", JSON.stringify(maßnahmen2));
            localStorage.setItem("akteure2", JSON.stringify(akteure2));

            localStorage.setItem("task3", JSON.stringify(task3));
            localStorage.setItem("bedrohungen3", JSON.stringify(bedrohungen3));
            localStorage.setItem("bedrohungenBeschreibung3", JSON.stringify(bedrohungenBeschreibung3));
            localStorage.setItem("risiken3", JSON.stringify(risiken3));
            localStorage.setItem("risikenBeschreibung3", JSON.stringify(risikenBeschreibung3));
            localStorage.setItem("maßnahmen3", JSON.stringify(maßnahmen3));
            localStorage.setItem("akteure3", JSON.stringify(akteure3));
            ///hier weiter


            //console.log(akteure);




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
    alertify.success('Arbeitsabläufe erfolgreich gespeichert & analysiert');
  });
  //Arbeitsablauf2 SPEICHERN
  viewer2.moddle.toXML(viewer2.definitions, {format: true},function (err,updatedXML2){
    fertigeXmlDatei2 = updatedXML2;
    console.log(fertigeXmlDatei2);

  });
  //Arbeitsablauf3 SPEICHERN
  viewer3.moddle.toXML(viewer3.definitions, {format: true},function (err,updatedXML3){
    fertigeXmlDatei3 = updatedXML3;
    console.log(fertigeXmlDatei3);

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

      console.log(task);

  }
  //////////////////////////////die bedrohungen1 splitten und die doppelten Werte rausnehmen//////////////////////////////////////////////////////////////////////////////////////
  console.log(bedrohungen);
  var dieBedrohungenString = bedrohungen.toString();
  console.log(dieBedrohungenString);
  var dieGetrenntenBedrohungenSplit = dieBedrohungenString.split('#');

  var dieGetrenntenBedrohungenSplitRichtig = dieGetrenntenBedrohungenSplit.toString().split(',');
  console.log(dieGetrenntenBedrohungenSplit);
  console.log(dieGetrenntenBedrohungenSplitRichtig);

  var uniqueBedrohungen = [];
  $.each(dieGetrenntenBedrohungenSplitRichtig, function(i, el){
    if($.inArray(el, uniqueBedrohungen) === -1) uniqueBedrohungen.push(el);
  });
  console.log(uniqueBedrohungen);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////die bedrohungenBeschreibung splitten und doppelte Werte rausnehmen/////////////////////////////////////////////////////////////////////////
  var dieBedrohungenBeschreibungString = bedrohungenBeschreibung.toString();
  var dieGetrenntenBedrohungenBeschreibungSplit = dieBedrohungenBeschreibungString.split('#');

  var uniqueBedrohungenBeschreibung = [];
  $.each(dieGetrenntenBedrohungenBeschreibungSplit, function(i, el){
    if($.inArray(el, uniqueBedrohungenBeschreibung) === -1) uniqueBedrohungenBeschreibung.push(el);
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////die bedrohungen2 splitten und die doppelten Werte rausnehmen//////////////////////////////////////////////////////////////////////////////////////

  var dieBedrohungenString2 = bedrohungen2.toString();
  var dieGetrenntenBedrohungenSplit2 = dieBedrohungenString2.split('#');

  var dieGetrenntenBedrohungenSplitRichtig2 = dieGetrenntenBedrohungenSplit2.toString().split(',');

  var uniqueBedrohungen2 = [];
  $.each(dieGetrenntenBedrohungenSplitRichtig2, function(i, el){
    if($.inArray(el, uniqueBedrohungen2) === -1) uniqueBedrohungen2.push(el);
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////die bedrohungenBeschreibung splitten und doppelte Werte rausnehmen/////////////////////////////////////////////////////////////////////////
  var dieBedrohungenBeschreibungString2 = bedrohungenBeschreibung2.toString();
  var dieGetrenntenBedrohungenBeschreibungSplit2 = dieBedrohungenBeschreibungString2.split('#');

  var uniqueBedrohungenBeschreibung2 = [];
  $.each(dieGetrenntenBedrohungenBeschreibungSplit2, function(i, el){
    if($.inArray(el, uniqueBedrohungenBeschreibung2) === -1) uniqueBedrohungenBeschreibung2.push(el);
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////die bedrohungen3 splitten und die doppelten Werte rausnehmen//////////////////////////////////////////////////////////////////////////////////////

  var dieBedrohungenString3 = bedrohungen3.toString();
  var dieGetrenntenBedrohungenSplit3 = dieBedrohungenString3.split('#');

  var dieGetrenntenBedrohungenSplitRichtig3 = dieGetrenntenBedrohungenSplit3.toString().split(',');

  var uniqueBedrohungen3 = [];
  $.each(dieGetrenntenBedrohungenSplitRichtig3, function(i, el){
    if($.inArray(el, uniqueBedrohungen3) === -1) uniqueBedrohungen3.push(el);
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////die bedrohungenBeschreibung3 splitten und doppelte Werte rausnehmen/////////////////////////////////////////////////////////////////////////
  var dieBedrohungenBeschreibungString3 = bedrohungenBeschreibung3.toString();
  var dieGetrenntenBedrohungenBeschreibungSplit3 = dieBedrohungenBeschreibungString3.split('#');

  var uniqueBedrohungenBeschreibung3 = [];
  $.each(dieGetrenntenBedrohungenBeschreibungSplit3, function(i, el){
    if($.inArray(el, uniqueBedrohungenBeschreibung3) === -1) uniqueBedrohungenBeschreibung3.push(el);
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  alertify.errorAlert('<font size="3">' + " Standard Arbeitsablauf: Versand" + '</font>' + '</div>' +  '<br/><br/>' +
          '<img src="images/ElectricDangerKlein.png" alt="" id= /> '+'<b style="color: black">'+ "Bedrohungen: " +'</b>'+ uniqueBedrohungen + '<br/>' +'<br/>' +
          '<img src="images/beschreibungRichtigRichtig.png" alt="" id= /> '+'<b style="color: black">'+ "Beschreibung: "+'</b>' + uniqueBedrohungenBeschreibung + '<br/>' + '<br/><br/><br/>' +
          '<font size="3">' + " Standard Arbeitsablauf: Produktion Holz" + '</font>' + '</div>' +  '<br/><br/>' +
          '<img src="images/ElectricDangerKlein.png" alt="" id= /> '+'<b style="color: black">'+ "Bedrohung: "+'</b>' + uniqueBedrohungen2 + '<br/>' +'<br/>' +
          '<img src="images/beschreibungRichtigRichtig.png" alt="" id= /> '+'<b style="color: black">'+ "Beschreibung: " +'</b>' + uniqueBedrohungenBeschreibung2 + '<br/>' +
          '<br/><br/><br/>' +
          '<font size="3">' + "Standard Arbeitsablauf: Produktentwicklung" + '</font>' + '</div>' +  '<br/><br/>' +
          '<img src="images/ElectricDangerKlein.png" alt="" id= /> '+'<b style="color: black">'+ "Bedrohung: "+'</b>' + uniqueBedrohungen3 + '<br/>' + '<br/>' +
          '<img src="images/beschreibungRichtigRichtig.png" alt="" id= /> '+'<b style="color: black">'+ "Beschreibung: " +'</b>' + uniqueBedrohungenBeschreibung3 + '<br/>')

          alertify.success('Report wurde erstellt und' +'</br>' +' kann im Menüpunkt:"Report" angesehen werden');
          reportAnzeigen();


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
///////////////////////////////////////////////////////////
$(document).ready(function(){
  $("#showGewichtung").click(function(){
      $("#hochGewichtung").toggle(1000);
      $("#mittelGewichtung").toggle(1000);
      $("#niedrigGewichtung").toggle(1000);
  });
});
$(document).ready(function(){
  $("#showGewichtung2").click(function(){
      $("#hochGewichtung2").toggle(1000);
      $("#mittelGewichtung2").toggle(1000);
      $("#niedrigGewichtung2").toggle(1000);
  });
});
$(document).ready(function(){
  $("#showGewichtung3").click(function(){
      $("#hochGewichtung3").toggle(1000);
      $("#mittelGewichtung3").toggle(1000);
      $("#niedrigGewichtung3").toggle(1000);
  });
});
$(document).ready(function(){
  $("#showGewichtungTask").click(function(){
      $("#gewichtungTaskTabelle").toggle(1000);
  });
});

////////////////////////////////////////////////////GEWICHTUNG KLICK FUNKTION EINS///////////////////////////////////////////////////////////////////////////////////
function hochAusgewählt1(){
  var hoch = document.getElementById('hochGewichtung');
  var mittel = document.getElementById('mittelGewichtung');
  var niedrig = document.getElementById('niedrigGewichtung');

  mittel.style.visibility = "hidden";
  niedrig.style.visibility = "hidden";
}
function mittelAusgewählt1(){
  var hoch = document.getElementById('hochGewichtung');
  var mittel = document.getElementById('mittelGewichtung');
  var niedrig = document.getElementById('niedrigGewichtung');

  hoch.style.visibility = "hidden";
  niedrig.style.visibility = "hidden";
}
function niedrigAusgewählt1(){
  var hoch = document.getElementById('hochGewichtung');
  var mittel = document.getElementById('mittelGewichtung');
  var niedrig = document.getElementById('niedrigGewichtung');

  mittel.style.visibility = "hidden";
  hoch.style.visibility = "hidden";
}
/////////////////////////////////////////////////////GEWICHTUNG KLICKEN ZWEI//////////////////////////////////////////////////////////////////////
function hochAusgewählt2(){
  var hoch = document.getElementById('hochGewichtung2');
  var mittel = document.getElementById('mittelGewichtung2');
  var niedrig = document.getElementById('niedrigGewichtung2');

  mittel.style.visibility = "hidden";
  niedrig.style.visibility = "hidden";
}
function mittelAusgewählt2(){
  var hoch = document.getElementById('hochGewichtung2');
  var mittel = document.getElementById('mittelGewichtung2');
  var niedrig = document.getElementById('niedrigGewichtung2');

  hoch.style.visibility = "hidden";
  niedrig.style.visibility = "hidden";
}
function niedrigAusgewählt2(){
  var hoch = document.getElementById('hochGewichtung2');
  var mittel = document.getElementById('mittelGewichtung2');
  var niedrig = document.getElementById('niedrigGewichtung2');

  mittel.style.visibility = "hidden";
  hoch.style.visibility = "hidden";
}
////////////////////////////////////////////////////////////////////////GEWICHTUNG KLICKEN DREI/////////////////////////////////////////
function hochAusgewählt3(){
  var hoch = document.getElementById('hochGewichtung3');
  var mittel = document.getElementById('mittelGewichtung3');
  var niedrig = document.getElementById('niedrigGewichtung3');

  mittel.style.visibility = "hidden";
  niedrig.style.visibility = "hidden";
}
function mittelAusgewählt3(){
  var hoch = document.getElementById('hochGewichtung3');
  var mittel = document.getElementById('mittelGewichtung3');
  var niedrig = document.getElementById('niedrigGewichtung3');

  hoch.style.visibility = "hidden";
  niedrig.style.visibility = "hidden";
}
function niedrigAusgewählt3(){
  var hoch = document.getElementById('hochGewichtung3');
  var mittel = document.getElementById('mittelGewichtung3');
  var niedrig = document.getElementById('niedrigGewichtung3');

  mittel.style.visibility = "hidden";
  hoch.style.visibility = "hidden";
}
// Hilfestellung BPMN Tool
function hilfeBPMN(){
  window.open("images/hilfe.pdf");
}



    /////////////////////////REPORT TABELLE ERSTELLEN//////////////////////////////////////////////////////////////////////////////////////////////////////////
    function erstelleReport(){
      var tabelle = document.getElementById('tabelle');

      var thUeberschrift = document.getElementById('dieUeberschrift');
      if(thUeberschrift != null){
        thUeberschrift.remove();
      }else{
        console.log("thUeberschrift war null");
      }

      while(tabelle.rows.length > 0){
        tabelle.deleteRow(0);
      }
      //tabelle.deleteTHead();
       //document.getElementById("tabelle").deleteTHead();

      var bedrohungenGezählt = 0;
      var risikenGezählt = 0;
      var maßnahmenGezählt= 0;
      var prioritätRotGezählt= 0;
      var prioritätGelbGezählt= 0;
      var prioritätGrünGezählt= 0;

      //Arbeitsablauf1 ///////////////////////////////////////
      var taskP = JSON.parse(localStorage.getItem("task"));
      var bedrohungenP = JSON.parse(localStorage.getItem("bedrohungen"));
      var bedrohungenBeschreibungP = JSON.parse(localStorage.getItem("bedrohungenBeschreibung"));
      var risikenP = JSON.parse(localStorage.getItem("risiken"));
      var risikenBeschreibungP = JSON.parse(localStorage.getItem("risikenBeschreibung"));
      var maßnahmenP = JSON.parse(localStorage.getItem("maßnahmen"));
      var akteureP = JSON.parse(localStorage.getItem("akteure"));

      var task2P = JSON.parse(localStorage.getItem("task2"));
      var bedrohungen2P = JSON.parse(localStorage.getItem("bedrohungen2"));
      var bedrohungenBeschreibung2P = JSON.parse(localStorage.getItem("bedrohungenBeschreibung2"));
      var risiken2P = JSON.parse(localStorage.getItem("risiken2"));
      var risikenBeschreibung2P = JSON.parse(localStorage.getItem("risikenBeschreibung2"));
      var maßnahmen2P = JSON.parse(localStorage.getItem("maßnahmen2"));
      var akteure2P = JSON.parse(localStorage.getItem("akteure2"));

      var task3P = JSON.parse(localStorage.getItem("task3"));
      var bedrohungen3P = JSON.parse(localStorage.getItem("bedrohungen3"));
      var bedrohungenBeschreibung3P = JSON.parse(localStorage.getItem("bedrohungenBeschreibung3"));
      var risiken3P = JSON.parse(localStorage.getItem("risiken3"));
      var risikenBeschreibung3P = JSON.parse(localStorage.getItem("risikenBeschreibung3"));
      var maßnahmen3P = JSON.parse(localStorage.getItem("maßnahmen3"));
      var akteure3P = JSON.parse(localStorage.getItem("akteure3"));

      //TABELLE ERSTELLT
      //var tabelle = document.getElementById('tabelle');
      tabelle.style.border = "solid";
      tabelle.style.fontFamily = "Raleway, Helvetica, sans-serif";

      var tabellenUeberschrift = document.createElement("TH")
      var d = new Date();
      d.setUTCFullYear(2017);
      d.setUTCMonth(11);
      d.setUTCDate(19);
      tabellenUeberschrift.innerHTML = "Report vom" + " "+ d.toLocaleDateString() ;
      tabellenUeberschrift.style.textAlign = "center";
      tabellenUeberschrift.style.border = "solid";
      tabellenUeberschrift.colSpan = 6;
      tabellenUeberschrift.id = "dieUeberschrift";


      tabelle.appendChild(tabellenUeberschrift);
      //////BILANZ NEU ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      var bilanzUeberschrift = document.createElement("TR");
      var s4 = document.createElement("TD");
      s4.innerHTML = "Zusammenfassung";
      s4.colSpan = 6;
      s4.style.backgroundColor = "rgb(83, 99, 142)";

      bilanzUeberschrift.appendChild(s4);
      bilanzUeberschrift.style.border = "solid";
      bilanzUeberschrift.style.textAlign = "center";
      tabelle.appendChild(bilanzUeberschrift);

      ///////jetzt BILANZÜBERSCHRIFTEN/////////////////////////////////////////////////////////////////////////////////

      //////NEUE ZEILE////////////////////////////////////////////////////////////////////////////////////////
      var bilanzZeile2 = document.createElement("TR");
      var untersuchteArbeitsabläufeSpalteUeberschrift = document.createElement("TD");
      var untersuchteArbeitsabläufeSpalteZahl = document.createElement("TD");

      untersuchteArbeitsabläufeSpalteUeberschrift.innerHTML = "Untersuchte Arbeitsabläufe";
      untersuchteArbeitsabläufeSpalteUeberschrift.colSpan = 3;

      untersuchteArbeitsabläufeSpalteUeberschrift.style.border = "solid";

      untersuchteArbeitsabläufeSpalteZahl.innerHTML = "3";
      untersuchteArbeitsabläufeSpalteZahl.colSpan = 3;
      untersuchteArbeitsabläufeSpalteZahl.style.border = "solid";

      bilanzZeile2.appendChild(untersuchteArbeitsabläufeSpalteUeberschrift);
      bilanzZeile2.appendChild(untersuchteArbeitsabläufeSpalteZahl);

      tabelle.appendChild(bilanzZeile2);

      /////////////////NEUE ZEILE///////////////////////////////////////////////////////////////////////////////
      var bilanzZeile3 = document.createElement("TR");
      var gefundeneBedrohungenSpalteUeberschrift = document.createElement("TD");
      var gefundeneBedrohungenSpalteZahl = document.createElement("TD");

      gefundeneBedrohungenSpalteUeberschrift.innerHTML = "Gefundene Bedrohungen";
      gefundeneBedrohungenSpalteUeberschrift.colSpan = 3;

      gefundeneBedrohungenSpalteUeberschrift.style.border = "solid";

      //gefundeneBedrohungenSpalteZahl.innerHTML = bedrohungenGezählt;
      gefundeneBedrohungenSpalteZahl.colSpan = 3;
      gefundeneBedrohungenSpalteZahl.style.border = "solid";

      bilanzZeile3.appendChild(gefundeneBedrohungenSpalteUeberschrift);
      bilanzZeile3.appendChild(gefundeneBedrohungenSpalteZahl);

      tabelle.appendChild(bilanzZeile3);

      /////////////////NEUE ZEILE///////////////////////////////////////////////////////////////////////////////
      var bilanzZeile4 = document.createElement("TR");
      var gefundeneRisikenSpalteUeberschrift = document.createElement("TD");
      var gefundeneRisikenSpalteZahl = document.createElement("TD");

      gefundeneRisikenSpalteUeberschrift.innerHTML = "Gefundene Risiken";
      gefundeneRisikenSpalteUeberschrift.colSpan = 3;

      gefundeneRisikenSpalteUeberschrift.style.border = "solid";

      //gefundeneRisikenSpalteZahl.innerHTML = risikenGezählt;
      gefundeneRisikenSpalteZahl.colSpan = 3;
      gefundeneRisikenSpalteZahl.style.border = "solid";

      bilanzZeile4.appendChild(gefundeneRisikenSpalteUeberschrift);
      bilanzZeile4.appendChild(gefundeneRisikenSpalteZahl);

      tabelle.appendChild(bilanzZeile4);

      /////////////////NEUE ZEILE///////////////////////////////////////////////////////////////////////////////
      var bilanzZeile5 = document.createElement("TR");
      var ermittelteMaßnahmenSpalteUeberschrift = document.createElement("TD");
      var ermittelteMaßnahmenSpalteZahl = document.createElement("TD");

      ermittelteMaßnahmenSpalteUeberschrift.innerHTML = "Ermittelte Maßnahmen";
      ermittelteMaßnahmenSpalteUeberschrift.colSpan = 3;

      ermittelteMaßnahmenSpalteUeberschrift.style.border = "solid";

      //ermittelteMaßnahmenSpalteZahl.innerHTML = maßnahmenGezählt;
      ermittelteMaßnahmenSpalteZahl.colSpan = 3;
      ermittelteMaßnahmenSpalteZahl.style.border = "solid";

      bilanzZeile5.appendChild(ermittelteMaßnahmenSpalteUeberschrift);
      bilanzZeile5.appendChild(ermittelteMaßnahmenSpalteZahl);

      tabelle.appendChild(bilanzZeile5);

      /////////////////NEUE ZEILE//////////////////////////////////////////////////////////////////////////////
      var bilanzZeile6 = document.createElement("TR");
      var prioritätenSpaltenUeberschrift = document.createElement("TD");
      var prioritätenSpaltenZahl = document.createElement("TD");

      prioritätenSpaltenUeberschrift.innerHTML = "Umsetzungsempfehlung";
      prioritätenSpaltenUeberschrift.colSpan = 3;
      prioritätenSpaltenUeberschrift.style.border = "solid";

      prioritätenSpaltenZahl.colSpan = 3;
      prioritätenSpaltenZahl.style.border = "solid";

      var prioritätenZeileRot = document.createElement("TR");
      var prioritätenZeileGelb = document.createElement("TR");
      var prioritätenZeileGrün = document.createElement("TR");
      /*
      prioritätenZeileRot.innerHTML = prioritätRotGezählt + " "+"Hohe Prioritäten";
      prioritätenZeileGelb.innerHTML = prioritätGelbGezählt+ " "+"Mittlere Prioritäten";
      prioritätenZeileGrün.innerHTML = prioritätGrünGezählt+ " "+"Niedrige Prioritäten";*/

      prioritätenZeileRot.style.textAlign = "center";
      prioritätenZeileRot.style.backgroundColor = "red";


      prioritätenZeileGelb.style.textAlign = "center";
      prioritätenZeileGelb.style.backgroundColor = "#a9a905";

      prioritätenZeileGrün.style.textAlign = "center";
      prioritätenZeileGrün.style.backgroundColor = "green";

      prioritätenSpaltenZahl.appendChild(prioritätenZeileRot);
      prioritätenSpaltenZahl.appendChild(prioritätenZeileGelb);
      prioritätenSpaltenZahl.appendChild(prioritätenZeileGrün);

      bilanzZeile6.appendChild(prioritätenSpaltenUeberschrift);
      bilanzZeile6.appendChild(prioritätenSpaltenZahl);

      tabelle.appendChild(bilanzZeile6);
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      var ueberschriftArbeitsablauf1 = document.createElement("TR");
      var s1 = document.createElement("TD");
      s1.innerHTML = "Standard Arbeitsablauf: Versand";
      s1.colSpan = 6;
      s1.style.backgroundColor = "rgb(83, 99, 142)";

      ueberschriftArbeitsablauf1.appendChild(s1);
      ueberschriftArbeitsablauf1.style.border = "solid";



      tabelle.appendChild(ueberschriftArbeitsablauf1);

      var zeileFuerUeberschriften = document.createElement("TR");
      zeileFuerUeberschriften.style.backgroundColor = "rgb(83, 99, 142)"

      var taskUeberschrift = document.createElement("TD");
      taskUeberschrift.innerHTML = "Arbeitsschritt";
      taskUeberschrift.style.border = "solid";
      taskUeberschrift.style.textAlign = "center"

      var bedrohungenUeberschrift = document.createElement("TD");
      bedrohungenUeberschrift.innerHTML = "Bedrohungen";
      bedrohungenUeberschrift.style.border = "solid";
      bedrohungenUeberschrift.style.textAlign = "center"

      var risikenUeberschrift = document.createElement("TD");
      risikenUeberschrift.innerHTML = "Risiken";
      risikenUeberschrift.style.border = "solid";
      risikenUeberschrift.style.textAlign = "center"

      var maßnahmenUeberschrift = document.createElement("TD");
      maßnahmenUeberschrift.innerHTML = "Maßnahmen";
      maßnahmenUeberschrift.style.border = "solid";
      maßnahmenUeberschrift.style.textAlign = "center"

      var prioritaetenUeberschrift = document.createElement("TD");
      prioritaetenUeberschrift.innerHTML = "Priorität";
      prioritaetenUeberschrift.style.border = "solid";
      prioritaetenUeberschrift.style.textAlign = "center"

      zeileFuerUeberschriften.appendChild(taskUeberschrift);
      zeileFuerUeberschriften.appendChild(bedrohungenUeberschrift);
      zeileFuerUeberschriften.appendChild(risikenUeberschrift);
      zeileFuerUeberschriften.appendChild(maßnahmenUeberschrift);
      zeileFuerUeberschriften.appendChild(prioritaetenUeberschrift);

      tabelle.appendChild(zeileFuerUeberschriften);

      /*console.log(taskP);
      console.log(bedrohungenP);
      console.log(risikenP);
      console.log(maßnahmenP);
      console.log(akteureP);
      console.log(task2P);
      console.log(bedrohungen2P);
      console.log(risiken2P);
      console.log(maßnahmen2P);
      console.log(akteure2P);
      console.log(task3P);
      console.log(bedrohungen3P);
      console.log(risiken3P);
      console.log(maßnahmen3P);
      console.log(akteure3P);*/


      var index;
      for(index = 0; index < taskP.length; index++){

        var zeile = document.createElement("TR");

        var spalte1 = document.createElement("TD");
        var spalte2 = document.createElement("TD");
        var spalte3 = document.createElement("TD");
        var spalte4 = document.createElement("TD");
        var spalte5 = document.createElement("TD");

        zeile.appendChild(spalte1);
        zeile.appendChild(spalte2);
        zeile.appendChild(spalte3);
        zeile.appendChild(spalte4);
        zeile.appendChild(spalte5);

        tabelle.appendChild(zeile);

        spalte1.innerHTML = taskP[index];
        console.log(taskP[index]);

        var dieBedrohungen = bedrohungenP[index].toString();
        var dieGetrenntenBedrohungen = dieBedrohungen.split('#');
        var i;
        for(i = 0; i < dieGetrenntenBedrohungen.length; i++){
          var zeile = document.createElement("TR");
          var ul = document.createElement("UL");
          var li = document.createElement("LI");
          li.innerHTML = dieGetrenntenBedrohungen[i];
          ul.appendChild(li);
          zeile.appendChild(ul);
          spalte2.appendChild(zeile);

        }

        //spalte2.innerHTML = bedrohungenP[index];

        var dieRisiken = risikenP[index].toString();
        var dieGetrenntenRisiken = dieRisiken.split('#');
        var j;
        for(j = 0; j < dieGetrenntenRisiken.length; j++){
          var zeile = document.createElement("TR");
          var ul = document.createElement("UL");
          var li = document.createElement("LI");
          li.innerHTML = dieGetrenntenRisiken[j];
          ul.appendChild(li);
          zeile.appendChild(ul);
          spalte3.appendChild(zeile);
        }
        //spalte3.innerHTML = risikenP[index];

        var dieMaßnahmen = maßnahmenP[index].toString();
        var dieGetrenntenMaßnahmen = dieMaßnahmen.split('#');
        var k;
        for(k = 0; k < dieGetrenntenMaßnahmen.length; k++){
          var zeile = document.createElement("TR");
          var ul = document.createElement("UL");
          var li = document.createElement("LI");
          li.innerHTML = dieGetrenntenMaßnahmen[k];
          ul.appendChild(li);
          zeile.appendChild(ul);
          spalte4.appendChild(zeile);
        }
      //  spalte4.innerHTML = maßnahmenP[index];
        //console.log(dieGetrenntenRisiken.length);
        risikenGezählt += dieGetrenntenRisiken.length;
        maßnahmenGezählt += dieGetrenntenMaßnahmen.length;
        bedrohungenGezählt += dieGetrenntenBedrohungen.length;


        if(akteureP[index] == 0){
          spalte5.style.backgroundColor = "green";
          //spalte5.style.color = "green";
          spalte5.style.border = "solid";
          prioritätGrünGezählt += 1;
        }else if(akteureP[index] == 1){
          spalte5.style.backgroundColor = "yellow";
          //spalte5.style.color = "yellow";
          spalte5.style.border = "solid";
          prioritätGelbGezählt += 1;
        }else{
          spalte5.style.backgroundColor = "red";
          //spalte5.style.color = "red";
          spalte5.style.border = "solid";
          prioritätRotGezählt += 1;
        }
        spalte1.style.border = "solid";
        spalte2.style.border = "solid";
        spalte3.style.border = "solid";
        spalte4.style.border = "solid";
      }






      //JETZT ALLES FÜR DEN NÄCHSTEN GESCHÄFTSPROZESS/////////////////////////////////////////////////////////////////////////////////77

      var ueberschriftArbeitsablauf2 = document.createElement("TR");
      var s2 = document.createElement("TD");
      s2.innerHTML = "Standard Arbeitsablauf: Produktion Holz";
      s2.colSpan = 6;
      s2.style.backgroundColor = "rgb(83, 99, 142)";

      ueberschriftArbeitsablauf2.appendChild(s2);
      ueberschriftArbeitsablauf2.style.border = "solid";



      tabelle.appendChild(ueberschriftArbeitsablauf2);

      var zeileFuerUeberschriften2 = document.createElement("TR");
      zeileFuerUeberschriften2.style.backgroundColor = "rgb(83, 99, 142)"

      var taskUeberschrift2 = document.createElement("TD");
      taskUeberschrift2.innerHTML = "Arbeitsschritt";
      taskUeberschrift2.style.border = "solid";
      taskUeberschrift2.style.textAlign = "center"

      var bedrohungenUeberschrift2 = document.createElement("TD");
      bedrohungenUeberschrift2.innerHTML = "Bedrohungen";
      bedrohungenUeberschrift2.style.border = "solid";
      bedrohungenUeberschrift2.style.textAlign = "center"

      var risikenUeberschrift2 = document.createElement("TD");
      risikenUeberschrift2.innerHTML = "Risiken";
      risikenUeberschrift2.style.border = "solid";
      risikenUeberschrift2.style.textAlign = "center"

      var maßnahmenUeberschrift2 = document.createElement("TD");
      maßnahmenUeberschrift2.innerHTML = "Maßnahmen";
      maßnahmenUeberschrift2.style.border = "solid";
      maßnahmenUeberschrift2.style.textAlign = "center"

      var prioritaetenUeberschrift2 = document.createElement("TD");
      prioritaetenUeberschrift2.innerHTML = "Priorität";
      prioritaetenUeberschrift2.style.border = "solid";
      prioritaetenUeberschrift2.style.textAlign = "center"

      zeileFuerUeberschriften2.appendChild(taskUeberschrift2);
      zeileFuerUeberschriften2.appendChild(bedrohungenUeberschrift2);
      zeileFuerUeberschriften2.appendChild(risikenUeberschrift2);
      zeileFuerUeberschriften2.appendChild(maßnahmenUeberschrift2);
      zeileFuerUeberschriften2.appendChild(prioritaetenUeberschrift2);

      tabelle.appendChild(zeileFuerUeberschriften2);

      //////////////////////////////////////////////////
      var index2;
      for(index2 = 0; index2 < task2P.length; index2++){

        var zeile = document.createElement("TR");

        var spalte1 = document.createElement("TD");
        var spalte2 = document.createElement("TD");
        var spalte3 = document.createElement("TD");
        var spalte4 = document.createElement("TD");
        var spalte5 = document.createElement("TD");

        zeile.appendChild(spalte1);
        zeile.appendChild(spalte2);
        zeile.appendChild(spalte3);
        zeile.appendChild(spalte4);
        zeile.appendChild(spalte5);

        tabelle.appendChild(zeile);

        spalte1.innerHTML = task2P[index2];

        var dieBedrohungen2 = bedrohungen2P[index2].toString();
        var dieGetrenntenBedrohungen2 = dieBedrohungen2.split('#');
        var i2;
        for(i2 = 0; i2 < dieGetrenntenBedrohungen2.length; i2++){
          var zeile = document.createElement("TR");
          var ul = document.createElement("UL");
          var li = document.createElement("LI");
          li.innerHTML = dieGetrenntenBedrohungen2[i2];
          ul.appendChild(li);
          zeile.appendChild(ul);
          spalte2.appendChild(zeile);
        }

        //spalte2.innerHTML = bedrohungenP[index];

        var dieRisiken2 = risiken2P[index2].toString();
        var dieGetrenntenRisiken2 = dieRisiken2.split('#');
        var j2;
        for(j2 = 0; j2 < dieGetrenntenRisiken2.length; j2++){
          var zeile = document.createElement("TR");
          var ul = document.createElement("UL");
          var li = document.createElement("LI");
          li.innerHTML = dieGetrenntenRisiken2[j2];
          ul.appendChild(li);
          zeile.appendChild(ul);
          spalte3.appendChild(zeile);
        }
        //spalte3.innerHTML = risikenP[index];

        var dieMaßnahmen2 = maßnahmen2P[index2].toString();
        var dieGetrenntenMaßnahmen2 = dieMaßnahmen2.split('#');
        var k2;
        for(k2 = 0; k2 < dieGetrenntenMaßnahmen2.length; k2++){
          var zeile = document.createElement("TR");
          var ul = document.createElement("UL");
          var li = document.createElement("LI");
          li.innerHTML = dieGetrenntenMaßnahmen2[k2];
          ul.appendChild(li);
          zeile.appendChild(ul);
          spalte4.appendChild(zeile);
        }
      //  spalte4.innerHTML = maßnahmenP[index];
      //console.log(dieGetrenntenRisiken2.length);
        risikenGezählt += dieGetrenntenRisiken2.length;
        maßnahmenGezählt += dieGetrenntenMaßnahmen2.length;
        bedrohungenGezählt += dieGetrenntenBedrohungen2.length;


        if(akteure2P[index2] == 0){
          spalte5.style.backgroundColor = "green";
          //spalte5.style.color = "green";
          spalte5.style.border = "solid";
          prioritätGrünGezählt += 1;
        }else if(akteure2P[index2] += 1){
          spalte5.style.backgroundColor = "yellow";
          //spalte5.style.color = "yellow";
          spalte5.style.border = "solid";
          prioritätGelbGezählt += 1;
        }else{
          spalte5.style.backgroundColor = "red";
          //spalte5.style.color = "red";
          spalte5.style.border = "solid";
          prioritätRotGezählt += 1;
        }
        spalte1.style.border = "solid";
        spalte2.style.border = "solid";
        spalte3.style.border = "solid";
        spalte4.style.border = "solid";

        }


    //JETZT ALLES FÜR DEN NÄCHSTEN GESCHÄFTSPROZESS/////////////////////////////////////////////////////////////////////////////////77

    var ueberschriftArbeitsablauf3 = document.createElement("TR");
    var s3 = document.createElement("TD");
    s3.innerHTML = "Standard Arbeitsablauf: Produktentwicklung";
    s3.colSpan = 6;
    s3.style.backgroundColor = "rgb(83, 99, 142)";

    ueberschriftArbeitsablauf3.appendChild(s3);
    ueberschriftArbeitsablauf3.style.border = "solid";



    tabelle.appendChild(ueberschriftArbeitsablauf3);

    var zeileFuerUeberschriften3 = document.createElement("TR");
    zeileFuerUeberschriften3.style.backgroundColor = "rgb(83, 99, 142)"

    var taskUeberschrift3 = document.createElement("TD");
    taskUeberschrift3.innerHTML = "Arbeitsschritt";
    taskUeberschrift3.style.border = "solid";
    taskUeberschrift3.style.textAlign = "center"

    var bedrohungenUeberschrift3 = document.createElement("TD");
    bedrohungenUeberschrift3.innerHTML = "Bedrohungen";
    bedrohungenUeberschrift3.style.border = "solid";
    bedrohungenUeberschrift3.style.textAlign = "center"

    var risikenUeberschrift3 = document.createElement("TD");
    risikenUeberschrift3.innerHTML = "Risiken";
    risikenUeberschrift3.style.border = "solid";
    risikenUeberschrift3.style.textAlign = "center"

    var maßnahmenUeberschrift3 = document.createElement("TD");
    maßnahmenUeberschrift3.innerHTML = "Maßnahmen";
    maßnahmenUeberschrift3.style.border = "solid";
    maßnahmenUeberschrift3.style.textAlign = "center"

    var prioritaetenUeberschrift3 = document.createElement("TD");
    prioritaetenUeberschrift3.innerHTML = "Priorität";
    prioritaetenUeberschrift3.style.border = "solid";
    prioritaetenUeberschrift3.style.textAlign = "center";

    zeileFuerUeberschriften3.appendChild(taskUeberschrift3);
    zeileFuerUeberschriften3.appendChild(bedrohungenUeberschrift3);
    zeileFuerUeberschriften3.appendChild(risikenUeberschrift3);
    zeileFuerUeberschriften3.appendChild(maßnahmenUeberschrift3);
    zeileFuerUeberschriften3.appendChild(prioritaetenUeberschrift3);

    tabelle.appendChild(zeileFuerUeberschriften3);
    ////////////////////////////////////////////////////////////////////////////////////////////
    var index3;
    for(index3 = 0; index3 < task3P.length; index3++){

      var zeile = document.createElement("TR");

      var spalte1 = document.createElement("TD");
      var spalte2 = document.createElement("TD");
      var spalte3 = document.createElement("TD");
      var spalte4 = document.createElement("TD");
      var spalte5 = document.createElement("TD");

      zeile.appendChild(spalte1);
      zeile.appendChild(spalte2);
      zeile.appendChild(spalte3);
      zeile.appendChild(spalte4);
      zeile.appendChild(spalte5);

      tabelle.appendChild(zeile);

      spalte1.innerHTML = task3P[index3];

      var dieBedrohungen3 = bedrohungen3P[index3].toString();
      var dieGetrenntenBedrohungen3 = dieBedrohungen3.split('#');
      var i3;
      for(i3 = 0; i3 < dieGetrenntenBedrohungen3.length; i3++){
        var zeile = document.createElement("TR");
        var ul = document.createElement("UL");
        var li = document.createElement("LI");
        li.innerHTML = dieGetrenntenBedrohungen3[i3];
        ul.appendChild(li);
        zeile.appendChild(ul);
        spalte2.appendChild(zeile);
      }

      //spalte2.innerHTML = bedrohungenP[index];

      var dieRisiken3 = risiken3P[index3].toString();
      var dieGetrenntenRisiken3 = dieRisiken3.split('#');
      var j3;
      for(j3 = 0; j3 < dieGetrenntenRisiken3.length; j3++){
        var zeile = document.createElement("TR");
        var ul = document.createElement("UL");
        var li = document.createElement("LI");
        li.innerHTML = dieGetrenntenRisiken3[j3];
        ul.appendChild(li);
        zeile.appendChild(ul);
        spalte3.appendChild(zeile);
      }
      //spalte3.innerHTML = risikenP[index];

      var dieMaßnahmen3 = maßnahmen3P[index3].toString();
      var dieGetrenntenMaßnahmen3 = dieMaßnahmen3.split('#');
      var k3;
      for(k3 = 0; k3 < dieGetrenntenMaßnahmen3.length; k3++){
        var zeile = document.createElement("TR");
        var ul = document.createElement("UL");
        var li = document.createElement("LI");
        li.innerHTML = dieGetrenntenMaßnahmen3[k3];
        ul.appendChild(li);
        zeile.appendChild(ul);
        spalte4.appendChild(zeile);
      }
    //  spalte4.innerHTML = maßnahmenP[index];
    //console.log(dieGetrenntenRisiken3.length);
      risikenGezählt += dieGetrenntenRisiken3.length;
      maßnahmenGezählt += dieGetrenntenMaßnahmen3.length;
      bedrohungenGezählt += dieGetrenntenBedrohungen3.length;


      if(akteure3P[index3] == 0){
        spalte5.style.backgroundColor = "green";
        //spalte5.style.color = "green";
        spalte5.style.border = "solid";
        prioritätGrünGezählt += 1;
      }else if(akteure3P[index3] == 1){
        spalte5.style.backgroundColor = "yellow";
        //spalte5.style.color = "yellow";
        spalte5.style.border = "solid";
        prioritätGelbGezählt += 1;
      }else{
        spalte5.style.backgroundColor = "red";
        //spalte5.style.color = "red";
        spalte5.style.border = "solid";
        prioritätRotGezählt += 1;
      }
      spalte1.style.border = "solid";
      spalte2.style.border = "solid";
      spalte3.style.border = "solid";
      spalte4.style.border = "solid";

      }
      //////////////////////////////////////////////////////BILANZ///////////////////////////////////////
      prioritätenZeileRot.innerHTML = prioritätRotGezählt + " "+"Hohe Prioritäten";
      prioritätenZeileGelb.innerHTML = prioritätGelbGezählt+ " "+"Mittlere Prioritäten";
      prioritätenZeileGrün.innerHTML = prioritätGrünGezählt+ " "+"Niedrige Prioritäten";

      ermittelteMaßnahmenSpalteZahl.innerHTML = maßnahmenGezählt;
      gefundeneRisikenSpalteZahl.innerHTML = risikenGezählt;
      gefundeneBedrohungenSpalteZahl.innerHTML = bedrohungenGezählt;

      console.log(risikenGezählt);
      console.log(maßnahmenGezählt);
      console.log(bedrohungenGezählt);
      console.log(prioritätRotGezählt);
      console.log(prioritätGelbGezählt);
      console.log(prioritätGrünGezählt);



  }

  // Hier wird ein Notification für das Button "TAN Generieren" ausgegeben
  function popUp() {
    alertify.success('TAN wurde per SMS geschickt');
  }
//FUNKTION KANN NICHT HERUNTERGELADEN werden
function kannNichtHeruntergeladenWerden() {
  alertify.error('Wartungsarbeiten! Report kann gerade nicht heruntergeladen werden.');
}






////
//////
////////////REPORT VOM 19.11.2017 erstellen/////////////////////////////////////////////////////////////////////////////////////////////////////////////7
function erstelleReportZwei(){
  var tabelle = document.getElementById('tabelle');

  var thUeberschrift = document.getElementById('dieUeberschrift');
  if(thUeberschrift != null){
    thUeberschrift.remove();
  }else{
    console.log("thUeberschrift war null");
  }

  while(tabelle.rows.length > 0){
    tabelle.deleteRow(0);
  }
  //tabelle.deleteTHead();
   //document.getElementById("tabelle").deleteTHead();

  var bedrohungenGezählt = 0;
  var risikenGezählt = 0;
  var maßnahmenGezählt= 0;
  var prioritätRotGezählt= 0;
  var prioritätGelbGezählt= 0;
  var prioritätGrünGezählt= 0;

  //Arbeitsablauf1 ///////////////////////////////////////
  var taskP = JSON.parse(localStorage.getItem("task"));
  var bedrohungenP = JSON.parse(localStorage.getItem("bedrohungen"));
  var bedrohungenBeschreibungP = JSON.parse(localStorage.getItem("bedrohungenBeschreibung"));
  var risikenP = JSON.parse(localStorage.getItem("risiken"));
  var risikenBeschreibungP = JSON.parse(localStorage.getItem("risikenBeschreibung"));
  var maßnahmenP = JSON.parse(localStorage.getItem("maßnahmen"));
  var akteureP = JSON.parse(localStorage.getItem("akteure"));

  var task2P = JSON.parse(localStorage.getItem("task2"));
  var bedrohungen2P = JSON.parse(localStorage.getItem("bedrohungen2"));
  var bedrohungenBeschreibung2P = JSON.parse(localStorage.getItem("bedrohungenBeschreibung2"));
  var risiken2P = JSON.parse(localStorage.getItem("risiken2"));
  var risikenBeschreibung2P = JSON.parse(localStorage.getItem("risikenBeschreibung2"));
  var maßnahmen2P = JSON.parse(localStorage.getItem("maßnahmen2"));
  var akteure2P = JSON.parse(localStorage.getItem("akteure2"));

  var task3P = JSON.parse(localStorage.getItem("task3"));
  var bedrohungen3P = JSON.parse(localStorage.getItem("bedrohungen3"));
  var bedrohungenBeschreibung3P = JSON.parse(localStorage.getItem("bedrohungenBeschreibung3"));
  var risiken3P = JSON.parse(localStorage.getItem("risiken3"));
  var risikenBeschreibung3P = JSON.parse(localStorage.getItem("risikenBeschreibung3"));
  var maßnahmen3P = JSON.parse(localStorage.getItem("maßnahmen3"));
  var akteure3P = JSON.parse(localStorage.getItem("akteure3"));

  //TABELLE ERSTELLT
  //var tabelle = document.getElementById('tabelle');
  tabelle.style.border = "solid";
  tabelle.style.fontFamily = "Raleway, Helvetica, sans-serif";

  var tabellenUeberschrift = document.createElement("TH")
  var d = new Date();
  d.setUTCFullYear(2017);
  d.setUTCMonth(11);
  d.setUTCDate(19);
  tabellenUeberschrift.innerHTML = "Report vom 19.11.2017";
  tabellenUeberschrift.style.textAlign = "center";
  tabellenUeberschrift.style.border = "solid";
  tabellenUeberschrift.colSpan = 6;
  tabellenUeberschrift.id = "dieUeberschrift";


  tabelle.appendChild(tabellenUeberschrift);

  //////BILANZ NEU ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var bilanzUeberschrift = document.createElement("TR");
  var s4 = document.createElement("TD");
  s4.innerHTML = "Zusammenfassung";
  s4.colSpan = 6;
  s4.style.backgroundColor = "rgb(83, 99, 142)";

  bilanzUeberschrift.appendChild(s4);
  bilanzUeberschrift.style.border = "solid";
  bilanzUeberschrift.style.textAlign = "center";
  tabelle.appendChild(bilanzUeberschrift);

  ///////jetzt BILANZÜBERSCHRIFTEN/////////////////////////////////////////////////////////////////////////////////

  //////NEUE ZEILE////////////////////////////////////////////////////////////////////////////////////////
  var bilanzZeile2 = document.createElement("TR");
  var untersuchteArbeitsabläufeSpalteUeberschrift = document.createElement("TD");
  var untersuchteArbeitsabläufeSpalteZahl = document.createElement("TD");

  untersuchteArbeitsabläufeSpalteUeberschrift.innerHTML = "Untersuchte Arbeitsabläufe";
  untersuchteArbeitsabläufeSpalteUeberschrift.colSpan = 3;

  untersuchteArbeitsabläufeSpalteUeberschrift.style.border = "solid";

  untersuchteArbeitsabläufeSpalteZahl.innerHTML = "3";
  untersuchteArbeitsabläufeSpalteZahl.colSpan = 3;
  untersuchteArbeitsabläufeSpalteZahl.style.border = "solid";

  bilanzZeile2.appendChild(untersuchteArbeitsabläufeSpalteUeberschrift);
  bilanzZeile2.appendChild(untersuchteArbeitsabläufeSpalteZahl);

  tabelle.appendChild(bilanzZeile2);

  /////////////////NEUE ZEILE///////////////////////////////////////////////////////////////////////////////
  var bilanzZeile3 = document.createElement("TR");
  var gefundeneBedrohungenSpalteUeberschrift = document.createElement("TD");
  var gefundeneBedrohungenSpalteZahl = document.createElement("TD");

  gefundeneBedrohungenSpalteUeberschrift.innerHTML = "Gefundene Bedrohungen";
  gefundeneBedrohungenSpalteUeberschrift.colSpan = 3;

  gefundeneBedrohungenSpalteUeberschrift.style.border = "solid";

  //gefundeneBedrohungenSpalteZahl.innerHTML = bedrohungenGezählt;
  gefundeneBedrohungenSpalteZahl.colSpan = 3;
  gefundeneBedrohungenSpalteZahl.style.border = "solid";

  bilanzZeile3.appendChild(gefundeneBedrohungenSpalteUeberschrift);
  bilanzZeile3.appendChild(gefundeneBedrohungenSpalteZahl);

  tabelle.appendChild(bilanzZeile3);

  /////////////////NEUE ZEILE///////////////////////////////////////////////////////////////////////////////
  var bilanzZeile4 = document.createElement("TR");
  var gefundeneRisikenSpalteUeberschrift = document.createElement("TD");
  var gefundeneRisikenSpalteZahl = document.createElement("TD");

  gefundeneRisikenSpalteUeberschrift.innerHTML = "Gefundene Risiken";
  gefundeneRisikenSpalteUeberschrift.colSpan = 3;

  gefundeneRisikenSpalteUeberschrift.style.border = "solid";

  //gefundeneRisikenSpalteZahl.innerHTML = risikenGezählt;
  gefundeneRisikenSpalteZahl.colSpan = 3;
  gefundeneRisikenSpalteZahl.style.border = "solid";

  bilanzZeile4.appendChild(gefundeneRisikenSpalteUeberschrift);
  bilanzZeile4.appendChild(gefundeneRisikenSpalteZahl);

  tabelle.appendChild(bilanzZeile4);

  /////////////////NEUE ZEILE///////////////////////////////////////////////////////////////////////////////
  var bilanzZeile5 = document.createElement("TR");
  var ermittelteMaßnahmenSpalteUeberschrift = document.createElement("TD");
  var ermittelteMaßnahmenSpalteZahl = document.createElement("TD");

  ermittelteMaßnahmenSpalteUeberschrift.innerHTML = "Ermittelte Maßnahmen";
  ermittelteMaßnahmenSpalteUeberschrift.colSpan = 3;

  ermittelteMaßnahmenSpalteUeberschrift.style.border = "solid";

  //ermittelteMaßnahmenSpalteZahl.innerHTML = maßnahmenGezählt;
  ermittelteMaßnahmenSpalteZahl.colSpan = 3;
  ermittelteMaßnahmenSpalteZahl.style.border = "solid";

  bilanzZeile5.appendChild(ermittelteMaßnahmenSpalteUeberschrift);
  bilanzZeile5.appendChild(ermittelteMaßnahmenSpalteZahl);

  tabelle.appendChild(bilanzZeile5);

  /////////////////NEUE ZEILE//////////////////////////////////////////////////////////////////////////////
  var bilanzZeile6 = document.createElement("TR");
  var prioritätenSpaltenUeberschrift = document.createElement("TD");
  var prioritätenSpaltenZahl = document.createElement("TD");

  prioritätenSpaltenUeberschrift.innerHTML = "Umsetzungsempfehlung";
  prioritätenSpaltenUeberschrift.colSpan = 3;
  prioritätenSpaltenUeberschrift.style.border = "solid";

  prioritätenSpaltenZahl.colSpan = 3;
  prioritätenSpaltenZahl.style.border = "solid";

  var prioritätenZeileRot = document.createElement("TR");
  var prioritätenZeileGelb = document.createElement("TR");
  var prioritätenZeileGrün = document.createElement("TR");
  /*
  prioritätenZeileRot.innerHTML = prioritätRotGezählt + " "+"Hohe Prioritäten";
  prioritätenZeileGelb.innerHTML = prioritätGelbGezählt+ " "+"Mittlere Prioritäten";
  prioritätenZeileGrün.innerHTML = prioritätGrünGezählt+ " "+"Niedrige Prioritäten";*/

  prioritätenZeileRot.style.textAlign = "center";
  prioritätenZeileRot.style.backgroundColor = "red";


  prioritätenZeileGelb.style.textAlign = "center";
  prioritätenZeileGelb.style.backgroundColor = "#a9a905";

  prioritätenZeileGrün.style.textAlign = "center";
  prioritätenZeileGrün.style.backgroundColor = "green";

  prioritätenSpaltenZahl.appendChild(prioritätenZeileRot);
  prioritätenSpaltenZahl.appendChild(prioritätenZeileGelb);
  prioritätenSpaltenZahl.appendChild(prioritätenZeileGrün);

  bilanzZeile6.appendChild(prioritätenSpaltenUeberschrift);
  bilanzZeile6.appendChild(prioritätenSpaltenZahl);

  tabelle.appendChild(bilanzZeile6);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  var ueberschriftArbeitsablauf1 = document.createElement("TR");
  var s1 = document.createElement("TD");
  s1.innerHTML = "Standard Arbeitsablauf: Versand";
  s1.colSpan = 6;
  s1.style.backgroundColor = "rgb(83, 99, 142)";

  ueberschriftArbeitsablauf1.appendChild(s1);
  ueberschriftArbeitsablauf1.style.border = "solid";



  tabelle.appendChild(ueberschriftArbeitsablauf1);

  var zeileFuerUeberschriften = document.createElement("TR");
  zeileFuerUeberschriften.style.backgroundColor = "rgb(83, 99, 142)"

  var taskUeberschrift = document.createElement("TD");
  taskUeberschrift.innerHTML = "Arbeitsschritt";
  taskUeberschrift.style.border = "solid";
  taskUeberschrift.style.textAlign = "center"

  var bedrohungenUeberschrift = document.createElement("TD");
  bedrohungenUeberschrift.innerHTML = "Bedrohungen";
  bedrohungenUeberschrift.style.border = "solid";
  bedrohungenUeberschrift.style.textAlign = "center"

  var risikenUeberschrift = document.createElement("TD");
  risikenUeberschrift.innerHTML = "Risiken";
  risikenUeberschrift.style.border = "solid";
  risikenUeberschrift.style.textAlign = "center"

  var maßnahmenUeberschrift = document.createElement("TD");
  maßnahmenUeberschrift.innerHTML = "Maßnahmen";
  maßnahmenUeberschrift.style.border = "solid";
  maßnahmenUeberschrift.style.textAlign = "center"

  var prioritaetenUeberschrift = document.createElement("TD");
  prioritaetenUeberschrift.innerHTML = "Priorität";
  prioritaetenUeberschrift.style.border = "solid";
  prioritaetenUeberschrift.style.textAlign = "center"

  zeileFuerUeberschriften.appendChild(taskUeberschrift);
  zeileFuerUeberschriften.appendChild(bedrohungenUeberschrift);
  zeileFuerUeberschriften.appendChild(risikenUeberschrift);
  zeileFuerUeberschriften.appendChild(maßnahmenUeberschrift);
  zeileFuerUeberschriften.appendChild(prioritaetenUeberschrift);

  tabelle.appendChild(zeileFuerUeberschriften);

  /*console.log(taskP);
  console.log(bedrohungenP);
  console.log(risikenP);
  console.log(maßnahmenP);
  console.log(akteureP);
  console.log(task2P);
  console.log(bedrohungen2P);
  console.log(risiken2P);
  console.log(maßnahmen2P);
  console.log(akteure2P);
  console.log(task3P);
  console.log(bedrohungen3P);
  console.log(risiken3P);
  console.log(maßnahmen3P);
  console.log(akteure3P);*/


  var index;
  for(index = 0; index < taskP.length; index++){

    var zeile = document.createElement("TR");

    var spalte1 = document.createElement("TD");
    var spalte2 = document.createElement("TD");
    var spalte3 = document.createElement("TD");
    var spalte4 = document.createElement("TD");
    var spalte5 = document.createElement("TD");

    zeile.appendChild(spalte1);
    zeile.appendChild(spalte2);
    zeile.appendChild(spalte3);
    zeile.appendChild(spalte4);
    zeile.appendChild(spalte5);

    tabelle.appendChild(zeile);

    spalte1.innerHTML = taskP[index];
    console.log(taskP[index]);

    var dieBedrohungen = bedrohungenP[index].toString();
    var dieGetrenntenBedrohungen = dieBedrohungen.split('#');
    var i;
    for(i = 0; i < dieGetrenntenBedrohungen.length; i++){
      var zeile = document.createElement("TR");
      var ul = document.createElement("UL");
      var li = document.createElement("LI");
      li.innerHTML = dieGetrenntenBedrohungen[i];
      ul.appendChild(li);
      zeile.appendChild(ul);
      spalte2.appendChild(zeile);

    }

    //spalte2.innerHTML = bedrohungenP[index];

    var dieRisiken = risikenP[index].toString();
    var dieGetrenntenRisiken = dieRisiken.split('#');
    var j;
    for(j = 0; j < dieGetrenntenRisiken.length; j++){
      var zeile = document.createElement("TR");
      var ul = document.createElement("UL");
      var li = document.createElement("LI");
      li.innerHTML = dieGetrenntenRisiken[j];
      ul.appendChild(li);
      zeile.appendChild(ul);
      spalte3.appendChild(zeile);
    }
    //spalte3.innerHTML = risikenP[index];

    var dieMaßnahmen = maßnahmenP[index].toString();
    var dieGetrenntenMaßnahmen = dieMaßnahmen.split('#');
    var k;
    for(k = 0; k < dieGetrenntenMaßnahmen.length; k++){
      var zeile = document.createElement("TR");
      var ul = document.createElement("UL");
      var li = document.createElement("LI");
      li.innerHTML = dieGetrenntenMaßnahmen[k];
      ul.appendChild(li);
      zeile.appendChild(ul);
      spalte4.appendChild(zeile);
    }
  //  spalte4.innerHTML = maßnahmenP[index];
    //console.log(dieGetrenntenRisiken.length);
    risikenGezählt += dieGetrenntenRisiken.length;
    maßnahmenGezählt += dieGetrenntenMaßnahmen.length;
    bedrohungenGezählt += dieGetrenntenBedrohungen.length;


    if(akteureP[index] == 0){
      spalte5.style.backgroundColor = "green";
      //spalte5.style.color = "green";
      spalte5.style.border = "solid";
      prioritätGrünGezählt += 1;
    }else if(akteureP[index] == 1){
      spalte5.style.backgroundColor = "yellow";
      //spalte5.style.color = "yellow";
      spalte5.style.border = "solid";
      prioritätGelbGezählt += 1;
    }else{
      spalte5.style.backgroundColor = "red";
      //spalte5.style.color = "red";
      spalte5.style.border = "solid";
      prioritätRotGezählt += 1;
    }
    spalte1.style.border = "solid";
    spalte2.style.border = "solid";
    spalte3.style.border = "solid";
    spalte4.style.border = "solid";
  }






  //JETZT ALLES FÜR DEN NÄCHSTEN GESCHÄFTSPROZESS/////////////////////////////////////////////////////////////////////////////////77

  var ueberschriftArbeitsablauf2 = document.createElement("TR");
  var s2 = document.createElement("TD");
  s2.innerHTML = "Standard Arbeitsablauf: Produktion Holz";
  s2.colSpan = 6;
  s2.style.backgroundColor = "rgb(83, 99, 142)";

  ueberschriftArbeitsablauf2.appendChild(s2);
  ueberschriftArbeitsablauf2.style.border = "solid";



  tabelle.appendChild(ueberschriftArbeitsablauf2);

  var zeileFuerUeberschriften2 = document.createElement("TR");
  zeileFuerUeberschriften2.style.backgroundColor = "rgb(83, 99, 142)"

  var taskUeberschrift2 = document.createElement("TD");
  taskUeberschrift2.innerHTML = "Arbeitsschritt";
  taskUeberschrift2.style.border = "solid";
  taskUeberschrift2.style.textAlign = "center"

  var bedrohungenUeberschrift2 = document.createElement("TD");
  bedrohungenUeberschrift2.innerHTML = "Bedrohungen";
  bedrohungenUeberschrift2.style.border = "solid";
  bedrohungenUeberschrift2.style.textAlign = "center"

  var risikenUeberschrift2 = document.createElement("TD");
  risikenUeberschrift2.innerHTML = "Risiken";
  risikenUeberschrift2.style.border = "solid";
  risikenUeberschrift2.style.textAlign = "center"

  var maßnahmenUeberschrift2 = document.createElement("TD");
  maßnahmenUeberschrift2.innerHTML = "Maßnahmen";
  maßnahmenUeberschrift2.style.border = "solid";
  maßnahmenUeberschrift2.style.textAlign = "center"

  var prioritaetenUeberschrift2 = document.createElement("TD");
  prioritaetenUeberschrift2.innerHTML = "Priorität";
  prioritaetenUeberschrift2.style.border = "solid";
  prioritaetenUeberschrift2.style.textAlign = "center"

  zeileFuerUeberschriften2.appendChild(taskUeberschrift2);
  zeileFuerUeberschriften2.appendChild(bedrohungenUeberschrift2);
  zeileFuerUeberschriften2.appendChild(risikenUeberschrift2);
  zeileFuerUeberschriften2.appendChild(maßnahmenUeberschrift2);
  zeileFuerUeberschriften2.appendChild(prioritaetenUeberschrift2);

  tabelle.appendChild(zeileFuerUeberschriften2);

  //////////////////////////////////////////////////
  var index2;
  for(index2 = 0; index2 < task2P.length; index2++){

    var zeile = document.createElement("TR");

    var spalte1 = document.createElement("TD");
    var spalte2 = document.createElement("TD");
    var spalte3 = document.createElement("TD");
    var spalte4 = document.createElement("TD");
    var spalte5 = document.createElement("TD");

    zeile.appendChild(spalte1);
    zeile.appendChild(spalte2);
    zeile.appendChild(spalte3);
    zeile.appendChild(spalte4);
    zeile.appendChild(spalte5);

    tabelle.appendChild(zeile);

    spalte1.innerHTML = task2P[index2];

    var dieBedrohungen2 = bedrohungen2P[index2].toString();
    var dieGetrenntenBedrohungen2 = dieBedrohungen2.split('#');
    var i2;
    for(i2 = 0; i2 < dieGetrenntenBedrohungen2.length; i2++){
      var zeile = document.createElement("TR");
      var ul = document.createElement("UL");
      var li = document.createElement("LI");
      li.innerHTML = dieGetrenntenBedrohungen2[i2];
      ul.appendChild(li);
      zeile.appendChild(ul);
      spalte2.appendChild(zeile);
    }

    //spalte2.innerHTML = bedrohungenP[index];

    var dieRisiken2 = risiken2P[index2].toString();
    var dieGetrenntenRisiken2 = dieRisiken2.split('#');
    var j2;
    for(j2 = 0; j2 < dieGetrenntenRisiken2.length; j2++){
      var zeile = document.createElement("TR");
      var ul = document.createElement("UL");
      var li = document.createElement("LI");
      li.innerHTML = dieGetrenntenRisiken2[j2];
      ul.appendChild(li);
      zeile.appendChild(ul);
      spalte3.appendChild(zeile);
    }
    //spalte3.innerHTML = risikenP[index];

    var dieMaßnahmen2 = maßnahmen2P[index2].toString();
    var dieGetrenntenMaßnahmen2 = dieMaßnahmen2.split('#');
    var k2;
    for(k2 = 0; k2 < dieGetrenntenMaßnahmen2.length; k2++){
      var zeile = document.createElement("TR");
      var ul = document.createElement("UL");
      var li = document.createElement("LI");
      li.innerHTML = dieGetrenntenMaßnahmen2[k2];
      ul.appendChild(li);
      zeile.appendChild(ul);
      spalte4.appendChild(zeile);
    }
  //  spalte4.innerHTML = maßnahmenP[index];
  //console.log(dieGetrenntenRisiken2.length);
    risikenGezählt += dieGetrenntenRisiken2.length;
    maßnahmenGezählt += dieGetrenntenMaßnahmen2.length;
    bedrohungenGezählt += dieGetrenntenBedrohungen2.length;


    if(akteure2P[index2] == 0){
      spalte5.style.backgroundColor = "green";
      //spalte5.style.color = "green";
      spalte5.style.border = "solid";
      prioritätGrünGezählt += 1;
    }else if(akteure2P[index2] += 1){
      spalte5.style.backgroundColor = "yellow";
      //spalte5.style.color = "yellow";
      spalte5.style.border = "solid";
      prioritätGelbGezählt += 1;
    }else{
      spalte5.style.backgroundColor = "red";
      //spalte5.style.color = "red";
      spalte5.style.border = "solid";
      prioritätRotGezählt += 1;
    }
    spalte1.style.border = "solid";
    spalte2.style.border = "solid";
    spalte3.style.border = "solid";
    spalte4.style.border = "solid";

    }


//JETZT ALLES FÜR DEN NÄCHSTEN GESCHÄFTSPROZESS/////////////////////////////////////////////////////////////////////////////////77

var ueberschriftArbeitsablauf3 = document.createElement("TR");
var s3 = document.createElement("TD");
s3.innerHTML = "Standard Arbeitsablauf: Produktentwicklung";
s3.colSpan = 6;
s3.style.backgroundColor = "rgb(83, 99, 142)";

ueberschriftArbeitsablauf3.appendChild(s3);
ueberschriftArbeitsablauf3.style.border = "solid";



tabelle.appendChild(ueberschriftArbeitsablauf3);

var zeileFuerUeberschriften3 = document.createElement("TR");
zeileFuerUeberschriften3.style.backgroundColor = "rgb(83, 99, 142)"

var taskUeberschrift3 = document.createElement("TD");
taskUeberschrift3.innerHTML = "Arbeitsschritt";
taskUeberschrift3.style.border = "solid";
taskUeberschrift3.style.textAlign = "center"

var bedrohungenUeberschrift3 = document.createElement("TD");
bedrohungenUeberschrift3.innerHTML = "Bedrohungen";
bedrohungenUeberschrift3.style.border = "solid";
bedrohungenUeberschrift3.style.textAlign = "center"

var risikenUeberschrift3 = document.createElement("TD");
risikenUeberschrift3.innerHTML = "Risiken";
risikenUeberschrift3.style.border = "solid";
risikenUeberschrift3.style.textAlign = "center"

var maßnahmenUeberschrift3 = document.createElement("TD");
maßnahmenUeberschrift3.innerHTML = "Maßnahmen";
maßnahmenUeberschrift3.style.border = "solid";
maßnahmenUeberschrift3.style.textAlign = "center"

var prioritaetenUeberschrift3 = document.createElement("TD");
prioritaetenUeberschrift3.innerHTML = "Priorität";
prioritaetenUeberschrift3.style.border = "solid";
prioritaetenUeberschrift3.style.textAlign = "center";

zeileFuerUeberschriften3.appendChild(taskUeberschrift3);
zeileFuerUeberschriften3.appendChild(bedrohungenUeberschrift3);
zeileFuerUeberschriften3.appendChild(risikenUeberschrift3);
zeileFuerUeberschriften3.appendChild(maßnahmenUeberschrift3);
zeileFuerUeberschriften3.appendChild(prioritaetenUeberschrift3);

tabelle.appendChild(zeileFuerUeberschriften3);
////////////////////////////////////////////////////////////////////////////////////////////
var index3;
for(index3 = 0; index3 < task3P.length; index3++){

  var zeile = document.createElement("TR");

  var spalte1 = document.createElement("TD");
  var spalte2 = document.createElement("TD");
  var spalte3 = document.createElement("TD");
  var spalte4 = document.createElement("TD");
  var spalte5 = document.createElement("TD");

  zeile.appendChild(spalte1);
  zeile.appendChild(spalte2);
  zeile.appendChild(spalte3);
  zeile.appendChild(spalte4);
  zeile.appendChild(spalte5);

  tabelle.appendChild(zeile);

  spalte1.innerHTML = task3P[index3];

  var dieBedrohungen3 = bedrohungen3P[index3].toString();
  var dieGetrenntenBedrohungen3 = dieBedrohungen3.split('#');
  var i3;
  for(i3 = 0; i3 < dieGetrenntenBedrohungen3.length; i3++){
    var zeile = document.createElement("TR");
    var ul = document.createElement("UL");
    var li = document.createElement("LI");
    li.innerHTML = dieGetrenntenBedrohungen3[i3];
    ul.appendChild(li);
    zeile.appendChild(ul);
    spalte2.appendChild(zeile);
  }

  //spalte2.innerHTML = bedrohungenP[index];

  var dieRisiken3 = risiken3P[index3].toString();
  var dieGetrenntenRisiken3 = dieRisiken3.split('#');
  var j3;
  for(j3 = 0; j3 < dieGetrenntenRisiken3.length; j3++){
    var zeile = document.createElement("TR");
    var ul = document.createElement("UL");
    var li = document.createElement("LI");
    li.innerHTML = dieGetrenntenRisiken3[j3];
    ul.appendChild(li);
    zeile.appendChild(ul);
    spalte3.appendChild(zeile);
  }
  //spalte3.innerHTML = risikenP[index];

  var dieMaßnahmen3 = maßnahmen3P[index3].toString();
  var dieGetrenntenMaßnahmen3 = dieMaßnahmen3.split('#');
  var k3;
  for(k3 = 0; k3 < dieGetrenntenMaßnahmen3.length; k3++){
    var zeile = document.createElement("TR");
    var ul = document.createElement("UL");
    var li = document.createElement("LI");
    li.innerHTML = dieGetrenntenMaßnahmen3[k3];
    ul.appendChild(li);
    zeile.appendChild(ul);
    spalte4.appendChild(zeile);
  }
//  spalte4.innerHTML = maßnahmenP[index];
//console.log(dieGetrenntenRisiken3.length);
  risikenGezählt += dieGetrenntenRisiken3.length;
  maßnahmenGezählt += dieGetrenntenMaßnahmen3.length;
  bedrohungenGezählt += dieGetrenntenBedrohungen3.length;


  if(akteure3P[index3] == 0){
    spalte5.style.backgroundColor = "green";
    //spalte5.style.color = "green";
    spalte5.style.border = "solid";
    prioritätGrünGezählt += 1;
  }else if(akteure3P[index3] == 1){
    spalte5.style.backgroundColor = "yellow";
    //spalte5.style.color = "yellow";
    spalte5.style.border = "solid";
    prioritätGelbGezählt += 1;
  }else{
    spalte5.style.backgroundColor = "red";
    //spalte5.style.color = "red";
    spalte5.style.border = "solid";
    prioritätRotGezählt += 1;
  }
  spalte1.style.border = "solid";
  spalte2.style.border = "solid";
  spalte3.style.border = "solid";
  spalte4.style.border = "solid";

  }
  //////////////////////////////////////////////////////BILANZ///////////////////////////////////////
  prioritätenZeileRot.innerHTML = prioritätRotGezählt + " "+"Hohe Prioritäten";
  prioritätenZeileGelb.innerHTML = prioritätGelbGezählt+ " "+"Mittlere Prioritäten";
  prioritätenZeileGrün.innerHTML = prioritätGrünGezählt+ " "+"Niedrige Prioritäten";

  ermittelteMaßnahmenSpalteZahl.innerHTML = maßnahmenGezählt;
  gefundeneRisikenSpalteZahl.innerHTML = risikenGezählt;
  gefundeneBedrohungenSpalteZahl.innerHTML = bedrohungenGezählt;

  console.log(risikenGezählt);
  console.log(maßnahmenGezählt);
  console.log(bedrohungenGezählt);
  console.log(prioritätRotGezählt);
  console.log(prioritätGelbGezählt);
  console.log(prioritätGrünGezählt);
}

function druckenEins(){
  erstelleReport();
  window.print();
}
function druckenZwei(){
  erstelleReportZwei();
  window.print();
}
function reportAnzeigen(){
  var reportButton = document.getElementById("zuReportButton");
  reportButton.style.visibility="visible";
}

function hinzufuegen(){
  alertify.error("Arbeitsabläufe hinzufügen ist nicht möglich, da Sie die Testversion benutzen");
}
function uploaden(){
  alertify.error("Arbeitsabläufe uploaden ist nicht möglich, da Sie die Testversion benutzen");
}

function loeschen(){
  alertify.error("Arbeitsabläufe löschen ist nicht möglich, da Sie die Testversion benutzen");
}
function wasIstGewichtung(){
  alertify.alert('<font size="3">' + "Was ist Gewichtung?" +
  '</font>',
  '<img style="margin: auto; display: block;" src="images/waageKlein.png" alt="" id= /> '+'<b style="color: black";font-size: inherit;>'+ '<br/>' + "Hier geht es um die Gewichtung des GESAMTEN Arbeitsablaufes!" + '<br/>' + '<br/>' +
  "Arbeitsabläufe haben unterschiedliche Prioritäten für ein Unternehmen, einige dienen nur der Verwaltung andere sind geschäftskritischer. Deshalb ist es wichtig, Arbeitsabläufe aus Ihrer Sicht zu gewichten. Hierbei müssen Sie einschätzen, wie geschäftskritisch ein Arbeitslauf für ihr Unternehmen ist und diesen dann nach: Hoch, Mittel, Niedrig kategorisieren. Mithilfe dieser Einschätzung und unserem Priorisierungsalgorithmus können wir Ihnen eine optimale Einschätzung geben." +'</b>');
}
function wasIstGewichtungTask(){
  alertify.alert('<font size="3">' + "Was ist Gewichtung?" +
  '</font>',
  '<img style="margin: auto; display: block;" src="images/waageKlein.png" alt="" id= /> '+'<b style="color: black";font-size: inherit;>'+ '<br/>' + "Hier geht es um die Gewichtung eines EINZELNEN Arbeitsschrittes!" + '<br/>' + '<br/>' +
  "Arbeitsschritte haben unterschiedliche Prioritäten für ein Unternehmen, einige dienen nur der Verwaltung andere sind geschäftskritischer. Deshalb ist es wichtig, Arbeitsschritte aus Ihrer Sicht zu gewichten. Hierbei müssen Sie einschätzen, wie geschäftskritisch ein Arbeitsschritt für ihr Unternehmen ist und diesen dann nach: Hoch, Mittel, Niedrig kategorisieren. Mithilfe dieser Einschätzung und unserem Priorisierungsalgorithmus können wir Ihnen eine optimale Einschätzung geben." +'</b>');
}

function gewichtungTaskErstellen(){
  var tabelle = document.getElementById('gewichtungTaskTabelle')

  while(tabelle.rows.length > 0){
    tabelle.deleteRow(0);
  }

  viewer.moddle.toXML(viewer.definitions, {format: true},function (err,updatedXML){
    fertigeXmlDatei = updatedXML;

  });

  var parser = new DOMParser();
  var xmlDocument = parser.parseFromString(fertigeXmlDatei,"text/xml");
  var tagElements = xmlDocument.getElementsByTagName('task');

  var i1;
  var tasksGewichtung = [];
  for(i1 = 0; i1 < tagElements.length; i1++){
    var taskName;
    taskName = tagElements[i1].getAttribute('name');
    tasksGewichtung[i1] = taskName;
    taskName = '';
  }

  var i;
  for (var i = 0; i < tasksGewichtung.length; i++) {
    var hochId;
    var mittelId;
    var niedrigId;

    var zeile = document.createElement('TR');
    var spalte = document.createElement('TD');
    var spalte2 = document.createElement('TD');

    var hoch = document.createElement("BUTTON");
    hoch.innerHTML = "Hoch"
    hoch.style.width = "33%";
    hoch.style.backgroundColor = "red"





    var mittel = document.createElement("BUTTON");
    mittel.innerHTML = "Mittel"
    mittel.style.width = "33%";
    mittel.style.backgroundColor = "rgb(169, 169, 5)"



    var niedrig = document.createElement("BUTTON");
    niedrig.innerHTML = "Niedrig"
    niedrig.style.width = "33%";
    niedrig.style.backgroundColor = "green"


    spalte.innerHTML = tasksGewichtung[i];

    spalte2.appendChild(hoch);
    spalte2.appendChild(mittel);
    spalte2.appendChild(niedrig);

    zeile.appendChild(spalte);
    zeile.appendChild(spalte2);

    tabelle.appendChild(zeile);

    hoch.onclick = function(){
      var oben = this.parentElement;
      console.log(oben);
      $(this).closest("td").empty();
      var hoch = document.createElement("BUTTON");
      hoch.innerHTML = "Hoch"
      hoch.style.width = "60%";
      hoch.style.backgroundColor = "red"

      oben.appendChild(hoch);
    };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    mittel.onclick = function(){
      var oben = this.parentElement;
      console.log(oben);
      $(this).closest("td").empty();

      var mittel = document.createElement("BUTTON");
      mittel.innerHTML = "Mittel"
      mittel.style.width = "60%";
      mittel.style.backgroundColor = "rgb(169, 169, 5)"

      oben.appendChild(mittel);

    };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    niedrig.onclick = function(){
      var oben = this.parentElement;
      console.log(oben);
      $(this).closest("td").empty();
      var niedrig = document.createElement("BUTTON");
      niedrig.innerHTML = "Niedrig"
      niedrig.style.width = "60%";
      niedrig.style.backgroundColor = "green"

      oben.appendChild(niedrig);
    };
  }
}

////////////////////////////////////////FÜR DEN 2 ARBEITSABLAUF //////////////////////////////////////////////////////////////////////////////
function gewichtungTaskErstellen2(){
  var tabelle = document.getElementById('gewichtungTaskTabelle2')

  while(tabelle.rows.length > 0){
    tabelle.deleteRow(0);
  }

  viewer2.moddle.toXML(viewer2.definitions, {format: true},function (err,updatedXML){
    fertigeXmlDatei = updatedXML;

  });

  var parser = new DOMParser();
  var xmlDocument = parser.parseFromString(fertigeXmlDatei,"text/xml");
  var tagElements = xmlDocument.getElementsByTagName('task');

  var i1;
  var tasksGewichtung = [];
  for(i1 = 0; i1 < tagElements.length; i1++){
    var taskName;
    taskName = tagElements[i1].getAttribute('name');
    tasksGewichtung[i1] = taskName;
    taskName = '';
  }

  var i;
  for (var i = 0; i < tasksGewichtung.length; i++) {
    var hochId;
    var mittelId;
    var niedrigId;

    var zeile = document.createElement('TR');
    var spalte = document.createElement('TD');
    var spalte2 = document.createElement('TD');

    var hoch = document.createElement("BUTTON");
    hoch.innerHTML = "Hoch"
    hoch.style.width = "33%";
    hoch.style.backgroundColor = "red"





    var mittel = document.createElement("BUTTON");
    mittel.innerHTML = "Mittel"
    mittel.style.width = "33%";
    mittel.style.backgroundColor = "rgb(169, 169, 5)"



    var niedrig = document.createElement("BUTTON");
    niedrig.innerHTML = "Niedrig"
    niedrig.style.width = "33%";
    niedrig.style.backgroundColor = "green"


    spalte.innerHTML = tasksGewichtung[i];

    spalte2.appendChild(hoch);
    spalte2.appendChild(mittel);
    spalte2.appendChild(niedrig);

    zeile.appendChild(spalte);
    zeile.appendChild(spalte2);

    tabelle.appendChild(zeile);

    hoch.onclick = function(){
      var oben = this.parentElement;
      console.log(oben);
      $(this).closest("td").empty();
      var hoch = document.createElement("BUTTON");
      hoch.innerHTML = "Hoch"
      hoch.style.width = "60%";
      hoch.style.backgroundColor = "red"

      oben.appendChild(hoch);
    };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    mittel.onclick = function(){
      var oben = this.parentElement;
      console.log(oben);
      $(this).closest("td").empty();

      var mittel = document.createElement("BUTTON");
      mittel.innerHTML = "Mittel"
      mittel.style.width = "60%";
      mittel.style.backgroundColor = "rgb(169, 169, 5)"

      oben.appendChild(mittel);

    };
///////////////////////////////////////////////////////////////////////////////////////////////////////////
    niedrig.onclick = function(){
      var oben = this.parentElement;
      console.log(oben);
      $(this).closest("td").empty();
      var niedrig = document.createElement("BUTTON");
      niedrig.innerHTML = "Niedrig"
      niedrig.style.width = "60%";
      niedrig.style.backgroundColor = "green"

      oben.appendChild(niedrig);
    };
  }
}
///////////////////////////////////////////////////////////////////////////////////////ARBEITSABLAUF 3 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
function gewichtungTaskErstellen3(){
  var tabelle = document.getElementById('gewichtungTaskTabelle3')

  while(tabelle.rows.length > 0){
    tabelle.deleteRow(0);
  }

  viewer3.moddle.toXML(viewer3.definitions, {format: true},function (err,updatedXML){
    fertigeXmlDatei = updatedXML;

  });

  var parser = new DOMParser();
  var xmlDocument = parser.parseFromString(fertigeXmlDatei,"text/xml");
  var tagElements = xmlDocument.getElementsByTagName('task');

  var i1;
  var tasksGewichtung = [];
  for(i1 = 0; i1 < tagElements.length; i1++){
    var taskName;
    taskName = tagElements[i1].getAttribute('name');
    tasksGewichtung[i1] = taskName;
    taskName = '';
  }

  var i;
  for (var i = 0; i < tasksGewichtung.length; i++) {
    var hochId;
    var mittelId;
    var niedrigId;

    var zeile = document.createElement('TR');
    var spalte = document.createElement('TD');
    var spalte2 = document.createElement('TD');

    var hoch = document.createElement("BUTTON");
    hoch.innerHTML = "Hoch"
    hoch.style.width = "33%";
    hoch.style.backgroundColor = "red"





    var mittel = document.createElement("BUTTON");
    mittel.innerHTML = "Mittel"
    mittel.style.width = "33%";
    mittel.style.backgroundColor = "rgb(169, 169, 5)"



    var niedrig = document.createElement("BUTTON");
    niedrig.innerHTML = "Niedrig"
    niedrig.style.width = "33%";
    niedrig.style.backgroundColor = "green"


    spalte.innerHTML = tasksGewichtung[i];

    spalte2.appendChild(hoch);
    spalte2.appendChild(mittel);
    spalte2.appendChild(niedrig);

    zeile.appendChild(spalte);
    zeile.appendChild(spalte2);

    tabelle.appendChild(zeile);

    hoch.onclick = function(){
      var oben = this.parentElement;
      console.log(oben);
      $(this).closest("td").empty();
      var hoch = document.createElement("BUTTON");
      hoch.innerHTML = "Hoch"
      hoch.style.width = "60%";
      hoch.style.backgroundColor = "red"

      oben.appendChild(hoch);
    };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    mittel.onclick = function(){
      var oben = this.parentElement;
      console.log(oben);
      $(this).closest("td").empty();

      var mittel = document.createElement("BUTTON");
      mittel.innerHTML = "Mittel"
      mittel.style.width = "60%";
      mittel.style.backgroundColor = "rgb(169, 169, 5)"

      oben.appendChild(mittel);

    };
///////////////////////////////////////////////////////////////////////////////////////////////////////////
    niedrig.onclick = function(){
      var oben = this.parentElement;
      console.log(oben);
      $(this).closest("td").empty();
      var niedrig = document.createElement("BUTTON");
      niedrig.innerHTML = "Niedrig"
      niedrig.style.width = "60%";
      niedrig.style.backgroundColor = "green"

      oben.appendChild(niedrig);
    };
  }
}
