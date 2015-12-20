angular.module('todo', ['ionic','ngCordova'])


.run(function ($state,$rootScope) {
    $rootScope.$state = $state;
	$rootScope.images = [];
	$rootScope.pdfimages=[];
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('t', {
      url: "/t",
      abstract: true,
      templateUrl: "templates/sidebarmenu.html"
    })
    .state('t.mainmenu', {
      url: "/mm",
	  cache: true,
      views: {
        'menuContent' :{
          templateUrl: "templates/mainmenu.html",
		  controller: "MainmenuCtrl"
        }
      }
    })
	.state('t.profildaten', {
      url: "/profildaten",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "templates/profildaten.html",
		  controller: "ProfildatenCtrl"
        }
      }
    })
	.state('t.unpunktlich', {
      url: "/unpunktlich",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "templates/unpunktlich.html",
		  controller: "UnpunktlichCtrl"
        }
      }
    })
	
	.state('t.neuen', {
		url: "/neuen",
		cache: false,
		views: {
        'menuContent' :{
          templateUrl: "templates/neuen.html",
		  controller: "NeuenCtrl"
        }
      }
    })
	
	.state('t.neuen2', {
		url: "/loadneuen",
		cache: false,
		views: {
        'menuContent' :{
          templateUrl: "templates/loadneuen.html",
		  controller: "LoadNeuenCtrl"
        }
      }
    })
	
	.state('t.info', {
		url: "/info",
		cache: false,
		views: {
        'menuContent' :{
          templateUrl: "templates/info.html",
		  controller: "InfoCtrl"
        }
      }
    })

	
	.state('t.saved', {
      url: "/saved",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "templates/saved.html",
		  controller: "SavedCtrl"
        }
      }
    })
	
	.state('t.o1', {
      url: "/o1",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "templates/o1.html",
		  controller: "O1Ctrl"
        }
      }
    })
	
	.state('t.o12', {
      url: "/o12",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "templates/o12.html",
		  controller: "O12Ctrl"
        }
      }
    })
	
	.state('t.o13', {
      url: "/o13",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "templates/o13.html",
		  controller: "O13Ctrl"
        }
      }
    })
	
	.state('t.o14', {
      url: "/o14",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "templates/o14.html",
		  controller: "O14Ctrl"
        }
      }
    })
	
	.state('t.o15', {
      url: "/o15",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "templates/o15.html",
		  controller: "O15Ctrl"
        }
      }
    })
	
	.state('t.o16', {
      url: "/o16",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "templates/o16.html",
		  controller: "O16Ctrl"
        }
      }
    })
	
	.state('t.o17', {
      url: "/o17",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "templates/o17.html",
		  controller: "O17Ctrl"
        }
      }
    })
   
	.state('t.test', {	
	   url: "/test",
	   cache: false,
	   views: {
		 'menuContent' :{
          templateUrl: "templates/test.html",
		  controller: "TestCtrl"
         }
	   
	  }
	})
  
  $urlRouterProvider.otherwise("/t/mm");
})

.controller('TestCtrl', function($scope) {

})

