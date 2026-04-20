// Variable global para almacenar los vehículos
let vehicles = [];

// Cargar datos del JSON
async function loadVehicles() {
    try {
        const response = await fetch('data/catalog.json');
        const data = await response.json();
        vehicles = data.vehicles;
        
        // Una vez cargados, inicializar todo
        initFilters();
        renderCatalog('all', 'all');
        
        // Actualizar año en footer
        document.getElementById('current-year').textContent = new Date().getFullYear();
        
        // Configurar hamburger menu
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('.nav');
        
        if (hamburger && nav) {
            hamburger.addEventListener('click', () => {
                nav.classList.toggle('nav-open');
                hamburger.classList.toggle('active');
            });
        }
    } catch (error) {
        console.error('Error loading vehicles:', error);
        document.getElementById('catalog-grid').innerHTML = 
            '<div class="no-results">Error loading catalog. Please try again later.</div>';
    }
}

// Obtener marcas únicas
function getUniqueBrands() {
    return [...new Set(vehicles.map(v => v.brand))].sort();
}

// Función para obtener modelos únicos por marca
function getModelsByBrand(brand) {
    if (brand === 'all') {
        return [...new Set(vehicles.map(v => v.model))].sort();
    }
    return [...new Set(vehicles.filter(v => v.brand === brand).map(v => v.model))].sort();
}

// Renderizar el catálogo (VERSIÓN SIMPLIFICADA SIN REDUNDANCIAS)
function renderCatalog(brandFilter, modelFilter) {
    const grid = document.getElementById('catalog-grid');
    
    let filteredVehicles = vehicles;
    
    // Filtrar por marca
    if (brandFilter !== 'all') {
        filteredVehicles = filteredVehicles.filter(v => v.brand === brandFilter);
    }
    
    // Filtrar por modelo
    if (modelFilter !== 'all') {
        filteredVehicles = filteredVehicles.filter(v => v.model === modelFilter);
    }
    
    if (filteredVehicles.length === 0) {
        grid.innerHTML = '<div class="no-results">No vehicles found matching your criteria.</div>';
        return;
    }
    
    grid.innerHTML = filteredVehicles.map(vehicle => {
        // Generar título completo: MARCA MODELO AÑO
        const fullTitle = `${vehicle.brand} ${vehicle.model} ${vehicle.year}`.trim();
        
        // Generar características si existen
        let featuresHtml = '';
        if (vehicle.features && vehicle.features.length > 0) {
            const featuresList = vehicle.features.map(feature => `<li>${feature}</li>`).join('');
            featuresHtml = `
                <div class="vehicle-features">
                    <strong>Características:</strong>
                    <ul>
                        ${featuresList}
                    </ul>
                </div>
            `;
        }
        
        return `
            <div class="catalog-item">
                <div class="catalog-image-container">
                    <img src="images/catalog/${vehicle.image}" alt="${fullTitle}" 
                         class="catalog-image" onerror="this.src='images/catalog/placeholder.png'">
                </div>
                <div class="catalog-info">
                    <h3 class="vehicle-title">${fullTitle}</h3>
                    <div class="vehicle-description">
                        <p>${vehicle.description}</p>
                        ${featuresHtml}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Inicializar filtros
function initFilters() {
    const brandSelect = document.getElementById('brand-filter');
    const modelSelect = document.getElementById('model-filter');
    const brands = getUniqueBrands();
    
    // Limpiar y llenar marcas
    brandSelect.innerHTML = '<option value="all">All Brands</option>';
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandSelect.appendChild(option);
    });
    
    // Evento para cambio de marca
    brandSelect.addEventListener('change', (e) => {
        const selectedBrand = e.target.value;
        const currentModel = modelSelect.value;
        
        // Actualizar modelos disponibles
        const models = getModelsByBrand(selectedBrand);
        modelSelect.innerHTML = '<option value="all">All Models</option>';
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
        
        // Verificar si el modelo seleccionado aún es válido
        let newModelFilter = currentModel;
        if (selectedBrand !== 'all' && currentModel !== 'all') {
            const validModels = getModelsByBrand(selectedBrand);
            if (!validModels.includes(currentModel)) {
                newModelFilter = 'all';
                modelSelect.value = 'all';
            }
        } else if (selectedBrand === 'all') {
            modelSelect.value = currentModel;
            newModelFilter = currentModel;
        }
        
        renderCatalog(selectedBrand, newModelFilter);
    });
    
    // Evento para cambio de modelo
    modelSelect.addEventListener('change', (e) => {
        renderCatalog(brandSelect.value, e.target.value);
    });
}

// Iniciar la carga de datos
document.addEventListener('DOMContentLoaded', () => {
    loadVehicles();
});