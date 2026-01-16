import { createAgentClient } from '/MCPBrowserClient.js';

const iterationsInput = document.getElementById('iterations');
const iterationsDisplay = document.getElementById('iterationsDisplay');
const loadingDiv = document.getElementById('loading');
const runButton = document.getElementById('runSimulation');
const selfCallButton = document.getElementById('selfCall');
const modal = document.getElementById('resultModal');
const resultContent = document.getElementById('resultContent');
const closeModalButton = document.getElementById('closeModalButton');
const asyncTaskButton = document.getElementById('startAsyncTask');
const asyncHistory = document.getElementById('asyncHistory');
const asyncTaskEntries = new Map();

const STATUS_TOOL = 'status';
const SIMULATION_TOOL = 'run_simulation';
const ASYNC_TASK_TOOL = 'demo_async_task';
const demoClient = createAgentClient('/mcps/demo/mcp');
const simulatorClient = createAgentClient('/mcps/simulator/mcp');

iterationsInput.addEventListener('input', function () {
    iterationsDisplay.textContent = this.value;
});

function extractTextFromResult(result) {
    const content = Array.isArray(result?.content) ? result.content : [];
    const textBlock = content.find(item => item?.type === 'text' && typeof item.text === 'string');
    return textBlock ? textBlock.text : '';
}



function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function showResult(html) {
    resultContent.innerHTML = html;
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');


document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});
