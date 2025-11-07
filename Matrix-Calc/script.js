function generateMatrix(matrix) {
    let rows = document.getElementById(`rows${matrix}`).value;
    let cols = document.getElementById(`cols${matrix}`).value;

    let container = document.getElementById(`matrix${matrix}`);
    container.innerHTML = "";

    container.style.gridTemplateColumns = `repeat(${cols}, 50px)`;
    container.className = "matrix-grid";

    for (let i = 0; i < rows * cols; i++) {
        let input = document.createElement("input");
        input.type = "number";
        container.appendChild(input);
    }
}

function getMatrix(matrix) {
    let rows = document.getElementById(`rows${matrix}`).value;
    let cols = document.getElementById(`cols${matrix}`).value;
    let inputs = [...document.querySelectorAll(`#matrix${matrix} input`)];
    let m = [];

    for (let i = 0; i < rows; i++) {
        m.push(inputs.slice(i * cols, (i + 1) * cols).map(val => Number(val.value)));
    }
    return m;
}

function showResult(result) {
    let container = document.getElementById("result");
    container.innerHTML = "";
    container.className = "result-grid";

    container.style.gridTemplateColumns = `repeat(${result[0].length}, 50px)`;

    result.forEach(row => {
        row.forEach(val => {
            let cell = document.createElement("input");
            cell.value = val;
            cell.readOnly = true;
            container.appendChild(cell);
        });
    });
}

function addMatrices() {
    let A = getMatrix("A");
    let B = getMatrix("B");

    if (A.length !== B.length || A[0].length !== B[0].length) {
        alert("Both matrices must be same size for addition!");
        return;
    }
    
    let result = A.map((row, i) => row.map((val, j) => val + B[i][j]));
    showResult(result);
}

function subtractMatrices() {
    let A = getMatrix("A");
    let B = getMatrix("B");

    if (A.length !== B.length || A[0].length !== B[0].length) {
        alert("Both matrices must be same size for subtraction!");
        return;
    }
    
    let result = A.map((row, i) => row.map((val, j) => val - B[i][j]));
    showResult(result);
}

function multiplyMatrices() {
    let A = getMatrix("A");
    let B = getMatrix("B");

    if (A[0].length !== B.length) {
        alert("A's columns must equal B's rows for multiplication!");
        return;
    }

    let result = A.map((row, i) =>
        B[0].map((_, j) =>
            row.reduce((sum, val, k) => sum + val * B[k][j], 0)
        )
    );
    showResult(result);
}

function clearAll() {
    document.getElementById("matrixA").innerHTML = "";
    document.getElementById("matrixB").innerHTML = "";
    document.getElementById("result").innerHTML = "";
}
