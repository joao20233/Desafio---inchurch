// Objeto que armazena as informações do item atual
let currentPart = {
  partColorIdx: 0,
  partSizeIdx: 0,
  partQnt: 2,
};

// Objeto que armazena as informações do item selecionado e manda p/ o carrinho
let cart = {
  id: "",
  img: "",
  name: "",
  partColor: "",
  partSize: "",
  partPrice: "",
  partQnt: 1,
};

// Função de consumo de dados vindos do localStorage
function handleGetProduct() {
  const product = JSON.parse(localStorage.getItem("@devFashion:product")); // Corrigido para parsear o JSON corretamente
  handleCreateDetails(product);
}

// Função que controi o HTML em tela
function handleCreateDetails(product) {
  if (!product) {
    console.error(
      "Erro: dados do produto não encontrados no armazenamento local."
    );
    return;
  }

  let i = currentPart.partColorIdx;

  // Validação de atualização. Antes de construir, deve-se excluir o que existe para não ficar duplicado
  const constructContainer = document.querySelector(".product-container");
  if (constructContainer) {
    constructContainer.remove();
  }

  const productContainerDiv = document.createElement("div");
  productContainerDiv.classList.add("product-container");

  const productImgSection = document.createElement("section");
  productImgSection.classList.add("product-img");
  const productImg = document.createElement("img");
  productImg.src = product.images[i] || ""; // Corrigido para acessar a imagem correta
  productImg.alt = "imagem-conjunto";

  // Restante do código para criar os detalhes do produto...

  productImgSection.appendChild(productImg);
  productContainerDiv.appendChild(productImgSection);

  // Restante do código para criar os detalhes do produto...

  document.body.appendChild(productContainerDiv); // Alterado para adicionar ao corpo do documento

  // Restante do código para definir os detalhes do carrinho...
}

// Restante do código...

// Função de adição ao carrinho de compras
function handleAddToCart() {
  if (currentPart.partQnt == 0) return;
  let cartItems = JSON.parse(localStorage.getItem("@devFashion:cart")) || [];

  let isAlreadyExists = cartItems.find((item) => {
    return item.id === cart.id && item.partSize === cart.partSize;
  });

  if (isAlreadyExists) {
    alert("O item já existe no carrinho");
  } else {
    cartItems.push(cart);
    alert("O item foi adicionado ao carrinho com sucesso");
  }

  localStorage.setItem("@devFashion:cart", JSON.stringify(cartItems));
}

handleGetProduct();
