angular.module('tickitup')
    .controller('productController', function($scope, $stateParams, OfertaService, $ionicPopup, $ionicLoading) {
        var productId = $stateParams.productId;

        OfertaService.getOferta(productId).then(function(oferta){
            $scope.oferta = oferta;
        });

        // show add to cart popup on button click
        $scope.showAddToCartPopup = function(oferta) {
            $scope.data = {};
            $scope.data.oferta = oferta;
            $scope.data.ofertaOption = 1;
            $scope.data.ofertaQuantity = 1;

            var myPopup = $ionicPopup.show({
                cssClass: 'add-to-cart-popup',
                templateUrl: 'views/app/shop/partials/add-to-cart-popup.html',
                title: 'Add to Cart',
                scope: $scope,
                buttons: [
                    { text: '', type: 'close-popup ion-ios-close-outline' },
                    {
                        text: 'Add to cart',
                        onTap: function(e) {
                            return $scope.data;
                        }
                    }
                ]
            });
            myPopup.then(function(res) {
                if(res)
                {
                    $ionicLoading.show({ template: '<ion-spinner icon="ios"></ion-spinner><p style="margin: 5px 0 0 0;">Adding to cart</p>', duration: 1000 });
                    OfertaService.addOfertaToCart(res.oferta);
                    console.log('Item added to cart!', res);
                }
                else {
                    console.log('Popup closed');
                }
            });
        };
    })