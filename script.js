document.addEventListener('DOMContentLoaded', async () => {
    const breedButtonsContainer = document.getElementById('breed-buttons');
    const imageGallery = document.getElementById('image-gallery');
    const loadingMessage = document.getElementById('loading-message');

    // Função para obter as raças de cachorros
    async function getBreeds() {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/list/all');
            if (!response.ok) throw new Error('Erro ao obter raças');
            const data = await response.json();
            return data.message;
        } catch (error) {
            console.error('Erro ao obter raças:', error);
            alert('Não foi possível carregar as raças.');
            return null;
        }
    }

    // Função para criar botões de raça
    function createBreedButtons(breeds) {
        Object.keys(breeds).forEach(breed => {
            const button = document.createElement('button');
            button.textContent = breed;
            button.className = 'breed-button';
            button.addEventListener('click', () => fetchBreedImages(breed));
            breedButtonsContainer.appendChild(button);
        });
    }

    // Função para obter imagens de uma raça específica
    async function fetchBreedImages(breed) {
        loadingMessage.style.display = 'block'; // Exibe a mensagem de carregamento
        imageGallery.innerHTML = ''; // Limpa a galeria atual
        try {
            const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/4`);
            if (!response.ok) throw new Error('Erro ao obter imagens');
            const data = await response.json();
            displayImages(data.message);
        } catch (error) {
            console.error('Erro ao obter imagens:', error);
            alert('Não foi possível carregar as imagens.');
        } finally {
            loadingMessage.style.display = 'none'; // Oculta a mensagem de carregamento
        }
    }

    // Função para exibir imagens na galeria
    function displayImages(images) {
        images.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            imageGallery.appendChild(img);
        });
    }

    // Inicializa a aplicação
    const breeds = await getBreeds();
    if (breeds) {
        createBreedButtons(breeds);
    }
});
