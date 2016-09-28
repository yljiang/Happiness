module.exports = {
    cookieSecret: 'my Cookie Secret',
    mongo: {
        connectionString: 'mongodb://localhost:27017/',
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