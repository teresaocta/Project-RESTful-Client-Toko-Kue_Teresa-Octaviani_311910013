const baseUrl = "http://localhost:8080/webservice/Toko/index.php/toko";
const package = `${baseUrl}/package`;
const drink = `${baseUrl}/drink`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");

const ApiKey = "123456"
const getHeader = {
    headers: {
        'API-TOKEN': ApiKey
    }
};

function getProduct()
{
    title.innerHTML = "PRODUCTS"

    fetch(baseUrl, getHeader)
        .then(response => response.json())
        .then(resJson =>
            {
                let produk = "";

                for (let i = 1; i <= resJson.total_page; i++)
                {
                    let url = baseUrl + "?page=" + i;

                    fetch (url, getHeader)
                    .then(response => response.json())
                    .then(respJson =>
                        {
                            respJson.data.forEach(datas => {
                                produk += `
                                <tr>
                                    <td>${datas.id_produk}</td>
                                    <td>${datas.nama_produk}</td>
                                    <td>${datas.kategori}</td>
                                    <td>${datas.harga_produk}</td>
                                    <td>${datas.stok_produk}</td>
                                    <td>${datas.bonus}</td>
                                    <td><a href="#" onclick="javascript:formEditProduct(${datas.id_produk})" class="waves-effect waves-light btn-small amber black-text">Edit</a>
                                        <a href="#" onclick="javascript:deleteProduct(${datas.id_produk})" class="waves-effect waves-light btn-small red darken-1 black-text">Delete</a></td>
                                </tr>
                                `;
                            });

                            contents.innerHTML = `
                            <h4><b>Ala Carte</b></h4>
                            <a href="#formAddProduct" onclick="return loadPage('formAddProduct')" class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">+</i></a><br><br>
                            <table class="centered">
                                <tr>
                                    <td><a href="#"  onclick="javascript:getProduct()"><h5><b>All</b></h5></a></td>
                                    <td><a href="#cakes" onclick="javascript:getProducts('1')"><h5><b>Cakes</b></h5></a></td>
                                    <td><a href="#cupcakes" onclick="javascript:getProducts('2')"><h5><b>Cupcakes</h5></b></a></td>
                                    <td><a href="#waffles" onclick="javascript:getProducts('3')"><h5><b>Waffle</h5></b></a></td>
                                </tr>
                            </table>
                            <table class="centered orange lighten-4">
                                <thead>
                                    <th>ID</th>
                                    <th>Nama</th>
                                    <th>Kategori</th>
                                    <th>Harga</th>
                                    <th>Stok</th>
                                    <th>Bonus</th>
                                    <th>Action</th>
                                </thead>
                                <tbody>
                                    ${produk}
                                </tbody>
                            </table>
                            `;

                        }).catch(err =>
                            {
                                console.error(err);
                            })
                }
            }).catch(err =>
                {
                    console.error(err);
                })
}

function getProducts(category)
{
    let cat ="";

    title.innerHTML = "PRODUCTS"

    if (category==="1")
    {
        cat = "Cake";
    }
    else if (category==="2")
    {
        console.log(category);
        cat = "Cupcake";
    }
    else if (category==="3")
    {
        cat = "Waffle";
    }

    console.log(cat);
    url = baseUrl + "?category=" + cat;

    fetch(url, getHeader)
        .then(response => response.json())
        .then(resJson =>
            {
                let produk = "";

                console.log(resJson);

                resJson.data.forEach(datas => {
                    produk += `
                    <tr>
                        <td>${datas.id_produk}</td>
                        <td>${datas.nama_produk}</td>
                        <td>${datas.kategori}</td>
                        <td>${datas.harga_produk}</td>
                        <td>${datas.stok_produk}</td>
                        <td>${datas.bonus}</td>
                        <td><a href="#" onclick="javascript:formEditProduct(${datas.id_produk})" class="waves-effect waves-light btn-small amber black-text">Edit</a>
                            <a href="#" onclick="javascript:deleteProduct(${datas.id_produk})" class="waves-effect waves-light btn-small red darken-1 black-text">Delete</a></td>
                    </tr>
                    `;
                });

                contents.innerHTML = `
                <h4><b>Ala Carte</b></h4>
                <a href="#formAddProduct" onclick="return loadPage('formAddProduct')" class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">+</i></a><br><br>
                <table class="centered">
                    <tr>
                    <td><a href="#"  onclick="javascript:getProduct()"><h5><b>All</b></h5></a></td>
                    <td><a href="#cakes" onclick="javascript:getProducts('1')"><h5><b>Cakes</b></h5></a></td>
                    <td><a href="#cupcakes" onclick="javascript:getProducts('2')"><h5><b>Cupcakes</h5></b></a></td>
                    <td><a href="#waffles" onclick="javascript:getProducts('3')"><h5><b>Waffle</h5></b></a></td>
                    </tr>
                </table>
                <table class="centered orange lighten-4">
                    <thead>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>Kategori</th>
                        <th>Harga</th>
                        <th>Stok</th>
                        <th>Bonus</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        ${produk}
                    </tbody>
                </table>
                `;

            }).catch(err =>
            {
                console.error(err);
            })
}

