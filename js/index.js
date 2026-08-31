const listaPets = document.getElementById("lista-pets");

async function carregarPets() {

    let pets;

    try {
        pets = await PetService.obterPetsAzure();

        PetService.salvarPets(pets);

    } catch (erro) {
        console.error("Erro ao carregar pets da Azure:", erro);

        pets = PetService.obterPets();
    }

    listaPets.innerHTML = "";

    if (pets.length === 0) {
        listaPets.innerHTML = `
            <p>Nenhum pet cadastrado.</p>
        `;

        return;
    }

    pets.forEach(pet => {

        const card = document.createElement("article");

        card.classList.add("pet-card");

        card.innerHTML = `
            <h3>${pet.nome}</h3>

            <p>
                <strong>Espécie:</strong>
                ${pet.especie}
            </p>

            <p>
                <strong>Raça:</strong>
                ${pet.raca}
            </p>

            <p>
                <strong>Idade:</strong>
                ${pet.idade} anos
            </p>

            <p>
                <strong>Porte:</strong>
                ${pet.porte}
            </p>

            <p>
                ${pet.descricao}
            </p>

            <p>
                <strong>Status:</strong>
                ${pet.adotado ? "Adotado ❤️" : "Disponível 🐾"}
            </p>

            <div class="acoes">

                <a
                    href="cadastro.html?id=${pet.id}"
                    class="botao"
                >
                    Editar
                </a>

                <button
                    onclick="excluirPet(${pet.id})"
                    class="botao excluir"
                >
                    Excluir
                </button>

            </div>
        `;

        listaPets.appendChild(card);
    });
}


function excluirPet(id) {

    const pet = PetService.obterPet(id);

    if (!pet) {
        return;
    }

    const confirmar = confirm(
        `Deseja realmente excluir o pet ${pet.nome}?`
    );

    if (!confirmar) {
        return;
    }

    PetService.excluirPet(id);

    carregarPets();
}


carregarPets();