var User = require('../models/users');

module.exports = function(){
    return{
        get: function(id, callback){
            User.findById(id, function(err, user){
                // if(err) return res.status(500).send('Error' + err);
                if(err || user === null){
                    console.error(err);
                }else{
                    // console.log(user.scores);
                    callback(user.scores);
                    // return user.scores;
                }
            });
        },

        update: function(id, data){

            // console.log("posting " + data);
            console.log(id);
            User.findOne({_id: id}, function(err, user){
                console.log(user);
                var oldscores = user.scores;

                oldscores.push(data);
                user.save();
                // res.send('new score has been added');
            });
        },

        delete:function(id, entry){
            //delete an entry for user: id
        }


    };
};