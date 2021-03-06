(function(){
    console.log('script.js loaded');

    var getData = function(callback){
     $.ajax({
            type: 'GET',
            url: 'http://localhost:5000/api/scores',
        }).done(function(data){
            var v = [];
            for(var i = 0; i < data.length; ++ i){
              v.push({x: data[i].epoch, y: data[i].score});

            }
            console.log("data: " + JSON.stringify(v));
            callback([
                {
                    values: v,
                    key: 'scores',
                    color: '#ff7f0e'
                },
            ]);
        }); 
    };

var loadGraph = function(data){
  nv.addGraph(function() {
  var chart = nv.models.lineChart()
    .useInteractiveGuideline(true)
    .forceY([0,10])
    ;

     chart.xAxis
        // .tickValues([1078030800000,1122782400000,1167541200000,1251691200000])
        .tickFormat(function(d) {
            return d3.time.format('%x')(new Date(d));
          });

  chart.yAxis
    // .axisLabel('Voltage (v)')
    .tickFormat(d3.format('0'))
    ;

  d3.select('#chart svg')
    // .datum(data())
    .datum(data)
    .transition().duration(500)
    .call(chart)
    ;

  nv.utils.windowResize(chart.update);

  return chart;
  });
};

getData(loadGraph);

})();