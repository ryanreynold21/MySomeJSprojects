    //data
    let products =[];
    if(localStorage.getItem("products")){
        products = JSON.parse(localStorage.getItem("products"))
    }

   //selector 
const invoiceNumber = document.querySelector("#invoiceNumber")
const invoiceDate = document.querySelector("#invoiceDate")
const SelectProduct = document.querySelector("#SelectProduct")
const Quantity = document.querySelector("#Quantity")
const newListForm = document.querySelector("#newListForm")
const rows = document.querySelector("#rows");
const costTotal = document.querySelector("#costTotal")
const newAddProductForm = document.querySelector("#newAddProductForm")
const addButton = document.querySelector("#addButton")
const newProductModel = new bootstrap.Modal("#newProductModel")

  //generate invoice number
const getRamdomID = (min =100000 , max=999999) => {
    max = Math.floor(max)
    min = Math.ceil(min)
    const num = Math.floor(Math.random() * (max-min + 1)) + min ;
    return num;
};

invoiceNumber.value = getRamdomID()
invoiceDate.valueAsDate = new Date();

products.forEach(product=> SelectProduct.append(new Option(product.name,product.id)) );

newListForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(newListForm);
    console.log(formData.get("product"),formData.get("quantity")); 
    let currentProduct = products.find(product => product.id === parseFloat(formData.get("product")))
    // console.log(currentProduct);

    const currentRow = document.querySelectorAll("tr[product-id]");
    const isExist = [...currentRow].find(row=>row.getAttribute("product-id") == currentProduct.id)
    if(isExist){
        isExist.querySelector(".row-quantity").innerText = parseFloat(isExist.querySelector(".row-quantity").innerText) + parseFloat(formData.get("quantity")) 
        isExist.querySelector(".cost").innerText = isExist.querySelector(".row-quantity").innerText * currentProduct.price
    }else{
        let row = rows.insertRow();
        row.classList.add("animate__animated","animate__fadeIn");
        row.setAttribute("product-id",currentProduct.id)
    
        let cell1 = row.insertCell();
        cell1.innerHTML = ` <button class ="btn btn-outline-danger btn-sm del-row"><i class="bi bi-trash3 pe-none"></i></button>`
    
        let cell2 = row.insertCell()
        cell2.innerText = currentProduct.name;
    
        let cell3 = row.insertCell();
        cell3.innerText = currentProduct.price;
        cell3.classList.add("text-end")
        let cell4 = row.insertCell();
        cell4.innerText = formData.get("quantity");
        cell4.classList.add("text-end", "row-quantity")
        let cell5 = row.insertCell();
        cell5.innerText = currentProduct.price *  formData.get("quantity")
        cell5.classList.add("text-end","cost");
    }
    
    newListForm.reset();
    calculateCostTotal();
});

const calculateCostTotal = () => {
    const allcost = document.querySelectorAll(".cost")
    const total = [...allcost].reduce((pv,cv)=>pv+parseFloat(cv.innerText),0)
    costTotal.innerText = total 

    let msg = new SpeechSynthesisUtterance();
    msg.text = "total cost is" + total + "dollor";
    window.speechSynthesis.speak(msg);;
}

rows.addEventListener("click", (e) => {
  if(confirm("Are u sure to delete :(")){
    if(e.target.classList.contains("del-row")){
        e.target.closest("tr").remove()
      calculateCostTotal()
    }
  }
});

addButton.addEventListener("click",() => {
    newProductModel.toggle()
});

//newPID,newPN,newPP
newAddProductForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    let formData = new FormData(newAddProductForm);
    const newArray = {
        id:parseFloat( formData.get("newPID")),
        name:formData.get("newPN"),
        price:parseFloat(formData.get("newPP"))
    }
    products.push(newArray)
    console.log(products);
    localStorage.setItem("products",JSON.stringify(products))
     SelectProduct.append(new Option(newArray.name,newArray.id));
     newAddProductForm.reset()
     newProductModel.toggle()
})
