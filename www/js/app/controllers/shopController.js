angular.module('tickitup')
    .controller('shopController', function($scope, ShopService) {
        $scope.products = [];
        $scope.popular_products = [];

        ShopService.getProducts().then(function(products){
            $scope.products = products;
        });

        ShopService.getProducts().then(function(products){
            $scope.popular_products = products.slice(0, 2);
        });
    });