// cars.js - ES Module for cars gallery functionality with LOCAL images
import { updateDates, setupFAQToggle, showNotification } from './project.js';

// Car data - 18 cars with 6+ properties each using LOCAL images
const carsData = [
    {
        id: 1,
        model: "Audi A4",
        brand: "Audi",
        year: 2023,
        fuel: "Gasoline",
        owners: 123,
        rating: 4.6,
        commonIssues: "Oil consumption, Electrical",
        maintenanceCost: "$850/year",
        description: "Premium German sedan with quattro AWD",
        image: "images/AUDI-A4.png"
    },
    {
        id: 2,
        model: "BMW 3 Series",
        brand: "BMW",
        year: 2023,
        fuel: "Gasoline",
        owners: 156,
        rating: 4.4,
        commonIssues: "Engine oil leaks, Electrical issues",
        maintenanceCost: "$900/year",
        description: "Luxury sports sedan with premium features",
        image: "images/BMW-SERIE3.png"
    },
    {
        id: 3,
        model: "Chevrolet Silverado",
        brand: "Chevrolet",
        year: 2022,
        fuel: "Diesel",
        owners: 167,
        rating: 4.3,
        commonIssues: "Transmission, Fuel system",
        maintenanceCost: "$700/year",
        description: "Powerful work truck with towing capacity",
        image: "images/CHEVROLET-SILVERADO.png"
    },
    {
        id: 4,
        model: "Ford F-150",
        brand: "Ford",
        year: 2022,
        fuel: "Diesel",
        owners: 189,
        rating: 4.6,
        commonIssues: "Transmission, Electrical systems",
        maintenanceCost: "$750/year",
        description: "Best-selling pickup truck in America",
        image: "images/FORD-F150.png"
    },
    {
        id: 5,
        model: "Ford Mustang",
        brand: "Ford",
        year: 2023,
        fuel: "Gasoline",
        owners: 167,
        rating: 4.5,
        commonIssues: "Transmission, Suspension",
        maintenanceCost: "$700/year",
        description: "American muscle car icon",
        image: "images/FORD-MUSTANG.png"
    },
    {
        id: 6,
        model: "Honda Civic",
        brand: "Honda",
        year: 2024,
        fuel: "Gasoline",
        owners: 312,
        rating: 4.7,
        commonIssues: "CVT transmission, AC compressor",
        maintenanceCost: "$500/year",
        description: "Sporty compact with great handling and technology",
        image: "images/HONDA-CIVIC.png"
    },
    {
        id: 7,
        model: "Hyundai Tucson",
        brand: "Hyundai",
        year: 2024,
        fuel: "Hybrid",
        owners: 201,
        rating: 4.5,
        commonIssues: "Infotainment, Paint quality",
        maintenanceCost: "$480/year",
        description: "Modern SUV with comprehensive warranty",
        image: "images/HYUNDAI-TUCSON.png"
    },
    {
        id: 8,
        model: "Jeep Wrangler",
        brand: "Jeep",
        year: 2023,
        fuel: "Diesel",
        owners: 178,
        rating: 4.3,
        commonIssues: "Wind noise, Fuel economy",
        maintenanceCost: "$650/year",
        description: "Iconic off-road vehicle for adventure",
        image: "images/JEEP-WRANGLER.png"
    },
    {
        id: 9,
        model: "Kia Sportage",
        brand: "Kia",
        year: 2024,
        fuel: "Hybrid",
        owners: 195,
        rating: 4.4,
        commonIssues: "Minor interior rattles",
        maintenanceCost: "$470/year",
        description: "Stylish SUV with advanced safety features",
        image: "images/KIA-SPORTAGE.png"
    },
    {
        id: 10,
        model: "Mazda CX-5",
        brand: "Mazda",
        year: 2024,
        fuel: "Gasoline",
        owners: 234,
        rating: 4.7,
        commonIssues: "Minor electrical issues",
        maintenanceCost: "$520/year",
        description: "Premium compact SUV with great handling",
        image: "images/MAZDA-CX5.png"
    },
    {
        id: 11,
        model: "Mercedes-Benz C-Class",
        brand: "Mercedes-Benz",
        year: 2024,
        fuel: "Gasoline",
        owners: 134,
        rating: 4.5,
        commonIssues: "Suspension, Electronics",
        maintenanceCost: "$950/year",
        description: "Executive luxury sedan with cutting-edge tech",
        image: "images/MERCEDESBENZ-CLASEC.png"
    },
    {
        id: 12,
        model: "Nissan Versa",
        brand: "Nissan",
        year: 2023,
        fuel: "Gasoline",
        owners: 145,
        rating: 4.2,
        commonIssues: "CVT transmission, Interior quality",
        maintenanceCost: "$400/year",
        description: "Affordable compact sedan with good fuel economy",
        image: "images/NISSAN-VERSA.png"
    },
    {
        id: 13,
        model: "Tesla Model 3",
        brand: "Tesla",
        year: 2024,
        fuel: "Electric",
        owners: 421,
        rating: 4.8,
        commonIssues: "Touchscreen, Battery degradation",
        maintenanceCost: "$300/year",
        description: "Electric sedan with autopilot capabilities",
        image: "images/TESLA-MODEL3.png"
    },
    {
        id: 14,
        model: "Toyota Camry",
        brand: "Toyota",
        year: 2024,
        fuel: "Hybrid",
        owners: 289,
        rating: 4.6,
        commonIssues: "Infotainment system",
        maintenanceCost: "$490/year",
        description: "Reliable midsize sedan with hybrid efficiency",
        image: "images/TOYOTA-CAMRY.png"
    },
    {
        id: 15,
        model: "Toyota Corolla",
        brand: "Toyota",
        year: 2023,
        fuel: "Hybrid",
        owners: 245,
        rating: 4.5,
        commonIssues: "Brake wear, Battery life",
        maintenanceCost: "$450/year",
        description: "Reliable compact sedan with excellent fuel economy",
        image: "images/TOYOTA-COROLLA.png"
    },
    {
        id: 16,
        model: "Toyota RAV4",
        brand: "Toyota",
        year: 2023,
        fuel: "Hybrid",
        owners: 278,
        rating: 4.6,
        commonIssues: "Infotainment system, Wind noise",
        maintenanceCost: "$550/year",
        description: "Popular compact SUV with hybrid option",
        image: "images/TOYOTA-RAV4.png"
    },
    {
        id: 17,
        model: "Volkswagen Golf",
        brand: "Volkswagen",
        year: 2023,
        fuel: "Gasoline",
        owners: 145,
        rating: 4.4,
        commonIssues: "DSG transmission, Electrical",
        maintenanceCost: "$550/year",
        description: "German hot hatch with sporty performance",
        image: "images/VOLKSWAGEN-GOLF.png"
    },
    {
        id: 18,
        model: "Volvo XC40",
        brand: "Volvo",
        year: 2023,
        fuel: "Gasoline",
        owners: 156,
        rating: 4.5,
        commonIssues: "Infotainment system, Minor electrical",
        maintenanceCost: "$600/year",
        description: "Premium compact SUV with Scandinavian design",
        image: "images/VOLVO-XC40.png"
    }
];

