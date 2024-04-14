async function handleData() {
    try {
      const response = await fetch('https://dummyjson.com/products')
      const data = await response.json()
      
      const products = data.products
      console.log(products);

      handleShow(products)

    } catch (error) {
      console.error('Erro ao carregar os dados:', error)
      return null
    } 
}


// gpt
const handleShow = (products) => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    products.forEach(product => {
        // Criar um elemento de div para representar cada slide
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('swiper-slide');

        // Imagem
        const image = document.createElement('img');
        image.src = product.images[3]; // Supondo que cada produto tenha uma propriedade "images" que seja um array e queremos exibir a quarta imagem
        image.alt = product.title;

        // Título
        const nameParagraph = document.createElement('p');
        nameParagraph.textContent = product.title;

        // Preço
        const priceParagraph = document.createElement('span');
        priceParagraph.textContent = `Preço: R$ ${product.price} `;

        // botao
        const button = document.createElement('button');
        button.textContent = ` + `;

        // Adicionar os elementos ao slide
        slideDiv.appendChild(image);
        slideDiv.appendChild(nameParagraph);
        slideDiv.appendChild(priceParagraph);
        slideDiv.appendChild(button);

        // Adicionar o slide ao wrapper do Swiper
        swiperWrapper.appendChild(slideDiv);
    });

    // Inicializar o Swiper após adicionar os slides
    handleConstructionSwiper();
};

handleData();
     



function handleConstructionSwiper() {
    return new Swiper(".swiper", {
      slidesPerView: 4,
      parallax: true,
      bulletActiveClass: true,
      dynamicBullets: true,
      updateOnWindowResize: true,
      spaceBetween: 30,
      rewind: true,
      loop: false,
      longSwipes: true,
      grabCursor: true,
      type: "bullets",
      freeMode: true,
      freeModeMomentum: false,
      freeModeMomentumRatio: 0.5,
      freeModeMomentumBounce: false,
      freeModeSticky: true,
      freeMode: {
        enabled: true,
        sticky: true,
      },
      // autoplay: {
      //   delay: 20000,
      // },
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
      },
      controller: {
        inverse: true,
      },
      
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        480: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
      },
    });
  }

  handleConstructionSwiper()