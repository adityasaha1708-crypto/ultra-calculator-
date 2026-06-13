const state = {display: '0', prev: null, curr: '', op: null};
const display = document.getElementById('display');
const modeBtns = document.querySelectorAll('.mode-btn');
const modeContents = document.querySelectorAll('.mode-content');
const buttons = document.querySelectorAll('.btn');

document.addEventListener('DOMContentLoaded', () => {
    modeBtns.forEach(btn => btn.addEventListener('click', (e) => switchMode(e.target.dataset.mode)));
    buttons.forEach(btn => btn.addEventListener('click', handleClick));
});

function switchMode(mode) {
    modeBtns.forEach(b => b.classList.remove('active'));
    modeContents.forEach(c => c.classList.add('hidden'));
    event.target.classList.add('active');
    document.getElementById(`${mode}-mode`).classList.remove('hidden');
}

function handleClick(e) {
    const action = e.target.dataset.action;
    const op = e.target.dataset.operator;
    const val = e.target.textContent;
    
    if (action) execute(action);
    else if (op) handleOp(op);
    else if (!isNaN(val) || val === '.') addNum(val);
}

function addNum(n) {
    if (n === '.') {
        if (!state.curr.includes('.')) state.curr += '.';
    } else {
        state.curr = state.curr === '0' ? n : state.curr + n;
    }
    updateDisplay();
}

function handleOp(o) {
    if (state.curr === '') return;
    if (state.prev !== null && state.op) calculate();
    state.prev = parseFloat(state.curr);
    state.op = o;
    state.curr = '';
}

function calculate() {
    if (state.prev === null || state.op === null || state.curr === '') return;
    let res;
    const p = state.prev, c = parseFloat(state.curr);
    switch (state.op) {
        case '+': res = p + c; break;
        case '-': res = p - c; break;
        case '*': res = p * c; break;
        case '/': res = c !== 0 ? p / c : NaN; break;
        case '%': res = p % c; break;
    }
    state.display = res;
    state.prev = null;
    state.op = null;
    state.curr = '';
    updateDisplay();
}

function execute(action) {
    switch (action) {
        case 'clear': state.display = '0'; state.prev = null; state.curr = ''; state.op = null; break;
        case 'delete': state.curr = state.curr.slice(0, -1) || '0'; break;
        case 'equals': calculate(); break;
        case 'sin': state.curr = Math.sin(parseFloat(state.curr) * Math.PI / 180).toString(); break;
        case 'cos': state.curr = Math.cos(parseFloat(state.curr) * Math.PI / 180).toString(); break;
        case 'tan': state.curr = Math.tan(parseFloat(state.curr) * Math.PI / 180).toString(); break;
        case 'log': state.curr = Math.log10(parseFloat(state.curr)).toString(); break;
        case 'ln': state.curr = Math.log(parseFloat(state.curr)).toString(); break;
        case 'sqrt': state.curr = Math.sqrt(parseFloat(state.curr)).toString(); break;
        case 'pi': state.curr = Math.PI.toString(); break;
    }
    updateDisplay();
}

function updateDisplay() {
    display.value = state.curr || state.display;
}
