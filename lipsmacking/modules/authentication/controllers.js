'use strict';
 
angular.module('Authentication')
 
.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        AuthenticationService.ClearCredentials();
 
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                console.log("Auth response")

                console.log(response)

                if(response.success) {

                    //success login
                    AuthenticationService.SetCredentials($scope.username, $scope.password, response.userinfo);

                    switch (response.userinfo.roleID){
                         case 0:
                        $location.path('/mantable');
                        break;
                          case 1:
                        $location.path('/orders');
                        break;
                      case 3:
                        $location.path('/');
                        break;
                        case 2:
                        $location.path('/waiter');
                        break;
                        default:
                        $location.path('/'); 
                        break;
                    }
                    
                    
                } else {

                    //login failed
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);