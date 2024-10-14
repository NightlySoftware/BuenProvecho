import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  const client = await MongoClient.connect(process.env.MONGODB_URI as string);
  const db = client.db('BuenProvecho');

  try {
    const collection = db.collection('Food');
    const scannedCollections = await collection.find({}).toArray();

    await client.close();
    return NextResponse.json(scannedCollections, { status: 200 });
  } catch (error) {
    console.error('Error fetching from database:', error);
    await client.close();
    return NextResponse.json({ message: 'Error fetching from database', error }, { status: 500 });
  }
}