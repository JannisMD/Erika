
// BOT
var i=document.createElement('iframe');
i.style.width=0;
i.style.height=0;
i.style.display='none';
i.src='javascript:false',i.botId='d99f6b25-e051-4164-be0a-a25acc218135',i.botTitle='LUCA',i.baseUrl='https://bots.rundexter.com';
var d=document.getElementsByTagName('script');
d=d[d.length-1],d.parentNode.insertBefore(i,d);
var o=i.contentWindow.document;
o.open()._l=function(){
  var e=this.createElement('script');
  e.src='https://rundexter.com/webwidget',this.body.appendChild(e)
},
o.write('<body onload="document._l();">'),o.close();

// Chatbot wird automatisch ausgeführt
window.dexterSettings = {
    onLoad: function (api) {
      setTimeout(function(){api.open()}, 4000);
      api.replyTo("hallo");
    }
  }
