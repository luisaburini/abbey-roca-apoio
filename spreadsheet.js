const sheetId = '1qIkY4wpea9GL9ww6WpL_OFMLSripNDET7-sJ6vvSMf4';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'Teste (respostas)';
const query = encodeURIComponent('Select *')
const url = `${base}&sheet=${sheetName}&tq=${query}`

const data = []
document.addEventListener('DOMContentLoaded', init)
const output = document.querySelector('.output')
function init() {
    console.log("INIT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            //Remove additional text and extract only JSON:
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            console.log(jsonData)
            const colz = [];
            const tr = document.createElement('tr');
            //Extract column labels
            jsonData.table.cols.forEach((heading) => {
                if (heading.label) {
                    let column = heading.label;
                    colz.push(column);
                    const th = document.createElement('th');
                    th.innerText = column;
                    tr.appendChild(th);
                }
            })
            output.appendChild(tr);
            //extract row data:
            jsonData.table.rows.forEach((rowData) => {
                const row = {};
                colz.forEach((ele, ind) => {
                    row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                })
                data.push(row);
            })
            processRows(data);
        })
        console.log("Leaving init")
}

function processRows(json) {
    json.forEach((row) => {
        const tr = document.createElement('tr');
        const keys = Object.keys(row);

        console.log("PROCESS ROWZ")
        keys.forEach((key) => {
            const td = document.createElement('td');
            td.textContent = row[key];
            tr.appendChild(td);
        })
        output.appendChild(tr);
    })
}