// cars.js - ES Module for cars gallery functionality
import { updateDates, setupFAQToggle } from './project.js';

// Car data - 18 cars with 6 properties each (more than required)
const carsData = [
    {
        id: 1,
        model: "Toyota Corolla",
        year: 2023,
        fuel: "Hybrid",
        owners: 245,
        rating: 4.5,
        commonIssues: "Brake wear, Battery life",
        maintenanceCost: "$450/year",
        description: "Reliable compact sedan with excellent fuel economy",
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=250&fit=crop"
    },
    {
        id: 2,
        model: "Honda Civic",
        year: 2024,
        fuel: "Gasoline",
        owners: 312,
        rating: 4.7,
        commonIssues: "CVT transmission, AC compressor",
        maintenanceCost: "$500/year",
        description: "Sporty compact with great handling and technology",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=250&fit=crop"
    },
    {
        id: 3,
        model: "Ford F-150",
        year: 2022,
        fuel: "Diesel",
        owners: 189,
        rating: 4.6,
        commonIssues: "Transmission, Electrical systems",
        maintenanceCost: "$750/year",
        description: "Best-selling pickup truck in America",
        image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400&h=250&fit=crop"
    },
    {
        id: 4,
        model: "Tesla Model 3",
        year: 2024,
        fuel: "Electric",
        owners: 421,
        rating: 4.8,
        commonIssues: "Touchscreen, Battery degradation",
        maintenanceCost: "$300/year",
        description: "Electric sedan with autopilot capabilities",
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=250&fit=crop"
    },
    {
        id: 5,
        model: "BMW 3 Series",
        year: 2023,
        fuel: "Gasoline",
        owners: 156,
        rating: 4.4,
        commonIssues: "Engine oil leaks, Electrical issues",
        maintenanceCost: "$900/year",
        description: "Luxury sports sedan with premium features",
        image: "https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=400&h=250&fit=crop"
    },
    {
        id: 6,
        model: "Toyota RAV4",
        year: 2023,
        fuel: "Hybrid",
        owners: 278,
        rating: 4.6,
        commonIssues: "Infotainment system, Wind noise",
        maintenanceCost: "$550/year",
        description: "Popular compact SUV with hybrid option",
        image: "https://images.unsplash.com/photo-1566473351650-b6e2e345b59f?w=400&h=250&fit=crop"
    },
    {
        id: 7,
        model: "Mercedes C-Class",
        year: 2024,
        fuel: "Gasoline",
        owners: 134,
        rating: 4.5,
        commonIssues: "Suspension, Electronics",
        maintenanceCost: "$950/year",
        description: "Executive luxury sedan with cutting-edge tech",
        image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=250&fit=crop"
    },
    {
        id: 8,
        model: "Chevrolet Silverado",
        year: 2022,
        fuel: "Diesel",
        owners: 167,
        rating: 4.3,
        commonIssues: "Transmission, Fuel system",
        maintenanceCost: "$700/year",
        description: "Powerful work truck with towing capacity",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=250&fit=crop"
    },
    {
        id: 9,
        model: "Nissan Leaf",
        year: 2023,
        fuel: "Electric",
        owners: 198,
        rating: 4.2,
        commonIssues: "Battery range, Charging port",
        maintenanceCost: "$250/year",
        description: "Affordable electric hatchback for city driving",
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=250&fit=crop"
    },
    {
        id: 10,
        model: "Subaru Outback",
        year: 2024,
        fuel: "Gasoline",
        owners: 189,
        rating: 4.6,
        commonIssues: "CVT transmission, Oil consumption",
        maintenanceCost: "$600/year",
        description: "All-wheel drive wagon for adventure",
        image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=250&fit=crop"
    },
    {
        id: 11,
        model: "Volkswagen Golf",
        year: 2023,
        fuel: "Gasoline",
        owners: 145,
        rating: 4.4,
        commonIssues: "DSG transmission, Electrical",
        maintenanceCost: "$550/year",
        description: "German hot hatch with sporty performance",
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=250&fit=crop"
    },
    {
        id: 12,
        model: "Hyundai Tucson",
        year: 2024,
        fuel: "Hybrid",
        owners: 201,
        rating: 4.5,
        commonIssues: "Infotainment, Paint quality",
        maintenanceCost: "$480/year",
        description: "Modern SUV with comprehensive warranty",
        image: "https://images.unsplash.com/photo-1566473351650-b6e2e345b59f?w=400&h=250&fit=crop"
    },
    {
        id: 13,
        model: "Jeep Wrangler",
        year: 2023,
        fuel: "Diesel",
        owners: 178,
        rating: 4.3,
        commonIssues: "Wind noise, Fuel economy",
        maintenanceCost: "$650/year",
        description: "Iconic off-road vehicle for adventure",
        image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=250&fit=crop"
    },
    {
        id: 14,
        model: "Mazda CX-5",
        year: 2024,
        fuel: "Gasoline",
        owners: 234,
        rating: 4.7,
        commonIssues: "Minor electrical issues",
        maintenanceCost: "$520/year",
        description: "Premium compact SUV with great handling",
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=250&fit=crop"
    },
    {
        id: 15,
        model: "Audi A4",
        year: 2023,
        fuel: "Gasoline",
        owners: 123,
        rating: 4.6,
        commonIssues: "Oil consumption, Electrical",
        maintenanceCost: "$850/year",
        description: "Premium German sedan with quattro AWD",
        image: "https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=400&h=250&fit=crop"
    },
    {
        id: 16,
        model: "Kia Sportage",
        year: 2024,
        fuel: "Hybrid",
        owners: 195,
        rating: 4.4,
        commonIssues: "Minor interior rattles",
        maintenanceCost: "$470/year",
        description: "Stylish SUV with advanced safety features",
        image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=250&fit=crop"
    },
    {
        id: 17,
        model: "Ford Mustang",
        year: 2023,
        fuel: "Gasoline",
        owners: 167,
        rating: 4.5,
        commonIssues: "Transmission, Suspension",
        maintenanceCost: "$700/year",
        description: "American muscle car icon",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=250&fit=crop"
    },
    {
        id: 18,
        model: "Toyota Camry",
        year: 2024,
        fuel: "Hybrid",
        owners: 289,
        rating: 4.6,
        commonIssues: "Infotainment system",
        maintenanceCost: "$490/year",
        description: "Reliable midsize sedan with hybrid efficiency",
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=250&fit=crop"
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
    console.log('Initializing cars page...');
    
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
        <img src="${car.image}" alt="${car.model}" class="car-image" loading="lazy">
        <div class="car-content">
            <h3 class="car-title">${car.model}</h3>
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
                    <span class="stat-label">Issues:</span>
                    <span class="stat-value">${car.commonIssues.split(',')[0]}</span>
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
        compareBtn.onclick = () => toggleCompare(carId);
        
        // Show modal
        carModal.showModal();
        
        // Save as last viewed
        saveLastViewed(car.model);
        
    } catch (error) {
        console.error('Error showing car details:', error);
        alert('Could not load car details. Please try again.');
    }
}

