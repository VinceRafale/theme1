angular.module('tickitup')
    .factory('LugarService',function($state, $http, $q, _,ClienteService){

        var endpoint = 'http://ofertas-api-rest.herokuapp.com/api';

        //############################################
        // Init
        //############################################
        var LugarService = {};
        var currentClient= ClienteService.getLoggedClient();
        //############################################
        // Functions
        //############################################

        /**
         * Revisa la version db externa con la local
         * @returns {boolean}
         */
        

        //############################################
        // Remote calls
        //############################################

        /**
         * Traer las ofertas del DB remoto
         * @returns {Promise}
         */
        LugarService.getLugaresRemote = function(){
            var currentClient = ClienteService.getLoggedClient();
            console.log(currentClient.accessToken);
            var lugares = $http.get(endpoint+'/lugares?access_token='+currentClient.accessToken);
            return lugares;
        }

        //############################################
        // Local Calls
        //############################################

        /**
         * Guardar lugares en local
         * @param data - Json con ofertas
         */
        LugarService.saveLugares= function(data){
            window.localStorage.setItem("lugares" , data);
        }

        LugarService.getLugar = function(lugarId){
            var dfd = $q.defer();
            var data = window.localStorage.getItem("lugares");
            if(data !=null)
            {
                var lugar = _.find(JSON.parse(data), function(lugar){return lugar.id == lugarId;});
                dfd.resolve(lugar);
            }
            if(data==null)
                console.log('data nulo');
            return dfd.promise;


            // var dfd = $q.defer();
            // $http.get('databases/ofertas.json').success(function(database) {
            //     var product = _.find(database.ofertas, function(oferta){ return oferta.id == productId; });
            //
            //     dfd.resolve(product);
            // });
            // return dfd.promise;
        }

        return LugarService;

    });