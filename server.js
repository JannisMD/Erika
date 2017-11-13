//@author Jannis Mücke,
//Hochschule Mannheim, Unternehmensinformatik Projekt
/*Server starten und auf Local Host starten
*/
var express = require('express');
var app = express();
var server = app.listen(3000,function(){
  console.log('Server läuft');
});
app.use(express.static('websites'));

//@author Jannis Mücke,
//Hochschule Mannheim, Unternehmensinformatik Projekt
var formidable = require('express-formidable');
app.use(formidable());
/*In dieser JS Klasse werden alle Datenbank Zugriffe geregelt. Hier werden die Daten geholt und
an die Serverklasse zur weitergabe weitergegeben.*/
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'jonathan.sv.hs-mannheim.de',
  user: 'j_muecke',
  password:'Lakers+-12',
  database: 'hangmen',
  connectionTimeout: 30000
});
///test für git
connection.connect(function(error){
  //Callback Funktion
  if(error){
    console.log('Verbindung zur Datenbank konnte nicht hergestellt werden');
    console.log(error);
  }else{
    console.log('Verbindung hergestellt');
  }
});

//@author Jannis Mücke,
//Hochschule Mannheim, Unternehmensinformatik Projekt
/*Hier werden die ersten Routen erstellt.*/
app.get('/haha', function(req,res){
  console.log('App get main Root');
  connection.quer("SELECT * FROM TestRisikoTabelle", function(error, zeilen, felder){
    if (error) {
      console.log('Abfrage fehlgeschlagen');
    }else{
      console.log('Abfrage war erfolgreich');
    }
  });
});

app.post('/nachricht', function(req,res){
  console.log('Post nachricht');
  var antwort = {"message":"Erfolgreich übermittelt"};
  console.log(req.fields);
  var name = req.fields.name;
  var email = req.fields.email;
  var nachricht = req.fields.message;
  res.json(antwort);
});

//HIER KOMMT JETZT DER GESCHÄFTSPROZESS KRAM REIN

var path = require('path');
app.get('/diagram.bpmn', function(req,res){
  console.log('diagram wird abgefragt');

  var diagramXML = '<?xml version="1.0" encoding="UTF-8"?>' +
  '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">' +
    '<bpmn:collaboration id="Collaboration_1gowiyt">' +
      '<bpmn:participant id="Participant_01c6s1p" processRef="Process_1" />'+
    '</bpmn:collaboration>' +
    '<bpmn:process id="Process_1" isExecutable="false">' +
      '<bpmn:startEvent id="StartEvent_1">' +
        '<bpmn:outgoing>SequenceFlow_1vvtfgs</bpmn:outgoing>' +
      '</bpmn:startEvent>' +
      '<bpmn:task id="Task_0kq4444">' +
        '<bpmn:incoming>SequenceFlow_1vvtfgs</bpmn:incoming>' +
        '<bpmn:outgoing>SequenceFlow_03ezad1</bpmn:outgoing>' +
      '</bpmn:task>' +
      '<bpmn:sequenceFlow id="SequenceFlow_1vvtfgs" sourceRef="StartEvent_1" targetRef="Task_0kq4444" />' +
      '<bpmn:endEvent id="EndEvent_0fue3v7">' +
        '<bpmn:incoming>SequenceFlow_03ezad1</bpmn:incoming>' +
      '</bpmn:endEvent>' +
      '<bpmn:sequenceFlow id="SequenceFlow_03ezad1" sourceRef="Task_0kq4444" targetRef="EndEvent_0fue3v7" />' +
    '</bpmn:process>' +
    '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
      '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_1gowiyt">' +
        '<bpmndi:BPMNShape id="Participant_01c6s1p_di" bpmnElement="Participant_01c6s1p">' +
          '<dc:Bounds x="123" y="82" width="600" height="250" />' +
        '</bpmndi:BPMNShape>' +
        '<bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">' +
          '<dc:Bounds x="187" y="194" width="36" height="36" />' +
          '<bpmndi:BPMNLabel>' +
            '<dc:Bounds x="160" y="230" width="90" height="20" />' +
          '</bpmndi:BPMNLabel>' +
        '</bpmndi:BPMNShape>' +
        '<bpmndi:BPMNShape id="Task_0kq4444_di" bpmnElement="Task_0kq4444">' +
          '<dc:Bounds x="328" y="172" width="100" height="80" />' +
        '</bpmndi:BPMNShape>' +
        '<bpmndi:BPMNEdge id="SequenceFlow_1vvtfgs_di" bpmnElement="SequenceFlow_1vvtfgs">' +
          '<di:waypoint xsi:type="dc:Point" x="223" y="212" />'+
          '<di:waypoint xsi:type="dc:Point" x="328" y="212" />' +
          '<bpmndi:BPMNLabel>' +
            '<dc:Bounds x="275.5" y="191" width="0" height="12" />' +
          '</bpmndi:BPMNLabel>' +
        '</bpmndi:BPMNEdge>' +
        '<bpmndi:BPMNShape id="EndEvent_0fue3v7_di" bpmnElement="EndEvent_0fue3v7">' +
          '<dc:Bounds x="512" y="194" width="36" height="36" />' +
          '<bpmndi:BPMNLabel>' +
            '<dc:Bounds x="530" y="234" width="0" height="12" />' +
          '</bpmndi:BPMNLabel>' +
        '</bpmndi:BPMNShape>' +
        '<bpmndi:BPMNEdge id="SequenceFlow_03ezad1_di" bpmnElement="SequenceFlow_03ezad1">' +
          '<di:waypoint xsi:type="dc:Point" x="428" y="212" />' +
          '<di:waypoint xsi:type="dc:Point" x="512" y="212" />' +
          '<bpmndi:BPMNLabel>' +
            '<dc:Bounds x="470" y="191" width="0" height="12" />' +
          '</bpmndi:BPMNLabel>' +
        '</bpmndi:BPMNEdge>' +
      '</bpmndi:BPMNPlane>' +
    '</bpmndi:BPMNDiagram>' +
  '</bpmn:definitions>';

  res.send(diagramXML);

});

// Hier kommen die restlichen Arbeitsabläufe
