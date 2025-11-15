const api = "https://6918866521a96359487057b9.mockapi.io/products";

document.getElementById("btnList").addEventListener("click", getList);
document.getElementById("btnAdd").addEventListener("click", addProduct);
document.getElementById("btnEdit").addEventListener("click", editProduct);

function getList() {
  fetch(api)
    .then(res => res.json())
    .then(data => {
      const list = data.map(p => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          ${p.name} - ${p.price}원
          <span>
            <button class="btn btn-sm btn-warning me-2" onclick="openEdit('${p.id}', '${p.name}', '${p.price}')">수정</button>
            <button class="btn btn-sm btn-danger" onclick="deleteProduct('${p.id}')">삭제</button>
          </span>
        </li>
      `).join("");
      document.getElementById("output").innerHTML = list;
    });
}

function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;

  fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price })
  }).then(() => {
    getList();
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
  });
}

function openEdit(id, name, price) {
  document.getElementById("edit-id").value = id;
  document.getElementById("edit-name").value = name;
  document.getElementById("edit-price").value = price;

  const editModal = new bootstrap.Modal(document.getElementById("editModal"));
  editModal.show();
}

function editProduct() {
  const id = document.getElementById("edit-id").value;
  const name = document.getElementById("edit-name").value;
  const price = document.getElementById("edit-price").value;

  fetch(`${api}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price })
  }).then(() => {
    getList();
  });
}

function deleteProduct(id) {
  fetch(`${api}/${id}`, { method: "DELETE" })
    .then(() => getList());
}