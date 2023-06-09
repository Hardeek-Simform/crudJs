document.onload = displayData();

function validateFormInput() {
    let tempPid = document.getElementById("pid").value;
    let tempProductName = document.getElementById("ProductName").value;
    let tempProductPrice = document.getElementById("productPrice").value;
    let tempProductDescription = document.getElementById("productDescription").value;
    // var tempProductImage = document.getElementById("ProductImage").value;
    let alert1 = "please add the following details:";
    let flag = 1;
    if (tempPid == "") {
        flag = 0;
        alert1 += "product id,";
    }
    if (tempProductName == "") {
        flag = 0;
        alert1 += "Product name,";
    }
    if (tempProductPrice == "") {
        flag = 0;
        alert1 += "product price,";
    }
    if (tempProductDescription == "") {
        flag = 0;
        alert1 += "product description";
    }


    if (flag == 0) {
        window.alert(alert1);
        return false;
    }
    else {
        return true;
    }
}
function validateFormInput2() {

    validateFormInput();
    if (document.getElementById("ProductImage").value == null || document.getElementById("ProductImage").value == "" || document.getElementById("ProductImage").value == undefined || validateFormInput() == false) {
        // window.alert("Please fill all the details");
        return false;
    }
    else {
        return true;
    }
}

function clearButtonClicked() {
    localStorage.clear();
    displayData();
}
function submitButtonClicked() {
    // alert("submit bi");
    if (typeof (Storage) == "undefined") {
        window.alert("Local Storage not supported");
    }

    if (validateFormInput2() == true) {
        // window.alert("inside");
        let productId = document.getElementById("pid").value;
        let productName = document.getElementById("ProductName").value;
        let productImage = document.getElementById("ProductImage").files[0];
        let productPrice = document.getElementById("productPrice").value;
        let productDescription = document.getElementById("productDescription").value;
        let productArray;
        var imageUrl;
        const reader = new FileReader();

        // setInterval(1000);
        // reader.onload = function (e) {
        //    imageUrl = e.target.result;
        //   };
        reader.readAsDataURL(productImage);
        reader.addEventListener('load', () => {
            let imageUrl1;
            imageUrl1 = reader.result;
            setValue(imageUrl1);



            function setValue(imgUrl) {
                imageUrl = imgUrl;
                // window.alert(imageUrl);
            }
            // alert(imageUrl);



            if (localStorage.getItem("productArrayStored") != null) {

                productArray = JSON.parse(localStorage.getItem("productArrayStored"));
            }
            else {
                productArray = [];
            }

            productArray.push({
                productId: productId,
                productName: productName,
                productImage: imageUrl,
                productPrice: productPrice,
                productDescription: productDescription,
            })

            localStorage.setItem("productArrayStored", JSON.stringify(productArray));
            console.log(JSON.parse(localStorage.getItem("productArrayStored")));
            displayData();
            document.forms["inputForm"].reset();
        });
    }
}


function displayData() {
    let productArray;
    if (localStorage.getItem("productArrayStored") == null) {
        productArray = [];
    }
    else {
        productArray = JSON.parse(localStorage.getItem("productArrayStored"));
    }
    let tempVar = "";
    productArray.forEach((element, index) => {
        tempVar += "<tr>";
        tempVar += "<td>" + element.productId + "</td>";
        tempVar += "<td>" + element.productName + "</td>";
        tempVar += "<td> <img style='width:200px; height:150px;' src='" + element.productImage + "' alt='NA'> </td>";
        tempVar += "<td>" + element.productPrice + "</td>";
        tempVar += "<td>" + element.productDescription + "</td>";
        tempVar += "<td><button id='editdbTableButtons' onclick='editButtonClicked(" + index + ")'>Edit</button><button id='deletedbTableButtons' onclick='deleteButtonClicked(" + index + ")'>Delete</button> </td>";
        tempVar += "</tr>";
    });
    document.querySelector("#dbtableInner").innerHTML = tempVar;
}



