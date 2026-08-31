const formulario = document.getElementById("formulario-pet");

const titulo = document.getElementById("titulo-formulario");

const parametros = new URLSearchParams(window.location.search);

const id = parametros.get("id");


// Se existir ID na URL,
// estamos editando um pet.
if (id) {

    const pet = PetService.obterPet(id);

    if (pet) {

        titulo.textContent = "Editar Pet";

        document.getElementById("nome").value = pet.nome;

        document.getElementById("especie").value = pet.especie;

        document.getElementById("raca").value = pet.raca;

        document.getElementById("idade").value = pet.idade;

        document.getElementById("sexo").value = pet.sexo;

        document.getElementById("porte").value = pet.porte;

        document.getElementById("descricao").value = pet.descricao;

    }

}


formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const pet = {

        nome: document.getElementById("nome").value,

        especie: document.getElementById("especie").value,

        raca: document.getElementById("raca").value,

        idade: Number(
            document.getElementById("idade").value
        ),

        sexo: document.getElementById("sexo").value,

        porte: document.getElementById("porte").value,

        descricao: document.getElementById("descricao").value

    };


    if (id) {

        const petExistente = PetService.obterPet(id);

        pet.id = petExistente.id;

        pet.adotado = petExistente.adotado;

        PetService.atualizarPet(pet);

        alert("Pet atualizado com sucesso!");

    } else {

        PetService.adicionarPet(pet);

        alert("Pet cadastrado com sucesso!");

    }


    window.location.href = "index.html";

});