let stock = [];
let currentId = 1;

const stockByDay = {
    "Lunes": [],
    "Martes": [],
    "Miércoles": [],
    "Jueves": [],
    "Viernes": []
};

document.getElementById('add-stock-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);

    stock.push({ id: currentId++, quantity, price });
    updateStockList();
});

document.getElementById('remove-stock-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const removeId = parseInt(document.getElementById('remove-id').value);
    const removeQuantity = parseInt(document.getElementById('remove-quantity').value);
    const stockIndex = stock.findIndex(item => item.id === removeId);

    if (stockIndex !== -1 && removeQuantity > 0) {
        if (stock[stockIndex].quantity <= removeQuantity) {
            stock.splice(stockIndex, 1);
        } else {
            stock[stockIndex].quantity -= removeQuantity;
        }
        updateStockList();
    }
});

document.getElementById('search-stock').addEventListener('click', function() {
    const totalStock = stock.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('current-stock').innerText = `Stock Actual: ${totalStock} unidades`;
});

document.getElementById('show-summary').addEventListener('click', function() {
    const summaryId = parseInt(document.getElementById('summary-id').value);
    const stockItem = stock.find(item => item.id === summaryId);
    if (stockItem) {
        const summaryContent = `
            <p>Entrada del mismo producto a diferente precio:</p>
            <ul>
                <li>Los Lunes 70 unidades a $572</li>
                <li>Los Miércoles 100 unidades a $565</li>
                <li>Los Viernes 150 unidades a $557</li>
            </ul>
            <p>Salida que se repite por tres semanas:</p>
            <ul>
                <li>Lunes 20</li>
                <li>Martes 30</li>
                <li>Miércoles 75</li>
                <li>Jueves 65</li>
                <li>Viernes 130</li>
            </ul>
            <p>Del viernes anterior al inicio de la valoración quedaron ${stockItem.quantity} unidades a $${stockItem.price}.</p>
        `;
        document.getElementById('summary-content').innerHTML = summaryContent;
        document.getElementById('summary-modal').style.display = "block";
    }
});

document.getElementById('show-day-stock').addEventListener('click', function() {
    const selectedDay = document.getElementById('day-select').value;
    const dayStock = stockByDay[selectedDay];

    let stockDetails = `<h3>Stock para ${selectedDay}:</h3>`;
    if (dayStock.length > 0) {
        stockDetails += '<ul>';
        dayStock.forEach(item => {
            stockDetails += `<li>ID: ${item.id} - Cantidad: ${item.quantity} - Precio: $${item.price}</li>`;
        });
        stockDetails += '</ul>';
    } else {
        stockDetails += '<p>No hay stock registrado para este día.</p>';
    }

    document.getElementById('day-stock').innerHTML = stockDetails;
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('summary-modal').style.display = "none";
});

window.addEventListener('click', function(event) {
    const modal = document.getElementById('summary-modal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

function updateStockList() {
    const stockList = document.getElementById('stock-list');
    stockList.innerHTML = '';

    const removeIdSelect = document.getElementById('remove-id');
    removeIdSelect.innerHTML = '';

    const summaryIdSelect = document.getElementById('summary-id');
    summaryIdSelect.innerHTML = '';

    stock.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `ID: ${item.id} - Cantidad: ${item.quantity} - Precio: $${item.price}`;
        stockList.appendChild(li);

        const removeOption = document.createElement('option');
        removeOption.value = item.id;
        removeOption.textContent = item.id;
        removeIdSelect.appendChild(removeOption);

        const summaryOption = document.createElement('option');
        summaryOption.value = item.id;
        summaryOption.textContent = item.id;
        summaryIdSelect.appendChild(summaryOption);

        // Assign stock to days of the week (example logic)
        stockByDay["Lunes"].push(item);
        stockByDay["Miércoles"].push(item);
        stockByDay["Viernes"].push(item);
    });
}

updateStockList();