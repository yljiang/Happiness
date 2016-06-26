(function(){
    'use strict';

    angular
        .module('mainApp', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', mainConfig])
        .controller('appController', [appController]);

    function mainConfig($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('/', {
                url:'/',
                templateUrl: 'views/login.html'
            })
            .state('main',{
                url:'/main',
                templateUrl: 'views/home.html'
            });

            $urlRouterProvider.otherwise('/');
    }

    function appController(){
        console.log('contorller init');

        var vm = this;

        vm.hello = "hello";

    }
        
})();