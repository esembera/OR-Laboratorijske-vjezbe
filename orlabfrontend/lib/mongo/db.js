"use server";
import { MongoClient } from "mongodb";

export async function getDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 60000, // 60 seconds
  });
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