.controller('TodoCtrl', function($scope,$rootScope,$ionicSideMenuDelegate,$ionicPopup,$ionicLoading,$cordovaCamera,$cordovaFile,$ionicModal) {

  document.addEventListener("deviceready", onDeviceReady, false);
  
  function onDeviceReady() {
		//alert('device ready');
		navigator.splashscreen.hide();
		window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, failFS);

		function gotFS(fileSystem) {
		  //alert("entered gotFS: " + fileSystem.root.toURL());
		}
		
		function failFS() {
			alert('fail');
		}
		
		
  }

 
  $scope.toggleMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  
  $scope.$on('$ionicView.afterEnter', function(){
    setTimeout(function(){
      document.getElementById("custom-overlay").style.display = "none";      
    }, 2000);
  }); 
  
  $scope.listdata=[];
  
  $scope.showList = function(){
	$ionicLoading.show({
					template: 'Please wait...',
					animation: 'fade-in',
					showBackdrop: true,
					maxWidth: 200,
					showDelay: 0
			});
			
	function getStations(position) {
						//var wsUrl = "http://s18591189.onlinehome-server.info/portals/dataportal";
						//var wsUrl = "http://195.244.239.47/portals/dataportal"; //TVM
						var wsUrl = "http://195.244.239.51/portals/dataportal"; //EVM
						//var wsUrl = "https://www.handyticket.de/portals/dataportal"; //Livesystem
/*			
alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
*/

			var lon=position.coords.longitude;
			var lat = position.coords.latitude;
				
			var s=$("[name='endpunkt']").val();
			if(s=='Berlin')
			{
				lon=	"13.365317"; 
				lat= "52.523172";	
			}
			
						//alert(wsUrl);
						
						
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
								<longitude>'+lon+'</longitude> \
								<latitude>'+lat+'</latitude> \
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

			};
	
			function processSuccess(data, status, req) {
				   $ionicLoading.hide();
				   $scope.listdata = [];
	
				   
				   
				   var station;
				   var str=req.responseText;
	//			   alert('RESPONSE:' + str);
				   var matches=str.match(/name="[^"]+"/g);
				   if(matches!=null)
				   {
					   
					   
					   for(i=0;i< matches.length;i++) {
						 
						 station=matches[i].replace('name="','');
						 station=station.replace(/"$/,'');
						 //alert(station);
						 $scope.listdata.push(station);
					   }
					   
					   var confirmPopup = $ionicPopup.confirm({
						 template: ' <div class="list">'+
								   '  <select id="stationlist">'+
								   '    <option ng-repeat="item in listdata" value="{{item}}"> {{item}}</option>'+
								   '  </select></div>                             '+
								   '</div>                        ',
						 
						 title: 'Select Startpunkt',
						 scope: $scope
					   }).then(function(res) {
						if(res) {
							$("[name='startpunkt']").val($("#stationlist").val());
						}
					  });
				   }
				   else
				   {
						var confirmPopup = $ionicPopup.alert({
							template: 'No stations were detected nearby. Please enter your Startpunkt manually.',
							title: 'No stations'
					    });
				   }
			}

			function processError(data, status, req) {
					$ionicLoading.hide();
					alert("NETWORK ERROR! REQ: " + req.responseText + " STATUS: " + status);
			}  
 
		var GPSonSuccess = function(position) {
				getStations(position);
			};

		// onError Callback receives a PositionError object
		//
		function GPSonError(error) {
					$ionicLoading.hide();
					alert('Error! code: '    + error.code    + '\n' +
						  'message: ' + error.message + '\n');
				}
	 
	navigator.geolocation.getCurrentPosition(GPSonSuccess, GPSonError);
 } 

  $scope.submitUnpunktlich = function() {
		var startpunkt_v = $("[name='startpunkt']").val();
		var linie_v = $("[name='linie']").val();
		$scope.preventSuccessPopup=0;
		
		if(!startpunkt_v.length) 
		{
			$ionicPopup.alert({title:'No data',template:'Please enter Startpunkt'});
			return false;
		}
		if(!linie_v.length) 
		{
			$ionicPopup.alert({title:'No data',template:'Please enter Linie'});
			return false;
		}
		
		
		$ionicLoading.show({
					template: 'Sending...',
					animation: 'fade-in',
					showBackdrop: true,
					maxWidth: 200,
					showDelay: 0
		});
					
			
			var url = "http://etho.pl/unpunktlich.php";
			var request_arr=[ {vorname: $("[name='vorname']").val(), name: $("[name='name']").val(), email: $("[name='email']").val() , verspaetung: $("[name='verspaetung']").val(), informiert: $("[name='informiert']").val() , verpasst: $("[name='verpasst']").val(), datum: $("[name='datum']").val(),  uhrzeit: $("[name='uhrzeit']").val(),  starttime: $("[name='starttime']").val(), startpunkt: startpunkt_v,  linie: linie_v, mitteilung: $("[name='mitteilung']").val()   } ];
			var request= array2json(request_arr);
				
				jQuery.support.cors = true;
				$.ajax({
								url: url,
								async: false,
								contentType: "text/html",
								data: { 'unpunktlichkeitmelden': request },
								
								success: function () {
									$ionicLoading.hide();
									if($scope.preventSuccessPopup==0) $ionicPopup.alert({title:'Success!',template:'Ihre Meldung wurde an die Schlichtungsstelle Nahverkehr übermittelt.'})
									window.location.hash="#/t/mm";
								},
								error:  function(jqXHR, textStatus, ex) {
									$scope.preventSuccessPopup=1;
									$ionicLoading.hide();
									$ionicPopup.alert({title:'Network error!',template:'ERROR! Ihre Meldung wurde NICHT übermittelt. Try again later'});
									//window.location.hash="#/t/mm";
								}
							});

		
	}; 
	
	$scope.clearNeues = function() {
		$ionicPopup.confirm({
			title: 'Clear form?',
			template: 'Are you sure you wana clear all data in this form?'
		  }).then(function(res) {
			if (res) {
				clearNeuesForm();
				$scope.tarifraum=0;
			}
		});
	
	}
	
	$scope.saveNeues = function(alert_off) {
	
		var record = [ {
			vorname: encodeURI($("[name='vorname']").val()),
			name: encodeURI($("[name='name']").val()),
			email: encodeURI($("[name='email']").val()),
			phone: encodeURI($("[name='phone']").val()),
			street: encodeURI($("[name='street']").val()),
			flat: encodeURI($("[name='flat']").val()),
			postcode: encodeURI($("[name='postcode']").val()),
			city: encodeURI($("[name='city']").val()),
			accountholder: encodeURI($("[name='accountholder']").val()),
			iban: encodeURI($("[name='iban']").val()),
			bic: encodeURI($("[name='bic']").val()),
			ticketname: encodeURI($("[name='ticketname']").val()),
			tarifraum: encodeURI($("[name='tarifraum']").val()),
			starttime: encodeURI($("[name='starttime']").val()),
			startpunkt: encodeURI($("[name='startpunkt']").val()),
			stadt: encodeURI($("[name='stadt']").val()),
			linie: encodeURI($("[name='linie']").val()),
			richtung: encodeURI($("[name='richtung']").val()),
			verkehrsunternehmen: encodeURI($("[name='verkehrsunternehmen']").val()),
			datum: encodeURI($("[name='datum']").val()),
			taxinutzung: encodeURI($("[name='taxinutzung']").val()),
			fernverkehr: encodeURI($("[name='fernverkehr']").val()),
			bemerkungen: encodeURI($("[name='bemerkungen']").val()),
			images: $rootScope.images 
			} ];
		
			
		
		var currentTime=new Date();
		var key=currentTime.getFullYear() + '-' + pad(currentTime.getMonth() + 1,2) + '-' + pad(currentTime.getDate(),2) + ' ' + pad(currentTime.getHours(),2) + ':' + pad(currentTime.getMinutes(),2) + ':' + pad(currentTime.getSeconds(),2) + ' ' + encodeURI($("[name='startpunkt']").val());
	
		
		var formsInProgress_js = window.localStorage.getItem('formsInProgress');
		var formsInProgress=eval("(" + formsInProgress_js + ")");
		
		var status;
		if(!alert_off) status=false;
			else status=true;
		
		if (!(Object.prototype.toString.call( formsInProgress ) === '[object Array]'))
		{
			formsInProgress = [ { title: key , record: record, status:  status} ] ;
		}
		else 
		{
			formsInProgress.push( { title: key , record: record, status: status } );
		}
		
		var json=array2json(formsInProgress);
		
		window.localStorage.setItem('formsInProgress',json);
		if(!alert_off) $ionicPopup.alert({title:'Success!',template:'Das Formular wurde gesichert'});
		return false;
	}
	
	$scope.saveLoadNeues = function(alert_off) {
	
		var record = [ {
			vorname: encodeURI($("[name='vorname']").val()),
			name: encodeURI($("[name='name']").val()),
			email: encodeURI($("[name='email']").val()),
			phone: encodeURI($("[name='phone']").val()),
			street: encodeURI($("[name='street']").val()),
			flat: encodeURI($("[name='flat']").val()),
			postcode: encodeURI($("[name='postcode']").val()),
			city: encodeURI($("[name='city']").val()),
			accountholder: encodeURI($("[name='accountholder']").val()),
			iban: encodeURI($("[name='iban']").val()),
			bic: encodeURI($("[name='bic']").val()),
			ticketname: encodeURI($("[name='ticketname']").val()),
			tarifraum: encodeURI($("[name='tarifraum']").val()),
			starttime: encodeURI($("[name='starttime']").val()),
			startpunkt: encodeURI($("[name='startpunkt']").val()),
			stadt: encodeURI($("[name='stadt']").val()),
			linie: encodeURI($("[name='linie']").val()),
			richtung: encodeURI($("[name='richtung']").val()),
			verkehrsunternehmen: encodeURI($("[name='verkehrsunternehmen']").val()),
			datum: encodeURI($("[name='datum']").val()),
			taxinutzung: encodeURI($("[name='taxinutzung']").val()),
			fernverkehr: encodeURI($("[name='fernverkehr']").val()),
			bemerkungen: encodeURI($("[name='bemerkungen']").val()),
			images: $scope.loadimages 
			} ];
		
		
		
		var currentTime=new Date();
		var key=currentTime.getFullYear() + '-' + pad(currentTime.getMonth() + 1,2) + '-' + pad(currentTime.getDate(),2) + ' ' + pad(currentTime.getHours(),2) + ':' + pad(currentTime.getMinutes(),2) + ':' + pad(currentTime.getSeconds(),2) + ' ' + encodeURI($("[name='startpunkt']").val());
		
		
		
		var formsInProgress_js = window.localStorage.getItem('formsInProgress');
		var formsInProgress=eval("(" + formsInProgress_js + ")");
		
		if( formsInProgress[$scope.loadNeueFromOld-1]['status'] !== true)
			formsInProgress.splice($scope.loadNeueFromOld-1, 1);
		
		var status;
		if(!alert_off) status=false;
			else status=true;
		
		if (!(Object.prototype.toString.call( formsInProgress ) === '[object Array]'))
		{
			formsInProgress = [ { title: key , record: record, status:  status} ] ;
		}
		else 
		{
			formsInProgress.push( { title: key , record: record, status: status } );
		}
		
		var json=array2json(formsInProgress);
		
		window.localStorage.setItem('formsInProgress',json);
		if(!alert_off) $ionicPopup.alert({title:'Success!',template:'Das Formular wurde gesichert'});
		return false;
	}
	
	$scope.deleteNeues = function () {
		window.localStorage.removeItem('formsInProgress');
		window.location.hash="#/t/mm";
		return false;
	}
	
	$scope.loadNeueForm = function (id) {
		$scope.loadNeueFromOld=id+1;
		$scope.$state.go('t.neuen2', {id:id+1, cache: false}, {cache:false,reload: true});
		return true;
	}
	
	$scope.deleteNeueForm = function (id) {
		var formsInProgress_js = window.localStorage.getItem('formsInProgress');
		var formsInProgress=eval("(" + formsInProgress_js + ")");
		formsInProgress.splice(id, 1);
		window.localStorage.setItem('formsInProgress',array2json(formsInProgress));
		
		formsInProgress_js = window.localStorage.getItem('formsInProgress');
		
		$scope.savedforms=eval("(" + formsInProgress_js + ")");
		$scope.$state.go($scope.$state.current, {}, {reload: true});
		return true;
	}
	
	$scope.addCalendarEntry = function(id) {
		var formsInProgress_js = window.localStorage.getItem('formsInProgress');
		var formsInProgress=eval("(" + formsInProgress_js + ")");
		var datum=formsInProgress[id]['record'][0]['datum'].split("-");
		//console.log(datum);
		datum[0]=parseInt(datum[0]);
		datum[1]=parseInt(datum[1]);
		datum[2]=parseInt(datum[2]);
		
		newdate= new Date(datum[0],datum[1],datum[2]+28,12,0,0);
		enddate= new Date(datum[0],datum[1],datum[2]+28,12,10,0);
		var title = "Response from Schlichtungsstelle Nahverkehr";
		var eventLocation = "Home";
		var notes = "I should have response from Schlichtungsstelle Nahverkehr regarding my Erstattungsantrag";
		var success = function(message) { $ionicPopup.alert({title:'Calendar',template:'Reminder added on date '+newdate});};
		var error = function(message) { alert("Error: " + message); };
		//console.log(newdate);
		if(ionic.Platform.isAndroid())
		{
		  //window.plugins.calendar.createEventInteractively(title,eventLocation,notes,newdate,enddate,success,error);
		  window.plugins.calendar.createEvent(title,eventLocation,notes,newdate,enddate,success,error); 	
		}
		else
		{
		  window.plugins.calendar.createEvent(title,eventLocation,notes,newdate,enddate,success,error); 	
		}
		
	}
	
	
	$scope.showLoadImages = function(index) {
		 $scope.src=urlForImage(index);
		 alert(index);
		 alert($scope.src);
		 $ionicModal.fromTemplateUrl('templates/image-modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		  }).then(function(modal) {
			$scope.modal = modal;
			$scope.modal.show(); 	
		  })  
	}
	
	$scope.submitNeues = function () {
		 $scope.email=	$("[name='email']").val();
		 $scope.preventSuccessPopup=0;
		 
		 $ionicModal.fromTemplateUrl('templates/email-modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		  }).then(function(modal) {
			$scope.modal = modal;
			$scope.modal.show(); 	
		  })  
		  
		
	}	
	
		
	$scope.sendPDF = function (loadmode) {
	
		//$scope.closeModal();
		$ionicLoading.show({
					template: 'Generating PDF...',
					animation: 'fade-in',
					showBackdrop: true,
					maxWidth: 200,
					showDelay: 0
			});
		
		var record = {
			vorname: $("[name='vorname']").val(),
			name: $("[name='name']").val(),
			email: $("[name='email']").val(),
			phone: $("[name='phone']").val(),
			street: $("[name='street']").val(),
			flat: $("[name='flat']").val(),
			postcode: $("[name='postcode']").val(),
			city: $("[name='city']").val(),
			accountholder: $("[name='accountholder']").val(),
			iban: $("[name='iban']").val(),
			bic: $("[name='bic']").val(),
			ticketname: $("[name='ticketname']").val(),
			tarifraum: $("[name='tarifraum']").val(),
			starttime: $("[name='starttime']").val(),
			startpunkt: $("[name='startpunkt']").val(),
			stadt: $("[name='stadt']").val(),
			linie: $("[name='linie']").val(),
			richtung: $("[name='richtung']").val(),
			verkehrsunternehmen: $("[name='verkehrsunternehmen']").val(),
			datum: (($("[name='datum']").val()).replace(/-/g,"")).substr(2),
			taxinutzung: $("[name='taxinutzung']").val(),
			fernverkehr: $("[name='fernverkehr']").val(),
			bemerkungen: $("[name='bemerkungen']").val(),
			images: $scope.images, 
			zug:$("[name='zug']").val(),
			} ;
			
		
		$scope.saveNeues(1);
		$scope.sendto =	$("[name='email']").val();
		
		
		
		//FIRST GENERATE THE PDF DOCUMENT
		var getImageFromUrl = function(url, callback) {
			var img = new Image();
			
			img.onError = function() {
				alert('Cannot load image: "'+url+'"');
			};
			img.onload = function() {
				callback(img);
			};
			img.src = url;
		}
				
		
		
		
		
		var doc = new jsPDF();
		var margin = 0;
		
		var createPDF = function() {
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
				
			    fileSystem.root.getFile("erstattungsform.pdf", {create: true}, function(entry) {
				  var fileEntry = entry;
				  
				  
				entry.createWriter(function(writer) {
					 writer.onwrite = function(evt) {
						console.log("write success");
				     };
					 
					 writer.onwriteend = function(evt) {
						$ionicLoading.hide();
						
						//cordova.plugins.email.isAvailable(
						//	function(isAvailable) {
						//		alert(isAvailable);
								cordova.plugins.email.open({
								to:      [$scope.sendto],
								bcc:     ['tomek.kabarowski@gmail.com'],
								subject: 'Neues erstattungsformular',
								body:    'Please find your neues erstattungsformular attached',
								isHtml:  true,
								attachments: [NativePath]
								},function() {
									//alert('email view dismissed');
									true;
								});
						//	}
						// );
					};
			 
					var fname = fileEntry.name;
					fpath = fileEntry.fullPath;
					NativePath = fileEntry.toNativeURL();
					//alert("fname: " + fname + "\nfpath: " + fpath);
					
					NativePath = NativePath.replace('file:///localhost/','');
					// alert("NativePath: " + NativePath); 
					var doc = new jsPDF();
			
					doc.addImage(imgData0, 'JPEG', 0, 0, 21, 297); 
					doc.addImage(imgData1, 'JPEG', 21, 0, 21, 297); 
					doc.addImage(imgData2, 'JPEG', 42, 0, 21, 297); 
					doc.addImage(imgData3, 'JPEG', 63, 0, 21, 297); 
					doc.addImage(imgData4, 'JPEG', 84, 0, 21, 297); 
					doc.addImage(imgData5, 'JPEG', 105, 0, 21, 297); 
					doc.addImage(imgData6, 'JPEG', 126, 0, 21, 297); 
					doc.addImage(imgData7, 'JPEG', 147, 0, 21, 297); 
					doc.addImage(imgData8, 'JPEG', 168, 0, 21, 297); 
					doc.addImage(imgData9, 'JPEG', 189, 0, 21, 297); 
					
					
					
					
					doc.setFontSize(7);
					var comment=record["bemerkungen"];
					if(comment.length) {
						var c_arr=comment.match(/(.|[\r\n]){1,60}/g); 
						for(i=0;i<c_arr.length&&i<5;i++)
						{
						   doc.text(80,122+(i*4),c_arr[i]);
						}
					}
					
					var posX=0;
					var posY=0;
					switch(record["tarifraum"]) 	{
						case 'VRR' : posX=35; posY=71; break;
						case 'VGMVRL' : posX=76; posY=71; break;
						case 'VGWS' : posX=137; posY=71; break;
						case 'VRS' : posX=35; posY=74; break;
						case 'OWL' : posX=76; posY=74; break;
						case 'VGN' : posX=137; posY=74; break;
						case 'AVV' : posX=35; posY=77; break;
						case 'VPH' : posX=76; posY=77; break;
						case 'NRW' : posX=137; posY=77; break;
					}
					doc.setFontSize(13);
					doc.text(posX,posY,'X');
					
					doc.setFont('terminal');
					doc.setFontSize(11);
					doc.text(22,64,record["ticketname"]);
					doc.text(22,100,record["datum"]);
					doc.text(43,100,record["zug"]);
					doc.text(61,100,record["starttime"]);
					doc.text(77,100,record["startpunkt"]);
					doc.text(127,100,record["stadt"]);
					doc.text(22,109,record["linie"]);
					doc.text(61,109,record["richtung"]);
					doc.text(127,109,record["verkehrsunternehmen"]);
					doc.text(22,129,record["taxinutzung"]);
					doc.text(48,129,record["fernverkehr"]);
					doc.text(41,160,record["vorname"]);
					doc.text(115,160,record["name"]);
					doc.text(22,169,record["street"]);
					doc.text(101,169,record["flat"]);
					doc.text(115,169,record["postcode"]);
					doc.text(133,169,record["city"]);
					doc.text(22,178,record["phone"]);
					doc.text(115,178,record["email"]);
					doc.text(22,195,record["accountholder"]);
					doc.text(22,204,record["iban"]);
					doc.text(133,204,record["bic"]);
					
					
					
					
					encodeImageUri = function(imageUri, callback) {
						var c = document.createElement('canvas');
						var ctx = c.getContext("2d");
						var img = new Image();
						img.onload = function() {
							c.width = this.width*0.2;
							c.height = this.height*0.2;
							
							ctx.drawImage(img, 0, 0, c.width, c.height);
								
							if(typeof callback === 'function'){
								var dataURL = c.toDataURL("image/jpeg");
								callback(dataURL,c.height);
							}
						};
						img.src = imageUri;
					}
					
					var cnt=0;
					for($i=0;$i<$rootScope.images.length;$i++)
					{
						encodeImageUri($rootScope.images[$i], function(base64,height){
						  doc.addPage();
						  doc.addImage(imgPage2,0,0,210,297);	
						  doc.addImage(base64,20,130,120,120);
						  cnt++;
						  if(cnt==$rootScope.images.length) writer.write(  doc.output("blob") );
						});
					}
					
					if($rootScope.images.length==0) 
					{
						doc.addPage();
						doc.addImage(imgPage2,0,0,210,297);	
						if(cnt==$rootScope.images.length) writer.write(  doc.output("blob") );
					}
					
					
				  }, function(error) {
					 alert(error);
				  });
			 
			   }, function(error){
				  console.log(error);
			   });
			   
			   
			},
			function(event){
			 console.log( evt.target.error.code );
			});
			
		};
		
		
		encodeImageUri = function(imageUri, callback) {
						var c = document.createElement('canvas');
						var ctx = c.getContext("2d");
						
						var img = new Image();
						img.onload = function() {
							c.width = this.width*0.5;
							c.height = this.height*0.5;
								
							ctx.drawImage(img, 0, 0,c.width,c.height);
								
							if(typeof callback === 'function'){
								var dataURL = c.toDataURL("image/jpeg");
								callback(dataURL,c.height);
							}
						};
						img.src = imageUri;
		}
		/*
		var doc = new jsPDF();
			
					doc.addImage(imgPage2,0,0,210,297);	
					
					encodeImageUri("/butterfly.jpg", function(base64,height){
						  
						 
						  doc.addImage(base64,0,0,120,120);
						  doc.output("dataurlnewwindow");
						});
		
*/
			
					
				
				
		createPDF();
		
				
		
	}
	
	
	
	$scope.images = [];
	$scope.loadimages = [];
	$scope.loadNeueFromOld = 0;
	 
	$scope.addImage = function(loadmode) {
		var mode=loadmode;
		 // 2
		 var options = {
		 destinationType : Camera.DestinationType.FILE_URI,
		 sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
		 allowEdit : false,
		 encodingType: Camera.EncodingType.JPEG,
		 popoverOptions: CameraPopoverOptions,
		 };
		 
		 // 3
		 $cordovaCamera.getPicture(options).then(function(imageData) {
		 
		 // 4
		 onImageSuccess(imageData);
		 
		 function onImageSuccess(fileURI,loadmode) {
			createFileEntry(fileURI);
		 }
		 
		 function createFileEntry(fileURI) {
			window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
		 }
		 
		 // 5
		 function copyFile(fileEntry) {
			 var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
			 var newName = makeid() + name;
			 
			 window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
			 fileEntry.copyTo(
			 fileSystem2,
			 newName,
			 onCopySuccess,
			 fail
			 );
			 },
			 fail);
		 }
		 
		 // 6
		 function onCopySuccess(entry) {
			
			 $scope.$apply(function () {
					if(mode==1)
						$scope.loadimages.push(entry.nativeURL);
					else $scope.images.push(entry.nativeURL);
					
					$rootScope.images.push(entry.nativeURL);
			 });
		 }
		 
		 function fail(error) {
			alert("error: " + error.code);
		 }
		 
		 function makeid() {
			 var text = "";
			 var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			 
			 for (var i=0; i < 5; i++) {
			 text += possible.charAt(Math.floor(Math.random() * possible.length));
			 }
			 return text;
			 }
			 
			 }, function(err) {
			 console.log(err);
		 });
		 
	}
	
	
	$scope.getImage = function(loadmode) {
		 var mode=loadmode; 	
		 // 2
		 var options = {
		 destinationType : Camera.DestinationType.FILE_URI,
		 sourceType : Camera.PictureSourceType.PHOTOLIBRARY, // Camera.PictureSourceType.PHOTOLIBRARY
		 allowEdit : false,
		 encodingType: Camera.EncodingType.JPEG,
		 popoverOptions: CameraPopoverOptions,
		 };
		 
		 // 3
		 $cordovaCamera.getPicture(options).then(function(imageData) {
		 
		 // 4
		 onImageSuccess(imageData);
		 
		 function onImageSuccess(fileURI) {
			 if(mode==1) $scope.loadimages.push(fileURI);
			 else $scope.images.push(fileURI);
			 
			 $rootScope.images.push(fileURI);
		 }
		 
		 });
	}
	
	$scope.urlForImage = function(imageName) {
	  var name = imageName.substr(imageName.lastIndexOf('/') + 1);
	  var trueOrigin = cordova.file.dataDirectory + name;
	  //return trueOrigin;
	  return imageName;
	}
	
	
	
	$scope.showModal = function(templateUrl) {
		 $ionicModal.fromTemplateUrl(templateUrl, {
			scope: $scope
		 }).then(function(modal) {
			 $scope.modal = modal;
			 $scope.modal.show();
		 });
	}
	 
	 // Close the modal
	$scope.closeModal = function() {
		$scope.modal.hide();
		$scope.modal.remove()
	};
	
	
})

