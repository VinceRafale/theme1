angular.module('tickitup')
    .factory('OfertaService',function($state, $http, $q, _,ClienteService){

        //############################################
        // Init
        //############################################
        var OfertaService = {};
        var endpoint = 'http://localhost:3000/api';
        var currentClient= ClienteService.getLoggedClient();
        //############################################
        // Functions
        //############################################
        
        OfertaService.getOfertas = function (){
            var dfd = $q.defer();
            $http.get('databases/ofertas.json').success(function(database){
                dfd.resolve(database.ofertas);
            });
            return dfd.promise;
        }

        OfertaService.getOfertasCategoria = function (categoriaId){
            var dfd = $q.defer();
            $http.get('databases/ofertas.json').success(function(database){
                var products = _.filter(database.ofertas, function(oferta){return oferta.categoriaId == categoriaId})

                dfd.resolve(products);
            });
            return dfd.promise;
        }

        OfertaService.getOferta = function(productId){
            var dfd = $q.defer();
            $http.get('databases/ofertas.json').success(function(database) {
                var product = _.find(database.ofertas, function(oferta){ return oferta.id == productId; });

                dfd.resolve(product);
            });
            return dfd.promise;
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
            return $http.post(endpoint + '/oferta/buyTickets?access_token='+currentClient.accessToken, jsonBody);
        };

        return OfertaService;

    });