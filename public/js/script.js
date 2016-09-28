(function(){
    console.log('script.js loaded');

    function getData(callback){
        $.ajax({
            type: 'GET',
            url: 'http://localhost:5000/api/scores',
        }).done(function(data){
            console.log(data);
        });
    }
    getData();

})();