function formAddProduct()
{
    title.innerHTML="FORM ADD PRODUCT"

    contents.innerHTML = `
    <form id="paform" action="javascript:addProduct()" method="post">
        <table class="stripped">
            <tr>
                <td><label for="id" class="form-label black-text"><h6><b>ID Product</b></h6></label></td>
                <td><b>:</b></td>
                <td><input type="text" class="form-control" id="id" name="id" placeholder="ID Product"></td>
            </tr>
            <tr>
                <td><label for="nama" class="form-label black-text"><h6><b>Nama Product</b></h6></label></td>
                <td><b>:</b></td>
                <td><input type="text" class="form-control" id="nama" name="nama" placeholder="Nama Product"></td>
            </tr>
            <tr>
                <td><label for="kategori" class="form-label black-text"><h6><b>Kategori</b></h6></label></td>
                <td><b>:</b></td>
                <td><input type="text" class="form-control" id="kategori" name="kategori" placeholder="Kategori"></td>
            </tr>
            <tr>
                <td><label for="harga" class="form-label black-text"><h6><b>Harga</b></h6></label></td>
                <td><b>:</b></td>
                <td><input type="text" class="form-control" id="harga" name="harga" placeholder="Harga"></td>
            </tr>
            <tr>
                <td><label for="stok" class="form-label black-text"><h6><b>Stok</b></h6></label></td>
                <td><b>:</b></td>
                <td><input type="text" class="form-control" id="stok" name="stok" placeholder="Stok"></td>
            </tr>
            <tr>
                <td><label for="id_bonus" class="form-label black-text"><h6><b>ID Bonus</b></h6></label></td>
                <td><b>:</b></td>
                <td><input type="text" class="form-control" id="id_bonus" name="id_bonus" placeholder="ID Bonus"></td>
            </tr>
            <tr>
                <td colspan="3" class="right-align">
                <a href="#" onclick="javascript:getProduct()" class="btn waves-effect waves-light">Back</a>
                <button class="btn waves-effect waves-light" type="submit">Add
                <i class="material-icons right">send</i></button>
                </td>
            </tr>
        </table>
    </form>
    `;
}

function addProduct()
{
    var id = document.getElementById("id").value;
    var nama = document.getElementById("nama").value;
    var kategori = document.getElementById("kategori").value;
    var harga = document.getElementById("harga").value;
    var stok = document.getElementById("stok").value;
    var id_bonus = document.getElementById("id_bonus").value;

    fetch(baseUrl, {
        method: "POST",

        body: new URLSearchParams({
            'id_produk': id,
            'nama_produk':nama,
            'kategori': kategori,
            'harga_produk': harga,
            'stok_produk':stok,
            'id_drink': id_bonus
        }),

        headers: {
            "Content-type": "application/x-www-form-urlencoded",
            'API-TOKEN': ApiKey
        }
    })
    .then(response => response.json())
    .then(resJson => {
        alert(resJson.msg)
        loadPage('alacarte')

    }).catch(err => {
        console.error(err);
    })
}

