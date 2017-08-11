'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);

angular.module('LipSmackingCustomer', [
    'Authentication',
    'Home',
    'ngRoute',
    'ngCookies'
])
 
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'modules/authentication/views/login.html',
            hideMenus: true
        })
 
        .when('/', {
            controller: 'TableController',
            templateUrl: 'modules/home/views/welcome.html'
        })
         .when('/table', {
            controller: 'TableController',
            templateUrl: 'modules/home/views/table.html'
        })

        // customerAtTable
         .when('/customerAtTable', {
            controller: 'CustAtTableController',
            templateUrl: 'modules/home/views/customerAtTable.html'
        })
        .when('/menu', {
            controller: 'MenuController',
            templateUrl: 'modules/home/views/menu.html'
        })
         .when('/confirm', {
            controller: 'ConfirmOrderController',
            templateUrl: 'modules/home/views/confirm.html'
        })
        .when('/about', {
            controller: 'ConfirmOrderController',
            templateUrl: 'modules/home/views/about.html'
        }) .when('/pay', {
            controller: 'ConfirmOrderController',
            templateUrl: 'modules/home/views/pay.html'
        })
        .when('/mantable', {
            controller: 'ManTableController',
            templateUrl: 'modules/home/views/mantable.html'
        })
        .when('/manaddTable', {
            controller: 'ConfirmOrderController',
            templateUrl: 'modules/home/views/manaddTable.html'
        })
           .when('/test', {
            controller: 'ConfirmOrderController',
            templateUrl: 'modules/home/views/test.html'
        })
        .when('/inventory', {
            controller: 'OrderController',
            templateUrl: 'modules/home/views/inventory.html'
        }) .when('/orders', {
            controller: 'InventoryController',
            templateUrl: 'modules/home/views/chef.html'
        }) .when('/chefMenu', {
            controller: 'OrderController',
            templateUrl: 'modules/home/views/chefMenu.html'
        })
         .when('/waiter', {
            controller: 'WaiterController',
            templateUrl: 'modules/home/views/waiter.html'
        })
           .when('/thanks', {
            controller: 'OrderController',
            templateUrl: 'modules/home/views/thanks.html'
        })
        .when('/manfeedback', {
            controller: 'OrderController',
            templateUrl: 'modules/home/views/managerfeedback.html'
        })

        .otherwise({ redirectTo: '/login' });
      

}])
 
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {



$rootScope.GenId= 3367;
    $rootScope.selectedItems={};
    // rootScope.menuIdArray =[];
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
            // else if ($location.path() !== '/login' && $rootScope.globals.currentUser){
            //      switch ($rootScope.globals.currentUser.userinfo.roleID){
            //              case 0:
            //             $location.path('/mantable');
            //             break;
            //           case 3:
            //             $location.path('/');
            //             break;
            //             case 2:
            //             $location.path('/table');
            //             break;
            //             default:
            //             $location.path('/'); 
            //             break;
            //         }
                    
            // }



        });
    }])


    // .factory('socketio', ['$rootScope', function ($rootScope) {
    //     'use strict';
        
    //     var socket = io.connect('http://localhost:3000/db');
    //     return {
    //         on: function (eventName, callback) {
    //             socket.on(eventName, function () {
    //                 var args = arguments;
    //                 $rootScope.$apply(function () {
    //                     callback.apply(socket, args);
    //                 });
    //             });
    //         },
    //         emit: function (eventName, data, callback) {
    //             socket.emit(eventName, data, function () {
    //                 var args = arguments;
    //                 $rootScope.$apply(function () {
    //                     if (callback) {
    //                         callback.apply(socket, args);
    //                     }
    //                 });
    //             });
    //         }
    //     };
    // }]);


// .factory('Poller', function($http, $timeout) {
//   var data = { response: {}, calls: 0 };
//   var poller = function() {
//     $http.get('http://localhost:3000/db').then(function(r) {
//       data.response = r.data;
//       data.calls++;
//       $timeout(poller, 1000);
//     });
    
//   };
//   poller();
  
//   return {
//     data: data
//   };
// });

// .run(function(Poller) {});


// start of feedback controller

