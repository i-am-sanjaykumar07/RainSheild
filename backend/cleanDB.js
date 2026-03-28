require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Rental = require('./models/Rental');
const Transaction = require('./models/Transaction');
const Umbrella = require('./models/Umbrella');

// ─── Keep these emails — they will NOT be deleted ─────────────────────────────
const ADMIN_EMAILS = ['palisettysanjaykumar@gmail.com'];

async function cleanDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected.\n');

    // ── 1. Delete all non-admin users ─────────────────────────────────────────
    const deleteUsersResult = await User.deleteMany({
      email: { $nin: ADMIN_EMAILS }
    });
    console.log(`🗑  Deleted ${deleteUsersResult.deletedCount} user(s) (admin kept).`);

    // ── 2. Delete all transactions ────────────────────────────────────────────
    const deleteTxResult = await Transaction.deleteMany({});
    console.log(`🗑  Deleted ${deleteTxResult.deletedCount} transaction(s).`);

    // ── 3. Delete all rentals ─────────────────────────────────────────────────
    const deleteRentalResult = await Rental.deleteMany({});
    console.log(`🗑  Deleted ${deleteRentalResult.deletedCount} rental(s).`);

    // ── 4. Reset all umbrellas to available (same count & locations) ──────────
    const umbrellaResetResult = await Umbrella.updateMany(
      {},
      {
        $set: {
          isAvailable: true,
          currentRental: null
        }
      }
    );
    console.log(`♻️  Reset ${umbrellaResetResult.modifiedCount} umbrella(s) → isAvailable: true, currentRental: null.`);

    // ── 5. Reset admin user wallet/state (optional, clean slate) ─────────────
    const adminReset = await User.updateMany(
      { email: { $in: ADMIN_EMAILS } },
      {
        $set: {
          walletBalance: 0,
          depositMade: false,
          depositAmount: 0,
          cashbackReceived: false,
          rentalHistory: []
        }
      }
    );
    console.log(`👑  Reset ${adminReset.modifiedCount} admin account(s) to clean state.`);

    console.log('\n✅ Database cleaned successfully!');
    console.log('   • Non-admin users:  DELETED');
    console.log('   • All transactions: DELETED');
    console.log('   • All rentals:      DELETED');
    console.log('   • Umbrellas:        KEPT (availability reset to true)');
    console.log('   • Admin accounts:   KEPT (wallet/state reset)\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error cleaning database:', error);
    process.exit(1);
  }
}

cleanDatabase();
