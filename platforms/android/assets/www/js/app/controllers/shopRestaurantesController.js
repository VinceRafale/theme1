angular.module('tickitup')
    .controller('shopRestaurantesController', function($scope, OfertaService) {
        $scope.ofertas = [];

        OfertaService.getOfertasCategoria(5).then(function(ofertas){
            $scope.ofertas = ofertas;
        });
        
    });