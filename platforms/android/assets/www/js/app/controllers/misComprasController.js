angular.module('tickitup')
    .controller('misComprasController', function($scope, TicketService) {

        //CONEXION REMOTA
         TicketService.getTicketsRemote().then(
             function(response){
                 TicketService.saveTickets(JSON.stringify(response.data))
             },
             function(ErrResponse){
                 
             }
         );

        $scope.compras = [];
        TicketService.getMisTickets().then(function(compras){
            $scope.compras = compras;
        });
        
    });