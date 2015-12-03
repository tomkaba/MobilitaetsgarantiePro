function css_click(id) {
	
	$(id).css("background","#adb9a6");
	/*
	$(id).css("background-image","-webkit-linear-gradient(top, color, #2980b9)");
	$(id).css("background-image","-moz-linear-gradient(top, color, #2980b9)");
	$(id).css("background-image","-ms-linear-gradient(top, color, #2980b9)");
	$(id).css("background-image","-o-linear-gradient(top, color, #2980b9)");
	$(id).css("background-image","linear-gradient(to bottom, color, #2980b9)");
	*/
	$(id).css("-webkit-border-radius","28");
	$(id).css("-moz-border-radius","28");
	$(id).css("border-radius","28");
	
	$(id).css("-webkit-box-shadow","0px 1px 3px #666666");
	$(id).css("-moz-box-shadow","0px 1px 3px #666666");
	$(id).css("box-shadow","0px 1px 3px #666666");
	
	
}

function css_unclick(id) {
	$(id).css("background","#008a4e");
	$(id).css("border","0px");
	$(id).css("-webkit-border-radius","28");
	$(id).css("-moz-border-radius","28");
	$(id).css("border-radius","28");
}


function disable(id) {
	$(id).css("background","#AAAAAA");
	$(id).css("color","#BBBBBB");	
	$(id).css("-webkit-border-radius","28");
	$(id).css("-moz-border-radius","28");
	$(id).css("border-radius","28");

	$(id).attr("x-href", $(id).attr("href"));
	$(id).removeAttr("href");
}

function enable(id) {
	$(id).css("background","#3498db");
	$(id).css("color","#ffffff");
	$(id).css("-webkit-border-radius","28");
	$(id).css("-moz-border-radius","28");
	$(id).css("border-radius","28");

	if(typeof $(id).attr("x-href") != 'undefined')
	{
		$(id).attr("href", $(id).attr("x-href"));
	}
}

function set_topbar_title(title) {
	$("#topbartitle").html(title);
}

function reset_topbar_title() {
	set_topbar_title('Schlichtungsstelle Nahverkehr');
}

function set_description(description)
{
	$("#description").html(description);
}
function show(id) {
	$(id).css("display","inline-block");
}
function hide(id) {
	$(id).css("display","none");
}


function displaysidebarmenuicon() {
	$("#topbar").css("display","block");
}

function hidesidebarmenuicon() {
	$("#topbar").css("display","none");
}

function displaybottombar() {
	$("#bottombar").css("display","block");
}

function hidebottombar() {
	$("#bottombar").css("display","none");
}


function showPopUpMessage(msg) {

                overlayElement = document.createElement("div");
                overlayElement.className = 'modalOverlay';
                modalWindowElement = document.createElement("div");
                modalWindowElement.className = 'modalWindow';
                modalWindowElement.innerHTML = msg;
                modalWindowElement.style.left = (window.innerWidth - 200) / 2 + "px";
                document.body.appendChild(overlayElement);
                document.body.appendChild(modalWindowElement);
                setTimeout(function() {
                    modalWindowElement.style.opacity = 1;
                    overlayElement.style.opacity = 0.4;
                    overlayElement.addEventListener("click", hidePopUpMessage, false);
                }, 300);
            }
//hide the modal overlay and popup window
function hidePopUpMessage() {
                modalWindowElement.style.opacity = 0;
                overlayElement.style.opacity = 0;
                overlayElement.removeEventListener("click", hidePopUpMessage, false);
                setTimeout(function() {
                    document.body.removeChild(overlayElement);
                    document.body.removeChild(modalWindowElement);
                }, 400);
}

function o1d1n() {
		var description="Nach der Mobilitätsgarantie gibt es einen Erstattungsanspruch ab einer Verspätung bei der Abfahrt von 20 Minuten Ist die Verspätung kürzer als 20 Minuten, haben Sie keinen Erstattungsanspruch. Melden Sie uns die Verspätung trotzdem!";
		css_click("#button_nein");
		set_description(description);
		show("#dialog_description");
		show('#unpunktlichbutton'); 
}


