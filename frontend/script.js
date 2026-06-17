const API = "http://localhost:3000/pessoas";

async function salvarPessoa() {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, idade })
    });

    alert("Pessoa salva!");
}

async function listarPessoas() {
    const res = await fetch(API);
    const pessoas = await res.json();

    let html = "";

    pessoas.forEach(p => {
        html += `
        <p>
            id: ${p.id} 
            ${p.nome}  
            ${p.idade}

            <button onclick="editarPessoa(${p.id})" class="btn-editar">
                Editar
            </button>

            <button onclick="excluirPessoa(${p.id})" class="btn-excluir">
                Excluir
            </button>
        </p>
        `;
    });

    document.getElementById("resultado").innerHTML = html;
}

async function excluirPessoa(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    listarPessoas();
}

async function editarPessoa(id){
    const novoNome = prompt('Novo nome: ');
    const novaIdade = prompt('Nova idade: ');

    await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: novoNome,
            idade: novaIdade
        })
    })
    listarPessoas();
}