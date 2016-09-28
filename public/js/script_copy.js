(function(){
    'use strict';

    angular
        .module('mainApp', ['ui.router', 'nvd3'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', mainConfig])
        .controller('appController', [ '$state', appCtrl ]);

    function mainConfig($stateProvider, $urlRouterProvider, $locationProvider){
        $stateProvider
            .state('/', {
                url:'/',
                templateUrl: 'views/login.html'
            })
            .state('dashboard',{
                url:'/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: ['$http', dashBoardCtrl ],
                controllerAs: 'dashboard',
            });
            // $locationProvider.html5Mode(true)

            $urlRouterProvider.otherwise('/');
    }

    function appCtrl($state){
        console.log('contorller init');
        var vm = this;

        vm.login = function(){
            console.log("logging in..");
            $state.go('dashboard');
        };

    }

    function dashBoardCtrl($http){
        var vm = this;
        vm.options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 30,
                    bottom: 40,
                    left: 30,
                },
                x: function(d){ return d.date; },
                y: function(d){ return d.score; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                yAxis: {
                    // axisLabel: 'Happiness Score'
                },
                xAxis: {
                    // axisLabel: 'Date',
                    tickFormat: function(d) { return d3.time.format('%b %d')(new Date(d)); },
                    axisLabelDistance: -10
                },
                forceY:[0,10],
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            },
            // title: {
            //     enable: false,
            //     text: 'Happiness'
            // },
        };

        vm.post = function(){
            console.log("posting entrie");
                    console.log(vm.date);
                    console.log(vm.comment);
                    console.log(vm.score);
            var body = {
                date: vm.date,
                score: vm.score,
                comment: vm.comment,
            };

            $http({
                method: 'POST',
                url:'/api/scores',
                data: body,
                headers: { 'Content-Type': 'application/json' },

            }). then(function success(response){
                console.log(response.statusCode);
            }, function failure(error){
                console.log(error);
            });
        };
        

        vm.data = getData();

        /*Random Data Generator */
        function getData() {
            var scores = [
                {date: new Date(2016,5,22), score: 5, comment: ''},
                {date: new Date(2016,5,23), score: 3, comment: ''},
                {date: new Date(2016,5,24), score: 1, comment: 'comment'},
                {date: new Date(2016,5,25), score: 8, comment: ''},
                {date: new Date(2016,5,26), score: 5, comment: ''},
                {date: new Date(2016,5,27), score: 4, comment: ''},
                {date: new Date(2016,5,28), score: 10, comment: 'asdf'},
                {date: new Date(2016,5,29), score: 4, comment: ''},
                {date: new Date(2016,5,30), score: 8, comment: ''},
                {date: new Date(2016,6,1), score: 7, comment: ''},
                {date: new Date(2016,6,2), score: 7, comment: ''},
                {date: new Date(2016,6,3), score: 6, comment: ''},
            ];

            //Line chart data should be sent as an array of series objects.
            return [
                {
                    values: scores,      //values - represents the array of {x,y} data points
                    key: 'Happiness', //key  - the name of the series.
                    color: '#ff7f0e'  //color - optional: choose your own line color.
                },
            ];
        }

        vm.scores = vm.data[0].values;
    }
        
})();