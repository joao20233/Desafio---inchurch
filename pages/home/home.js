const homeMain = document.getElementById("home");

// Função de consumo de dados
async function handleData() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const json = await response.json();
    const products = json.products;
    console.log(products);

    handleCreateSections(products);
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
    return null;
  }
}

// Função de criação de seções
function handleCreateSections(products) {
  // Objeto para armazenar os produtos agrupados por categoria
  const productsByCategory = {};

  // Agrupar os produtos por categoria
  products.forEach((item) => {
    if (!productsByCategory[item.category]) {
      productsByCategory[item.category] = [];
    }
    productsByCategory[item.category].push(item);
  });

  // Iterar sobre as categorias e criar um slide para cada uma
  for (const category in productsByCategory) {
    const categoryProducts = productsByCategory[category];

    // Criar seção para a categoria
    const sectionCollectionSection = document.createElement("section");
    sectionCollectionSection.classList.add("section-collection");

    const titleH = document.createElement("h3");
    titleH.textContent = category;
    titleH.classList.add("title");

    const cardCollectionDiv = document.createElement("div");
    cardCollectionDiv.classList.add("swiper-container"); // Adiciona a classe swiper-container

    const swiperWrapperDiv = document.createElement("div");
    swiperWrapperDiv.classList.add("swiper-wrapper");

    // Criar os slides de produtos para a categoria
    handleCreateCards(swiperWrapperDiv, categoryProducts);

    cardCollectionDiv.appendChild(swiperWrapperDiv);
    sectionCollectionSection.appendChild(titleH);
    sectionCollectionSection.appendChild(cardCollectionDiv);
    homeMain.appendChild(sectionCollectionSection);
  }

  // Chamar a função de construção do Swiper aqui, após o loop
  handleConstructionSwiper();
}

// Função para criar os cards dos produtos
// Função para criar os cards dos produtos
function handleCreateCards(elementDiv, products) {
  // Iterar sobre os produtos da categoria e criar os slides
  products.forEach((product) => {
    const cardSwiperSlideDiv = document.createElement("div");
    cardSwiperSlideDiv.classList.add("swiper-slide");
    cardSwiperSlideDiv.style.width = "25%";
    cardSwiperSlideDiv.style.backgroundColor = "#ffffff"; // Adiciona o background branco

    // Adicionar evento de clique no card para redirecionar para a página products.html
    cardSwiperSlideDiv.onclick = () => redirectToProductPage(product);

    if (product.images && product.images.length > 0) {
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");
      imageContainer.style.height = "400px"; // Definindo altura de 400px

      // Acessar apenas a primeira imagem de cada produto
      const firstImage = product.images[0];
      const img = document.createElement("img");
      img.src = firstImage;
      img.alt = "image-card";
      img.style.width = "100%";
      img.style.height = "100%";
      imageContainer.appendChild(img);

      // Adicionando o botão e o link
      const button = document.createElement("button");
      button.classList.add("product-button"); // Adiciona classe para o estilo do botão
      button.onclick = () => handleSaveProduct(product); // Salvando o produto completo
      button.innerText = '+'

      // const imgButton = document.createElement("img");
      // imgButton.innerText = "+"; 
      // imgButton.alt = "soma-icon";
      // button.appendChild(imgButton);


      // Criar um parágrafo para o título do produto
      const titleP = document.createElement("p");
      titleP.textContent = product.title;
      titleP.classList.add("product-title");

      // Criar um span para o valor do produto
      const priceSpan = document.createElement("span");
      priceSpan.textContent = `${product.price.toFixed(2)}`;
      priceSpan.classList.add("product-price");

      // Adicionando os elementos ao card
      cardSwiperSlideDiv.appendChild(imageContainer);
      cardSwiperSlideDiv.appendChild(titleP); // Adicionar o título do produto ao card
      cardSwiperSlideDiv.appendChild(priceSpan); // Adicionar o preço do produto ao card
      cardSwiperSlideDiv.appendChild(button); // Adicionar o botão ao card
    }

    elementDiv.appendChild(cardSwiperSlideDiv);
  });
}

// Função para redirecionar para a página do produto
function redirectToProductPage(product) {
  // Redirecionar para a página products.html passando o ID do produto como parâmetro na URL
  window.location.href = `../product/product.html?id=${product.id}`;
}
// Função de limpeza de dados
function handleCleaningProductCache() {
  localStorage.removeItem("@devFashion:product");
}

// Função de persistência de dados
function handleSaveProduct(product) {
  // Salvando o produto completo no localStorage
  localStorage.setItem("@devFashion:product", JSON.stringify(product));
}

// Função de verificação de tamanho para definir o número de slides
function handleWidth(width) {
  const sectionCollection = document.querySelectorAll(".section-collection");
  let slideShow;

  if (width <= 750) {
    slideShow = "3.5";
    sectionCollection.forEach(
      (item) => (item.style.margin = "0px 0px 10rem 5%")
    );
  }

  if (width <= 580) {
    slideShow = "3";
  }

  if (width <= 485) {
    slideShow = "2.5";
  }

  if (width <= 420) {
    slideShow = "2";
  }

  if (width > 750) {
    slideShow = "4";
    sectionCollection.forEach((item) => (item.style.margin = "0rem 5% 10rem"));
  }

  handleConstructionSwiper(slideShow);
}

// Função que monitora o tamanho da tela
window.addEventListener("resize", (e) => {
  handleWidth(e.target.innerWidth);
});

// Função que constroi o Swiper (Carrossel)
function handleConstructionSwiper() {
  return new Swiper(".swiper-container", {
    slidesPerView: 4,
    updateOnWindowResize: true,
    spaceBetween: 30,
    loop: false,
    grabCursor: true,
    type: "bullets",
    freeMode: true,
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    // pagination: {
    //   el: .swiper-pagination,
    //   clickable: true,
    // },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1300: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      600: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      500: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      330: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      300: {
        slidesPerView: 1,
        spaceBetween: 5,
      },
    },
  });
}

handleData();