const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = 
"mongodb+srv://mern_user:mern_1234@clusterbubu.zyjnn5u.mongodb.net/?appName=Clusterbubu";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✔️ Connexion MongoDB OK — Ping réussi !");
  } catch (err) {
    console.error("❌ Erreur connexion MongoDB :", err);
  } finally {
    await client.close();
  }
}

run();