// State management
let currentCars = [...carsData];
let favorites = JSON.parse(localStorage.getItem('carFavorites')) || [];
let comparedCars = JSON.parse(localStorage.getItem('comparedCars')) || [];
let currentView = localStorage.getItem('carView') || 'grid';

// DOM Elements
let carsContainer;
let carCountElement;
let filters = {};
let carModal;
let compareModal;

// Initialize the page
export function initCarsPage() {
    console.log('Initializing cars page with local images...');
    
    // Get DOM elements
    carsContainer = document.getElementById('cars-container');
    carCountElement = document.getElementById('car-count');
    carModal = document.getElementById('car-modal');
    compareModal = document.getElementById('compare-modal');
    
    // Load saved preferences
    loadPreferences();
    
    // Setup event listeners
    setupEventListeners();
    
    // Display initial cars
    displayCars();
    
    // Update last viewed time
    updateLastViewed();
    
    // Update data load time
    updateDataLoadTime();
}

// Load user preferences from localStorage
function loadPreferences() {
    // View preference
    const savedView = localStorage.getItem('carView');
    if (savedView) {
        currentView = savedView;
        setView(currentView);
    }
    
    // Filter preferences
    const savedFilters = localStorage.getItem('carFilters');
    if (savedFilters) {
        filters = JSON.parse(savedFilters);
        applySavedFilters();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Filter events
    document.getElementById('year-filter').addEventListener('change', (e) => {
        filters.year = e.target.value === 'all' ? null : e.target.value;
        applyFilters();
        saveFilters();
    });
    
    document.getElementById('fuel-filter').addEventListener('change', (e) => {
        filters.fuel = e.target.value === 'all' ? null : e.target.value;
        applyFilters();
        saveFilters();
    });
    
    document.getElementById('sort-by').addEventListener('change', (e) => {
        filters.sort = e.target.value;
        applyFilters();
        saveFilters();
    });
    
    // Reset filters
    document.getElementById('reset-filters').addEventListener('click', resetFilters);
    
    // View toggle
    document.getElementById('grid-view-btn').addEventListener('click', () => setView('grid'));
    document.getElementById('list-view-btn').addEventListener('click', () => setView('list'));
    
    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            carModal.close();
            compareModal.close();
        });
    });
    
    // Close modals on backdrop click
    carModal.addEventListener('click', (e) => {
        if (e.target === carModal) carModal.close();
    });
    
    compareModal.addEventListener('click', (e) => {
        if (e.target === compareModal) compareModal.close();
    });
    
    // Close comparison
    document.getElementById('close-comparison').addEventListener('click', () => {
        compareModal.close();
    });
    
    // Clear comparison
    document.getElementById('clear-comparison').addEventListener('click', clearComparison);
}

