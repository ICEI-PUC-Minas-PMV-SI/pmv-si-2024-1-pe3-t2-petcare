
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    const productDetailsDiv = document.querySelector('.product-details');
    const productImage = document.querySelector('.product-image-detail');

    const productDetailsUrl = `http://localhost:8087/petcare/${productId}`;

    try {
        const response = await fetch(productDetailsUrl);
        if (!response.ok) {
            throw new Error('Erro ao buscar detalhes do produto');
        }
        const product = await response.json();
        displayProductDetails(product);
    } catch (error) {
        const buyButton = document.getElementById('buy-btn');
            buyButton.addEventListener('click', function() {
                this.classList.add('btn-outline-secondary')});
            buyButton.setAttribute('disabled', 'true');
            
        const addCartButton = document.getElementById('add-cart-btn');
        addCartButton.addEventListener('click', function() {
                this.classList.add('btn-outline-secondary')});
                addCartButton.setAttribute('disabled', 'true');    

        displayError(error.message);
    }

    function displayProductDetails(product) {
        productImage.src = product.imageUrl;
        productImage.alt = product.name;

        const productName = productDetailsDiv.querySelector('.product-name-detail');
        productName.textContent = product.name;

        document.getElementById('page-title').textContent = product.name;

        const productPrice = productDetailsDiv.querySelector('.product-price');
        productPrice.textContent = `R$ ${product.price.toFixed(2)}`;
    }

    function displayError(errorMessage) {
        const errorMessageDiv = document.getElementById('errorMessage');
        errorMessageDiv.style.display = 'block';
        const errorText = document.querySelector('.error-text');
        errorText.textContent = 'Desculpe tivemos um problema, por favor tente novamente mais tarde :(';
        console.error('Erro:', errorMessage);
    }

    let animationSpeed = 600;
    let currentPosition = 0;
    function animateTitle() {
        let titleText = document.getElementById('page-title').textContent;
        document.title = titleText.substring(currentPosition) + titleText.substring(0, currentPosition);
        currentPosition = (currentPosition + 1) % titleText.length;
        setTimeout(animateTitle, animationSpeed);
    }

    animateTitle();
});

document.querySelector('.back-button').addEventListener('click', function () {
    window.history.back();
});