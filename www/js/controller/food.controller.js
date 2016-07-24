app.controller('foodCtrl',function($state,foodService,$stateParams,$scope,$ionicHistory,$http,$cordovaToast,$ionicLoading){

	$scope.imgPath = "http://praveenjzerosoft.comxa.com/images/";

	$scope.category = '';

	$scope.getCategory = function(){
		$ionicLoading.show({showBackdrop:true,template:'<ion-spinner></ion-spinner>  Loading..'});
		foodService.getCategory().then(function(response){		
			$scope.category = response.data;
		});	
	}
	

	$scope.onSlideMove = function(data){		
		$scope.foods = '';
		var slideNo = data.index;

		if($scope.category === ''){
			$scope.getCategory();
		}		

		if(slideNo === 0){ var slug = "cool_drings" };
		if(slideNo === 1){ var slug = "desserts" };
		if(slideNo === 2){ var slug = "hot_drings" };
		if(slideNo === 3){ var slug = "ice_creams" };
		if(slideNo === 4){ var slug = "snacks" };		

		$scope.isLoaded = true;
		foodService.getFoods(slug).then(function(response){		
			$scope.foods = response.data;
			$scope.isLoaded = false;
		});

	};	

});