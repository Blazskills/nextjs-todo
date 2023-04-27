const mongo = require("mongodb").MongoClient;

async function deleteitem({ email, listItem, id }) {
  const client = await mongo.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const db = client.db();

  const listDelete = await db.collection("list").update(
    {
      email,
    },
    {
      $pull: { itemLists: { id:id } },
    }
  );
  if (listDelete.acknowledged) {
    return {
      statusCode: 200,
      responseText: "Item Deleted Successfully",
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
    const response = await deleteitem(req.body);
    res.json({
      statusCode: response.statusCode,
      // data: response.data,2
      responseText: response.responseText,
    });
  } else {
    res.json({ statusCode: 401, responseText: "Unauthorized Access" });
  }
}
