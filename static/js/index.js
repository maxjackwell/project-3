// Documentation used for this 'https://www.mongodb.com/docs/drivers/node/current/quick-start/connect-to-mongodb/'

const { MongoClient } = require("mongodb");
// Connection string for mongodb
const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('birth_data');
    const states = database.collection('states');
    // Query for a player named 'Michael Jordan'
    const query = { name: 'Michael Jordan' };
    const result = await states.findOne(query);
    console.log(result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);