// Apply saved filters to UI
function applySavedFilters() {
    if (filters.year) {
        document.getElementById('year-filter').value = filters.year;
    }
    if (filters.fuel) {
        document.getElementById('fuel-filter').value = filters.fuel;
    }
    if (filters.sort) {
        document.getElementById('sort-by').value = filters.sort;
    }
}

// Save filters to localStorage
function saveFilters() {
    localStorage.setItem('carFilters', JSON.stringify(filters));
}

// Apply filters and sorting
function applyFilters() {
    let filteredCars = [...carsData];
    
    // Apply year filter
    if (filters.year) {
        filteredCars = filteredCars.filter(car => car.year.toString() === filters.year);
    }
    
    // Apply fuel filter
    if (filters.fuel) {
        filteredCars = filteredCars.filter(car => car.fuel.toLowerCase() === filters.fuel.toLowerCase());
    }
    
    // Apply sorting
    if (filters.sort) {
        switch (filters.sort) {
            case 'popularity':
                filteredCars.sort((a, b) => b.owners - a.owners);
                break;
            case 'year-new':
                filteredCars.sort((a, b) => b.year - a.year);
                break;
            case 'year-old':
                filteredCars.sort((a, b) => a.year - b.year);
                break;
            case 'name':
                filteredCars.sort((a, b) => a.model.localeCompare(b.model));
                break;
            case 'rating':
                filteredCars.sort((a, b) => b.rating - a.rating);
                break;
            case 'cost-low':
                filteredCars.sort((a, b) => parseFloat(a.maintenanceCost.replace('$', '')) - parseFloat(b.maintenanceCost.replace('$', '')));
                break;
        }
    }
    
    currentCars = filteredCars;
    displayCars();
}

// Reset all filters
function resetFilters() {
    filters = {};
    document.getElementById('year-filter').value = 'all';
    document.getElementById('fuel-filter').value = 'all';
    document.getElementById('sort-by').value = 'popularity';
    localStorage.removeItem('carFilters');
    applyFilters();
    showNotification('Filters reset to default');
}

// Set view mode (grid/list)
function setView(view) {
    currentView = view;
    localStorage.setItem('carView', view);
    
    // Update button states
    document.getElementById('grid-view-btn').classList.toggle('active', view === 'grid');
    document.getElementById('list-view-btn').classList.toggle('active', view === 'list');
    
    // Update container class
    carsContainer.classList.toggle('list-view', view === 'list');
    
    // Re-render cars with new view
    displayCars();
    
    showNotification(`View changed to ${view} view`);
}

// Display cars in the container
function displayCars() {
    if (!carsContainer) return;
    
    // Clear container
    carsContainer.innerHTML = '';
    
    // Update car count
    if (carCountElement) {
        carCountElement.textContent = currentCars.length;
    }
    
    // Create car cards
    currentCars.forEach(car => {
        const carCard = createCarCard(car);
        carsContainer.appendChild(carCard);
    });
    
    // If no cars found
    if (currentCars.length === 0) {
        carsContainer.innerHTML = `
            <div class="no-cars" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <p style="color: white; font-size: 1.2rem;">No cars found matching your filters.</p>
                <button onclick="resetFilters()" style="margin-top: 1rem; padding: 0.8rem 1.5rem; background-color: #FA0001; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Reset Filters
                </button>
            </div>
        `;
    }
}

