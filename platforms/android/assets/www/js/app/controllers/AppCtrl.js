/**
 * Created by ASUS on 8/04/2016.
 */
angular.module('tickitup')
    .controller('AppCtrl',function($scope,$state,ClienteService){

        /**
         * Logs the current user out
         */
        $scope.doLogout = function(){
            ClienteService.logoutCliente().then(
                function( response ){
                    ClienteService.clearLoggedClient();
                    $state.go('main');
                }
                ,
                function(error){
                    console.log(error);
                }
            );
        }
    
    });