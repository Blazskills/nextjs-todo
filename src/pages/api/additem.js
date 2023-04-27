const mongo = require("mongodb").MongoClient;

async function additem({ email, listItem, id }) {
  const client = await mongo.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const db = client.db();

  const listUpdate = await db.collection("list").updateOne(
    {
      email,
    },
    {
      $push: { itemLists: { id, itemName: listItem, checked: false } },
    }
  );
  if (listUpdate.acknowledged) {
    return {
      statusCode: 200,
      responseText: "Item Added Successfully",
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
    const response = await additem(req.body);
    res.json({
      statusCode: response.statusCode,
      // data: response.data,2
      responseText: response.responseText,
    });
  } else {
    res.json({ statusCode: 401, responseText: "Unauthorized Access" });
  }
}
