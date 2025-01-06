const { MongoClient, ObjectId } = require("mongodb");
require('dotenv').config(); // Load environment variables

const DB_URI = process.env.DB_URI;
const client = new MongoClient(DB_URI);

async function testAnimalFunctions() {
    await client.connect();
    const db = client.db("zooDB");
    console.log('Testing Animal Database Functions...');
    
    // Test getAnimals
    console.log('\n1. Testing getAnimals():');
    const collection = db.collection("animals");
    const animals = await collection.find({}).toArray();
    console.log('Found animals:', animals);

    // Test createAnimal
    console.log('\n2. Testing createAnimal():');
    const newAnimal = {
        name: "Test Monkey",
        gender: "Female",
        arrival_date: new Date().toISOString(),
        age: 5,
        diet: "omnivore",
        image: "/images/test.png"
    };
    const createResult = await collection.insertOne(newAnimal);
    const createdId = createResult.insertedId;
    console.log('Created animal with ID:', createdId);

    // Test getAnimal
    console.log('\n3. Testing getAnimal():');
    const createdAnimal = await collection.findOne({ _id: createdId });
    console.log('Retrieved created animal:', createdAnimal);

    // Test updateAnimal
    console.log('\n4. Testing updateAnimal():');
    const updateResult = await collection.updateOne(
        { _id: createdId },
        { $set: { age: 6, diet: "herbivore" } }
    );
    console.log('Update result:', updateResult);
    
    // Verify update
    const updatedAnimal = await collection.findOne({ _id: createdId });
    console.log('Retrieved updated animal:', updatedAnimal);

    // Test deleteAnimal
    console.log('\n5. Testing deleteAnimal():');
    const deleteResult = await collection.deleteOne({ _id: createdId });
    console.log('Delete result:', deleteResult);
    
    // Verify deletion
    const deletedAnimal = await collection.findOne({ _id: createdId });
    console.log('Trying to retrieve deleted animal (should be null):', deletedAnimal);

    await client.close();
}

// Run tests
console.log('Starting Animal Database Tests...');
console.log('=================================');
testAnimalFunctions()
    .then(() => {
        console.log('=================================');
        console.log('All tests completed!');
        process.exit(0);
    })
    .catch(error => {
        console.error('Test failed:', error);
        process.exit(1);
    }); 