.controller('MainmenuCtrl', function($scope) {
	set_topbar_title('Schlichtungsstelle Nahverkehr');
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#unpunktlichbutton'); 
	hide('#unpsendbutton');
	hide('#clearbutton');
	hidebottombar();
	assignLsProfildaten();

})

.controller('UnpunktlichCtrl', function($scope) {
	set_topbar_title('Unpünktlichkeit melden');
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#savebutton'); 
	hide('#unpunktlichbutton'); 
	hide('#clearbutton');
	show('#unpsendbutton');
	displaybottombar();
	assignLsProfildaten();
	

})

.controller('SavedCtrl', function($scope) {
	set_topbar_title('Meine Erstattungen');
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#savebutton'); 
	hide('#unpunktlichbutton'); 
	hide('#clearbutton');
	hide('#unpsendbutton');
	displaybottombar();
	
	var formsInProgress_js = window.localStorage.getItem('formsInProgress');
	console.log(formsInProgress_js);
	//alert(formsInProgress_js );
	//$scope.savedforms=eval("(" + formsInProgress_js + ")");
	var raw_savedforms=JSON.parse(formsInProgress_js);
	//console.log(raw_savedforms);
	var savedforms=decodeURIArray(raw_savedforms);
	//console.log(savedforms);
	$scope.savedforms=savedforms;
})

