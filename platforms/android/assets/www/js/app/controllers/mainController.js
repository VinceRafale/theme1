angular.module('tickitup')
    .controller('mainController', function($scope, $state, $ionicModal, ClienteService, $http){
        // $scope.bgs = ["http://lorempixel.com/640/1136"];
        $scope.bgs = ["img/welcome-bg.jpeg"];

        var endpoint = 'http://ofertas-api-rest.herokuapp.com/api';

        var init = function () {

            //Clear chache for testing
            //window.localStorage.clear();

            console.log("entro a init");
            var currentClient = ClienteService.getLoggedClient();
            console.log(currentClient);
            if(currentClient!=null||currentClient!=undefined){
                console.log("entro if 1")
                if(currentClient.accessToken!=null||currentClient.accessToken!=undefined){
                    var categorias = $http.get(endpoint+'/categorias?access_token='+currentClient.accessToken)
                    categorias.then(
                        function (response) {
                            $state.go('app.shop.home');
                        },
                        function(ErrResponse){
                        }
                    );
                };
            };
        };
        init();

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
    })/**
 * Created by ASUS on 7/04/2016.
 */
