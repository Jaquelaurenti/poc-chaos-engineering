const express = require('express');
const router = express.Router();
const throttle = require('throttle');
const loadtest = require('loadtest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


// Rota para introduzir atraso
app.get('/delay', (req, res) => {
  setTimeout(() => {
    res.send('Delayed response');
  }, 5000); // 5 segundos de atraso
});

// Rota para introduzir um erro 500
app.get('/error', (req, res) => {
  res.status(500).send('Internal Server Error');
});

app.get('/heavy-load', (req, res) => {
  const start = Date.now();
  while (Date.now() - start < 5000) {
    // Loop por 5 segundos para simular carga pesada
  }
  res.send('Heavy Load Complete');
});


// Rota para introduzir latência de rede
app.get('/slow', (req, res) => {
  const slowStream = throttle(1000); // 1 segundo de latência
  slowStream.pipe(res);
  slowStream.write('Slow response');
  slowStream.end();
});

// Rota para aumentar a carga do servidor
app.get('/load', (req, res) => {
  const options = {
    url: 'http://localhost:3000/',
    maxRequests: 1000, // Número de requisições para enviar
    concurrency: 10 // Número de requisições simultâneas
  };

  loadtest.loadTest(options, (error, result) => {
    if (error) {
      return console.error('Error:', error);
    }
    console.log(result);
    res.send('Load test complete');
  });
});

// Rota que faz chamada a uma API externa com atraso simulado
app.get('/external-api', async (req, res) => {
  try {
    await delay(5000); // Atraso de 5 segundos

    const response = await axios.get('https://api.example.com/data');
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Rota que simula uma leitura no banco de dados MongoDB
app.get('/database-read', async (req, res) => {
  try {
    const uri = await getMongoUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Introduzir uma falha simulada na conexão com o banco de dados
    mongoose.connection.close();

    res.send('Read operation successful');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Rota que simula uma gravação no banco de dados MongoDB
app.get('/database-write', async (req, res) => {
  try {
    const uri = await getMongoUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Introduzir uma falha simulada na conexão com o banco de dados
    mongoose.connection.close();

    res.send('Write operation successful');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Função para obter a URI de conexão com o MongoDB
async function getMongoUri() {
  const mongoServer = new MongoMemoryServer();
  return await mongoServer.getUri();
}



module.exports = router;


