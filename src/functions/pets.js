const { app } = require('@azure/functions');
const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("MONGODB_URI não foi configurada.");
}

const client = new MongoClient(uri);
const clientPromise = client.connect();

async function getCollection() {
    await clientPromise;

    const db = client.db('miaudota');
    return db.collection('pets');
}

// 1. PESQUISAR (GET)
app.http('getPets', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'pets',
    handler: async (request, context) => {
        try {
            const collection = await getCollection();
            const pets = await collection.find({}).toArray();
            return { status: 200, jsonBody: pets };
        } catch (error) {
            return { status: 500, body: "Erro ao buscar pets." };
        }
    }
});

// 2. INSERIR (POST)
app.http('createPet', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'pets',
    handler: async (request, context) => {
        try {
            const petData = await request.json();
            const collection = await getCollection();
            const result = await collection.insertOne(petData);
            return { status: 201, jsonBody: { _id: result.insertedId, ...petData } };
        } catch (error) {
            return { status: 500, body: "Erro ao inserir pet." };
        }
    }
});

// 3. ALTERAR (PUT)
app.http('updatePet', {
    methods: ['PUT'],
    authLevel: 'anonymous',
    route: 'pets/{id}',
    handler: async (request, context) => {
        try {
            const id = request.params.id;
            const petData = await request.json();
            const collection = await getCollection();
            
            // Remove o _id do corpo para não tentar atualizar a chave primária
            delete petData._id; 
            
            await collection.updateOne({ _id: new ObjectId(id) }, { $set: petData });
            return { status: 200, jsonBody: { message: "Pet atualizado!" } };
        } catch (error) {
            return { status: 500, body: "Erro ao atualizar pet." };
        }
    }
});

// 4. EXCLUIR (DELETE)
app.http('deletePet', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    route: 'pets/{id}',
    handler: async (request, context) => {
        try {
            const id = request.params.id;
            const collection = await getCollection();
            await collection.deleteOne({ _id: new ObjectId(id) });
            return { status: 200, jsonBody: { message: "Pet excluído!" } };
        } catch (error) {
            return { status: 500, body: "Erro ao excluir pet." };
        }
    }
});