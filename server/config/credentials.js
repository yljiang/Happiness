module.exports = {
    cookieSecret: 'my Cookie Secret',
    mongo: {
        connectionString: 'mongodb://localhost:27017/',
        // connectionString:'mongodb://heroku_fx5hwldj:atvbbsr8m7a1u1mal5po2jmffg@ds157078.mlab.com:57078/heroku_fx5hwldj' 
    },

    authProviders: {
        facebook: {
            development: {
                appId: '554823051345511',
                appSecret: '69cc6485df4057fee6e41b4b318ff35d',
            },
            production:{
                
            }
        },
    }
};
