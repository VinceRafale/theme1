angular.module('tickitup')
    .controller('qrCodeController', function($scope, $stateParams, TicketService, $ionicPopup, $ionicLoading) {
        var ticketId = $stateParams.ticketId;

        TicketService.getTicket(ticketId).then(function(ticket){
            $scope.ticket = ticket;
        });
        
    })