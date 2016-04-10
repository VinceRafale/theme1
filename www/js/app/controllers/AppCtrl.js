/**
 * Created by ASUS on 8/04/2016.
 */
angular.module('tickitup')
    .controller('AppCtrl',function($scope){

        //this will represent our logged user
        var user = {
            about: "Design Lead of Project Fi. Love adventures, green tea, and the color pink.",
            name: "Brynn Evans",
            picture: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
            _id: 0,
            followers: 345,
            following: 58
        };

        //save our logged user on the localStorage
        $scope.loggedUser = user;

    
    });