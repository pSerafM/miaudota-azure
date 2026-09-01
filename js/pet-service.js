// URL local para testes. Ao publicar, troque para a URL da nuvem.
const API_URL = '/api/pets';

async function listarPets() {
    const response = await fetch(API_URL);
    return await response.json();
}

async function cadastrarPet(pet) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pet)
    });
    return await response.json();
}

async function atualizarPet(id, dados) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
    return await response.json();
}

async function deletarPet(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    return await response.json();
}