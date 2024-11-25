function runQuery(event) {
    event.preventDefault();
    const query = document.getElementById('query').value;

    // Change the URL below to your Railway Flask API endpoint
    const apiUrl = 'https://sqlapi-production.up.railway.app/execute-sql';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query }),
    })
    .then(response => response.json())
    .then(data => {
        const resultContainer = document.getElementById('result-container');
        if (data.error) {
            resultContainer.innerHTML = `<div style="color: red; font-weight: bold;">Error: ${data.error}</div>`;
        } else {
            let html = '<table><thead><tr>';
            data.columns.forEach(column => {
                html += `<th>${column}</th>`;
            });
            html += '</tr></thead><tbody>';
            data.result.forEach(row => {
                html += '<tr>';
                row.forEach(cell => {
                    html += `<td>${cell}</td>`;
                });
                html += '</tr>';
            });
            html += '</tbody></table>';
            resultContainer.innerHTML = html;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
