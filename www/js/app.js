/*--------------------------------*/ 
/*===Fonic App===*/
/*===Author : Praveen JP===*/
/*===Version: 1.0.0===*/
/*--------------------------------*/ 

var app = angular.module('starter', ['ionic','ngCordova','tabSlideBox'])

app.run(function($ionicPlatform,$location,$state,$cordovaToast,$ionicHistory,$ionicLoading,$rootScope) {
  
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {      
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  /*$rootScope.$on('loading:show', function() {
    $ionicLoading.show({showBackdrop:true,template:'<ion-spinner></ion-spinner>  Loading..'});
  })*/

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide();
  })

  // Back to close
  var backbutton = 0;
  $ionicPlatform.registerBackButtonAction(function($timeout) {  
    if($state.is('fonic.home') || $state.is('start')){    
      if(backbutton == 0){
        backbutton++;
        $cordovaToast.showShortCenter('Press again to exit');
        $timeout(function(){
          backbutton = 0;
        },3000);
      }else{
        navigator.app.exitApp();
      }
    }else{
      $ionicHistory.goBack();
    }
  }, 101);

});

app.config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider, $ionicConfigProvider, $httpProvider){

  $ionicConfigProvider.scrolling.jsScrolling(true);
  $ionicConfigProvider.views.maxCache(10);
  $httpProvider.defaults.timeout = 5000;

  $httpProvider.interceptors.push(function($rootScope,$cordovaToast) {
      return {
          request: function(config) {
              //$rootScope.$broadcast('loading:show')
              return config
          },
          response: function(response) {
              $rootScope.$broadcast('loading:hide')
              return response
          },
          responseError: function(responseError) {
              $rootScope.$broadcast('loading:hide')
              //return responseError;              
              $cordovaToast.showShortCenter('Check Network Connection');
              //$cordovaToast.showShortCenter(responseError);

          },
          requestError: function(responseError) {
              $rootScope.$broadcast('loading:hide')
              //return responseError;
              $cordovaToast.showShortCenter('Check Network Connection');
              //$cordovaToast.showShortCenter(responseError);
          }
      }
  })

  $stateProvider
    .state('start',{
      url:"/",
      templateUrl:'template/start.html',
    })

    .state('fonic',{
      url:'/fonic',
      abstract:true,
      templateUrl: "template/menu.html",
      controller:'navCtrl'
    })

    .state('fonic.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "template/home.html",
          controller: "foodCtrl"
        }
      }
    })

    $urlRouterProvider.otherwise('/');

});

// Navigation Controller
app.controller('navCtrl',function($scope,$ionicSideMenuDelegate,$state){
    $ionicSideMenuDelegate.toggleLeft();
});

// Global back button
app.controller('backCtrl',function($scope, $ionicHistory) {
  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };
});