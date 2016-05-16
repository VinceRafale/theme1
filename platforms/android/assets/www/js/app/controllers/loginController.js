angular.module('tickitup')
    .controller('loginController', function($scope, $state, $ionicModal,$ionicPopup, ClienteService,ClienteModel, OfertaService){
        // $scope.bgs = ["http://lorempixel.com/640/1136"];
        $scope.bgs = ["img/welcome-bg.jpeg"];

        $ionicModal.fromTemplateUrl('views/app/legal/privacy-policy.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.privacy_policy_modal = modal;
        });

        $ionicModal.fromTemplateUrl('views/app/legal/terms-of-service.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.terms_of_service_modal = modal;
        });

        $scope.showPrivacyPolicy = function() {
            $scope.privacy_policy_modal.show();
        };

        $scope.showTerms = function() {
            $scope.terms_of_service_modal.show();
        };

        //---------------------------------------------------------------------------------------------
        // @Implementaction
        //---------------------------------------------------------------------------------------------

        $scope.user={username:"",password:""};

        /**
         * Login action
         */
        $scope.doLogin = function(){
            ClienteService.loginCliente( JSON.stringify($scope.user) )
                .then(
                    function(response){
                        ClienteService.saveLoggedClient( JSON.stringify(response.data) );
                        $state.go('app.shop.home');
                    },
                    function(ErrResponse){
                        $ionicPopup.alert({
                            title:ErrResponse.data.error.message,
                            template:"Usuario y/o contrasenia errados, intente de nuevo"
                        });
                    }
                )
        };



    });