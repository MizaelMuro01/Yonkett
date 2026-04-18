// Lista completa de vehículos (nombres de archivo de imagen)
const vehicleImages = [
    "CHEVROLET_CAPTIVA_2014.png",
    "CHEVROLET_COBALT_2008.png",
    "CHEVROLET_CRUZE_2015.png",
    "CHEVROLET_CRUZE_2017.png",
    "CHEVROLET_EQUINOX_2012.png",
    "CHEVROLET_EQUINOX_2014.png",
    "CHEVROLET_MALIBU_2007.png",
    "CHEVROLET_MALIBU_2013.png",
    "CHEVROLET_S10_1998.png",
    "CHEVROLET_SILVERADO_2014.png",
    "CHEVROLET_SILVERADO_2020.png",
    "CHEVROLET_TRAIL_BLAZER_2004.png",
    "CHEVROLETO_EQUINOX_2005.png",
    "CHRYSLER_200_2014.png",
    "CHRYSLER_200_2015.png",
    "CHRYSLER_AVENGER_2008.png",
    "CHRYSLER_AVENGER_2014.png",
    "CHRYSLER_GRAND_CARAVAN_2011.png",
    "CHRYSLER_JOURNEY_2013.png",
    "d0175667500ba672f885075c12c0380e.jpg",
    "DODGE_RAM_1500_2003.png",
    "FIAT_L500_2014.png",
    "FORD_EDGE_2007.png",
    "FORD_ESCAPE_2009.png",
    "FORD_ESCAPE_2014.png",
    "FORD_F150_2013.png",
    "FORD_F150_2016.png",
    "FORD_FIESTA_2017.png",
    "FORD_FIESTA_2019.png",
    "FORD_WINDSTAR_2001.png",
    "GMC_BUICK_ENCLAVE_2008.png",
    "HONDA_ACCORD_2014.png",
    "HONDA_ACCORD_2017.png",
    "HUMMER_H3_2007.png",
    "JEEP_CHEROKEE_2021.png",
    "KIA_SOUL_2013.png",
    "MAZDA_CX7_2007.png",
    "MERCEDESBENZ_CLASEC_2013.png",
    "NISSAN_ALTIMA_2013.png",
    "NISSAN_MARCH_2014.png",
    "NISSAN_MURANO_2014.png",
    "NISSAN_PATHFINDER_2014.png",
    "TOYOTA_CAMRY_2011.png",
    "TOYOTA_TACOMA_2017.png",
    "VOLKSWAGEN_BEETLE_2015.png",
    "VOLKSWAGEN_BETTLE_2012.png",
    "VOLKSWAGEN_GOLF_2010.png",
    "VOLKSWAGEN_GOLF_2014.png",
    "VOLKSWAGEN_GOLF_MK7_2014.png",
    "VOLKSWAGEN_GTI_MK6_2014.png",
    "VOLKSWAGEN_GTI_MK7_2014.png",
    "VOLKSWAGEN_JETA_2014_MK6_1.4.png",
    "VOLKSWAGEN_JETA_2018.png",
    "VOLKSWAGEN_JETTA_2011.png",
    "VOLKSWAGEN_JETTA_2014_1.8.png",
    "VOLKSWAGEN_JETTA_2019.png",
    "VOLKSWAGEN_PASSAT_2012.png",
    "VOLKSWAGEN_PASSAT_2017.png"
];

// Función para parsear el nombre del vehículo
function parseVehicleInfo(filename) {
    // Remover la extensión
    let name = filename.replace(/\.(png|jpg|jpeg)$/i, '');
    
    // Manejar caso especial del archivo con hash
    if (name === "d0175667500ba672f885075c12c0380e") {
        return {
            brand: "Unknown",
            model: "Unknown Vehicle",
            year: "Unknown",
            fullName: "Special Vehicle",
            filename: filename
        };
    }
    
    // Separar por guión bajo
    const parts = name.split('_');
    
    // La marca es la primera parte
    let brand = parts[0];
    
    // Buscar el año (generalmente el último segmento que son 4 dígitos)
    let year = "";
    let modelParts = [];
    
    for (let i = 1; i < parts.length; i++) {
        if (parts[i].match(/^\d{4}$/)) {
            year = parts[i];
        } else {
            modelParts.push(parts[i]);
        }
    }
    
    let model = modelParts.join(' ');
    
    // Formatear marca (primera letra mayúscula, resto minúscula)
    brand = brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase();
    
    // Casos especiales para marcas conocidas
    if (brand === "Chevroleto") brand = "Chevrolet";
    if (brand === "Chrysler") brand = "Chrysler";
    if (brand === "Dodge") brand = "Dodge";
    if (brand === "Fiat") brand = "Fiat";
    if (brand === "Ford") brand = "Ford";
    if (brand === "Gmc") brand = "GMC";
    if (brand === "Honda") brand = "Honda";
    if (brand === "Hummer") brand = "Hummer";
    if (brand === "Jeep") brand = "Jeep";
    if (brand === "Kia") brand = "Kia";
    if (brand === "Mazda") brand = "Mazda";
    if (brand === "Mercedesbenz") brand = "Mercedes-Benz";
    if (brand === "Nissan") brand = "Nissan";
    if (brand === "Toyota") brand = "Toyota";
    if (brand === "Volkswagen") brand = "Volkswagen";
    
    // Limpiar modelo
    model = model.replace(/_/g, ' ');
    
    return {
        brand: brand,
        model: model,
        year: year,
        fullName: `${brand} ${model} ${year}`.trim(),
        filename: filename
    };
}

// Procesar todos los vehículos
const vehicles = vehicleImages.map(parseVehicleInfo);

// Obtener marcas únicas
const brands = [...new Set(vehicles.map(v => v.brand))].sort();

// Función para obtener modelos únicos por marca
function getModelsByBrand(brand) {
    if (brand === 'all') {
        return [...new Set(vehicles.map(v => v.model))].sort();
    }
    return [...new Set(vehicles.filter(v => v.brand === brand).map(v => v.model))].sort();
}

// Renderizar el catálogo
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
    
    grid.innerHTML = filteredVehicles.map(vehicle => `
        <div class="catalog-item">
            <div class="catalog-image-container">
                <img src="images/catalog/${vehicle.filename}" alt="${vehicle.fullName}" class="catalog-image" onerror="this.src='images/catalog/placeholder.png'">
            </div>
            <div class="catalog-info">
                <h3 class="vehicle-title">${vehicle.fullName}</h3>
                <div class="vehicle-details">
                    <p><strong>Brand:</strong> ${vehicle.brand}</p>
                    <p><strong>Model:</strong> ${vehicle.model}</p>
                    <p><strong>Year:</strong> ${vehicle.year}</p>
                </div>
                <div class="vehicle-description">
                    <p>Characteristic features and specifications for this vehicle model.</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Inicializar filtros
function initFilters() {
    const brandSelect = document.getElementById('brand-filter');
    const modelSelect = document.getElementById('model-filter');
    
    // Llenar marcas
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
    
    // Render inicial
    renderCatalog('all', 'all');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    
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
});