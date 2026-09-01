document.getElementById('formulario-pet').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Coleta os valores do formulário
    const novoPet = {
        nome: document.getElementById('nome').value,
        especie: document.getElementById('especie').value,
        raca: document.getElementById('raca').value,
        idade: document.getElementById('idade').value,
        sexo: document.getElementById('sexo').value,
        porte: document.getElementById('porte').value,
        descricao: document.getElementById('descricao').value
    };

    try {
        await cadastrarPet(novoPet);
        alert('Pet cadastrado com sucesso!');
        window.location.href = 'index.html'; // Redireciona para a home
    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        alert('Falha ao cadastrar o pet.');
    }
});