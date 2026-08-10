const mongoose = require('mongoose');
require('dotenv').config();
const Candidate = require('./models/candidate');
const User = require('./models/user');
const connectDB = require('./db');

const dummyCandidates = [
  {
    name: 'Zain Raza',
    party: 'United Democratic Front',
    age: 49,
    voteCount: 215,
  },
  {
    name: 'Tariq Mahmood',
    party: "National People's Alliance",
    age: 55,
    voteCount: 198,
  },
  {
    name: 'Dr. Sarah Ahmed',
    party: 'Progressive Justice Movement',
    age: 42,
    voteCount: 142,
  },
  {
    name: 'Hamza Abbasi',
    party: 'Forward Vision Movement',
    age: 45,
    voteCount: 110,
  },
  {
    name: 'Ayesha Malik',
    party: 'Green Development Coalition',
    age: 38,
    voteCount: 86,
  },
];

const adminUser = {
  cnic: 1111122223333,
  password: 'adminpassword123',
  age: 40,
  email: 'admin@votechain.org',
  mobile: '03001234567',
  address: 'Election Commission Secretariat, Main Boulevard',
  role: 'admin',
};

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('Clearing existing candidates...');
    await Candidate.deleteMany({});

    console.log('Seeding dummy candidates...');
    await Candidate.insertMany(dummyCandidates);
    console.log('✅ Candidates seeded successfully!');

    // Check if admin user exists, if not create one
    const existingAdmin = await User.findOne({ cnic: adminUser.cnic });
    if (!existingAdmin) {
      console.log('Creating default Admin user...');
      const newAdmin = new User(adminUser);
      await newAdmin.save();
      console.log('✅ Default Admin account created:');
      console.log(`   CNIC: ${adminUser.cnic}`);
      console.log(`   Password: ${adminUser.password}`);
    } else {
      console.log('ℹ️ Admin user already exists.');
    }

    console.log('\n🎉 Seeding Completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
