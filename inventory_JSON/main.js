let postData =async ()=>{
    let productData = {
      'name': document.getElementById("name").value,
      'price': document.getElementById("price").value,
      'description': document.getElementById("description").value,
      'delivery': document.getElementById("delivery").value,
      'image': document.getElementById("image").value,
      'id': Date.now(),
    }
    document.getElementById("name").value=null;
    document.getElementById("price").value=null;
    document.getElementById("description").value=null;
    document.getElementById("delivery").value=null;
    document.getElementById("image").value=null;
    let res = await fetch("https://quiet-woodland-18428.herokuapp.com/api/product_data",{
      method:"POST",
      body: JSON.stringify(productData),
      headers: {"Content-Type": "application/json"}
    })
    getData();
  }

  let getData = async()=>{
    let res = await fetch('https://quiet-woodland-18428.herokuapp.com/api/product_data');
    let data = await res.json();
    append(data);
    console.log('data:', data)

  }

  let append = (Data)=>{
    let con = document.getElementById('container');
    con.innerHTML = null;
    Data.forEach(({name,price,description,delivery,image,id})=>{
      let div = document.createElement('div');
      div.setAttribute('class', 'item');
      let img = document.createElement('img');
      let h3 = document.createElement('h3');
      let prc = document.createElement('p');
      prc.setAttribute('class', 'product_price');
      let date = document.createElement('p');
      date.setAttribute('class', 'product_delivery');
      let des = document.createElement('p');
      let rmvBtn = document.createElement('button');
      rmvBtn.setAttribute('class', 'remove_item');
      rmvBtn.onclick = ()=>{
        removeData(id);
      }
      let updBtn = document.createElement('button');
      updBtn.setAttribute('class','update_price');
      updBtn.onclick = () =>{
        update(id);
      }

      img.src = image;
      h3.innerText = name;
      prc.innerText = price;
      date.innerText = `Delivery by: ${delivery}`;
      des.innerText = description;
      rmvBtn.innerText = "Remove";
      updBtn.innerText = "Update Price";

      div.append(img,h3,prc,date,des,rmvBtn,updBtn);
      con.append(div);
    })
  }
 let removeData=async(id)=>{
  let res = await fetch(`https://quiet-woodland-18428.herokuapp.com/api/product_data/${id}`,{
    method: 'DELETE',
    headers: {"Content-Type": "application/json"}
  })
  getData();
 }
 let update=async(id)=>{
  let res2 = await fetch('https://quiet-woodland-18428.herokuapp.com/api/product_data');
  products_data = await res2.json();
  let new_price = window.prompt('Enter new price');
  let data = {price : new_price || products_data.price}
  let res = await fetch(`https://quiet-woodland-18428.herokuapp.com/api/product_data/${id}`,{
    method: 'PATCH',
    body : JSON.stringify(data),
    headers: {"Content-Type": "application/json"}
  })
  getData();
 }
 let slh= async ()=>{
  let res = await fetch("https://quiet-woodland-18428.herokuapp.com/api/product_data/?_sort=price&_order=asc")
  let data = await res.json();
    append(data);
 }
 let shl= async ()=>{
  let res = await fetch("https://quiet-woodland-18428.herokuapp.com/api/product_data/?_sort=price&_order=desc")
  let data = await res.json();
    append(data);
 }
 let filtergtr=async()=>{
  let res = await fetch("https://quiet-woodland-18428.herokuapp.com/api/product_data/?price_gte=4001")
  let data = await res.json();
    append(data);
 }
 let filterles=async()=>{
  let res = await fetch("https://quiet-woodland-18428.herokuapp.com/api/product_data/?price_lte=4000")
  let data = await res.json();
    append(data);
 }
  
  window.onload = getData();