.controller('FbController', function($rootScope, $scope, $location){

  Array.prototype.remove = function(value) {
    if (this.indexOf(value)!==-1) {
       this.splice(this.indexOf(value), 1);
       return true;
   } else {
      return false;
   };
} 


$rootScope.showhomebar=false;
$rootScope.rating=0;



$scope.init = function(){


/*

$rootScope.$on('gotRegDetails', function() {
  
//$rootScope.user.phone='';
//$rootScope.user.email='';
  //console.log($rootScope.user)
       // if($rootScope.user.phone=="" && $rootScope.user.email==""){

    if($rootScope.isReg == false){
    $location.path('signup')

  }

    });
 */ 
//if($rootScope.isReg == false){
  //  $location.path('signup')

 // }


        $rootScope.pa=0;
        $rootScope.pr=0;
        $scope.comment='';
        $scope.paDetail="";
        $rootScope.rating = 0;
        $rootScope.prRange = {price:false,variety:false,quality:false}
        $rootScope.rateDetail = {rp:false,sl:false,bill:false,offers:false, facility:false, staff:false};
    $scope.errMsg = null;
    }; //init


$scope.setVal = function(forwhat, val){
    $rootScope[forwhat] = val;
};//setVal


//toogle prRange
$scope.toogle= function(what){
    $rootScope.prRange[what] = !$rootScope.prRange[what];
    console.log($rootScope.prRange);
}// end toogle

/*
$scope.setPr =function(val){
  $rootScope.pr=val;
  if($rootScope.pr=="1"){
  if($rootScope.feedbackValues[1].Q2=="No"||$rootScope.feedbackValues[1].Q2==""){
  $rootScope.feedbackValues[1].Q2.push("Yes");
}

}
  


  if($rootScope.pr=="-1"){
  if($rootScope.feedbackValues[1].Q2=="Yes"||$rootScope.feedbackValues[1].Q2==""){
 $rootScope.feedbackValues[1].Q2.push("No");
}

}

  

}
*/


// Form Submit

$scope.submitForm=function(foo){
console.log($scope.comment);
var gen = 'like';
if($rootScope.pa<0)
    gen='dislike';
if($rootScope.pr<0)
    gen='dislike';
if($rootScope.rating<5)
    gen='dislike';
if($rootScope.pr>0)
    $rootScope.prRange = {price:false,variety:false,quality:false}
if(!$rootScope.rating)
    {
console.log($rootScope.rating);
    $scope.errMsg = 'Please select Rating';
    return;
    }
if($rootScope.rating>4)
    $rootScope.rateDetail = {rp:false,sl:false,bill:false,offers:false, facility:false, staff:false}
    
    $scope.fbdata=[
        {'name':'que-x','value':'Experience'},
                {'name':'ans-x','value':gen},
        {'name':'que-0','value':$rootScope.templates.formData[0].qText},
                {'name':'ans-0','value':$rootScope.pa},
                {'name':'que-1','value': 'Please let us know what you were looking for'},
                {'name':'ans-1','value':$scope.paDetail},
                {'name':'que-2','value':$rootScope.templates.formData[1].qText},
                {'name':'ans-2','value':$rootScope.pr},
                {'name':'que-3','value':'Price'},
                {'name':'ans-3','value':$rootScope.prRange['price']},
                {'name':'que-4','value':'Variety'},
                {'name':'ans-4','value':$rootScope.prRange.variety},
                {'name':'que-5','value':'Quality'},
                {'name':'ans-5','value':$rootScope.prRange.quality},
                {'name':'que-6','value':'Rating'},
                {'name':'ans-6','value':$rootScope.rating},
                {'name':'que-7','value':'Return Policy'},
                {'name':'ans-7','value':$rootScope.rateDetail.rp},
                {'name':'que-8','value':'Store Layout'},
                {'name':'ans-8','value':$rootScope.rateDetail.sl},
                {'name':'que-9','value':'Billing'},
                {'name':'ans-9','value':$rootScope.rateDetail.bill},
                {'name':'que-10','value':'Offers'},
                {'name':'ans-10','value':$rootScope.rateDetail.offers},
                {'name':'que-11','value':'Facilities'},
                {'name':'ans-11','value':$rootScope.rateDetail.facility},
                {'name':'que-12','value':'Staff'},
                {'name':'ans-12','value':$rootScope.rateDetail.staff},
                {'name':'que-13','value': "Comments"},
                {'name':'ans-13','value': $scope.comment},
        {'name':'formname', 'value':"Tanishq Feedback Form"},
                {'name':'formid', 'value':"Tanishq-01"},

];

console.log($scope.fbdata);
var userData={
              name:$rootScope.user.name,
              phone:$rootScope.user.phone,
              email:$rootScope.user.email,
          gender:$rootScope.user.gender||''
               };
$rootScope.send2appBe("feedback","feedback", {ip:$rootScope.user.ip,user:$rootScope.user,ud:userData, fbdata:$scope.fbdata});


};//submitform


});

// end of feedback controller