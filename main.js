let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = ()  => {
    search.classList.toggle('active');
    menu.classList.remove('active');
}

let menu = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = ()  => {
    menu.classList.toggle('active');
    search.classList.remove('active');
}

// Hide Menu And Search Box On Scroll
window.onscroll = () => {
    menu.classList.remove('active');
    search.classList.remove('active');

}



//header
let header = document.querySelector('header');


window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);

});

// Footer Animation on Scroll
document.addEventListener("DOMContentLoaded", function () {
    const footerBoxes = document.querySelectorAll(".footer-box");
    
    function showFooterBoxes() {
        footerBoxes.forEach(box => {
            const boxTop = box.getBoundingClientRect().top;
            if (boxTop < window.innerHeight - 50) {
                box.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", showFooterBoxes);
    showFooterBoxes(); // Run once on page load
});

// Blog Section Animation on Scroll
document.addEventListener("DOMContentLoaded", function () {
    const blogBoxes = document.querySelectorAll(".blog-container .box");
    
    function showBlogBoxes() {
        blogBoxes.forEach(box => {
            const boxTop = box.getBoundingClientRect().top;
            if (boxTop < window.innerHeight - 50) {
                box.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", showBlogBoxes);
    showBlogBoxes();
});


// Car details data
const carDetails = {
    1: {
        title: "Mercedes-GLE53",
        img: "img/MERCEDES-GLE53.jpg",
        price: "KES 23,775,000",
        year: "2025",
        engine: "3.0L Turbocharged",
        fuel: "Diesel",
        transmission: "Automatic",
        features: "Leather seats, Sunroof, Adaptive Cruise Control"
    },
    2: {
        title: "AUDI M8",
        img: "img/car2.jpg",
        price: "KES 10,900,000",
        year: "2024",
        engine: "4.0L V8 Twin Turbo",
        fuel: "Petrol",
        transmission: "Automatic",
        features: "Sport Mode, Bose Sound System, Keyless Entry"
    }
};

// Select modal elements
const modal = document.getElementById("car-modal");
const modalTitle = document.getElementById("modal-title");
const modalImg = document.getElementById("modal-img");
const modalPrice = document.getElementById("modal-price");
const modalYear = document.getElementById("modal-year");
const modalEngine = document.getElementById("modal-engine");
const modalFuel = document.getElementById("modal-fuel");
const modalTransmission = document.getElementById("modal-transmission");
const modalFeatures = document.getElementById("modal-features");
const closeBtn = document.querySelector(".close");

// Event listener for "View Details" buttons
document.querySelectorAll(".view-details").forEach(button => {
    button.addEventListener("click", function () {
        const carId = this.getAttribute("data-id");
        const car = carDetails[carId];

        if (car) {
            modalTitle.textContent = car.title;
            modalImg.src = car.img;
            modalPrice.textContent = car.price;
            modalYear.textContent = car.year;
            modalEngine.textContent = car.engine;
            modalFuel.textContent = car.fuel;
            modalTransmission.textContent = car.transmission;
            modalFeatures.textContent = car.features;

            modal.style.display = "flex";
        }
    });
});

// Close modal when clicking on 'X'
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});

// Close modal when clicking outside content
window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
// Ensure the modal is hidden when the page loads
window.onload = function () {
    let modal = document.getElementById("car-modal"); 
    if (modal) {
        modal.style.display = "none"; 
    }
};


document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('inventory-search-form');
    const searchButton = document.getElementById('search-inventory-btn');
    const searchResultsContainer = document.getElementById('search-results-container');

    // Sample car inventory data (replace with your actual data)
    const carInventory = [
        { year: 2023, make: 'Toyota', model: 'Corolla', condition: 'Used', mileage: 35000, transmission: 'Automatic', price: 1800000 },
        { year: 2024, make: 'BMW', model: 'X5', condition: 'New', mileage: 100, transmission: 'Automatic', price: 7500000 },
        { year: 2022, make: 'Mitsubishi', model: 'Outlander', condition: 'Used', mileage: 60000, transmission: 'Automatic', price: 2500000 },
        { year: 2025, make: 'Toyota', model: 'RAV4', condition: 'New', mileage: 50, transmission: 'Automatic', price: 3200000 },
        { year: 2021, make: 'Mercedes-Benz', model: 'C-Class', condition: 'Used', mileage: 45000, transmission: 'Automatic', price: 4000000 },
        { year: 2023, make: 'Audi', model: 'A4', condition: 'Used', mileage: 28000, transmission: 'Manual', price: 3500000 },
        // Add more car objects here
    ];

    searchButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission

        const filters = {
            year: searchForm.year.value,
            make: searchForm.make.value,
            model: searchForm.model.value.toLowerCase(),
            condition: searchForm.condition.value,
            mileage_min: parseInt(searchForm.mileage_min.value) || null,
            mileage_max: parseInt(searchForm.mileage_max.value) || null,
            transmission: searchForm.transmission.value,
            price_min: parseInt(searchForm.price_min.value) || null,
            price_max: parseInt(searchForm.price_max.value) || null,
        };

        const searchResults = filterInventory(carInventory, filters);
        displaySearchResults(searchResults);
    });

    function filterInventory(inventory, filters) {
        return inventory.filter(car => {
            const yearMatch = !filters.year || car.year.toString() === filters.year;
            const makeMatch = !filters.make || car.make === filters.make;
            const modelMatch = !filters.model || car.model.toLowerCase().includes(filters.model);
            const conditionMatch = !filters.condition || car.condition === filters.condition;

            const mileageMinFilter = filters.mileage_min !== null;
            const mileageMaxFilter = filters.mileage_max !== null;
            const mileageMatch =
                (!mileageMinFilter || car.mileage >= filters.mileage_min) &&
                (!mileageMaxFilter || car.mileage <= filters.mileage_max);

            const transmissionMatch = !filters.transmission || car.transmission === filters.transmission;

            const priceMinFilter = filters.price_min !== null;
            const priceMaxFilter = filters.price_max !== null;
            const priceMatch =
                (!priceMinFilter || car.price >= filters.price_min) &&
                (!priceMaxFilter || car.price <= filters.price_max);

            return yearMatch && makeMatch && modelMatch && conditionMatch && mileageMatch && transmissionMatch && priceMatch;
        });
    }

    function displaySearchResults(results) {
        searchResultsContainer.innerHTML = ''; // Clear previous results

        if (results.length > 0) {
            const resultsHeading = document.createElement('h3');
            resultsHeading.textContent = `Found ${results.length} matching vehicles:`;
            searchResultsContainer.appendChild(resultsHeading);

            const resultsList = document.createElement('ul');
            results.forEach(car => {
                const listItem = document.createElement('li');
                listItem.textContent = `${car.year} ${car.make} ${car.model} (${car.condition}, ${car.transmission}, Mileage: ${car.mileage.toLocaleString()}, Price: KES ${car.price.toLocaleString()})`;
                resultsList.appendChild(listItem);
            });
            searchResultsContainer.appendChild(resultsList);
        } else {
            const noResultsMessage = document.createElement('p');
            noResultsMessage.textContent = 'No vehicles found matching your criteria.';
            searchResultsContainer.appendChild(noResultsMessage);
        }
    }
});








document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');

    // Add a class to trigger the animation
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.classList.add('animated');
        }, 300);
    }

    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.classList.add('animated');
        }, 600);
    }

    if (heroButtons) {
        setTimeout(() => {
            heroButtons.classList.add('animated');
        }, 900);
    }
});