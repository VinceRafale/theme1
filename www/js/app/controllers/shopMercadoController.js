angular.module('tickitup')
    .controller('shopMercadoController', function($scope, OfertaService) {
        $scope.ofertas = [];

        OfertaService.getOfertasCategoria(4).then(function(ofertas){
            $scope.ofertas = ofertas;
        });
        
    });