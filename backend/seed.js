require('dotenv').config();
const connectDB = require('./config/db');
const Subscription = require('./models/Subcription');

const seedSubscriptions = [
  {
    serviceName: 'Figma',
    cost: 15,
    billingCycle: 'Monthly',
    renewalDate: new Date('2026-06-25'),
    status: 'Active',
  },
  {
    serviceName: 'Netflix',
    cost: 192,
    billingCycle: 'Yearly',
    renewalDate: new Date('2026-06-30'),
    status: 'Paused',
  },
  {
    serviceName: 'Spotify',
    cost: 11.99,
    billingCycle: 'Monthly',
    renewalDate: new Date('2026-07-03'),
    status: 'Active',
  },
  {
    serviceName: 'Notion',
    cost: 120,
    billingCycle: 'Yearly',
    renewalDate: new Date('2026-06-28'),
    status: 'Active',
  },
  {
    serviceName: 'Canva',
    cost: 14.99,
    billingCycle: 'Monthly',
    renewalDate: new Date('2026-07-01'),
    status: 'Active',
  },
];

async function seedDatabase() {
  await connectDB();

  const existingCount = await Subscription.countDocuments();
  if (existingCount > 0) {
    console.log(`Seed skipped: subscriptions collection already has ${existingCount} record(s).`);
    process.exit(0);
  }

  await Subscription.insertMany(seedSubscriptions);
  console.log(`Seeded ${seedSubscriptions.length} subscription records.`);
  process.exit(0);
}

seedDatabase().catch((error) => {
  console.error('Seed failed:', error.message);
  process.exit(1);
});
