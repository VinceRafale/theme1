angular.module('tickitup')
    .factory('ClienteModel',function(){

        //############################################
        // Init
        //############################################
        var ClienteModel = {};

        //############################################
        // Constructor
        //############################################

        ClienteModel.new = function () {
            return {
                no_id                   :   "", //BigInt
                username                :   "", //Text
                password                :   "", //Text
                nombre                  :   "", //String
                edad                    :   "", //Integer
                tokenTC                 :   "", //String
                genero                  :   "" //String
            }
        };

        return ClienteModel ;
        
    });
