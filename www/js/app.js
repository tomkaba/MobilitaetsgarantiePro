angular.module('todo', ['ionic'])


.run(function($ionicPlatform, $ionicPopup) {
  // Disable BACK button on home
  $ionicPlatform.registerBackButtonAction(function(event) {
    if (true) { // your check here
      $ionicPopup.confirm({
        title: 'Beenden',
        template: 'Möchten Sie das Programm wirklich beenden?'
      }).then(function(res) {
        if (res) {
          ionic.Platform.exitApp();
        }
      })
    }
  }, 100);
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
   
  
  $urlRouterProvider.otherwise("/t/mm");
})

.controller('TodoCtrl', function($scope,$ionicSideMenuDelegate,$ionicPopup) {
  $scope.toggleMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
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
	assignLsProfildaten();
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
  
