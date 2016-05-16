angular.module('tickitup')
    .factory('OfertaService',function($state, $http, $q, _,ClienteService){

        //var endpoint = 'http://ofertas-api-rest.herokuapp.com/api';

        //############################################
        // Init
        //############################################
        var OfertaService = {};
        var endpoint = 'http://localhost:3000/api';
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
        OfertaService.getOfertasRemote = function(){
            var currentClient = ClienteService.getLoggedClient();
            var ofertas = $http.get(endpoint+'/ofertas?access_token='+currentClient.accessToken);
            return ofertas;
            //return $http.get(endpoint+'/ofertas');
            //return $http.get('http://www.json-generator.com/api/json/get/cvCYZEHVOW?indent=2');
        }

        //############################################
        // Local Calls
        //############################################

        /**
         * Guardar ofertas en local
         * @param data - Json con ofertas
         */
        OfertaService.saveOfertas= function(data){
            window.localStorage.setItem("ofertas" , data);
        }

        OfertaService.getOfertasCategoria = function (categoriaId){
            var dfd = $q.defer();
            var data = window.localStorage.getItem("ofertas");
            //console.log(data);
            if(data != null)
                //console.log("dato no nulo")
                var products = _.filter(JSON.parse(data), function(oferta){return oferta.categoriaId == categoriaId})
                //console.log("productos: "+products)
                dfd.resolve(products);
            if(data == null)
                console.log('data nulo');
            return dfd.promise;

            // $http.get('databases/ofertas.json').success(function(database){
            //     var products = _.filter(database.ofertas, function(oferta){return oferta.categoriaId == categoriaId})
            //
            //     dfd.resolve(products);
            // });
            // return dfd.promise;
        }

        OfertaService.getOferta = function(productId){
            var dfd = $q.defer();
            var data = window.localStorage.getItem("ofertas");
            if(data !=null)
            {
                var product = _.find(JSON.parse(data), function(oferta){return oferta.id == productId;});
                dfd.resolve(product);
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


        OfertaService.addOfertaToCart = function(ofertaToAdd){
            var cart_ofertas = !_.isUndefined(window.localStorage.ionTheme1_cart) ? JSON.parse(window.localStorage.ionTheme1_cart) : [];

            //check if this product is already saved
            var existing_oferta = _.find(cart_ofertas, function(oferta){ return oferta.id == ofertaToAdd.id; });

            if(!existing_oferta){
                cart_ofertas.push(ofertaToAdd);
            }

            window.localStorage.ionTheme1_cart = JSON.stringify(cart_ofertas);
        };

        OfertaService.getCartOfertas = function(){
            return JSON.parse(window.localStorage.ionTheme1_cart || '[]');
        };

        OfertaService.removeOfertaFromCart = function(ofertaToRemove){
            var cart_ofertas = JSON.parse(window.localStorage.ionTheme1_cart);

            var new_cart_ofertas = _.reject(cart_ofertas, function(oferta){ return oferta.id == ofertaToRemove.id; });

            window.localStorage.ionTheme1_cart = JSON.stringify(new_cart_ofertas);
        };


        OfertaService.buyTickets = function( jsonBody ){
            return $http.post(endpoint + '/ofertas/buyTickets?access_token='+currentClient.accessToken, jsonBody);
        };

        return OfertaService;

    });