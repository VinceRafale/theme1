angular.module('tickitup')
    .controller('shopDiversionController', function($scope, OfertaService) {
        $scope.ofertas = [];

        OfertaService.getOfertasCategoria(2).then(function(ofertas){
            $scope.ofertas = ofertas;
        });
        
    });