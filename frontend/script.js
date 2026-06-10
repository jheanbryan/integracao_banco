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
        html += `<p>${p.nome} - ${p.idade}</p>`;
    });

    document.getElementById("resultado").innerHTML = html;
}