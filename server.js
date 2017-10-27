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
