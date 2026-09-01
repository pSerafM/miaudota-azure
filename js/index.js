async function carregarPets() {
    const container = document.getElementById('lista-pets');
    container.innerHTML = '<p>Carregando...</p>';

    try {
        const pets = await listarPets();
        container.innerHTML = ''; // Limpa o "Carregando"

        if (pets.length === 0) {
            container.innerHTML = '<p>Nenhum pet disponível no momento.</p>';
            return;
        }

        pets.forEach(pet => {
            const card = document.createElement('div');
            card.className = 'card-pet';

            // Cria o HTML do card. Repare que estamos usando o _id que vem do MongoDB
            card.innerHTML = `
                <h3>${pet.nome}</h3>
                <br>
                <p><strong>Espécie:</strong> ${pet.especie} | <strong>Raça:</strong> ${pet.raca}</p>
                <p><strong>Idade:</strong> ${pet.idade} anos | <strong>Sexo:</strong> ${pet.sexo} </p>
                <p><strong>Porte:</strong> ${pet.porte}</p>
                <br>
                <p id="descricao"> "${pet.descricao}" </p>
                <br>
                <button onclick="editar('${pet._id}', '${pet.nome}')" class="botao editar">Editar Nome</button>
                <button onclick="excluir('${pet._id}')" class="botao excluir">Excluir</button>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Erro ao listar:", error);
        container.innerHTML = '<p>Erro ao carregar os dados.</p>';
    }
}

// Função para chamar o DELETE
async function excluir(id) {
    if (confirm("Tem certeza que deseja adotar/excluir este pet?")) {
        await deletarPet(id);
        alert("Pet excluído com sucesso!");
        carregarPets(); // Recarrega a lista
    }
}

// Função simples para chamar o PUT (atualiza apenas o nome para demonstração)
async function editar(id, nomeAtual) {
    const novoNome = prompt("Digite o novo nome para o pet:", nomeAtual);
    if (novoNome && novoNome !== nomeAtual) {
        await atualizarPet(id, { nome: novoNome });
        alert("Nome atualizado!");
        carregarPets(); // Recarrega a lista
    }
}

// Inicia o carregamento ao abrir a página
carregarPets();