function o1d2n() {
		var description="In Ihrem Fall kommt eine Entschädigung nach dem Fahrgastrechtegesetz in Betracht, wenn Ihre Verspätung sich am Zielbahnhof auf mehr als 60 Minuten beläuft. Weitere Informationen dazu finden Sie unter <a href=\"#\" onclick=\"window.open('http://www.schlichtungsstelle-nahverkehr.de/fahrgastrechte', '_system'); return false;\">http://www.schlichtungsstelle-nahverkehr.de/fahrgastrechte</a>";
		css_click("#button_nein");
		set_description(description);
		show("#dialog_description");
		show('#unpunktlichbutton'); 
}

function o1d3y() {
		
		css_click("#button_ja");
		show("#d3subquestion");
		show("#dialog_subquestion_description");
		show("#d3subquestion_janein");
}



function o1d3By() {
		var description="Sie müssen eine zumutbare Fahrtalternative nutzen. Ein Erstattungsanspruch nach Mobilitätsgarantie NRW besteht nicht. Melden Sie uns die Verspätung trotzdem!";	
		set_description(description);
		css_click("#button_ja2");
		show("#dialog_description");
		show('#unpunktlichbutton'); 
}


function o1d4y() {
		var description="Sie haben keinen Anspruch nach der Mobilitätsgarantie.  Melden Sie uns die Verspätung trotzdem!";
		css_click("#button_ja");
		set_description(description);
		show("#dialog_description");
		show('#unpunktlichbutton'); 
}

function o1d5y() {
		var description="Sie müssen ein Ticket für den Fernverkehrszug kaufen. Der Preis wird inklusive Bordpreis voll erstattet. Sie dürfen zwischen Taxi und Fernverkehrszug frei wählen, wenn an Ihrer Haltestelle beides möglich ist. ";
		css_click("#button_ja");	
		css_unclick("#button_nein");
		enable("#button_next");
		show("#dialog_ja_nein");	
		set_description(description);
		show("#dialog_description");
		//$("#weiterbutton").attr("href","#/t/o17");
		//show("#weiterbutton");
}

function o1d6y() {
		var description="Verspätung tagsüber (05:00 bis 20:00 Uhr)?";
		css_click("#button_ja");	
		css_unclick("#button_nein");
		$("#d6subquestion").css('height','60px');
		$("#d6subquestion").css('font-size','17px');
		$("#d6subquestion").css('text-align','center');
		$("#d6subquestion").html(description);
		set_description(description);	
		show("#d6subquestion");
		show("#d6subquestion_janein");
		hide('#unpunktlichbutton'); 
}

function o1d6n() {
		var description="Sie haben keinen Anspruch aufgrund der Verspätung, da es bei der Mobilitätsgarantie nur um die Erstattung tatsächlich entstandener Kosten für die Weiterreise geht und nicht um eine Kompensation für Verspätungen/Wartezeit. In Ihrem Fall kommt vielleicht eine Entschädigung nach dem Fahrgastrechtegesetz in Betracht, wenn Ihre Verspätung sich am Zielbahnhof auf mehr als 60 Minuten beläuft. Weitere Informationen dazu finden Sie unter <a href=\"#\" onclick=\"window.open('http://www.example.org', '_system'); return false;\">www.example.org</a>.";
		css_click("#button_nein");	
		css_unclick("#button_ja");
		css_unclick("#button_ja2");
		css_unclick("#button_nein2");
		hide("#weiterbutton");
		hide("#dialog_description");
		hide("#d6subquestion_janein");
	    $("#d6subquestion").css('height','260px');
		$("#d6subquestion").css('font-size','13px');
		$("#d6subquestion").css('text-align','left');
		$("#d6subquestion").html(description);
		
		show('#d6subquestion');
		show('#unpunktlichbutton'); 
}

function o1d6Bn() {
		var description="Bei einer Verspätung zwischen 20:00 Uhr und 05:00 Uhr können nach der Mobilitätsgarantie die Kosten für das Taxi bis zu <b>50,- € pro Person</b> erstattet werden. <b>Mehr...</b>";
		
		enable("#button_next");
		css_unclick("#button_ja2");
		css_click("#button_nein2");
		set_description(description);
		show("#dialog_description");
		$("#weiterbutton").attr("href","#/t/o17");
		show("#weiterbutton");
}

