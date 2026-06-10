const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(
    path.join(__dirname, "banco.db")
);

db.run(`
CREATE TABLE IF NOT EXISTS pessoas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    idade INTEGER
)
`);


app.get("/pessoas", (req, res) => {
    db.all("SELECT * FROM pessoas", [], (err, rows) => {
        if (err) {
            console.log("Erro SELECT:", err.message);
            return res.status(500).json({ erro: err.message });
        }

        res.json(rows);
    });
});

app.post("/pessoas", (req, res) => {
    const { nome, idade } = req.body;

    db.run(
        "INSERT INTO pessoas (nome, idade) VALUES (?, ?)",
        [nome, idade],
        function (err) {
            if (err) {
                console.log("Erro INSERT:", err.message);
                return res.status(500).json({ erro: err.message });
            }

            res.json({
                mensagem: "Pessoa salva com sucesso",
                id: this.lastID
            });
        }
    );
});

app.listen(3000, () => {
    console.log("rodando na porta 3000");
});

//saber caminho do bancoooo
console.log("DB PATH:", path.join(__dirname, "banco.db"));