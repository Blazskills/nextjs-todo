const mongo = require("mongodb").MongoClient;

async function checkitem({ email, checked, id }) {
  const client = await mongo.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const db = client.db();

  const listUpdate = await db.collection("list").updateOne(
    {
      email, "itemLists.id":id
    },
    {
      $set: { "itemLists.$.checked": checked },
    }
  );
  if (listUpdate.acknowledged) {
    return {
      statusCode: 200,
      responseText: "Item Checked Successfully",
    };
  } else {
    return {
      statusCode: 400,
      responseText: "Item Failed",
    };
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const response = await checkitem(req.body);
    res.json({
      statusCode: response.statusCode,
      // data: response.data,2
      responseText: response.responseText,
    });
  } else {
    res.json({ statusCode: 401, responseText: "Unauthorized Access" });
  }
}
