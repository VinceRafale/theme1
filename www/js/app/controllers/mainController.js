angular.module('tickitup')
    .controller('mainController', function($scope, $state, $ionicModal){
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
    })/**
 * Created by ASUS on 7/04/2016.
 */
