angular.module('tickitup')
    .controller('shopElectrodomesticosController', function($scope, OfertaService) {
        $scope.ofertas = [];

        OfertaService.getOfertasCategoria(3).then(function(ofertas){
            $scope.ofertas = ofertas;
        });
        
    });