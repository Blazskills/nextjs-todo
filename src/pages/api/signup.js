const mongo = require("mongodb").MongoClient;

async function signup({ username, email, password }) {
  const client = await mongo.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const db = client.db();

  // check whether the user is already available

  const userAvailable = await db.collection("users").findOne({ email: email });
  if (userAvailable) {
    return {
      statusCode: 404,
      responseText: "User Already Available",
    };
  }

  const user = await db.collection("users").insertOne({
    email,
    username,
    password,
  });

  const lists = await db.collection('list').insertOne({
    email,
    itemLists:[]
  })
  if (user.acknowledged && lists.acknowledged) {
    return {
      statusCode: 200,
      responseText: "User created Successfully",
    };
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const response = await signup(req.body);
    res.json({
      statusCode: response.statusCode,
      // data: response.data,2
      responseText: response.responseText,
    });
  } else {
    res.json({ statusCode: 401, responseText: "Unauthorized Access" });
  }
}