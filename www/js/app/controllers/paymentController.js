/**
 * Created by peter on 14/04/2016.
 */
angular.module('tickitup')
    .controller('paymentController', function($scope,$ionicPopup,ClienteService,ClienteModel){
        //-----------------------------------------------------------------
        // Constant variables.
        //-----------------------------------------------------------------
        var loggedClient = ClienteService.getLoggedClient();
        var clienteCard_id = "cliente_"+ClienteService.getLoggedClient().clienteId ;

        //-----------------------------------------------------------------
        // Helper functions
        //-----------------------------------------------------------------
        persistMyCards = function(){
            window.localStorage.setItem(clienteCard_id, JSON.stringify($scope.myCards));
        };
        fetchMyCards = function(){
            return ( window.localStorage.getItem(clienteCard_id) != null )
                                        ? JSON.parse(window.localStorage.getItem( clienteCard_id )) : [] ;
        };

        //-----------------------------------------------------------------
        // DOM variables
        //-----------------------------------------------------------------
        $scope.myCards = fetchMyCards();
        $scope.cardData = {number: "", cvc: "", exp_month: "", exp_year:"" };

        //-----------------------------------------------------------------
        // DOM functions
        //-----------------------------------------------------------------
        $scope.cardFormState = false ;
        $scope.chgCardFormState = function(){
            if( $scope.cardFormState == false )
                $scope.cardFormState = true;
            else
                $scope.cardFormState = false;
        };

        /**
         * Action for creating a new card. Uses stripe to get card data and sents it to backend server
         */
        $scope.doCreateNewCard = function(){
            window.Stripe.card.createToken($scope.cardData , function(status,response){
                $scope.chgCardFormState()
                if( response.error ){
                    console.log("card data error");
                    $ionicPopup.alert({
                        title:"ERROR - Please try again",
                        template:response.error.message
                    });
                    $scope.chgCardFormState();
                }
                else{
                    console.log(response.id);
                    var body =
                            {token:response.id ,userid:loggedClient.clienteId ,first_time:($scope.myCards.length == 0)};
                    console.log(body);
                    ClienteService.createCard( JSON.stringify(body) )
                        .then(
                            function(msg){
                               console.log('request success');
                                $scope.myCards.push( 'XXXX-XXXX-XXXX-' + $scope.cardData.number%10000 );
                                persistMyCards();
                                $scope.cardData = {};
                                $ionicPopup.alert({
                                    title:"GREAT!",
                                    template:msg
                                });
                            }
                            ,function(err){
                                console.log(err);
                                $ionicPopup.alert({
                                    title:"ERROR - please try again",
                                    template:err.error.message
                                });
                                $scope.chgCardFormState();
                            }
                        );
                }
            });
        }

    });