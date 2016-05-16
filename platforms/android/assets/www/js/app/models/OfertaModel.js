angular.module('tickitup')
    .factory('OfertaModel',function() {

        //############################################
        // Init
        //############################################
        var OfertaModel = {};

        //############################################
        // Constructor
        //############################################
        OfertaModel.new = function () {
            return {
                id: "", //BigInt
                precio: "", //Double
                fecha_inicio: "", //DateTime
                fecha_final: "", //DateTime
                tickets_disponibles: "", //Integer
                abierta: "", //Boolean
                flyer: "", //String
                categoriaId: "" //int
            }
        };


        //############################################
        // Functions
        //############################################
        
        
    });