function o1d6By() {
		var description="Bei einer Verspätung zwischen 05:00 Uhr und 20:00 Uhr können nach der Mobilitätsgarantie die Kosten für das Taxi bis zu <b>25,- € pro Person</b> erstattet werden. <b>Mehr...</b>";
		
		enable("#button_next");
		css_click("#button_ja2");
		css_unclick("#button_nein2");
		set_description(description);
		show("#dialog_description");
		$("#weiterbutton").attr("href","#/t/o17");
		show("#weiterbutton");
}


function submitProfildaten() {
	var vorname=$("[name='vorname']").val();
	var name=$("[name='name']").val();
	var email=$("[name='email']").val();
	var phone=$("[name='phone']").val();
	var flat=$("[name='flat']").val();
	var street=$("[name='street']").val();
	var postcode=$("[name='postcode']").val();
	var city=$("[name='city']").val();
	var accountholder=$("[name='accountholder']").val();
	var iban=$("[name='iban']").val();
	var bic=$("[name='bic']").val();
	var ticketname=$("[name='ticketname']").val();
	var tarifraum=$("[name='tarifraum']").val();
	var startpunkt=$("[name='startpunkt']").val();
	var endpunkt=$("[name='endpunkt']").val();
	var stadt=$("[name='stadt']").val();
	var linie=$("[name='linie']").val();
	var richtung=$("[name='richtung']").val();
	var verkehrsunternehmen=$("[name='verkehrsunternehmen']").val();
	

	window.localStorage.setItem('vorname',vorname);
	window.localStorage.setItem('name',name);
	window.localStorage.setItem('email',email);
	window.localStorage.setItem('phone',phone);
	window.localStorage.setItem('street',street);
	window.localStorage.setItem('flat',flat);
	window.localStorage.setItem('postcode',postcode);
	window.localStorage.setItem('city',city);
	window.localStorage.setItem('accountholder',accountholder);
	window.localStorage.setItem('iban',iban);
	window.localStorage.setItem('bic',bic);
	window.localStorage.setItem('ticketname',ticketname);
	window.localStorage.setItem('tarifraum',tarifraum);
	window.localStorage.setItem('startpunkt',startpunkt);
	window.localStorage.setItem('endpunkt',endpunkt);
	window.localStorage.setItem('stadt',stadt);
	window.localStorage.setItem('linie',linie);
	window.localStorage.setItem('richtung',richtung);
	window.localStorage.setItem('verkehrsunternehmen',verkehrsunternehmen);
	
	
	
	 // process the confirmation dialog result
	 
    function onConfirm(button) {
        if (button==2)
		{
			hide('#savebutton');
			window.location.hash="#/t/mm";
		}
		else 
			window.location.hash="#/t/profildaten";
    }

    // Show a custom confirmation dialog
    //
    if (navigator.notification) {
	    navigator.notification.confirm(
            'Möchten Sie zurück zum Hauptmenü?',  // message
            onConfirm,              // callback to invoke with index of button pressed
            'Daten wurden gesichert',            // title
            'Nein,Hauptmenü'          // buttonLabels
        );
   	} else {
			var r=confirm('Möchten Sie zurück zum Hauptmenü?');
			if (r==true) 
			{
				window.location.hash="#/t/mm";
			}
	}
	
		
    
	
	return false;
}

function assignLsProfildaten() {
	$("[name='vorname']").val(window.localStorage.getItem('vorname'));
	$("[name='name']").val(window.localStorage.getItem('name'));
	$("[name='email']").val(window.localStorage.getItem('email'));
	$("[name='phone']").val(window.localStorage.getItem('phone'));
	$("[name='street']").val(window.localStorage.getItem('street'));
	$("[name='flat']").val(window.localStorage.getItem('flat'));
	$("[name='postcode']").val(window.localStorage.getItem('postcode'));
	$("[name='city']").val(window.localStorage.getItem('city'));
	$("[name='accountholder']").val(window.localStorage.getItem('accountholder'));
	$("[name='iban']").val(window.localStorage.getItem('iban'));
	$("[name='bic']").val(window.localStorage.getItem('bic'));
	$("[name='ticketname']").val(window.localStorage.getItem('ticketname'));
	$("[name='tarifraum']").val(window.localStorage.getItem('tarifraum'));
	$("[name='startpunkt']").val(window.localStorage.getItem('startpunkt'));
	$("[name='endpunkt']").val(window.localStorage.getItem('endpunkt'));
	$("[name='stadt']").val(window.localStorage.getItem('stadt'));
	$("[name='linie']").val(window.localStorage.getItem('linie'));
	$("[name='richtung']").val(window.localStorage.getItem('richtung'));
	$("[name='verkehrsunternehmen']").val(window.localStorage.getItem('verkehrsunternehmen'));
}

