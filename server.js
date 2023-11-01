'use strict';
const fs = require('fs');
const express = require('express');
const axios = require('axios')
const { fork } = require('child_process');
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// App
const app = express();
app.get('/read', (req, res) => {
  const childProcess = fork('./fibonacci.js');
  // Listen for messages from the child process
childProcess.on('message', (message) => {
  console.log(`Message from child process: ${message}`);
});

// Optional: Listen for errors from the child process
childProcess.on('error', (error) => {
  console.error(`Child process error: ${error}`);
});

// Optional: Listen for the child process to exit
childProcess.on('exit', (code) => {
  console.log(`Child process exited with code ${code}`);
});

// Trigger the blocking function in the child process
childProcess.send(42);
  res.send(`test ->>>>`);
});

app.get('/read2', (req, res) => {
  res.send('Hello World 2');
});

app.get('/downloadImage', async (req, res) => {
  const imageUrl = req.query.imageUrl
  const start = performance.now()
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer', timeout: 50 * 1000 });
  console.log('RESPONSE DATA ->>>', response.data)
  const end = performance.now()
  console.log('TIME getImageFromFrameFinder ->>>', end-start)
  res.json({status: 'success'})
})

app.listen(PORT, HOST, () => {

  console.log(`Running on http://${HOST}:${PORT}`);
});