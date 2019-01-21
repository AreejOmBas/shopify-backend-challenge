/**
 * Main file to run the app
 */
const express       = require('express'),
      app           = express(),
      config        = require('./config/config'),
      mongoose      = require('mongoose'),
      graphlHTTP    = require('express-graphql')
      schema        = require('./qraphql/schema');
      

mongoose.Promise = global.Promise;
mongoose.connect(config.db_url,{ useNewUrlParser: true });
// console.log(conecction.Model.find())
app.use('/graphql', graphlHTTP({
        schema: schema,
        graphiql: true
    }));
app.listen(config.port, () => {
     console.log('App is listening on port '+ config.port);
});