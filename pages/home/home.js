const homeMain = document.getElementById("home");

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

function handleCreateSections(products) {
  const productsByCategory = {};

  products.forEach((item) => {
    if (!productsByCategory[item.category]) {
      productsByCategory[item.category] = [];
    }
    productsByCategory[item.category].push(item);
  });

  for (const category in productsByCategory) {
    const categoryProducts = productsByCategory[category];

    const sectionCollectionSection = document.createElement("section");
    sectionCollectionSection.classList.add("section-collection");

    const titleH = document.createElement("h3");
    titleH.textContent = category;
    titleH.classList.add("title");

    const cardCollectionDiv = document.createElement("div");
    cardCollectionDiv.classList.add("swiper-container");

    const swiperWrapperDiv = document.createElement("div");
    swiperWrapperDiv.classList.add("swiper-wrapper");

    handleCreateCards(swiperWrapperDiv, categoryProducts);

    cardCollectionDiv.appendChild(swiperWrapperDiv);
    sectionCollectionSection.appendChild(titleH);
    sectionCollectionSection.appendChild(cardCollectionDiv);
    homeMain.appendChild(sectionCollectionSection);
  }

  handleConstructionSwiper();
}

function handleCreateCards(elementDiv, products) {
  products.forEach((product) => {
    const cardSwiperSlideDiv = document.createElement("div");
    cardSwiperSlideDiv.classList.add("swiper-slide");
    cardSwiperSlideDiv.style.width = "25%";
    cardSwiperSlideDiv.style.backgroundColor = "#ffffff";

    if (product.images && product.images.length > 0) {
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");
      imageContainer.style.height = "400px";

      const firstImage = product.images[0];
      const img = document.createElement("img");
      img.src = firstImage;
      img.alt = "image-card";
      img.style.width = "100%";
      img.style.height = "100%";
      imageContainer.appendChild(img);

      const button = document.createElement("button");
      button.classList.add("product-button");
      button.onclick = () => handleSaveProduct(product);
      button.innerText = '+'
      button.onclick = () => redirectToProductPage(product);

      const titleP = document.createElement("p");
      titleP.textContent = product.title;
      titleP.classList.add("product-title");

      const priceSpan = document.createElement("span");
      priceSpan.textContent = `${product.price.toFixed(2)}`;
      priceSpan.classList.add("product-price");

      cardSwiperSlideDiv.appendChild(imageContainer);
      cardSwiperSlideDiv.appendChild(titleP);
      cardSwiperSlideDiv.appendChild(priceSpan);
      cardSwiperSlideDiv.appendChild(button);
    }

    elementDiv.appendChild(cardSwiperSlideDiv);
  });
}

function redirectToProductPage(product) {
  window.location.href = `../product/product.html?id=${product.id}`
}

function handleCleaningProductCache() {
  localStorage.removeItem("@devFashion:product");
}

function handleSaveProduct(product) {
  localStorage.setItem("@devFashion:product", JSON.stringify(product));
}

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

window.addEventListener("resize", (e) => {
  handleWidth(e.target.innerWidth);
});

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
