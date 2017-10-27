//DATEN SENDEN MIT POST METHODE

function sendData(form){

	if(true){
		console.log("true");
		var formData = new FormData(form);

		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://localhost:3000/nachricht' ,true);
		xhr.responseTyp = 'json';
		xhr.onload = function(json){ }
		xhr.send(formData);
		console.log("abgeschickt");
		alert("Ihre Daten wurden erfolgreich an den Server übermittelt");

	}	else {
		console.log("false");
	  }
}
