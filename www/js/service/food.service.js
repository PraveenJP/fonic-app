app.factory('foodService',function($http,$ionicLoading){
	//var serviceBase = "http://localhost/RestService/";
	var serviceBase = "https://fonic-service.herokuapp.com/";

	var obj = {};
    obj.getCategory = function(rollno,password){    	
        return $http.get(serviceBase + 'category');
    }

    obj.getFoods = function(slug){
    	return $http.get(serviceBase + 'foods/'+slug);
    }    

    return obj;

});	