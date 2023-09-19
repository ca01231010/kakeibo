function calendar(year, month) {
    const table = document.createElement("table");
 
    nextButton.addEventListener("click", function(e) {
        document.body.removeChild(table);
        month += 1;
        calendar(year, month);
    });
    
 
    let count: number = 1;
    let weekCount: number = 0;
 
    const week: Date = new Date(year, month, 0);
    const lastDate: Date = new Date(year, month + 1, 0);
    for (let y: number = 0; y < 6; y++) {
        const tr = document.createElement("tr");
        for (let x: number = 0; x < 7; x++) {
            const td = document.createElement("td");
            if (lastDate.getDate() >= count && week.getDay() < weekCount) { 
                td.textContent = count.toString();
                count += 1;    
            }
            tr.appendChild(td);
            weekCount += 1;
        }
        table.appendChild(tr);
    }
    document.body.appendChild(table);
}
const date: Date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
 
const nextButton = document.createElement("button");
nextButton.textContent = "次へ >";
document.body.appendChild(nextButton);
 
calendar(year, month);