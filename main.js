function calendar(year, month) {
    var table = document.createElement("table");
    nextButton.addEventListener("click", function (e) {
        document.body.removeChild(table);
        month += 1;
        calendar(year, month);
    });
    var count = 1;
    var weekCount = 0;
    var week = new Date(year, month, 0);
    var lastDate = new Date(year, month + 1, 0);
    for (var y = 0; y < 6; y++) {
        var tr = document.createElement("tr");
        for (var x = 0; x < 7; x++) {
            var td = document.createElement("td");
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
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();
var nextButton = document.createElement("button");
nextButton.textContent = "次へ >";
document.body.appendChild(nextButton);
calendar(year, month);