function formEditProduct(id)
{
    title.innerHTML = "FORM EDIT PRODUCT"

    const detailProduct = baseUrl + "?id=" + id;

    fetch(detailProduct, getHeader)
    .then(response => response.json())
    .then(resJson => {
        contents.innerHTML = `
        <form id="peform" action="javascript:editProduct(${id})" method="post">
            <table class="stripped">
                <tr>
                    <td><label for="id" class="form-label black-text"><h6><b>ID Product</b></h6></label></td>
                    <td><b>:</b></td>
                    <td><input type="text" class="form-control" id="id" name="id" placeholder="ID Product" value="${id}" disabled></td>
                </tr>
                <tr>
                    <td><label for="nama" class="form-label black-text"><h6><b>Nama Product</b></h6></label></td>
                    <td><b>:</b></td>
                    <td><input type="text" class="form-control" id="nama" name="nama" placeholder="Nama Product" value="${resJson.data[0].nama_produk}"></td>
                </tr>
                <tr>
                    <td><label for="kategori" class="form-label black-text"><h6><b>Kategori</b></h6></label></td>
                    <td><b>:</b></td>
                    <td><input type="text" class="form-control" id="kategori" name="kategori" placeholder="Kategori" value="${resJson.data[0].kategori}"></td>
                </tr>
                <tr>
                    <td><label for="harga" class="form-label black-text"><h6><b>Harga</b></h6></label></td>
                    <td><b>:</b></td>
                    <td><input type="text" class="form-control" id="harga" name="harga" placeholder="Harga" value="${resJson.data[0].harga_produk}"></td>
                </tr>
                <tr>
                    <td><label for="stok" class="form-label black-text"><h6><b>Stok</b></h6></label></td>
                    <td><b>:</b></td>
                    <td><input type="text" class="form-control" id="stok" name="stok" placeholder="Stok" value="${resJson.data[0].stok_produk}"></td>
                </tr>
                <tr>
                    <td><label for="id_bonus" class="form-label black-text"><h6><b>ID Bonus</b></h6></label></td>
                    <td><b>:</b></td>
                    <td><input type="text" class="form-control" id="id_bonus" name="id_bonus" placeholder="ID Bonus" value="${resJson.data[0].id_bonus}"></td>
                </tr>
                <tr>
                    <td colspan="3" class="right-align">
                    <a href="#" onclick="javascript:getProduct()" class="btn waves-effect waves-light">Back</a>
                    <button class="btn waves-effect waves-light" type="submit">Edit
                    <i class="material-icons right">send</i></button>
                    </td>
                </tr>
            </table>
        </form>
        `
    })
}

function editProduct(id)
{
    var nama = document.getElementById("nama").value;
    var kategori = document.getElementById("kategori").value;
    var harga = document.getElementById("harga").value;
    var stok = document.getElementById("stok").value;
    var id_bonus = document.getElementById("id_bonus").value;

    fetch(baseUrl, {
        method: "PUT",

        body: new URLSearchParams({
            'id':id,
            'nama_produk':nama,
            'kategori': kategori,
            'harga_produk': harga,
            'stok_produk':stok,
            'id_drink': id_bonus
        }),

        headers: {
            "Content-type": "application/x-www-form-urlencoded",
            'API-TOKEN': ApiKey
        }
    })
    .then(response => response.json())
    .then(resJson => {
        alert(resJson.msg)
        loadPage('alacarte')

    }).catch(err => {
        console.error(err);
    })
}

function deleteProduct(id)
{
    fetch(baseUrl, {
        method: "DELETE",

        body: new URLSearchParams({
            'id':id
        }),

        headers: {
            "Content-type": "application/x-www-form-urlencoded",
            'API-TOKEN': ApiKey
        }
    })
    .then(response => response.json())
    .then(resJson => {
        alert(resJson.msg)
        loadPage('alacarte')

    }).catch(err => {
        console.error(err);
    })
}

function getDrink()
{
    title.innerHTML = "PRODUCTS"

    fetch(drink, getHeader)
        .then(response => response.json())
        .then(resJson =>
            {
                let produk = "";

                resJson.data.forEach(datas => {
                let color1 ="orange lighten-4";
                let color2 = "amber";
                if(datas.availability == 0)
                {
                    color1 = "red lighten-2";
                    color2 = "amber lighten-3";
                }

                produk += `
                <tr class="${color1}">
                    <td>${datas.id_drink}</td>
                    <td>${datas.nama_drink}</td>
                    <td>${datas.harga_drink}</td>
                    <td>${datas.availability}</td>
                    <td><a href="#drink" onclick="javascript:formEditDrink(${datas.id_drink})" class="waves-effect waves-light btn-small ${color2} black-text">Edit</a>
                </tr>
                `;
                });

                contents.innerHTML = `
                <h4><b>Drinks</b></h4>
                <a href="#formAddDrink" onclick="return loadPage('formAddDrink')" class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">+</i></a><br><br>
                <table class="centered orange lighten-4">
                    <thead>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Availability</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        ${produk}
                    </tbody>
                </table>
                `;
            }).catch(err =>
                {
                    console.error(err);
                })
}

