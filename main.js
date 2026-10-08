//DOM elements
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let cancelUpdateBtn = document.getElementById("cancelUpdate");


//console.log(title,price,taxes,ads,discount,total,count,category,submit);

let mood = "create";
let tmp; //to save index for update

//get total
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    } else {    
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }
}


//create product 

let dataPro;

if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product); //get data from local storage
}else {
    dataPro = [];
}

submit.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };
    //console.log(newPro);
    if (title.value != "" && price.value != "" && category.value != "" && newPro.count <= 100) {
        if (mood === "create") {
            if (newPro.count > 1) { 
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);  //add multiple products
                }
            } else {
                    dataPro.push(newPro);
                } 
        } else {  
            dataPro[tmp] = newPro;
            mood = "create";
            submit.innerHTML = "Create";
            count.style.display = "block";
        }
     clearData();
    }

    localStorage.setItem("product", JSON.stringify(dataPro));//save data in local storage
    showData();
}





//clear inputs
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
    total.style.background = "#a00d02";

    cancelUpdateBtn.style.display = "none";
}


cancelUpdateBtn.onclick = function() {
    mood = "create";
    tmp = undefined;

    submit.innerHTML = "Create";
    count.style.display = "block";

    clearData();
};



//read data from local storage
function showData() {
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" class="update">Update</button></td>
                <td><button onclick="deleteData(${i})" class="delete">Delete</button></td>
            </tr>`;
    }
    document.getElementById("tBody").innerHTML = table;
    //create (delete all-button)
    if (dataPro.length > 0) {
        document.getElementById("deleteAll").innerHTML = `
            <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `;
    } else {
        document.getElementById("deleteAll").innerHTML = "";
    }
}



//delete
function deleteData(i) {
    dataPro.splice(i, 1); //delete 1 item from index i
    localStorage.product = JSON.stringify(dataPro);

    if (mood === "update") {
        mood = "create";
        tmp = undefined;
        submit.innerHTML = "Create";
        count.style.display = "block";
        clearData();
    }

    showData();
 }



//delete all
function deleteAll() {
    localStorage.removeItem("product");
    dataPro = [];

    mood = "create";
    tmp = undefined;
    submit.innerHTML = "Create";
    count.style.display = "block";

    clearData();
    showData();
}


//update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = "none";
    cancelUpdateBtn.style.display = "block";
    category.value = dataPro[i].category;
    submit.innerHTML = "Update";
    mood = "update";
    tmp = i;
    window.scroll({
        top: 0,
        behavior: "smooth"
    });
}



//search¨
let searchMood = "title";

function getSearchMood(id) {
    let search = document.getElementById("search");

    if (id == "searchTitle") {
        searchMood = "title";
    } else {
        searchMood = "category";
    }
    search.focus();
    search.value = "";
    search.placeholder = "Search by " + searchMood;
    showData();
}

function searchData(value) {
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == "title") {
                if (dataPro[i].title.includes(value.toLowerCase())) {
                    table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" class="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" class="delete">Delete</button></td>
                    </tr>`;
                } 
        }
        else {
                if (dataPro[i].category.includes(value.toLowerCase())) {
                    table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" class="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" class="delete">Delete</button></td>
                    </tr>`;
                }
        }
            document.getElementById("tBody").innerHTML = table;
    }
}

//clean data


    showData();


    const demoProducts = [
  ["iPhone 15", 799, 80, 20, 50, "Electronics"],
  ["Samsung Galaxy S24", 699, 70, 15, 40, "Electronics"],
  ["Sony Headphones", 249, 25, 10, 20, "Electronics"],
  ["MacBook Air M3", 1299, 130, 30, 100, "Computers"],
  ["Logitech Mouse", 49, 5, 2, 5, "Accessories"],
  ["Mechanical Keyboard", 119, 12, 5, 10, "Accessories"],
  ["Nike Air Max", 159, 16, 8, 15, "Fashion"],
  ["Adidas Hoodie", 89, 9, 5, 10, "Fashion"],
  ["Smart Watch", 199, 20, 10, 20, "Electronics"],
  ["Coffee Maker", 149, 15, 8, 12, "Home Appliances"],
  ["Desk Lamp", 59, 6, 3, 5, "Home & Living"],
  ["Office Chair", 299, 30, 15, 25, "Furniture"]
];

document.getElementById("loadDemo").addEventListener("click", () => {
  const existingTitles = new Set(
    dataPro.map(product => product.title.toLowerCase())
  );

  const newProducts = demoProducts
    .filter(item => !existingTitles.has(item[0].toLowerCase()))
    .map(([title, price, taxes, ads, discount, category]) => ({
      title: title.toLowerCase(),
      price: String(price),
      taxes: String(taxes),
      ads: String(ads),
      discount: String(discount),
      total: String(price + taxes + ads - discount),
      count: "1",
      category: category.toLowerCase()
    }));

  dataPro.push(...newProducts);

  localStorage.setItem("product", JSON.stringify(dataPro));
  showData();
});