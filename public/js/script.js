(function(){
    'use strict';

    angular
        .module('mainApp', ['ui.router', 'nvd3'])
        .config(['$stateProvider', '$urlRouterProvider', mainConfig])
        .controller('appController', [appCtrl]);

    function mainConfig($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('/', {
                url:'/',
                templateUrl: 'views/login.html'
            })
            .state('dashboard',{
                url:'/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: [ dashBoardCtrl ],
                controllerAs: "dashboard",
            });

            $urlRouterProvider.otherwise('/');
    }

    function appCtrl(){
        console.log('contorller init');

        var vm = this;

    }

    function dashBoardCtrl(){
        var vm = this;
        vm.options = {
        chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
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
                    axisLabel: 'Happiness Score'
                },
                xAxis: {
                    axisLabel: 'Date',
                    tickFormat: function(d) { return d3.time.format('%b %d')(new Date(d)); },
                    axisLabelDistance: -10
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            },
            title: {
                enable: false,
                text: 'Happiness'
            },
            
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
        console.log(vm.scores);
    }
        
})();