function editButtonClicked(index) {
    document.getElementById("submitButton").style.display = "none";
    document.getElementById("updateButton").style.display = "block";
    let productArrayofUpdate = JSON.parse(localStorage.getItem("productArrayStored"));

    document.getElementById("pid").value = productArrayofUpdate[index].productId;
    document.getElementById("ProductName").value = productArrayofUpdate[index].productName;
    document.getElementById("productPrice").value = productArrayofUpdate[index].productPrice;
    // document.getElementById("ProductImage").files[0].setItem.name = "c://fakepath/" + productArrayinUpdate[index].productImage.name;
    document.getElementById("productDescription").value = productArrayofUpdate[index].productDescription;
    // alert("added data");


    document.querySelector("#updateButton").onclick = function () {
        // alert("inside event");
        if (validateFormInput() == true) {
            // alert("inside if");
            productArrayofUpdate[index].productId = document.getElementById("pid").value;
            productArrayofUpdate[index].productName = document.getElementById("ProductName").value;
            productArrayofUpdate[index].productPrice = document.getElementById("productPrice").value;
            productArrayofUpdate[index].productDescription = document.getElementById("productDescription").value;
            if (document.getElementById("ProductImage").files[0]) {
                const reader = new FileReader();
                let tempStore = document.getElementById("ProductImage").files[0];
                reader.readAsDataURL(tempStore);
                reader.addEventListener('load', () => {
                    let imageUrl1;
                    imageUrl1 = reader.result;
                    // alert(imageUrl1);
                    productArrayofUpdate[index].productImage = imageUrl1;
                    localStorage.setItem("productArrayStored", JSON.stringify(productArrayofUpdate));
                    displayData();
                    document.forms["inputForm"].reset();
                    document.getElementById("submitButton").style.display = "block";
                    document.getElementById("updateButton").style.display = "none";
                })
            }

            // else{
            //     alert("image not updated");
            // }
            else {
                localStorage.setItem("productArrayStored", JSON.stringify(productArrayofUpdate));
            }
            displayData();
            document.forms["inputForm"].reset();
            document.getElementById("submitButton").style.display = "block";
            document.getElementById("updateButton").style.display = "none";

        }
        // else{
        //     alert("else");
        // }
    }
}


function deleteButtonClicked(index) {
    // alert("delete");
    if (window.confirm("Are you sure you want to delete?") == true) {
        let productArraytoDelete = JSON.parse(localStorage.getItem("productArrayStored"));
        productArraytoDelete.splice(index, 1);
        localStorage.setItem("productArrayStored", JSON.stringify(productArraytoDelete));
        displayData();
    }
}


function filterTextChanged() {
    let filterInputbar = document.getElementById("filterInputbar").value.toUpperCase();
    let dbTable = document.getElementById("databaseTable");
    let tr = dbTable.getElementsByTagName('tr');
    for (let row = 1; row < tr.length; row++) {
        let td = tr[row].getElementsByTagName("td")[0];
        if (td != null) {
            let tdvalue = td.textContent || td.innerHTML;
            if (tdvalue.toUpperCase().indexOf(filterInputbar) <= -1) {
                tr[row].style.display = "none";
            }
        }
    }
    if (filterInputbar == null || filterInputbar == "") {
        displayData();
    }
}

function forBackspaceInFilter() {
    displayData();
    filterTextChanged();
}
function sortOptionSelected() {
    let optValue = document.getElementById('sort').value;
    // console.log(optValue);
    let productArraytoSort = JSON.parse(localStorage.getItem("productArrayStored"));
    switch (optValue) {
        case "ProductId": productArraytoSort.sort(function (a, b) { return a.productId - b.productId });
            break;

        case "ProductName": productArraytoSort.sort(function (a, b) {
            let x = a.productName.toLowerCase();
            let y = b.productName.toLowerCase();
            if (x < y) { return -1; }
            if (x > y) { return 1; }
            return 0;
        });
            break;

        case "productPrice": productArraytoSort.sort(function (a, b) { return a.productPrice - b.productPrice });
            break;
    }
    localStorage.setItem("productArrayStored", JSON.stringify(productArraytoSort));
    displayData();
}

// alternate approach 
// function editButtonClicked(index) {
//     alert("edit button");
//     var productArray = JSON.parse(localStorage.getItem("productArrayStored"));
//     var productArraySelected = productArray[index];
//     document.getElementById("pid").value = productArraySelected.productId;
//     document.getElementById("ProductName").value = productArraySelected.productName;
//     document.getElementById("ProductImage").files(0).setItem.name = productArraySelected.productImage;
//     document.getElementById("productPrice").value = productArraySelected.productPrice;
//     document.getElementById("productDescription").value = productArraySelected.productDescription;
//     document.getElementById("submitButton").value = "update";

//     if (document.getElementById("submitButton").value == "update") {
//         alert("if");
//         var tempSubmitButton = document.querySelectorAll("#submitButton");
//         for(element of tempSubmitButton){
//         element.addEventListener('click', function (e) {
//             alert("clicked");

//             productArraySelected.productId.clear;
//             productArraySelected.productName.clear;
//             productArraySelected.productImage.clear;
//             productArraySelected.productPrice.clear;
//             productArraySelected.productDescription.clear;

//             productArraySelected.productId = document.getElementById("pid").value;
//             productArraySelected.productName = document.getElementById("ProductName").value;
//             productArraySelected.productImage = document.getElementById("ProductImage").files[0].name;
//             productArraySelected.productPrice = document.getElementById("productPrice").value;
//             productArraySelected.productDescription = document.getElementById("productDescription").value;
//             document.getElementById("submitButton").value = "submit";
//             document.getElementById("submitButton").onclick = function () {
//                 if(document.getElementById("submitButton").value="submit"){
//                 submitButtonClicked();
//             }
//             };
//         });
//     }
//     }
//     else {
//         alert("else");
//     }

