document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:8087/petcare/produtos';

    async function fetchData() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados da API');
            }
            const data = await response.json();
            createProductCards(data);
        } catch (error) {
            displayError(error.message);
        } finally {
            document.getElementById('loadingMessage').style.display = 'none';
            document.getElementById('productDisplay').style.display = 'flex';
        }
    }

    function createProductCards(data) {
        const productDisplay = document.getElementById('productDisplay');
        productDisplay.innerHTML = '';

        data.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col product-visible';
            col.dataset.price = item.price.toFixed(2);
            col.dataset.category = item.category;

            const card = document.createElement('div');
            card.className = 'product-card';

            const imgContainer = document.createElement('div');
            imgContainer.className = 'product-image-container';

            const img = document.createElement('img');
            img.src = item.imageUrl;
            img.alt = 'Placeholder Image';
            img.className = 'product-image';
            img.style.objectFit = 'cover';

            const title = document.createElement('h2');
            title.className = 'product-name';
            title.textContent = item.name;

            const price = document.createElement('p');
            price.className = 'product-price';
            price.textContent = `R$ ${item.price.toFixed(2)}`;

            const button = document.createElement('button');
            button.className = 'buy-button';
            button.textContent = 'Comprar';
            card.addEventListener('click', () => loadProductDetails(item.id));  // Adiciona o event listener

            imgContainer.appendChild(img);
            card.appendChild(imgContainer);
            card.appendChild(title);
            card.appendChild(price);
            card.appendChild(button);
            col.appendChild(card);
            productDisplay.appendChild(col);
        });

        updateResultsCount(data.length);
    }

    function updateResultsCount(count) {
        const resultsCount = document.getElementById('resultsCount');
        resultsCount.textContent = `Exibindo ${count} resultados encontrados`;
    }

    function displayError(errorMessage) {
        const errorMessageDiv = document.getElementById('errorMessage');
        errorMessageDiv.style.display = 'block';
        const errorText = document.querySelector('.error-text');
        errorText.textContent = 'Desculpe tivemos um problema, por favor tente novamente mais tarde :(';
        console.error('Erro:', errorMessage);
    }

    function loadProductsWithDelay() {
        const loadingMessageDiv = document.getElementById('loadingMessage');
        loadingMessageDiv.style.display = 'block';
        const productDisplayDiv = document.getElementById('productDisplay');
        productDisplayDiv.style.display = 'none';
        setTimeout(() => {
            fetchData();
            loadingMessageDiv.style.display = 'none';
            productDisplayDiv.style.display = 'flex';
        }, 1000);
    }

    function loadProductDetails(productId) {
        window.location.href = `product.html?productId=${productId}`;
    }

    function displayProductDetails(product) {
        const productDetailsDiv = document.getElementById('productDetails');
        productDetailsDiv.innerHTML = '';

        const title = document.createElement('h2');
        title.textContent = product.name;

        const img = document.createElement('img');
        img.src = product.imageUrl;
        img.alt = product.name;
        img.className = 'product-image';

        const price = document.createElement('p');
        price.textContent = `R$ ${product.price.toFixed(2)}`;

        productDetailsDiv.appendChild(title);
        productDetailsDiv.appendChild(img);
        productDetailsDiv.appendChild(price);

        productDetailsDiv.style.display = 'block';
    }

    loadProductsWithDelay();
});