function clearNeuesForm() {
	
	$("[name='vorname']").val('');
	$("[name='name']").val('');
	$("[name='email']").val('');
	$("[name='phone']").val('');
	$("[name='street']").val('');
	$("[name='flat']").val('');
	$("[name='postcode']").val('');
	$("[name='city']").val('');
	$("[name='accountholder']").val('');
	$("[name='iban']").val('');
	$("[name='bic']").val('');
	$("[name='ticketname']").val('');
	$("[name='tarifraum']").val('');
	$("[name='startpunkt']").val('');
	$("[name='endpunkt']").val('');
	$("[name='stadt']").val('');
	$("[name='linie']").val('');
	$("[name='richtung']").val('');
	$("[name='verkehrsunternehmen']").val('');
	var currentTime=new Date();
	var datum=currentTime.getFullYear() + '-' + pad(currentTime.getMonth() + 1,2) + '-' + pad(currentTime.getDate(),2) ;
	$("[name='datum']").val(datum);
	$("[name='taxinutzung']").val('');
	$("[name='fernverkehr']").val('');
	$("[name='bemerkungen']").val('');
	$("[name='check1']").attr('checked', false);
	$("[name='check2']").attr('checked', false);
}

function a() {
                //var wsUrl = "http://s18591189.onlinehome-server.info/portals/dataportal";
				var wsUrl = "http://195.244.239.47/portals/dataportal";
                var request =
'<?xml version="1.0" encoding="utf-8"?> \
    <mserviceRequest responseEncoding="UTF-8" version="2.0.2"> \
    <portal version="5.7.0" name="handyPortal" triggerTime="2015-11-09 17:49:48 +0000"> \
        <data/> \
    </portal> \
    <device appName="HT Beta" appVersion="6" deviceName="iPhone" deviceTyp="iOS" osVersion="8.1" \
            deviceId="A42419D9-8F07-4155-A431-9E9147D5DD33"/> \
    <processes> \
        <process act="generic.ListOrganisationProzess" id="proc01" lang="pl"> \
            <ident> \
                <alias/> \
                <scode type="0"/> \
            </ident> \
            <data> \
                <listOrganisations> \
                    <gps> \
                        <longitude>8.49648</longitude> \
                        <latitude>50.1211</latitude> \
                    </gps> \
                </listOrganisations> \
            </data> \
        </process> \
    </processes> \
</mserviceRequest> ';

                $.ajax({
                    type: "POST",
                    url: wsUrl,
                    contentType: "text/html",
                    dataType: "xml",
                    data: request,
                    success: processSuccess,
                    error: processError
                });

}

function sendformSuccess(data, status, req) {
            if (status == "success")
                alert('Your form was sent');
}


function processSuccess(data, status, req) {
            if (status == "success")
                alert('Your form was sent');
}

function processError(data, status, req) {
            alert("REQ: " + req.responseText + " STATUS: " + status);
}  


function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

function array2json(arr) {
    var parts = [];
    var is_list = (Object.prototype.toString.apply(arr) === '[object Array]');

    for(var key in arr) {
    	var value = arr[key];
        if(typeof value == "object") { //Custom handling for arrays
            if(is_list) parts.push(array2json(value)); /* :RECURSION: */
            else parts.push('"' + key + '":' + array2json(value)); /* :RECURSION: */
            //else parts[key] = array2json(value); /* :RECURSION: */
            
        } else {
            var str = "";
            if(!is_list) str = '"' + key + '":';

            //Custom handling for multiple data types
            if(typeof value == "number") str += value; //Numbers
            else if(value === false) str += 'false'; //The booleans
            else if(value === true) str += 'true';
            else str += '"' + value + '"'; //All other things
            // :TODO: Is there any more datatype we should be in the lookout for? (Functions?)

            parts.push(str);
        }
    }
    var json = parts.join(",");
    
    if(is_list) return '[' + json + ']';//Return numerical JSON
    return '{' + json + '}';//Return associative JSON
}


