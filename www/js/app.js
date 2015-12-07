angular.module('todo', ['ionic','ngCordova'])


.run(function ($state,$rootScope) {
    $rootScope.$state = $state;
	
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
	  cache: false,
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

.controller('TodoCtrl', function($scope,$ionicSideMenuDelegate,$ionicPopup,$ionicLoading,$cordovaCamera,$cordovaFile,$ionicModal) {

  document.addEventListener("deviceready", onDeviceReady, false);
  
  function onDeviceReady() {
		//alert('device ready');
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
    }, 1);
  }); 

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
		
		var myPopup =$ionicPopup.confirm({
			title: 'Send?',
			template: 'Are you sure you wana send this form?',
			okText: 'Ja',
			cancelText: 'Nein'
		  }).then(function(res) {
			if (res) {
					// Setup the loader
			$ionicLoading.show({
					template: 'Sending...',
					animation: 'fade-in',
					showBackdrop: true,
					maxWidth: 200,
					showDelay: 0
			});
					
			
			var url = "http://etho.pl/unpunktlich.php";
			var request_arr=[ {vorname: $("[name='vorname']").val(), name: $("[name='name']").val(), email: $("[name='email']").val() , verspaetung: $("[name='verspaetung']").val(), informiert: $("[name='informiert']").val() , verpasst: $("[name='verpasst']").val(), datum: $("[name='datum']").val(),  uhrzeit: $("[name='uhrzeit']").val(),  startpunkt: startpunkt_v,  endpunkt: $("[name='endpunkt']").val(), linie: linie_v, mitteilung: $("[name='mitteilung']").val()   } ];
			var request= array2json(request_arr);
				
				jQuery.support.cors = true;
				$.ajax({
								url: url,
								async: false,
								contentType: "text/html",
								data: { 'unpunktlichkeitmelden': request },
								
								success: function () {
									$ionicLoading.hide();
									if($scope.preventSuccessPopup==0) $ionicPopup.alert({title:'Success!',template:'Your form was sent'})
									
								},
								error:  function(jqXHR, textStatus, ex) {
									//alert(textStatus + "," + ex + "," + jqXHR.responseText);
									$scope.preventSuccessPopup=1;
									$ionicLoading.hide();
									$ionicPopup.alert({title:'Network error!',template:'Your form was NOT sent. Try again later'});
									
								}
							});
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
	
	$scope.saveNeues = function() {
	
		var record = [ {
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
			startpunkt: $("[name='startpunkt']").val(),
			endpunkt: $("[name='endpunkt']").val(),
			stadt: $("[name='stadt']").val(),
			linie: $("[name='linie']").val(),
			richtung: $("[name='richtung']").val(),
			verkehrsunternehmen: $("[name='verkehrsunternehmen']").val(),
			datum: $("[name='datum']").val(),
			taxinutzung: $("[name='taxinutzung']").val(),
			fernverkehr: $("[name='fernverkehr']").val(),
			bemerkungen: $("[name='bemerkungen']").val(),
			images: $scope.images 
			} ];
		
		var currentTime=new Date();
		var key=currentTime.getFullYear() + '-' + pad(currentTime.getMonth() + 1,2) + '-' + pad(currentTime.getDate(),2) + ' ' + pad(currentTime.getHours(),2) + ':' + pad(currentTime.getMinutes(),2) + ':' + pad(currentTime.getSeconds(),2);
	
		
		var formsInProgress_js = window.localStorage.getItem('formsInProgress');
		var formsInProgress;
		var formsInProgress=eval("(" + formsInProgress_js + ")");
		if (!(Object.prototype.toString.call( formsInProgress ) === '[object Array]'))
		{
			formsInProgress = [ { title: key , record: record }  ];
		}
		else 
		{
			formsInProgress.push( { title: key , record: record } );
		}
		window.localStorage.setItem('formsInProgress',array2json(formsInProgress));
		$ionicPopup.alert({title:'Success!',template:'Your form has been saved'});
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
	
	$scope.submitNeues = function () {
		 $scope.email=	$("[name='email']").val();
		 $scope.preventSuccessPopup=0;
		 
		 $ionicModal.fromTemplateUrl('templates/email-modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		  }).then(function(modal) {
			$scope.modal = modal
			$scope.modal.show(); 	
		  })  
		  
		
	}	
	
		
	$scope.sendPDF = function () {
		$scope.closeModal();
		$scope.sendto =	$("[name='sendto']").val();
		
		$ionicLoading.show({
					template: 'Generating PDF...',
					animation: 'fade-in',
					showBackdrop: true,
					maxWidth: 200,
					showDelay: 0
			});
		
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
			
		
		
		var createPDF = function(imgData) {
					

			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
				
			    fileSystem.root.getFile("erstattungsform.pdf", {create: true}, function(entry) {
				  var fileEntry = entry;
				  
				  
				  entry.createWriter(function(writer) {
					 writer.onwrite = function(evt) {
					 console.log("write success");
				  };
			 
				  var fname = fileEntry.name;
				fpath = fileEntry.fullPath;
				NativePath = fileEntry.toNativeURL();
				alert("fname: " + fname + "\nfpath: " + fpath);
				alert("NativePath: " + NativePath);
		
				  
					 var doc = new jsPDF();
			
					doc.addImage(imgData, 'JPEG', 0, 0, 200, 350); 
					doc.text(70,50,'This is form to'+$scope.sendto);
					
					writer.write(  doc.output("blob") );
					$ionicLoading.hide();
				    
					cordova.plugins.email.open({
						to:      [$scope.sendto],
						bcc:     ['tomek.kabarowski@gmail.com'],
						subject: 'Neues erstattungsformular',
						body:    'Please find your neues erstattungsformular attached',
						isHtml:  true,
						attachments: [NativePath]
					});
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
		
		getImageFromUrl('img/form.jpg', createPDF);
		/*
		

		//NEXT SAVE IT TO THE DEVICE'S LOCAL FILE SYSTEM
		
		
			
		
		*/
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
		 }
		 
		 });
	}
	
	$scope.urlForImage = function(imageName) {
	  var name = imageName.substr(imageName.lastIndexOf('/') + 1);
	  var trueOrigin = cordova.file.dataDirectory + name;
	  //return trueOrigin;
	  return imageName;
	}
	
	$scope.showImages = function(index) {
		 $scope.activeSlide = index;
		 $scope.showModal('templates/image-popover.html');
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
	$scope.savedforms=eval("(" + formsInProgress_js + ")");
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
	
	
	$scope.groups = [{name:"Profildaten",  items: [ { type: 'text', name: 'vorname', placeholder: 'Vorname', value: window.localStorage.getItem('vorname') } , { type: 'text', name: 'name', placeholder: 'Name', value: window.localStorage.getItem('name') } , { type: 'email', name: 'email', placeholder: 'E-Mail-Addresse', value: window.localStorage.getItem('email') }, { type: 'text', name:'phone', placeholder: 'Telefon', value: window.localStorage.getItem('phone') } ]}, {name:"Adresse",  items: [ { type: 'text', name: 'street', placeholder: 'Straße', value: window.localStorage.getItem('street') } , { type: 'text', name: 'flat', placeholder: 'Nr', value: window.localStorage.getItem('flat') } , { type: 'text', name: 'postcode', placeholder: 'PLZ', value: window.localStorage.getItem('postcode') }, { type: 'text', name: 'city', placeholder: 'Ort', value: window.localStorage.getItem('city') } ]}, {name:"Kontoverbindung",  items: [ { type: 'text', name: 'accountholder', placeholder: 'Kontoinhaber', value: window.localStorage.getItem('accountholder') } , { type: 'text', name: 'iban', placeholder: 'IBAN', value: window.localStorage.getItem('iban')  } , { type: 'text', name: 'bic', placeholder: 'BIC', value: window.localStorage.getItem('bic')  }]}, {name:"Vorschlagswerte für Fahrt",  items: [ { type: 'text', name: 'ticketname', placeholder: 'Ticketname', value: window.localStorage.getItem('ticketname')  } , { type: 'select', name: 'tarifraum', placeholder: 'Tarifraum', value: window.localStorage.getItem('tarifraum') , options:  [ { value: 'VRR' , name: 'Verkehrsverbund Rhein-Ruhr (VRR)' }, { value: 'VGMVRL' , name: 'Münsterland-/Ruhr-Lippe-Tarif (VGM/VRL)' }, { value: 'VGWS' , name: 'Verkehrsgemeinschaft Westfalen-Süd (VGWS)' }, { value: 'VRS' , name: 'Verkehrsverbund Rhein-Sieg (VRS)' }, { value: 'OWL' , name: 'Der Sechser (OWL Verkehr)' }, { value: 'VGN' , name: 'Verkehrsgemeinschaft Niederrhein (VGN)' }, { value: 'AVV' , name: 'Aachener Verkehrsverbund (AVV)' }, { value: 'VPH' , name: 'Verkehrs-Servicegesellschaft Paderborn/Höxter (VPH)' }, { value: 'NRW' , name: 'NRW-Tarif' } ] } , { type: 'text', name: 'startpunkt', placeholder: 'Planmäßige Abfahrt', value: window.localStorage.getItem('startpunkt')  } , { type: 'text', name: 'endpunkt', placeholder: 'Einstiegshaltestelle', value: window.localStorage.getItem('endpunkt')  } , { type: 'text', name: 'stadt', placeholder: 'Stadt/Gemeinde', value: window.localStorage.getItem('stadt')  } , { type: 'text', name: 'linie', placeholder: 'Linie', value: window.localStorage.getItem('linie')  } , { type: 'text', name: 'richtung', placeholder: 'Richtung/Zielhaltestelle der Linie', value: window.localStorage.getItem('richtung')  } ,  { type: 'text', name: 'verkehrsunternehmen', placeholder: 'verkehrsunternehmen', value: window.localStorage.getItem('verkehrsunternehmen')  } ]} ];
	
	
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


.controller('LoadNeuenCtrl', function($scope) {
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
		var formsInProgress=eval("(" + formsInProgress_js + ")");
		var record=formsInProgress[$scope.loadNeueFromOld-1];
		
		
		
		
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
		var startpunkt=record['record'][0]['startpunkt'];
		var endpunkt=record['record'][0]['endpunkt'];
		var stadt=record['record'][0]['stadt'];
		var linie=record['record'][0]['linie'];
		var richtung=record['record'][0]['richtung'];
		var verkehrsunternehmen=record['record'][0]['verkehrsunternehmen'];
		
		var n_taxinutzung=record['record'][0]['taxinutzung'];
		var n_fernverkehr=record['record'][0]['fernverkehr'];
		var n_bemerkungen=record['record'][0]['bemerkungen'];
		var datum=record['record'][0]['datum'];
		
		$scope.loadimages=record['record'][0]['images'];
	
	
	$scope.groups = [ {name:"Angaben zum Ticket",  items: [ { type: 'text', name: 'ticketname', placeholder: 'Ticketname', value: ticketname } , { type: 'select', name: 'tarifraum', placeholder: 'Tarifraum', value: 'tarifraum' }  ]} , {name:"Infos zur verspäteten Fahrt",  items: [ { type: 'date', name: 'datum', placeholder: datum, value: datum } , { type: 'text', name: 'zug', placeholder: 'Zug-Nr', value: '' } , { type: 'text', name: 'startpunkt', placeholder: 'Planmäßige Abfahrt:', value: startpunkt }, { type: 'text', name:'endpunkt', placeholder: 'Einstiegshaltestell', value: endpunkt }, { type: 'text', name:'stadt', placeholder: 'Stadt/Gemeinde', value: stadt }, { type: 'text', name:'linie', placeholder: 'Linie', value: linie }, { type: 'text', name:'richtung', placeholder: 'Richtung/Zielhaltestelle der Linie', value: richtung }, { type: 'text', name:'verkehrsunternehmen', placeholder: 'Verkehrsunternehmen', value: verkehrsunternehmen } ]} , {name:"Entstandene Kosten",  items: [ { type: 'text', name: 'taxinutzung', placeholder: 'Taxinutzung kosten', value: n_taxinutzung } , { type: 'text', name: 'fernverkehr', placeholder: 'Fernverkehr kosten', value: n_fernverkehr }  , { type: 'textarea', name: 'bemerkungen', placeholder: 'Bemerkungen', value: n_bemerkungen } ]} , {name:"Antragsteller",  items: [ { type: 'text', name: 'vorname', placeholder: 'Vorname', value: vorname } , { type: 'text', name: 'name', placeholder: 'Name', value: name }  , { type: 'text', name: 'street', placeholder: 'Straße', value: street }, { type: 'text', name: 'postcode', placeholder: 'PLZ', value: postcode } , { type: 'text', name: 'city', placeholder: 'Ort', value: city } , { type: 'text', name: 'phone', placeholder: 'Telefon (Angabe freiwillig)', value: phone } , { type: 'text', name: 'email', placeholder: 'E-Mail (Angabe freiwillig)', value: email }  ]} , {name:"Kontodaten",  items: [ { type: 'text', name: 'accountholder', placeholder: 'Kontoinhaber', value: accountholder } , { type: 'text', name: 'iban', placeholder: 'IBAN', value: iban }  , { type: 'text', name: 'bic', placeholder: 'BIC', value: bic }  ]} , {name:"Rechtliche Hinweise",  items: [ { type: 'checkbox', name: 'check1', placeholder: '', value: 'Ich stimme der Weitergabe meiner Daten an andere Verkehrsverbünde bzw. Verkehrsgemeinschaften und Verkehrsunternehmen im Rahmen der Abwicklung meines Erstattungsantrages zu. Nach Abwicklung meines Erstattungsantrages werden meine weitergegebenen Daten bei Dritten gelöscht. Bei fehlender Zustimmung wird der vorliegende Erstattungsantrag nicht bearbeitet.' } , { type: 'checkbox', name: 'check2', placeholder: '', value: 'Ich bin damit einverstanden, dass meine Kontaktdaten für Marktforschung im Zusammenhang mit den Fahrgastrechten verwendet und anschließend anonymisiert genutzt werden.' } ]} ];
	
	
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
		var startpunkt=window.localStorage.getItem('startpunkt');
		var endpunkt=window.localStorage.getItem('endpunkt');
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
		
	
	
	
	$scope.groups = [ {name:"Angaben zum Ticket",  items: [ { type: 'text', name: 'ticketname', placeholder: 'Ticketname', value: ticketname } , { type: 'select', name: 'tarifraum', placeholder: 'Tarifraum', value: 'tarifraum' }  ]} , {name:"Infos zur verspäteten Fahrt",  items: [ { type: 'date', name: 'datum', placeholder: datum, value: datum } , { type: 'text', name: 'zug', placeholder: 'Zug-Nr', value: '' } , { type: 'text', name: 'startpunkt', placeholder: 'Planmäßige Abfahrt:', value: startpunkt }, { type: 'text', name:'endpunkt', placeholder: 'Einstiegshaltestell', value: endpunkt }, { type: 'text', name:'stadt', placeholder: 'Stadt/Gemeinde', value: stadt }, { type: 'text', name:'linie', placeholder: 'Linie', value: linie }, { type: 'text', name:'richtung', placeholder: 'Richtung/Zielhaltestelle der Linie', value: richtung }, { type: 'text', name:'verkehrsunternehmen', placeholder: 'Verkehrsunternehmen', value: verkehrsunternehmen } ]} , {name:"Entstandene Kosten",  items: [ { type: 'text', name: 'taxinutzung', placeholder: 'Taxinutzung kosten', value: n_taxinutzung } , { type: 'text', name: 'fernverkehr', placeholder: 'Fernverkehr kosten', value: n_fernverkehr }  , { type: 'textarea', name: 'bemerkungen', placeholder: 'Bemerkungen', value: n_bemerkungen } ]} , {name:"Antragsteller",  items: [ { type: 'text', name: 'vorname', placeholder: 'Vorname', value: vorname } , { type: 'text', name: 'name', placeholder: 'Name', value: name }  , { type: 'text', name: 'street', placeholder: 'Straße', value: street }, { type: 'text', name: 'postcode', placeholder: 'PLZ', value: postcode } , { type: 'text', name: 'city', placeholder: 'Ort', value: city } , { type: 'text', name: 'phone', placeholder: 'Telefon (Angabe freiwillig)', value: phone } , { type: 'text', name: 'email', placeholder: 'E-Mail (Angabe freiwillig)', value: email }  ]} , {name:"Kontodaten",  items: [ { type: 'text', name: 'accountholder', placeholder: 'Kontoinhaber', value: accountholder } , { type: 'text', name: 'iban', placeholder: 'IBAN', value: iban }  , { type: 'text', name: 'bic', placeholder: 'BIC', value: bic }  ]} , {name:"Rechtliche Hinweise",  items: [ { type: 'checkbox', name: 'check1', placeholder: '', value: 'Ich stimme der Weitergabe meiner Daten an andere Verkehrsverbünde bzw. Verkehrsgemeinschaften und Verkehrsunternehmen im Rahmen der Abwicklung meines Erstattungsantrages zu. Nach Abwicklung meines Erstattungsantrages werden meine weitergegebenen Daten bei Dritten gelöscht. Bei fehlender Zustimmung wird der vorliegende Erstattungsantrag nicht bearbeitet.' } , { type: 'checkbox', name: 'check2', placeholder: '', value: 'Ich bin damit einverstanden, dass meine Kontaktdaten für Marktforschung im Zusammenhang mit den Fahrgastrechten verwendet und anschließend anonymisiert genutzt werden.' } ]} ];
	
	
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
});
  
