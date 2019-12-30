
'use strict';

drawTable(); // Draw all table using data from the LS

// Adding event listeners
document.getElementById('add-product').addEventListener('click', validForm);
document.getElementById('clear-all').addEventListener('click', clearAll);



// Form validation for the product adding
function validForm(e){

    e.preventDefault();

    const productName = document.forms["new-product"]["product-name"].value;
    const proteins = document.forms["new-product"]["proteins"].value;
    
    // Check if the field is empty
    if (productName == "" || proteins == ""){
        alert("Все поля должны быть заполнены");
        console.log("Есть пустое поле");
    }else{
        // If validation is passed, add product to LS and create new row
        addToLS(productName,proteins);
    }
}



// Adding to the LocalStorage
function addToLS(productName,proteins){

    // Create an object
    let product = {
        id: 1,
        name: productName,
        proteins: proteins
    };

    // Check if our array exist in LS
    // If LS is empty
    if (localStorage.getItem('products') === null){
        // Init array
        let products = [];

        // Add to array
        products.push(product);

        // Set to the LS
        localStorage.setItem('products', JSON.stringify(products));

        // Create new row in the table
        addRow(1,productName,proteins);

    }else{
        /// If LS has products
        // Get products from the LS
        let products = JSON.parse(localStorage.getItem('products'));


        /// Set product ID
        // Get all ID's from the objects (products)
        const productIdAll = products.map(function(product){
            return product.id;
        })
        // Find biggest ID in the array
        let biggestId = Math.max(...productIdAll);

        // Setting ID of this new product
        product.id = ++biggestId;



        // Add product to the array
        products.push(product);

        // Write products back to the LS
        localStorage.setItem('products', JSON.stringify(products));

        // Create new row in the table
        addRow(product.id,productName,proteins);
    }
    
}

// Adding a new column to the DOM
function addCol(){

}


// Adding a row to the DOM
function addRow(...cellContent){

    let rowCells = 3; // How much cells in a row we need
    const table = document.getElementById('product-table');

    // Convert cell content to array
    //const cellContent = [a, b, c];

    // For setting a row number
    const tableRows = table.children.length;




    // Create HTML (not the best solution)
    // const newRow = `
    //         <tr class="table-row">
    //             <td class="col-1 row-${tableRows}">${a}</td>
    //             <td class="col-2 row-${tableRows}">${b}</td>
    //             <td class="col-3 row-${tableRows}">${c}</td>
    //             <td class="col-del-btn"><button type="button" class="delete-row">Удалить</button></td>
    //         </tr>
    // `;




    /// Create HTML the right way
    // New row
    const row = document.createElement('tr');
    row.classList.add('table-row');

    // New cells
    for(let i = 0; i < rowCells; i++){
        const cell = document.createElement('td');
        console.log(i);

        // Add classes
        cell.classList.add(`col-${i+1}`);
        cell.classList.add(`row-${tableRows}`);

        // Add content
        const content = cellContent[i];
        cell.innerText = content;

        // Insert in a row
        row.appendChild(cell);
    }

    // Adding Delete button
    const delBtnCell = document.createElement('td');
    const delBtn = document.createElement('button');

    delBtnCell.classList.add('col-del-btn');
    delBtn.classList.add('delete-row');

    delBtn.type = 'button';
    delBtn.innerText = 'Удалить';

    // Adding event listener
    delBtn.addEventListener('click', rowDel);



    // Insert all the rest elements
    delBtnCell.appendChild(delBtn);
    row.appendChild(delBtnCell);

    // Finally, insert assembled row to a table
    table.appendChild(row);
    


    // Insert created HTML of the row
   // document.getElementById('product-table').insertAdjacentHTML('beforeend', newRow);

}

// Add header row
function addHeader(){

    let rowCells = 3; // How much cells in a row we need

    const table = document.getElementById('product-table2');
    const row = document.createElement('tr');

    row.id = "table-header2";

    // New cells
    for(let i = 0; i < rowCells; i++){
        const cell = document.createElement('th');

        // Add classes
        cell.classList.add(`col-${i+1}`);

        // Insert in a row
        row.appendChild(cell);
    }

}




// Delete all products from the LS
function clearAll(){
    
    localStorage.removeItem('products');

    deleteRowsAll();
}




// Delete all rows from DOM
function deleteRowsAll(){
    const productTable = document.getElementById('product-table');

    let tableRows = productTable.children.length;
    while (tableRows > 1){
        productTable.lastChild.remove(); // Delete rows until we have only first one - header
        tableRows = productTable.children.length; // Update rows quantity
    }
}



// Draw all table using data from the LS
function drawTable(){

    // Columns LS
    // Check if our array exist in LS
    // If LS is empty
    if (localStorage.getItem('columns') === null){
        // Create header
    }else{
        // Draw header
    }

    // Check if our array exist in LS
    // If LS is empty
    if (localStorage.getItem('products') === null){
        // Do nothing
    }else{
        /// If LS has products
        // Get products from the LS
        const products = JSON.parse(localStorage.getItem('products'));

        products.forEach((product,i) => {
            addRow(product.id,product.name,product.proteins);
        });
    }


    
}



// Delete a row
function rowDel(){

    // Check if there is the only one row left (plus header == 2), then delete whole LS item
    // to prevent an empty object in the LS
    const tableRows = document.getElementById('product-table').children.length;

    if (tableRows == 2){
        localStorage.removeItem('products');
    }else{
        /// Delete from the LS
        // Get product ID from the ID cell
        const id = this.parentElement.parentElement.firstChild.innerText;

        // Get products from the LS
        let products = JSON.parse(localStorage.getItem('products'));
        
        // Delete this product from the array
        products = products.filter(product => product.id != id);

        // Write products back to the LS
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Delete from the DOM
    this.parentElement.parentElement.remove();

}





