import { createAgentClient } from '/MCPBrowserClient.js';

const iterationsInput = document.getElementById('iterations');
const iterationsDisplay = document.getElementById('iterationsDisplay');
const loadingDiv = document.getElementById('loading');
const runButton = document.getElementById('runSimulation');

const resultContent = document.getElementById('resultContent');
const closeModalButton = document.getElementById('closeModalButton');
const asyncTaskButton = document.getElementById('startAsyncTask');
const asyncHistory = document.getElementById('asyncHistory');

