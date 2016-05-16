angular.module('tickitup')
    .controller('shoppingCartController', function($scope,$state,$ionicPopup, OfertaService, ClienteService, $ionicActionSheet, _) {
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

        $scope.doCheckout = function(){
            var jsonBody = JSON.stringify({oferta:$scope.ofertas[0] ,
                                            amount:$scope.getSubtotal(),
                                            userid:ClienteService.getLoggedClient().clienteId}) ;
            $scope.myPopup = $ionicPopup.alert({
                title:'Procesing...',
                template:'Your transaction will be done in no time.'
            });
            OfertaService.buyTickets( jsonBody ).then(
                function(response){
                    $state.go('app.misCompras');
                    $scope.myPopup.close();
                }
                ,function(err){
                    $scope.myPopup.title = "ERRORR"
                    $scope.myPopup.template = "SORRY AN ERROR HAS OCCURRED. TRY AGAIN"
                }
            );
        }


    })