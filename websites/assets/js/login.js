function check(form)/*function to check userid & password*/ {
/*the following code checkes whether the entered userid and password are matching*/
if(form.userid.value == "hangmen" && form.pswrd.value == "initial") {
		window.open('Menue.html')/*opens the target page while Id & password matches*/

	}
else {
		alert("Benutzername oder Passwort falsch eingegeben!")/*displays error message*/
		  }
				}
