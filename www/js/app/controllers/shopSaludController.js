angular.module('tickitup')
    .controller('shopSaludController', function($scope, OfertaService) {
        OfertaService.getOfertasRemote().then(
                function(response){
                    OfertaService.saveOfertas(JSON.stringify(response.data))
                }
            );
        $scope.ofertas = [];
        OfertaService.getOfertasCategoria(1).then(function(ofertas){
            $scope.ofertas = ofertas;
        });

    });