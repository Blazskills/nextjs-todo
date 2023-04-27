// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const mongo = require("mongodb").MongoClient;

async function find({ email }) {
  // this is the way of accessing the database
  const client = await mongo.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const db = client.db();

  // check whether the user is already available

  const userAvailable = await db
    .collection("list")
    .findOne({ email: email });
  console.log(userAvailable);
  if (userAvailable) {
    return {
      statusCode: 200,
      responseText: "User Exists",
      listData: userAvailable.itemLists,
    };
  } else {
    return {
      statusCode: 400,
      responseText: "User Does Not Exists",
      userData: null,
    };
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const response = await find(req.body);
    res.json({
      statusCode: response.statusCode,
      responseText: response.responseText,
      listData: response.listData,
    });
  } else {
    res.json({ statusCode: 401, responseText: "Unauthorized Access" });
  }
}
