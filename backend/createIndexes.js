require('dotenv').config();
const mongoose = require('mongoose');

async function createIndexes() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    const db = mongoose.connection.db;

    console.log('Creating indexes for Users...');
    await db.collection('users').createIndex({ googleId: 1 }, { sparse: true });
    
    console.log('Creating indexes for Rentals...');
    await db.collection('rentals').createIndex({ user: 1 });
    await db.collection('rentals').createIndex({ isActive: 1 });
    await db.collection('rentals').createIndex({ startTime: -1 });

    console.log('Creating indexes for Transactions...');
    await db.collection('transactions').createIndex({ user: 1 });
    await db.collection('transactions').createIndex({ createdAt: -1 });
    await db.collection('transactions').createIndex({ type: 1 });

    console.log('✅ All indexes created successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating indexes:', error);
    process.exit(1);
  }
}

createIndexes();
