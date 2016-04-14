/**
 * Created by peter on 12/04/2016.
 */
angular.module('tickitup')
    .directive('logout-dir', function () {
        return {
            templateUrl: '<a class="item item-icon-left settings-option" ng-click="doLogout()"><i class="icon ion-ios-close-outline"></i>Sign Out </a>' ,
            restrict: '',
            controller: function ($scope,ClienteService) {



            }
        }
    });