// Create a car card element
function createCarCard(car) {
    const isFavorited = favorites.includes(car.id);
    const isCompared = comparedCars.includes(car.id);
    
    const card = document.createElement('div');
    card.className = `car-card ${currentView === 'list' ? 'list-view' : ''}`;
    card.dataset.id = car.id;
    
    card.innerHTML = `
        <div class="car-image-container">
            <img src="${car.image}" alt="${car.model}" class="car-image" loading="lazy">
            ${isFavorited ? '<div class="favorite-badge">♥ Favorite</div>' : ''}
        </div>
        <div class="car-content">
            <div class="car-header">
                <h3 class="car-title">${car.model}</h3>
                <span class="car-brand">${car.brand}</span>
            </div>
            <div class="car-stats">
                <div class="stat">
                    <span class="stat-label">Year:</span>
                    <span class="stat-value">${car.year}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Fuel:</span>
                    <span class="stat-value">${car.fuel}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Owners:</span>
                    <span class="stat-value">${car.owners}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Rating:</span>
                    <span class="stat-value">${car.rating}/5</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Cost/Yr:</span>
                    <span class="stat-value">${car.maintenanceCost}</span>
                </div>
            </div>
            <div class="car-actions">
                <button class="detail-btn" onclick="showCarDetails(${car.id})">
                    View Details
                </button>
                <button class="compare-action-btn ${isCompared ? 'compared' : ''}" onclick="toggleCompare(${car.id})">
                    ${isCompared ? '✓ Compared' : 'Compare'}
                </button>
                <button class="favorite-action-btn ${isFavorited ? 'favorited' : ''}" onclick="toggleFavorite(${car.id})">
                    ${isFavorited ? '♥' : '♡'}
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Show car details in modal - ASYNC FUNCTION WITH TRY/CATCH
export async function showCarDetails(carId) {
    try {
        // Simulate async API call
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const car = carsData.find(c => c.id === carId);
        if (!car) throw new Error('Car not found');
        
        // Update modal content
        document.getElementById('modal-car-img').src = car.image;
        document.getElementById('modal-car-img').alt = car.model;
        document.getElementById('modal-car-title').textContent = car.model;
        document.getElementById('modal-car-brand').textContent = car.brand;
        document.getElementById('modal-car-year').textContent = car.year;
        document.getElementById('modal-car-fuel').textContent = car.fuel;
        document.getElementById('modal-car-owners').textContent = car.owners;
        document.getElementById('modal-car-rating').textContent = `${car.rating}/5`;
        document.getElementById('modal-car-issues').textContent = car.commonIssues;
        document.getElementById('modal-car-cost').textContent = car.maintenanceCost;
        document.getElementById('modal-car-description').textContent = car.description;
        
        // Update favorite button
        const favoriteBtn = document.getElementById('favorite-btn');
        const isFavorited = favorites.includes(carId);
        favoriteBtn.innerHTML = `<span class="heart-icon">${isFavorited ? '♥' : '♡'}</span> ${isFavorited ? 'Remove Favorite' : 'Add to Favorites'}`;
        favoriteBtn.classList.toggle('favorited', isFavorited);
        favoriteBtn.onclick = () => toggleFavorite(carId);
        
        // Update compare button
        const compareBtn = document.getElementById('compare-btn');
        const isCompared = comparedCars.includes(carId);
        compareBtn.innerHTML = `<span class="compare-icon">${isCompared ? '✓' : '⚖'}</span> ${isCompared ? 'Remove from Compare' : 'Compare'}`;
        compareBtn.classList.toggle('compared', isCompared);
        compareBtn.onclick = () => toggleCompare(carId);
        
        // Show modal
        carModal.showModal();
        
        // Save as last viewed
        saveLastViewed(car.model);
        
    } catch (error) {
        console.error('Error showing car details:', error);
        showNotification('Could not load car details. Please try again.', 'error');
    }
}

// Toggle favorite status
export function toggleFavorite(carId) {
    const index = favorites.indexOf(carId);
    
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification('Removed from favorites');
    } else {
        favorites.push(carId);
        showNotification('Added to favorites');
    }
    
    localStorage.setItem('carFavorites', JSON.stringify(favorites));
    
    // Update UI
    displayCars();
    
    // Update modal if open
    const favoriteBtn = document.getElementById('favorite-btn');
    if (favoriteBtn && document.getElementById('modal-car-title').textContent === carsData.find(c => c.id === carId)?.model) {
        const isFavorited = favorites.includes(carId);
        favoriteBtn.innerHTML = `<span class="heart-icon">${isFavorited ? '♥' : '♡'}</span> ${isFavorited ? 'Remove Favorite' : 'Add to Favorites'}`;
        favoriteBtn.classList.toggle('favorited', isFavorited);
    }
}

// Toggle compare status
export function toggleCompare(carId) {
    const index = comparedCars.indexOf(carId);
    
    if (index > -1) {
        comparedCars.splice(index, 1);
        showNotification('Removed from comparison');
    } else {
        if (comparedCars.length >= 3) {
            showNotification('You can compare up to 3 cars at a time.', 'warning');
            return;
        }
        comparedCars.push(carId);
        showNotification('Added to comparison');
    }
    
    localStorage.setItem('comparedCars', JSON.stringify(comparedCars));
    
    // Update UI
    displayCars();
    
    // Update modal if open
    const compareBtn = document.getElementById('compare-btn');
    if (compareBtn && document.getElementById('modal-car-title').textContent === carsData.find(c => c.id === carId)?.model) {
        const isCompared = comparedCars.includes(carId);
        compareBtn.innerHTML = `<span class="compare-icon">${isCompared ? '✓' : '⚖'}</span> ${isCompared ? 'Remove from Compare' : 'Compare'}`;
        compareBtn.classList.toggle('compared', isCompared);
    }
    
    // Update compare modal if open
    if (comparedCars.length > 0) {
        updateCompareModal();
    }
}

// Update compare modal
function updateCompareModal() {
    const compareContainer = document.getElementById('compare-container');
    const comparedCarsData = carsData.filter(car => comparedCars.includes(car.id));
    
    if (comparedCarsData.length === 0) {
        compareContainer.innerHTML = '<p style="color: white; text-align: center;">No cars to compare</p>';
        return;
    }
    
    // Create comparison table
    let tableHTML = `
        <div class="compare-table-container">
            <table class="compare-table">
                <thead>
                    <tr>
                        <th>Property</th>
                        ${comparedCarsData.map(car => `<th>${car.model}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Brand</td>
                        ${comparedCarsData.map(car => `<td>${car.brand}</td>`).join('')}
                    </tr>
                    <tr>
                        <td>Year</td>
                        ${comparedCarsData.map(car => `<td>${car.year}</td>`).join('')}
                    </tr>
                    <tr>
                        <td>Fuel Type</td>
                        ${comparedCarsData.map(car => `<td>${car.fuel}</td>`).join('')}
                    </tr>
                    <tr>
                        <td>Owners in Community</td>
                        ${comparedCarsData.map(car => `<td>${car.owners}</td>`).join('')}
                    </tr>
                    <tr>
                        <td>Rating</td>
                        ${comparedCarsData.map(car => `<td>${car.rating}/5</td>`).join('')}
                    </tr>
                    <tr>
                        <td>Common Issues</td>
                        ${comparedCarsData.map(car => `<td>${car.commonIssues}</td>`).join('')}
                    </tr>
                    <tr>
                        <td>Maintenance Cost</td>
                        ${comparedCarsData.map(car => `<td>${car.maintenanceCost}</td>`).join('')}
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    
    compareContainer.innerHTML = tableHTML;
}

// Show comparison modal
export function showComparison() {
    if (comparedCars.length === 0) {
        showNotification('Add cars to compare first', 'warning');
        return;
    }
    
    updateCompareModal();
    compareModal.showModal();
}

// Clear comparison
function clearComparison() {
    comparedCars = [];
    localStorage.removeItem('comparedCars');
    displayCars();
    updateCompareModal();
    compareModal.close();
    showNotification('Comparison cleared');
}

// Update last viewed time
function updateLastViewed() {
    const lastViewed = localStorage.getItem('lastCarViewed');
    if (lastViewed) {
        document.getElementById('last-viewed').textContent = lastViewed;
    }
}

// Save last viewed car
function saveLastViewed(carModel) {
    const now = new Date().toLocaleString();
    localStorage.setItem('lastCarViewed', `${carModel} - ${now}`);
    document.getElementById('last-viewed').textContent = `${carModel} - ${now}`;
}

// Update data load time
function updateDataLoadTime() {
    const now = new Date().toLocaleTimeString();
    document.getElementById('data-load-time').textContent = now;
}

// Make functions available globally for inline onclick handlers
window.showCarDetails = showCarDetails;
window.toggleFavorite = toggleFavorite;
window.toggleCompare = toggleCompare;
window.resetFilters = resetFilters;
window.showComparison = showComparison;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCarsPage();
    updateDates();
    setupFAQToggle();
});