angular.module('tickitup')
    .controller('shopSaludController', function($scope, OfertaService) {
        $scope.ofertas = [];
        OfertaService.getOfertasCategoria(1).then(function(ofertas){
            $scope.ofertas = ofertas;
        });
        
    });