// Toggle favorite status
export function toggleFavorite(carId) {
    const index = favorites.indexOf(carId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(carId);
    }
    
    localStorage.setItem('carFavorites', JSON.stringify(favorites));
    
    // Update UI if modal is open
    const favoriteBtn = document.getElementById('favorite-btn');
    if (favoriteBtn) {
        const isFavorited = favorites.includes(carId);
        favoriteBtn.innerHTML = `<span class="heart-icon">${isFavorited ? '♥' : '♡'}</span> ${isFavorited ? 'Remove Favorite' : 'Add to Favorites'}`;
        favoriteBtn.classList.toggle('favorited', isFavorited);
    }
    
    // Show notification
    showNotification(isFavorited ? 'Added to favorites' : 'Removed from favorites');
}

// Toggle compare status
export function toggleCompare(carId) {
    const index = comparedCars.indexOf(carId);
    
    if (index > -1) {
        comparedCars.splice(index, 1);
    } else {
        if (comparedCars.length >= 3) {
            alert('You can compare up to 3 cars at a time.');
            return;
        }
        comparedCars.push(carId);
    }
    
    localStorage.setItem('comparedCars', JSON.stringify(comparedCars));
    
    // Update UI
    displayCars();
    
    // If compare modal is open, update it
    if (comparedCars.length > 0) {
        updateCompareModal();
    }
    
    // Show notification
    const isCompared = comparedCars.includes(carId);
    showNotification(isCompared ? 'Added to comparison' : 'Removed from comparison');
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
        <table class="compare-table">
            <thead>
                <tr>
                    <th>Property</th>
                    ${comparedCarsData.map(car => `<th>${car.model}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
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
    `;
    
    compareContainer.innerHTML = tableHTML;
}

// Clear comparison
function clearComparison() {
    comparedCars = [];
    localStorage.removeItem('comparedCars');
    displayCars();
    updateCompareModal();
    showNotification('Comparison cleared');
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #FA0001;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
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

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCarsPage();
    updateDates();
    setupFAQToggle();
});