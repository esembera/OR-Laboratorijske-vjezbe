"use server";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 60000, // 60 seconds
});

export async function getDatabase() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db();
    const collection = db.collection("iphones");
    const data = await collection.find({}).toArray();
    return JSON.stringify(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getDatabaseForAPI() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db();
    const collection = db.collection("iphones");
    const data = await collection.find({}).toArray();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getDatabaseById(id) {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("iphones");
    const data = await collection.find(new ObjectId(id)).toArray();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getDatabaseByAttribute(attributeName, attributeValue) {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("iphones");
    const data = await collection
      .find({ [attributeName]: new RegExp(attributeValue, "i") })
      .toArray();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getDatabaseByLaunchYear(launchYear) {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("iphones");
    const data = await collection.find({ Year: launchYear }).toArray();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteDocumentFromCollection(id) {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("iphones");
    const data = await collection.deleteOne({ _id: new ObjectId(id) });
    return data.deletedCount;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function insertDocumentToCollection(document) {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("iphones");
    const data = await collection.insertOne(document);
    return data.acknowledged;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateDocumentFromCollection(id, document) {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("iphones");
    const data = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: document }
    );
    return data.acknowledged;
  } catch (error) {
    console.log(error);
    return error;
  }
}
