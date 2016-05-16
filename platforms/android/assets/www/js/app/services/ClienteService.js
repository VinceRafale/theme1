angular.module('tickitup')
    .factory('ClienteService',function($http,$q){

        var endpoint = 'http://ofertas-api-rest.herokuapp.com/api';

        //############################################
        // Init
        //############################################
        var ClienteService = {};

        //############################################
        // Remote calls
        //############################################

        /**
         * Crear un nuevo cliente
         * @param model
         * @returns {HttpPromise}
         */
        ClienteService.createCliente = function(model){
            return $http.post( endpoint+'/clientes' , model );
        }

        /**
         * Realizar login con servidor.
         * @param user
         * @returns {HttpPromise}
         */
        ClienteService.loginCliente = function(user){
            return $http.post( endpoint+'/clientes/login' , user );
        }

        /**
         *  Realiza el logout del cliente acutual
         * @returns {HttpPromise}
         */
        ClienteService.logoutCliente = function(){
            return $http.post( endpoint+'/clientes/logout?access_token='+this.getLoggedClient().accessToken );
        }

        ClienteService.createCard = function(body){
            console.log(this.getLoggedClient().accessToken)
            return $http.post( endpoint + '/clientes/createCard?access_token='+this.getLoggedClient().accessToken , body );
        }

        //############################################
        // Local calls to storage
        //############################################

        /**
         * Saves session info corresponding to the logged user.
         * @param session - Json session object
         *
         */
        ClienteService.saveLoggedClient = function( session ){
            window.localStorage.setItem( "loggedClient" , session );
        }

        /**
         *  Da el usuario logeado.
         *  Returns null if none is logged.
         */
        ClienteService.getLoggedClient = function(){
            var data = JSON.parse(window.localStorage.getItem("loggedClient"));
            if(data != null)
                return {clienteId:data.userId , accessToken:data.id };
            else
                return null;
        }

        /**
         *  Limpia la informacion del usuario logeado.
         */
        ClienteService.clearLoggedClient = function(){
            window.localStorage.removeItem("loggedClient");
        }


        //############################################
        // Return wrapper object
        //############################################
        return ClienteService;

    });