.controller('ProfildatenCtrl', function($scope) {
	
	

	set_topbar_title('Profildaten / Vorlagen');
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#unpunktlichbutton'); 
	hide('#unpsendbutton');
	hide('#clearbutton');
	show('#savebutton');
	displaybottombar();
	
	
	$scope.groups = [{name:"Profildaten",  items: [ { type: 'text', name: 'vorname', placeholder: 'Vorname', value: window.localStorage.getItem('vorname') } , { type: 'text', name: 'name', placeholder: 'Name', value: window.localStorage.getItem('name') } , { type: 'email', name: 'email', placeholder: 'E-Mail-Addresse', value: window.localStorage.getItem('email') }, { type: 'text', name:'phone', placeholder: 'Telefon', value: window.localStorage.getItem('phone') } ]}, {name:"Adresse",  items: [ { type: 'text', name: 'street', placeholder: 'Straße', value: window.localStorage.getItem('street') } , { type: 'text', name: 'flat', placeholder: 'Nr', value: window.localStorage.getItem('flat') } , { type: 'text', name: 'postcode', placeholder: 'PLZ', value: window.localStorage.getItem('postcode') }, { type: 'text', name: 'city', placeholder: 'Ort', value: window.localStorage.getItem('city') } ]}, {name:"Kontoverbindung",  items: [ { type: 'stacked', name: 'accountholder', placeholder: 'Kontoinhaber', value: window.localStorage.getItem('accountholder') } , { type: 'stacked', name: 'iban', placeholder: 'IBAN', value: window.localStorage.getItem('iban')  } , { type: 'stacked', name: 'bic', placeholder: 'BIC', value: window.localStorage.getItem('bic')  }]}, {name:"Vorschlagswerte für Fahrt",  items: [ { type: 'text', name: 'ticketname', placeholder: 'Ticketname', value: window.localStorage.getItem('ticketname')  } , { type: 'select', name: 'tarifraum', placeholder: 'Tarifraum', value: window.localStorage.getItem('tarifraum') , options:  [ { value: 'VRR' , name: 'Verkehrsverbund Rhein-Ruhr (VRR)' }, { value: 'VGMVRL' , name: 'Münsterland-/Ruhr-Lippe-Tarif (VGM/VRL)' }, { value: 'VGWS' , name: 'Verkehrsgemeinschaft Westfalen-Süd (VGWS)' }, { value: 'VRS' , name: 'Verkehrsverbund Rhein-Sieg (VRS)' }, { value: 'OWL' , name: 'Der Sechser (OWL Verkehr)' }, { value: 'VGN' , name: 'Verkehrsgemeinschaft Niederrhein (VGN)' }, { value: 'AVV' , name: 'Aachener Verkehrsverbund (AVV)' }, { value: 'VPH' , name: 'Verkehrs-Servicegesellschaft Paderborn/Höxter (VPH)' }, { value: 'NRW' , name: 'NRW-Tarif' } ] } , { type: 'time', name: 'starttime', placeholder: 'Planmäßige Abfahrt', value: window.localStorage.getItem('starttime')  } , { type: 'text', name: 'startpunkt', placeholder: 'Einstiegshaltestelle', value: window.localStorage.getItem('startpunkt')  } , { type: 'text', name: 'stadt', placeholder: 'Stadt/Gemeinde', value: window.localStorage.getItem('stadt')  } , { type: 'text', name: 'linie', placeholder: 'Linie', value: window.localStorage.getItem('linie')  } , { type: 'text', name: 'richtung', placeholder: 'Richtung/Zielhaltestelle der Linie', value: window.localStorage.getItem('richtung')  } ,  { type: 'text', name: 'verkehrsunternehmen', placeholder: 'Verkehrsunternehmen', value: window.localStorage.getItem('verkehrsunternehmen')  } ]}, {name:"Kalendereintrag",  items: [ { type: 'checkbox', name: 'calendar', placeholder: 'Automatischer Kalendereintrag erzeugen', value: window.localStorage.getItem('calendar') }  ]} ];
	
	
	$scope.tarifraum=window.localStorage.getItem('tarifraum');
	$scope.flag=0;
	
    $scope.toggleGroup = function (group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function (group) {
		
		return $scope.shownGroup === group;
    };
	
})


.controller('LoadNeuenCtrl', function($scope,$rootScope) {
	set_topbar_title('Neues Erstattungsformular');
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#unpunktlichbutton'); 
	hide('#unpsendbutton');
	show('#clearbutton');
	hide('#savebutton');
	
	displaybottombar();
	
		console.log($scope.$state.current);
		//alert($scope.$state.current.url);
		
		
		var formsInProgress_js = window.localStorage.getItem('formsInProgress');
		var raw_formsInProgress=eval("(" + formsInProgress_js + ")");
		var formsInProgress=decodeURIArray(raw_formsInProgress);
		//console.log(formsInProgress);
		var record=formsInProgress[$scope.loadNeueFromOld-1];
		
		//alert(record['record'][0]['startpunkt']);
		
		
		//console.log(record);
		var vorname=record['record'][0]['vorname'];
		var name=record['record'][0]['name'];
		var email=record['record'][0]['email'];
		var phone=record['record'][0]['phone'];
		var flat=record['record'][0]['flat'];
		var street=record['record'][0]['street'];
		var postcode=record['record'][0]['postcode'];
		var city=record['record'][0]['city'];
		var accountholder=record['record'][0]['accountholder'];
		var iban=record['record'][0]['iban'];
		var bic=record['record'][0]['bic'];
		var ticketname=record['record'][0]['ticketname'];
		var tarifraum=record['record'][0]['tarifraum'];
		var starttime=record['record'][0]['starttime'];
		var startpunkt=record['record'][0]['startpunkt'];
		var stadt=record['record'][0]['stadt'];
		var linie=record['record'][0]['linie'];
		var richtung=record['record'][0]['richtung'];
		var verkehrsunternehmen=record['record'][0]['verkehrsunternehmen'];
		
		var n_taxinutzung=record['record'][0]['taxinutzung'];
		var n_fernverkehr=record['record'][0]['fernverkehr'];
		var n_bemerkungen=record['record'][0]['bemerkungen'];
		var datum=record['record'][0]['datum'];
		
		$scope.loadimages=record['record'][0]['images'];
		$rootScope.images=$scope.loadimages;
	
	$scope.groups = [ {name:"Angaben zum Ticket",  items: [ { type: 'text', name: 'ticketname', placeholder: 'Ticketname', value: ticketname } , { type: 'select', name: 'tarifraum', placeholder: 'Tarifraum', value: 'tarifraum' }  ]} , {name:"Infos zur verspäteten Fahrt",  items: [ { type: 'date', name: 'datum', placeholder: datum, value: datum } , { type: 'text', name: 'zug', placeholder: 'Zug-Nr', value: '' } , { type: 'text', name: 'starttime', placeholder: 'Planmäßige Abfahrt:', value: starttime }, { type: 'text', name:'startpunkt', placeholder: 'Einstiegshaltestell', value: startpunkt }, { type: 'text', name:'stadt', placeholder: 'Stadt/Gemeinde', value: stadt }, { type: 'text', name:'linie', placeholder: 'Linie', value: linie }, { type: 'text', name:'richtung', placeholder: 'Richtung/Zielhaltestelle der Linie', value: richtung }, { type: 'text', name:'verkehrsunternehmen', placeholder: 'Verkehrsunternehmen', value: verkehrsunternehmen } ]} , {name:"Entstandene Kosten",  items: [ { type: 'text', name: 'taxinutzung', placeholder: 'Taxinutzung', value: n_taxinutzung } , { type: 'text', name: 'fernverkehr', placeholder: 'Fernverkehr', value: n_fernverkehr }  , { type: 'textarea', name: 'bemerkungen', placeholder: 'Bemerkungen', value: n_bemerkungen } ]} , {name:"Antragsteller",  items: [ { type: 'text', name: 'vorname', placeholder: 'Vorname', value: vorname } , { type: 'text', name: 'name', placeholder: 'Name', value: name }  , { type: 'text', name: 'street', placeholder: 'Straße', value: street }, { type: 'text', name: 'flat', placeholder: 'Nr', value: flat}, { type: 'text', name: 'postcode', placeholder: 'PLZ', value: postcode } , { type: 'text', name: 'city', placeholder: 'Ort', value: city } , { type: 'text', name: 'phone', placeholder: 'Telefon (Angabe freiwillig)', value: phone } , { type: 'text', name: 'email', placeholder: 'E-Mail (Angabe freiwillig)', value: email }  ]} , {name:"Kontodaten",  items: [ { type: 'text', name: 'accountholder', placeholder: 'Kontoinhaber', value: accountholder } , { type: 'text', name: 'iban', placeholder: 'IBAN', value: iban }  , { type: 'text', name: 'bic', placeholder: 'BIC', value: bic }  ]} , {name:"Rechtliche Hinweise",  items: [ { type: 'checkbox', name: 'check1', placeholder: '', value: 'Ich stimme der Weitergabe meiner Daten an andere Verkehrsverbünde bzw. Verkehrsgemeinschaften und Verkehrsunternehmen im Rahmen der Abwicklung meines Erstattungsantrages zu. Nach Abwicklung meines Erstattungsantrages werden meine weitergegebenen Daten bei Dritten gelöscht. Bei fehlender Zustimmung wird der vorliegende Erstattungsantrag nicht bearbeitet.' } , { type: 'checkbox', name: 'check2', placeholder: '', value: 'Ich bin damit einverstanden, dass meine Kontaktdaten für Marktforschung im Zusammenhang mit den Fahrgastrechten verwendet und anschließend anonymisiert genutzt werden.' } ]} ];
	
	
    $scope.toggleGroup = function (group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function (group) {
		
		return $scope.shownGroup === group;
    };
	
})


.controller('NeuenCtrl', function($scope) {
	set_topbar_title('Neues Erstattungsformular');
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#unpunktlichbutton'); 
	hide('#unpsendbutton');
	show('#clearbutton');
	hide('#savebutton');
	displaybottombar();
	
		
		
		//alert($scope.$state.current.url);
		var vorname=window.localStorage.getItem('vorname');
		var name=window.localStorage.getItem('name');
		var email=window.localStorage.getItem('email');
		var phone=window.localStorage.getItem('phone');
		var flat=window.localStorage.getItem('flat');
		var street=window.localStorage.getItem('street');
		var postcode=window.localStorage.getItem('postcode');
		var city=window.localStorage.getItem('city');
		var accountholder=window.localStorage.getItem('accountholder');
		var iban=window.localStorage.getItem('iban');
		var bic=window.localStorage.getItem('bic');
		var ticketname=window.localStorage.getItem('ticketname');
		var tarifraum=window.localStorage.getItem('tarifraum');
		var starttime=window.localStorage.getItem('starttime');
		var startpunkt=window.localStorage.getItem('startpunkt');
		
		var stadt=window.localStorage.getItem('stadt');
		var linie=window.localStorage.getItem('linie');
		var richtung=window.localStorage.getItem('richtung');
		var verkehrsunternehmen=window.localStorage.getItem('verkehrsunternehmen');
		
		var n_taxinutzung=window.localStorage.getItem('n_taxinutzung');
		var n_fernverkehr=window.localStorage.getItem('n_fernverkehr');
		var n_bemerkungen=window.localStorage.getItem('n_bemerkungen');
	
	
		var currentTime=new Date();
		var datum=currentTime.getFullYear() + '-' + pad(currentTime.getMonth() + 1,2) + '-' + pad(currentTime.getDate(),2) ;
		
		$scope.tarifraum=window.localStorage.getItem('tarifraum');
		
	
	
	
	$scope.groups = [ {name:"Angaben zum Ticket",  items: [ { type: 'text', name: 'ticketname', placeholder: 'Ticketname', value: ticketname } , { type: 'select', name: 'tarifraum', placeholder: 'Tarifraum', value: 'tarifraum' }  ]} , {name:"Infos zur verspäteten Fahrt",  items: [ { type: 'date', name: 'datum', placeholder: 'Datum', value: datum } , { type: 'text', name: 'zug', placeholder: 'Zug-Nr', value: '' } , { type: 'time', name: 'starttime', placeholder: 'Planmäßige Abfahrt:', value: starttime }, { type: 'text', name:'startpunkt', placeholder: 'Einstiegshaltestell', value: startpunkt }, { type: 'text', name:'stadt', placeholder: 'Stadt/Gemeinde', value: stadt }, { type: 'text', name:'linie', placeholder: 'Linie', value: linie }, { type: 'text', name:'richtung', placeholder: 'Richtung/Zielhaltestelle der Linie', value: richtung }, { type: 'text', name:'verkehrsunternehmen', placeholder: 'Verkehrsunternehmen', value: verkehrsunternehmen } ]} , {name:"Entstandene Kosten",  items: [ { type: 'text', name: 'taxinutzung', placeholder: 'Taxinutzung', value: n_taxinutzung } , { type: 'text', name: 'fernverkehr', placeholder: 'Fernverkehr', value: n_fernverkehr }  , { type: 'textarea', name: 'bemerkungen', placeholder: 'Bemerkungen', value: n_bemerkungen } ]} , {name:"Antragsteller",  items: [ { type: 'text', name: 'vorname', placeholder: 'Vorname', value: vorname } , { type: 'text', name: 'name', placeholder: 'Name', value: name }  , { type: 'text', name: 'street', placeholder: 'Straße', value: street },{ type: 'text', name: 'flat', placeholder: 'Nr', value: flat}, { type: 'text', name: 'postcode', placeholder: 'PLZ', value: postcode } , { type: 'text', name: 'city', placeholder: 'Ort', value: city } , { type: 'text', name: 'phone', placeholder: 'Telefon (Angabe freiwillig)', value: phone } , { type: 'text', name: 'email', placeholder: 'E-Mail (Angabe freiwillig)', value: email }  ]} , {name:"Kontodaten",  items: [ { type: 'text', name: 'accountholder', placeholder: 'Kontoinhaber', value: accountholder } , { type: 'text', name: 'iban', placeholder: 'IBAN', value: iban }  , { type: 'text', name: 'bic', placeholder: 'BIC', value: bic }  ]} , {name:"Rechtliche Hinweise",  items: [ { type: 'checkbox', name: 'check1', placeholder: '', value: 'Ich stimme der Weitergabe meiner Daten an andere Verkehrsverbünde bzw. Verkehrsgemeinschaften und Verkehrsunternehmen im Rahmen der Abwicklung meines Erstattungsantrages zu. Nach Abwicklung meines Erstattungsantrages werden meine weitergegebenen Daten bei Dritten gelöscht. Bei fehlender Zustimmung wird der vorliegende Erstattungsantrag nicht bearbeitet.' } , { type: 'checkbox', name: 'check2', placeholder: '', value: 'Ich bin damit einverstanden, dass meine Kontaktdaten für Marktforschung im Zusammenhang mit den Fahrgastrechten verwendet und anschließend anonymisiert genutzt werden.' } ]} ];
	
	
    $scope.toggleGroup = function (group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function (group) {
		
		return $scope.shownGroup === group;
    };
	
})



.controller('O1Ctrl', function($scope) {
	$("#zuruckbutton").attr('href','#/t/mm'); 
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#unpunktlichbutton'); 
	hide('#unpsendbutton');
	hide('#clearbutton');
	hide("#savebutton"); 
	set_topbar_title('Erstattungsanspruch prüfen 1/7'); 
	displaybottombar();
})
.controller('O12Ctrl', function($scope) {
	$("#zuruckbutton").attr('href','#/t/o1'); 
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#unpunktlichbutton'); 
	hide('#unpsendbutton');
	hide('#clearbutton');
	hide("#savebutton"); 
	set_topbar_title('Erstattungsanspruch prüfen 2/7'); 
	displaybottombar();
})
.controller('O13Ctrl', function($scope) {
	$("#zuruckbutton").attr('href','#/t/o12'); 
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#unpunktlichbutton'); 
	hide('#unpsendbutton');
	hide('#clearbutton');
	hide("#savebutton"); 
	set_topbar_title('Erstattungsanspruch prüfen 3/7'); 
	displaybottombar();
})
.controller('O14Ctrl', function($scope) {
	$("#zuruckbutton").attr('href','#/t/o13'); 
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#unpunktlichbutton'); 
	hide('#unpsendbutton');
	hide('#clearbutton');
	hide("#savebutton"); 
	set_topbar_title('Erstattungsanspruch prüfen 4/7'); 
	displaybottombar();
})
.controller('O15Ctrl', function($scope) {
	$("#zuruckbutton").attr('href','#/t/o14'); 
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#unpunktlichbutton'); 
	hide('#unpsendbutton');
	hide('#clearbutton');
	hide("#savebutton"); 
	set_topbar_title('Erstattungsanspruch prüfen 5/7'); 
	displaybottombar();
})
.controller('O16Ctrl', function($scope) {
	$("#zuruckbutton").attr('href','#/t/o15'); 
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#unpunktlichbutton'); 
	hide('#unpsendbutton');
	hide('#clearbutton');
	hide("#savebutton"); 
	set_topbar_title('Erstattungsanspruch prüfen 6/7'); 
	displaybottombar();
})
.controller('O17Ctrl', function($scope) {
	$("#zuruckbutton").attr('href','#/t/o15'); 
	show('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#unpunktlichbutton'); 
	hide('#unpsendbutton');
	hide('#clearbutton');
	hide("#savebutton"); 
	set_topbar_title('Erstattungsanspruch prüfen 7/7'); 
	displaybottombar();
})
  
  
.controller('InfoCtrl', function($scope) {
	$("#zuruckbutton").attr('href','#/t/mm'); 
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#unpunktlichbutton'); 
	hide('#unpsendbutton');
	hide('#clearbutton');
	hide("#savebutton"); 
	set_topbar_title('Schlichtungsstelle Nahverkehr'); 
	displaybottombar();
});
