const PetService = {

    async obterPetsAzure() {
        const resposta = await fetch(
            "https://miaudota-api-midup-c2dqhcemane5h4eg.brazilsouth-01.azurewebsites.net/api/pets"
        );

        if (!resposta.ok) {
            throw new Error("Erro ao consultar a Azure Function");
        }

        return await resposta.json();
    },

    obterPets() {
        const pets = localStorage.getItem("pets");

        if (pets) {
            return JSON.parse(pets);
        }

        const petsIniciais = [
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
                descricao: "Tranquila e carinhosa.",
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

        this.salvarPets(petsIniciais);

        return petsIniciais;
    },

    salvarPets(pets) {
        localStorage.setItem("pets", JSON.stringify(pets));
    },

    obterPet(id) {
        const pets = this.obterPets();

        return pets.find(pet => pet.id === Number(id));
    },

    adicionarPet(pet) {
        const pets = this.obterPets();

        const novoPet = {
            ...pet,
            id: Date.now(),
            adotado: false
        };

        pets.push(novoPet);

        this.salvarPets(pets);

        return novoPet;
    },

    atualizarPet(petAtualizado) {
        const pets = this.obterPets();

        const index = pets.findIndex(
            pet => pet.id === Number(petAtualizado.id)
        );

        if (index === -1) {
            return false;
        }

        pets[index] = petAtualizado;

        this.salvarPets(pets);

        return true;
    },

    excluirPet(id) {
        const pets = this.obterPets();

        const novosPets = pets.filter(
            pet => pet.id !== Number(id)
        );

        this.salvarPets(novosPets);
    }
};