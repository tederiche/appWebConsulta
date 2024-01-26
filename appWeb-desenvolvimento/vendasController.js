const express = require('express');
const path = require('path')
const { connectDatabase } = require('./db'); // Substitua pelo caminho real do seu módulo de conexão

const app = express();
const port = 3003;


const publicFolderPath = path.join(__dirname, 'public')
app.use(express.static(publicFolderPath)); // Servir arquivos estáticos da pasta 'public'
app.use(express.json());


// Rota para puxar dados
app.post('/puxarDados', async (req, res) => {
  try {
    const { vendedor, dia, mes, ano, escolha } = req.body;
    
    // Conectar ao banco de dados
    const { db, concluidoCollection, renegociarCollection } = await connectDatabase();

    let result;

    // Verificar a escolha e selecionar a coleção apropriada
    if (escolha === 'concluido') {
      result = await concluidoCollection.find({ /* adicione as condições de consulta aqui */ }).toArray();
    } else if (escolha === 'renegociar') {
      result = await renegociarCollection.find({ /* adicione as condições de consulta aqui */ }).toArray();
    }

    // Faça algo com os dados, por exemplo, enviá-los de volta ao cliente
    res.json(result);
  } catch (error) {
    console.error('Erro ao puxar dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    // Se necessário, fechar a conexão quando terminar
    // await client.close();
  }
});
app.get('/vendedores.json', (req, res) => {
    const filePath = path.join(publicFolderPath, 'ano.json');
    res.sendFile(filePath);
});

app.get('/dias.json', (req, res) => {
    const filePath = path.join(publicFolderPath, 'dias.json');
    res.sendFile(filePath);
});

app.get('/mes.json', (req, res) => {
    const filePath = path.join(publicFolderPath, 'mes.json');
    res.sendFile(filePath);
});
app.get('/ano.json', (req, res) => {
    const filePath = path.join(publicFolderPath, 'ano.json');
    res.sendFile(filePath);
});

app.get('/vendasDados.html', (req, res) => {
    const filePath = path.join(publicFolderPath, 'vendasDados.html');
    res.sendFile(filePath);
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