function formAddDrink()
{
    title.innerHTML="FORM ADD DRINK"

    contents.innerHTML = `
    <form id="daform" action="javascript:addDrink()" method="post">
        <table class="stripped">
            <tr>
                <td><label for="id" class="form-label black-text"><h6><b>ID Drink</b></h6></label></td>
                <td><b>:</b></td>
                <td><input type="text" class="form-control" id="id" name="id" placeholder="ID Drink"></td>
            </tr>
            <tr>
                <td><label for="nama" class="form-label black-text"><h6><b>Nama Drink</b></h6></label></td>
                <td><b>:</b></td>
                <td><input type="text" class="form-control" id="nama" name="nama" placeholder="Nama Drink"></td>
            </tr>
            <tr>
                <td><label for="harga" class="form-label black-text"><h6><b>Harga</b></h6></label></td>
                <td><b>:</b></td>
                <td><input type="text" class="form-control" id="harga" name="harga" placeholder="Harga"></td>
            </tr>
            <tr>
                <td><label for="availability" class="form-label black-text"><h6><b>Availability</b></h6></label></td>
                <td><b>:</b></td>
                <td><input type="text" class="form-control" id="availability" name="availability" placeholder="Availability"></td>
            </tr>
            <tr>
                <td colspan="3" class="right-align">
                <a href="#drink" onclick="javascript:getDrink()" class="btn waves-effect waves-light">Back</a>
                <button class="btn waves-effect waves-light" type="submit">Add
                <i class="material-icons right">send</i></button>
                </td>
            </tr>
        </table>
    </form>
    `;
}

function addDrink()
{
    var id = document.getElementById("id").value;
    var nama = document.getElementById("nama").value;
    var harga = document.getElementById("harga").value;
    var availability = document.getElementById("availability").value;

    fetch(drink, {
        method: "POST",

        body: new URLSearchParams({
            'id_drink': id,
            'nama_drink':nama,
            'harga_drink': harga,
            'availability':availability
        }),

        headers: {
            "Content-type": "application/x-www-form-urlencoded",
            'API-TOKEN': ApiKey
        }
    })
    .then(response => response.json())
    .then(resJson => {
        alert(resJson.msg)
        loadPage('drink')

    }).catch(err => {
        console.error(err);
    })
}

function formEditDrink(id)
{
    title.innerHTML = "FORM EDIT DRINK"

    const detailDrink = drink + "?id=" + id;

    fetch(detailDrink, getHeader)
    .then(response => response.json())
    .then(resJson => {
        contents.innerHTML = `
        <form id="deform" action="javascript:editDrink(${id})" method="post">
            <table class="stripped">
                <tr>
                    <td><label for="id" class="form-label black-text"><h6><b>ID Drink</b></h6></label></td>
                    <td><b>:</b></td>
                    <td><input type="text" class="form-control" id="id" name="id" placeholder="ID Product" value="${id}" disabled></td>
                </tr>
                <tr>
                    <td><label for="nama" class="form-label black-text"><h6><b>Nama Drink</b></h6></label></td>
                    <td><b>:</b></td>
                    <td><input type="text" class="form-control" id="nama" name="nama" placeholder="Nama Product" value="${resJson.data[0].nama_drink}"></td>
                </tr>
                <tr>
                    <td><label for="harga" class="form-label black-text"><h6><b>Harga</b></h6></label></td>
                    <td><b>:</b></td>
                    <td><input type="text" class="form-control" id="harga" name="harga" placeholder="Harga" value="${resJson.data[0].harga_drink}"></td>
                </tr>
                <tr>
                    <td><label for="availability" class="form-label black-text"><h6><b>Availability</b></h6></label></td>
                    <td><b>:</b></td>
                    <td><input type="text" class="form-control" id="availability" name="availability" placeholder="Availability" value="${resJson.data[0].availability}"></td>
                </tr>
                <tr>
                    <td colspan="3" class="right-align">
                    <a href="#drink" onclick="javascript:getDrink()" class="btn waves-effect waves-light">Back</a>
                    <button class="btn waves-effect waves-light" type="submit">Edit
                    <i class="material-icons">send</i></button>
                    </td>
                </tr>
            </table>
        </form>
        `
    })
}

