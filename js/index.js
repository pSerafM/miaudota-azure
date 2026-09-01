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
            card.style.border = "1px solid #ccc";
            card.style.padding = "15px";
            card.style.margin = "10px 0";
            card.style.borderRadius = "8px";

            // Cria o HTML do card. Repare que estamos usando o _id que vem do MongoDB
            card.innerHTML = `
                <h3>${pet.nome}</h3>
                <p><strong>Espécie:</strong> ${pet.especie} | <strong>Raça:</strong> ${pet.raca}</p>
                <p><strong>Idade:</strong> ${pet.idade} anos | <strong>Sexo:</strong> ${pet.sexo} | <strong>Porte:</strong> ${pet.porte}</p>
                <p>${pet.descricao}</p>
                <button onclick="editar('${pet._id}', '${pet.nome}')" style="background:#f0ad4e; color:white; padding:5px; border:none; cursor:pointer; margin-right: 5px;">Editar Nome</button>
                <button onclick="excluir('${pet._id}')" style="background:#d9534f; color:white; padding:5px; border:none; cursor:pointer;">Excluir</button>
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