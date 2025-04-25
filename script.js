document.addEventListener('DOMContentLoaded', function() {
    if (typeof Swiper !== 'undefined') {
    
        const productSwipers = document.querySelectorAll('.product-swiper');
        
        if (productSwipers.length > 0) {
            productSwipers.forEach(function(swiperContainer) {
               
                new Swiper(swiperContainer, {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    loop: true,
                    watchOverflow: true,
                    observer: true,
                    observeParents: true,
                    pagination: {
                        el: swiperContainer.querySelector('.swiper-pagination'),
                        clickable: true,
                    },
                    navigation: {
                        nextEl: swiperContainer.querySelector('.swiper-button-next'),
                        prevEl: swiperContainer.querySelector('.swiper-button-prev'),
                    },
                    breakpoints: {
                     
                        300: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
              
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
       
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20
                        },

                        1200: {
                            slidesPerView: 4,
                            spaceBetween: 20
                        }
                    }
                });
            });
        }
    } else {
        console.error('Swiper is not defined. Make sure the Swiper library is loaded correctly.');
    }
    
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;
    
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                count++;
                if (cartCount) {
                    cartCount.textContent = count;
                }
                
                const originalText = this.textContent;
                this.textContent = 'Adicionado!';
                this.style.backgroundColor = 'var(--cor-sucesso)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = 'var(--cor-primaria)';
                }, 1500);
            });
        });
    }
    
    const products = [
        {
            id: 1,
            name: "Camiseta Branca",
            description: "Lorem ipsum dolor sit amet consectetuer adipiscing elit",
            image: "assets/camisa_branca.svg",
            price: 79.90,
            oldPrice: 100.00,
            discount: "10% off",
            category: "Roupas"
        },
        {
            id: 2,
            name: "Caneca AVANTI",
            description: "Caneca de cerâmica com logo AVANTI",
            image: "assets/caneca_diagonal.svg",
            price: 39.90,
            oldPrice: 49.90,
            discount: "20% off",
            category: "Acessórios"
        },
        {
            id: 3,
            name: "Camiseta Preta",
            description: "Camiseta preta de algodão premium",
            image: "assets/camisa_branca.svg",
            price: 89.90,
            oldPrice: 110.00,
            discount: "15% off",
            category: "Roupas"
        },
        {
            id: 4,
            name: "Calça Jeans",
            description: "Calça jeans de alta qualidade",
            image: "assets/camisa_branca.svg",
            price: 149.90,
            oldPrice: 179.90,
            discount: "15% off",
            category: "Roupas"
        },
        {
            id: 5,
            name: "Tênis Esportivo",
            description: "Tênis para corrida e atividades físicas",
            image: "assets/camisa_branca.svg", 
            price: 199.90,
            oldPrice: 249.90,
            discount: "20% off",
            category: "Calçados"
        }
    ];
    
    const searchStyles = document.createElement('style');
    searchStyles.textContent = `
        .search-container {
            position: relative;
        }
        
        .search-results-container {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            max-height: 400px;
            overflow-y: auto;
            background-color: white;
            border: 1px solid var(--cor-borda);
            border-radius: 4px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            margin-top: 5px;
            display: none;
        }
        
        .search-result-item {
            display: flex;
            padding: 10px;
            border-bottom: 1px solid var(--cor-borda);
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .search-result-item:last-child {
            border-bottom: none;
        }
        
        .search-result-item:hover {
            background-color: var(--cor-secundaria);
        }
        
        .search-result-image {
            width: 60px;
            height: 60px;
            flex-shrink: 0;
            margin-right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .search-result-image img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
        
        .search-result-info {
            flex: 1;
        }
        
        .search-result-info h4 {
            margin: 0 0 5px;
            font-size: 14px;
            font-weight: 600;
            color: var(--cor-texto);
        }
        
        .search-result-info p {
            margin: 0 0 5px;
            font-size: 12px;
            color: var(--cor-texto-claro);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .search-result-price {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .search-result-price .current-price {
            font-weight: bold;
            color: var(--cor-primaria);
            font-size: 14px;
        }
        
        .search-result-price .old-price {
            text-decoration: line-through;
            color: var(--cor-texto-claro);
            font-size: 12px;
        }
        
        .no-results {
            padding: 15px;
            text-align: center;
            color: var(--cor-texto-claro);
            font-style: italic;
        }
        
        @media (max-width: 768px) {
            .search-results-container {
                position: fixed;
                top: 120px;
                left: 15px;
                right: 15px;
                width: auto;
                max-height: 60vh;
            }
        }
    `;
    document.head.appendChild(searchStyles);
    
  
    function createSearchResultsContainer() {

        let searchResultsContainer = document.querySelector('.search-results-container');
        
        if (!searchResultsContainer) {
            searchResultsContainer = document.createElement('div');
            searchResultsContainer.className = 'search-results-container';
            
            
            const searchContainer = document.querySelector('.search-container');
            if (searchContainer) {
                searchContainer.style.position = 'relative';
                searchContainer.appendChild(searchResultsContainer);
            }
        }
        
        return searchResultsContainer;
    }
    

    function formatPrice(price) {
        return price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    function displaySearchResults(results) {
        const searchResultsContainer = createSearchResultsContainer();
        
        searchResultsContainer.innerHTML = '';
        
        if (results.length === 0) {
            searchResultsContainer.innerHTML = '<div class="no-results">Nenhum produto encontrado</div>';
            searchResultsContainer.style.display = 'block';
            return;
        }
        
        const resultsHTML = results.map(product => `
            <div class="search-result-item" data-product-id="${product.id}">
                <div class="search-result-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="search-result-info">
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                    <div class="search-result-price">
                        <span class="current-price">${formatPrice(product.price)}</span>
                        <span class="old-price">${formatPrice(product.oldPrice)}</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        searchResultsContainer.innerHTML = resultsHTML;
        searchResultsContainer.style.display = 'block';
        
        const resultItems = document.querySelectorAll('.search-result-item');
        resultItems.forEach(item => {
            item.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                alert(`Produto selecionado: ${productId}`);
                
            });
        });
    }
    

    function searchProducts(query) {
        if (!query || query.trim() === '') {
            hideSearchResults();
            return;
        }
        
        query = query.toLowerCase().trim();
        
        
        const results = products.filter(product => 
            product.name.toLowerCase().includes(query) || 
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
        
        displaySearchResults(results);
    }
    
    function hideSearchResults() {
        const searchResultsContainer = document.querySelector('.search-results-container');
        if (searchResultsContainer) {
            searchResultsContainer.style.display = 'none';
        }
    }
    
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-container button');
    
    if (searchInput) {
        let debounceTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                searchProducts(this.value);
            }, 300);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchProducts(this.value);
            }
        });
        
        if (searchButton) {
            searchButton.addEventListener('click', function() {
                searchProducts(searchInput.value);
            });
        }

        document.addEventListener('click', function(event) {
            if (!event.target.closest('.search-container')) {
                hideSearchResults();
            }
        });
    }
});