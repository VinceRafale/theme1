angular.module('tickitup')
    .factory('TicketModel',function(){

        //############################################
        // Init
        //############################################
        var TicketModel = {};

        //############################################
        // Constructor
        //############################################
        TicketModel.new=function () {
            return {
                id                  :   "", //Long
                costoTotal          :   "", //Double
                numPersonas         :   "", //Integer
                validado            :   ""  //Boolean
            }
        };

        //############################################
        // Function
        //############################################


    });
