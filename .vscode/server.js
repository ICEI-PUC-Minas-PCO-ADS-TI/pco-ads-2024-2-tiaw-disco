const express = require('express'); // Importa o módulo express
const fs = require('fs'); // Importa o módulo fs (File System) para ler e escrever arquivos
const bodyParser = require('body-parser'); // Importa o módulo body-parser para tratar dados no corpo das requisições
const app = express(); // Inicializa o aplicativo express

app.use(bodyParser.json()); // Configura o body-parser para tratar dados JSON
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'

// Rota para obter os dados do perfil
app.get('/api/perfil', (req, res) => {
    fs.readFile('dados.json', (err, data) => { // Lê o arquivo 'dados.json'
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo de dados.'); // Retorna um erro 500 se houver problema ao ler o arquivo
        }
        res.send(JSON.parse(data)); // Envia os dados do arquivo como resposta em formato JSON
    });
});

// Rota para atualizar os dados do perfil
app.post('/api/perfil', (req, res) => {
    const perfil = req.body; // Obtém os dados do corpo da requisição
    fs.readFile('dados.json', (err, data) => { // Lê o arquivo 'dados.json'
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo de dados.'); // Retorna um erro 500 se houver problema ao ler o arquivo
        }
        const jsonData = JSON.parse(data); // Converte os dados do arquivo para um objeto JavaScript
        jsonData.perfil = perfil; // Atualiza os dados do perfil com os dados da requisição
        fs.writeFile('dados.json', JSON.stringify(jsonData, null, 2), (err) => { // Escreve os dados atualizados no arquivo 'dados.json'
            if (err) {
                return res.status(500).send('Erro ao salvar os dados.'); // Retorna um erro 500 se houver problema ao salvar o arquivo
            }
            res.send('Dados salvos com sucesso.'); // Retorna uma mensagem de sucesso
        });
    });
});

const PORT = 3000; // Define a porta onde o servidor irá rodar
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`); // Exibe uma mensagem no console indicando que o servidor está rodando
});