function editDrink(id)
{
    var id = document.getElementById("id").value;
    var nama = document.getElementById("nama").value;
    var harga = document.getElementById("harga").value;
    var availability = document.getElementById("availability").value;

    fetch(drink, {
        method: "PUT",

        body: new URLSearchParams({
            'id': id,
            'nama_drink':nama,
            'harga_drink': harga,
            'availability':availability
        }),

        headers: {
            "Content-type": "application/x-www-form-urlencoded",
            'API-TOKEN': ApiKey
        }
    })
    .then(response => response.json())
    .then(resJson => {
        alert(resJson.msg)
        loadPage('drink')

    }).catch(err => {
        console.error(err);
    })
}

function getPackage()
{
    title.innerHTML = "PRODUCTS"

    fetch(package, getHeader)
        .then(response => response.json())
        .then(resJson =>
            {
                let produk = "";

                resJson.data.forEach(datas => {
                produk += `
                <tr>
                    <td>${datas.id_package}</td>
                    <td>${datas.nama_package}</td>
                    <td>${datas.harga_package}</td>
                    <td>${datas.stok_package}</td>
                    <td>${datas.detail}</td>
                    <td><a href="#package" onclick="javascript:formEditPackage(${datas.id_package})" class="waves-effect waves-light btn-small amber black-text">Edit</a>
                        <a href="#package" onclick="javascript:deletePackage(${datas.id_package})" class="waves-effect waves-light btn-small red darken-1 black-text">Delete</a></td>
                </tr>
                `;
                });

                contents.innerHTML = `
                <h4><b>Packages</b></h4>
                <a href="#formAddPackage" onclick="return loadPage('formAddPackage')" class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">+</i></a><br><br>
                <table class="centered orange lighten-4">
                    <thead>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Stok</th>
                        <th>Detail</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        ${produk}
                    </tbody>
                </table>
                `;
            }).catch(err =>
                {
                    console.error(err);
                })
}

function formAddPackage()
{
    title.innerHTML="FORM ADD PACKAGE"

    contents.innerHTML = `
    <form id="pkgaform" action="javascript:addPackage()" method="post">
        <table class="stripped">
            <tr>
                <td><label for="id" class="form-label black-text"><h6><b>ID Package</b></h6></label></td>
                <td><b>:</b></td>
                <td><input type="text" class="form-control" id="id" name="id" placeholder="ID Package"></td>
            </tr>
            <tr>
                <td><label for="nama" class="form-label black-text"><h6><b>Nama Package</b></h6></label></td>
                <td><b>:</b></td>
                <td><input type="text" class="form-control" id="nama" name="nama" placeholder="Nama Package"></td>
            </tr>
            <tr>
                <td><label for="harga" class="form-label black-text"><h6><b>Harga</b></h6></label></td>
                <td><b>:</b></td>
                <td><input type="text" class="form-control" id="harga" name="harga" placeholder="Harga"></td>
            </tr>
            <tr>
                <td><label for="stok" class="form-label black-text"><h6><b>Stok</b></h6></label></td>
                <td><b>:</b></td>
                <td><input type="text" class="form-control" id="stok" name="stok" placeholder="Stok"></td>
            </tr>
            <tr>
                <td><label for="detail" class="form-label black-text"><h6><b>Detail</b></h6></label></td>
                <td><b>:</b></td>
                <td><input type="text" class="form-control" id="detail" name="detail" placeholder="Detail"></td>
            </tr>
            <tr>
                <td colspan="3" class="right-align">
                <a href="#package" onclick="javascript:getPackage()" class="btn waves-effect waves-light">Back</a>
                <button class="btn waves-effect waves-light" type="submit">Add
                <i class="material-icons right">send</i></button>
                </td>
            </tr>
        </table>
    </form>
    `;
}

function addPackage()
{
    var id = document.getElementById("id").value;
    var nama = document.getElementById("nama").value;
    var harga = document.getElementById("harga").value;
    var stok = document.getElementById("stok").value;
    var detail = document.getElementById("detail").value;

    fetch(package, {
        method: "POST",

        body: new URLSearchParams({
            'id_package': id,
            'nama_package':nama,
            'harga_package': harga,
            'stok_package':stok,
            'detail':detail
        }),

        headers: {
            "Content-type": "application/x-www-form-urlencoded",
            'API-TOKEN': ApiKey
        }

    })
    .then(response => response.json())
    .then(resJson => {
        alert(resJson.msg)
        loadPage('package')

    }).catch(err => {
        console.error(err);
    })
}

