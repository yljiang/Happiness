var User = require('./users');

User.find(function(err, users){
    if(err) return console.log(err);
    if(users.length) return;
    new User({
        authID:'Ted',
        name: 'Ted',
        email: 'Ted@mail.com',
        scores: [
            {
                date: new Date(),
                score: 1,
                comment: 'comment',
            },
            {
                date: new Date(),
                score: 2,
                comment: '',
            },
            {
                date: new Date(),
                score: 3,
                comment: 'got a job!!',
            }
        ],
        created:new Date(),
    }).save();
    new User({
        authID:'Bob',
        name: 'Bob',
        email: 'Bob@mail.com',
        scores: [
            {
                date: new Date(),
                score: 1,
                comment: 'comment',
            }
        ],
        created:new Date(),
    }).save();
    new User({
        authID:'Alice',
        name: 'Alice',
        email: 'Alice@mail.com',
        scores: [
            {
                date: new Date(),
                score: 1,
                comment: 'comment',
            }
        ],
        created:new Date(),
    }).save();
});

