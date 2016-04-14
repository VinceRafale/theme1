angular.module('tickitup')
    .controller('shoppingCartController', function($scope, OfertaService, $ionicActionSheet, _) {
        $scope.ofertas = OfertaService.getCartOfertas();

        $scope.removeOfertaFromCart = function(oferta) {
            $ionicActionSheet.show({
                destructiveText: 'Remove from cart',
                cancelText: 'Cancel',
                cancel: function() {
                    return true;
                },
                destructiveButtonClicked: function() {
                    OfertaService.removeOfertaFromCart(oferta);
                    $scope.ofertas = OfertaService.getCartOfertas();
                    return true;
                }
            });
        };

        $scope.getSubtotal = function() {
            return _.reduce($scope.ofertas, function(memo, oferta){ return memo + oferta.precio; }, 0);
        };

    })