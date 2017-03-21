const Deepstream = require('deepstream.io');
const MongoDBStorageConnector = require( 'deepstream.io-storage-mongodb' );
const server = new Deepstream({
  port: process.env.PORT || 6020,
  auth: {
    type: "http",
    options: {
      endpointUrl: process.env.HTTP_AUTH || "http://localhost:6021/users/auth",
      permittedStatusCodes: [ 200 ],
      requestTimeout: 2000
    }
  }
});
const db = new MongoDBStorageConnector( {
  connectionString: process.env.MONGODB_URI|| process.env.DB,
  splitChar: '/'
});
server.set( 'storage', db);
server.start()
