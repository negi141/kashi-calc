var old = document.getElementById("elmMessage");
if (old) old.remove();

var list = document.getElementsByTagName("span");
var cText = "";
for (var i = 0; list.length; i++) {
  if (list[i].textContent.search(/^【東京/) !== -1) {
    cText = list[i].textContent;
    break;
  }
}
if (cText !== ""){
  var elmMessage = document.createElement('div');
  elmMessage.setAttribute("id", "elmMessage");
  elmMessage.innerHTML = cText;
  elmMessage.style.cssText = "position: fixed;"
  + "top: 1px;"
  + "display: inline-block;"
  + "background: rgba(0, 0, 0, 0.7);"
  + "color: #fff;"
  + "border-radius: 17px;"
  + "padding: 8px 11px;"
  + "border: none;"
  + "z-index: 1000;"
  + "box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);"
  + "font-size: 18px;";
  
  document.body.appendChild(elmMessage);

  var leftpos = document.body.clientWidth/2 - document.getElementById("elmMessage").clientWidth/2;
  document.getElementById("elmMessage").style.cssText += "margin-left: " + leftpos + "px;";
}
