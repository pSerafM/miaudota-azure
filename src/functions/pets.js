const { app } = require('@azure/functions');

app.http('pets', {
    methods: ['GET'],
    authLevel: 'anonymous',

    handler: async (request, context) => {

        const pets = [
            {
                id: 1,
                nome: "Thor",
                especie: "Cachorro",
                raca: "SRD",
                idade: 3,
                sexo: "Macho",
                porte: "Médio",
                descricao: "Dócil, brincalhão e muito carinhoso.",
                adotado: false
            },
            {
                id: 2,
                nome: "Luna",
                especie: "Gato",
                raca: "SRD",
                idade: 2,
                sexo: "Fêmea",
                porte: "Pequeno",
                descricao: "Tranquila, carinhosa e independente.",
                adotado: false
            },
            {
                id: 3,
                nome: "Bob",
                especie: "Cachorro",
                raca: "Labrador",
                idade: 5,
                sexo: "Macho",
                porte: "Grande",
                descricao: "Muito amigável e cheio de energia.",
                adotado: true
            }
        ];

        return {
            status: 200,
            jsonBody: pets
        };
    }
});