angular.module('tickitup')
    .controller('shoppingCartController', function($scope, ShopService, $ionicActionSheet, _) {
        $scope.products = ShopService.getCartProducts();

        $scope.removeProductFromCart = function(product) {
            $ionicActionSheet.show({
                destructiveText: 'Remove from cart',
                cancelText: 'Cancel',
                cancel: function() {
                    return true;
                },
                destructiveButtonClicked: function() {
                    ShopService.removeProductFromCart(product);
                    $scope.products = ShopService.getCartProducts();
                    return true;
                }
            });
        };

        $scope.getSubtotal = function() {
            return _.reduce($scope.products, function(memo, product){ return memo + product.price; }, 0);
        };

    })