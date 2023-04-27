const mongo = require("mongodb").MongoClient;

async function signin({ email, password }) {
  const client = await mongo.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const db = client.db();

  // check whether the user is already available

  const userAvailable = await db.collection("users").findOne({ email: email });
  if (userAvailable) {
    return {
      statusCode: 200,
      responseText: "User Exist",
      userData: userAvailable,
    };
  } else {
    return {
      statusCode: 400,
      responseText: "User Does Not Exist",
      userData: null,
    };
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const response = await signin(req.body);
    res.json({
      statusCode: response.statusCode,
      responseText: response.responseText,
      userData: response.userData,
    });
  } else {
    res.json({ statusCode: 401, responseText: "Unauthorized Access" });
  }
}
