angular.module('tickitup')
    .controller('createAccountController',function($scope,$state, $ionicPopup ,ClienteModel,ClienteService){

        //Inject empty cliente model
        $scope.cliente = ClienteModel.new();

        $scope.signUp = function(){
            ClienteService.createCliente( JSON.stringify($scope.cliente) ).then(
                function(){
                    $state.go('main');
                }
                ,
                function(error){
                    $ionicPopup.alert({
                        title:'Error de red',
                        template:'No puede registrarse una cuenta sin conectividad'
                    });
                }
            );
        };
    });