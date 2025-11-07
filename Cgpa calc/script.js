function generateInputs() {
    const semCount = document.getElementById("semesters").value;
    const form = document.getElementById("semesterForm");
    
    if (semCount <= 0) {
        alert("Enter valid number of semesters");
        return;
    }
    
    form.innerHTML = "";
    document.getElementById("resultBox").style.display = "none";

    for (let i = 1; i <= semCount; i++) {
        const box = document.createElement("div");
        box.classList.add("semester-box");
        box.innerHTML = `
            <label>Semester ${i} SGPA</label>
            <input type="number" step="0.01" min="0" max="10" id="sgpa${i}" placeholder="e.g. 8.5">
            <label>Credits</label>
            <input type="number" min="1" id="credit${i}" placeholder="e.g. 20">
        `;
        form.appendChild(box);
    }

    const calcBtn = document.createElement("button");
    calcBtn.textContent = "Calculate CGPA";
    calcBtn.type = "button";
    calcBtn.onclick = calculateCGPA;
    form.appendChild(calcBtn);
}

function calculateCGPA() {
    const semCount = document.getElementById("semesters").value;
    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 1; i <= semCount; i++) {
        const sgpa = parseFloat(document.getElementById(`sgpa${i}`).value) || 0;
        const credit = parseFloat(document.getElementById(`credit${i}`).value) || 0;

        totalCredits += credit;
        totalPoints += sgpa * credit;
    }

    if (totalCredits === 0) {
        alert("Please fill all SGPA and credits properly.");
        return;
    }

    const cgpa = totalPoints / totalCredits;
    const resultBox = document.getElementById("resultBox");
    resultBox.style.display = "block";
    resultBox.innerHTML = `Your Overall CGPA: <b>${cgpa.toFixed(2)}</b>`;
}
