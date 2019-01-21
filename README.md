# shopify-backend-challeneg
GraphQL API of an online marketplace .


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

The API is built using Nodejs and MongoDB. Therfore,nodejs and npm needs to be installed before running this API. For the DB, the app is using a mLab as a hosting MongoDB server. 

### Installing 

After downloding the repository. In a Terminal, navigate to the root folder contiaing the code.
run the following comman

```
npm init
```
This will install all required dependencies to run the API.

The Database is already populated with fake data. But if you want to use your on MongoDB please change the url in config/config.js
  The Database can be populated by running the script populate-db.js.
From the terminal, run the following command:

```
node populate-db mongodb://areej:password1@ds257564.mlab.com:57564/shopify-storedb);
```
This will also write the populated data into a file called products.js

Finally to run the API:
```
node app.js
```
Then in the browser navigate to : http://localhost:4000/graphql

Thats it, happy testing :)

## Built With

* [Expressjs](https://expressjs.com/) - The web framework used
* [MongoDB](https://www.mongodb.com/) - The NoSql DB used
* [mongoose](https://mongoosejs.com/docs/guide.html) - Mongodb object modeling for node.js
* [Graphql](https://graphql.org/) - API used
* [express-graphql](https://graphql.org/graphql-js/running-an-express-graphql-server/) - the Reference implementation used of a GraphQL API server


## Authors

* **Areej Ba Salamah** - *Initial work* 

## License

This project is licensed under the GNU General Public License v3.0 License - see the [LICENSE.md](LICENSE.md) file for details

