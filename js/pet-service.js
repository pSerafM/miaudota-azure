const API_URL = '/api/pets';

async function requisicaoApi(url, options) {
    const response = await fetch(url, options);
    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(body.error || body.message || `API retornou ${response.status}`);
    }

    return body;
}

async function listarPets() {
    return await requisicaoApi(API_URL);
}

async function cadastrarPet(pet) {
    return await requisicaoApi(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pet)
    });
}

async function atualizarPet(id, dados) {
    return await requisicaoApi(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
}

async function deletarPet(id) {
    return await requisicaoApi(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
}