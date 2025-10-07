dummy = {"medicines":
    [{"name":"Dummy Elixirium","price":5.99},
        {"name":"Dummy Cureallium","price":7.49},
        {"name":"Dummy Healix","price":4.99},
        {"name":"Dummy Restorix","price":12.99},
        {"name":"Dummy Revitalix","price":15.49},
        {"name":"Dummy Tonicast","price":null},
        {"name":"Dummy Allevium","price":19.99},
        {"name":"Dummy Synthomaxi","price":14.99},
        {"name":"Dummy Magicure","price":200.0}]}
// fetch data from api

medicineData = [];
// base table to clone
let baseTable = document.getElementById("medicineTable");

function fetchMedicineData() {
    fetch('http://localhost:8000/medicines').then(response => response.json())
        .then(data => {
            medicineData = data.medicines;

        buildTable();
    }).catch(error => {
        medicineData = dummy.medicines;
        buildTable();
    });

}
let sortBtn = document.getElementById("sortPriceBtn");
sortBtn.addEventListener("click", () => {
    let btns = document.getElementsByClassName("optionBtn");
    console.log(btns);
    for (let btn of btns) {
        console.log(btn.style.display);
        //invert display property
        if (btn.style.display === "inline-block") {
            btn.style.display = "none";
        } else {
            btn.style.display = "inline-block";
        }
    }
});

let ascButton = document.getElementById("ascendingBtn");
ascButton.addEventListener("click", () => {
    //updating table and keeping old data
    //to revert back to default
    let old = medicineData.slice();
    medicineData.sort((a, b) => a.price - b.price);
    let newData = medicineData.slice();
    medicineData = old;
    buildTable(newData);
});
let descButton = document.getElementById("descendingBtn");
descButton.addEventListener("click", () => {

    //updating table and keeping old data
    //to revert back to default
    let old = medicineData.slice();
    medicineData.sort((a, b) => b.price - a.price);
    let newData = medicineData.slice();
    medicineData = old;
    buildTable(newData);
});

let defButton = document.getElementById("defaultBtn");
defButton.addEventListener("click", () => {
    //because medicineData is still the original unsorted data
    buildTable();
    //remove filter buttons for neatness
    sortBtn.click();
});

let addMedButton = document.getElementById("medAdd");
let medForm = document.getElementById("medForm");
let medSubmit = document.getElementById("medSubmit");
addMedButton.addEventListener("click", () => {
    if (medForm.style.display === "none") {
        medForm.style.display = "block";
    } else {
        medForm.style.display = "none";
    }
});

medSubmit.addEventListener("click", () => {
    let nameInput = document.getElementById("medName");
    let priceInput = document.getElementById("medPrice");

    // Create FormData object for form submission
    const formData = new FormData();
    formData.append('name', nameInput.value);
    formData.append('price', parseFloat(priceInput.value));

    fetch('http://localhost:8000/create', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(data => {
          console.log('Success:', data);
          fetchMedicineData();
      })
      .catch((error) => {
          console.error('Error:', error);
      });

    // Clear input fields
    nameInput.value = '';
    priceInput.value = '';
});

function buildTable(data = medicineData) {
    console.log(data)
    //clear table
    let table = document.getElementById("medicineTable");
    let tbody = table.querySelector('tbody');
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    data.forEach(medicine => {
        // Create a new row for each medicine
        // Each medicine has name and price properties and class
        let row = tbody.insertRow();
        row.classList.add("medicineRow");
        let nameCell = row.insertCell(0);
        nameCell.classList.add("nameCell");
        let priceCell = row.insertCell(1);
        priceCell.classList.add("priceCell");
        nameCell.innerHTML = medicine.name || "N/A";
        priceCell.innerHTML = medicine.price !== null ? `$${medicine.price.toFixed(2)}` : "N/A";   
            });
        };

fetchMedicineData();