function formEditPackage(id)
{
    title.innerHTML = "FORM EDIT PACKAGE"

    const detailPackage = package + "?id=" + id;

    fetch(detailPackage, getHeader)
    .then(response => response.json())
    .then(resJson => {
        contents.innerHTML = `
        <form id="pkgeform" action="javascript:editPackage(${id})" method="post">
            <table class="stripped">
                <tr>
                    <td><label for="id" class="form-label black-text"><h6><b>ID Package</b></h6></label></td>
                    <td><b>:</b></td>
                    <td><input type="text" class="form-control" id="id" name="id" placeholder="ID Product" value="${id}" disabled></td>
                </tr>
                <tr>
                    <td><label for="nama" class="form-label black-text"><h6><b>Nama Package</b></h6></label></td>
                    <td><b>:</b></td>
                    <td><input type="text" class="form-control" id="nama" name="nama" placeholder="Nama Product" value="${resJson.data[0].nama_package}"></td>
                </tr>
                <tr>
                    <td><label for="harga" class="form-label black-text"><h6><b>Harga</b></h6></label></td>
                    <td><b>:</b></td>
                    <td><input type="text" class="form-control" id="harga" name="harga" placeholder="Harga" value="${resJson.data[0].harga_package}"></td>
                </tr>
                <tr>
                    <td><label for="stok" class="form-label black-text"><h6><b>Stok</b></h6></label></td>
                    <td><b>:</b></td>
                    <td><input type="text" class="form-control" id="stok" name="stok" placeholder="Stok" value="${resJson.data[0].stok_package}"></td>
                </tr>
                <tr>
                    <td><label for="detail" class="form-label black-text"><h6><b>Detail</b></h6></label></td>
                    <td><b>:</b></td>
                    <td><input type="text" class="form-control" id="detail" name="detail" placeholder="Detail" value="${resJson.data[0].detail}"></td>
                </tr>
                <tr>
                    <td colspan="3" class="right-align">
                    <a href="#package" onclick="javascript:getPackage()" class="btn waves-effect waves-light">Back</a>
                    <button class="btn waves-effect waves-light" type="submit">Edit
                    <i class="material-icons right">send</i></button>
                    </td>
                </tr>
            </table>
        </form>
        `
    })
}

function editPackage(id)
{
    var id = document.getElementById("id").value;
    var nama = document.getElementById("nama").value;
    var harga = document.getElementById("harga").value;
    var stok = document.getElementById("stok").value;
    var detail = document.getElementById("detail").value;

    fetch(package, {
        method: "PUT",

        body: new URLSearchParams({
            'id':id,
            'nama_package':nama,
            'harga_package': harga,
            'stok_package':stok,
            'detail':detail
        }),

        headers: {
            "Content-type": "application/x-www-form-urlencoded",
            'API-TOKEN': ApiKey
        }
    })
    .then(response => response.json())
    .then(resJson => {
        alert(resJson.msg)
        loadPage('package')
    }).catch(err => {
        console.error(err);
    })
}

function deletePackage(id)
{
    fetch(package, {
        method: "DELETE",

        body: new URLSearchParams({
            'id':id
        }),

        headers: {
            "Content-type": "application/x-www-form-urlencoded",
            'API-TOKEN': ApiKey
        }
    })
    .then(response => response.json())
    .then(resJson => {
        alert(resJson.msg)
        loadPage('package')

    }).catch(err => {
        console.error(err);
    })
}

function loadPage(page)
{
    switch(page)
    {
        case "alacarte":
            getProduct();
            break;
        case "formAddProduct":
            formAddProduct();
            break;
        case "drink":
            getDrink();
            break;
        case "formAddDrink":
            formAddDrink();
            break;
        case "package":
            getPackage();
            break;
        case "formAddPackage":
            formAddPackage();
            break;
        case "cakes":
            getProducts("1");
            break;
        case "cupcakes":
            getProducts("2");
            break;
        case "waffles":
            getProducts("3");
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "alacarte";
    loadPage(page);
});