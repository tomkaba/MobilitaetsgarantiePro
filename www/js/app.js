angular.module('todo', ['ionic'])


.run(function($ionicPlatform, $ionicPopup) {
  
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

.controller('TodoCtrl', function($scope,$ionicSideMenuDelegate,$ionicPopup) {
  $scope.toggleMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.$on('$ionicView.afterEnter', function(){
    setTimeout(function(){
      document.getElementById("custom-overlay").style.display = "none";      
    }, 2000);
  });  
})

.controller('MainmenuCtrl', function($scope) {
	set_topbar_title('Schlichtungsstelle Nahverkehr');
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#unpunktlichbutton'); 
	hidebottombar();
	assignLsProfildaten();
})

.controller('UnpunktlichCtrl', function($scope) {
	set_topbar_title('Unpünktlichkeit melden');
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#savebutton'); 
	hide('#unpunktlichbutton'); 
	displaybottombar();
	assignLsProfildaten();
})


.controller('ProfildatenCtrl', function($scope) {
	set_topbar_title('Profildaten / Vorlagen');
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#unpunktlichbutton'); 
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




.controller('O1Ctrl', function($scope) {
	$("#zuruckbutton").attr('href','#/t/mm'); 
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#unpunktlichbutton'); 
	hide("#savebutton"); 
	set_topbar_title('Erstattungsanspruch prüfen 1/7'); 
	displaybottombar();
})
.controller('O12Ctrl', function($scope) {
	$("#zuruckbutton").attr('href','#/t/o1'); 
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#unpunktlichbutton'); 
	hide("#savebutton"); 
	set_topbar_title('Erstattungsanspruch prüfen 2/7'); 
	displaybottombar();
})
.controller('O13Ctrl', function($scope) {
	$("#zuruckbutton").attr('href','#/t/o12'); 
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#unpunktlichbutton'); 
	hide("#savebutton"); 
	set_topbar_title('Erstattungsanspruch prüfen 3/7'); 
	displaybottombar();
})
.controller('O14Ctrl', function($scope) {
	$("#zuruckbutton").attr('href','#/t/o13'); 
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#unpunktlichbutton'); 
	hide("#savebutton"); 
	set_topbar_title('Erstattungsanspruch prüfen 4/7'); 
	displaybottombar();
})
.controller('O15Ctrl', function($scope) {
	$("#zuruckbutton").attr('href','#/t/o14'); 
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#unpunktlichbutton'); 
	hide("#savebutton"); 
	set_topbar_title('Erstattungsanspruch prüfen 5/7'); 
	displaybottombar();
})
.controller('O16Ctrl', function($scope) {
	$("#zuruckbutton").attr('href','#/t/o15'); 
	hide('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#unpunktlichbutton'); 
	hide("#savebutton"); 
	set_topbar_title('Erstattungsanspruch prüfen 6/7'); 
	displaybottombar();
})
.controller('O17Ctrl', function($scope) {
	$("#zuruckbutton").attr('href','#/t/o15'); 
	show('#formularbutton'); 
	hide('#weiterbutton'); 
	hide('#unpunktlichbutton'); 
	hide("#savebutton"); 
	set_topbar_title('Erstattungsanspruch prüfen 7/7'); 
	displaybottombar();
});
  
