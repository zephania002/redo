
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open'); // For mobile slide-in
        body.classList.toggle('sidebar-collapsed'); // For main content adjustment (you might need to adapt this)
    });

    // Close sidebar when clicking outside on mobile (optional)
    document.addEventListener('click', (event) => {
        if (sidebar.classList.contains('open') && !sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebar.classList.remove('open');
            body.classList.add('sidebar-collapsed'); // Adjust as needed
        }
    });

    // ... (rest of your JS) ...
});
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');
    const dashboardSections = document.querySelectorAll('.dashboard-section');
    const tabButtons = document.querySelectorAll('.manage-search-tabs .tab-button');
    const tabContents = document.querySelectorAll('.manage-search-content .tab-content');

    const addVehicleForm = document.getElementById('addVehicleForm');
    const addVehicleMessage = document.getElementById('addVehicleMessage');

    const makesList = document.getElementById('makesList');
    const modelsList = document.getElementById('modelsList');
    const yearsList = document.getElementById('yearsList');
    const conditionsList = document.getElementById('conditionsList');
    const transmissionsList = document.getElementById('transmissionsList');

    const newMakeInput = document.getElementById('newMake');
    const addMakeBtn = document.getElementById('addMakeBtn');
    const selectMakeForModel = document.getElementById('selectMakeForModel');
    const newModelInput = document.getElementById('newModel');
    const addModelBtn = document.getElementById('addModelBtn');
    const newYearInput = document.getElementById('newYear');
    const addYearBtn = document.getElementById('addYearBtn');
    const newConditionInput = document.getElementById('newCondition');
    const addConditionBtn = document.getElementById('addConditionBtn');
    const newTransmissionInput = document.getElementById('newTransmission');
    const addTransmissionBtn = document.getElementById('addTransmissionBtn');

    // --- Sidebar Toggle ---
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        body.classList.toggle('sidebar-collapsed');
    });

    // --- Sidebar Toggle (Close Button in Sidebar) ---
    sidebarToggleClose.addEventListener('click', () => {
        sidebar.classList.add('collapsed'); // Add collapsed class to close
        body.classList.add('sidebar-collapsed'); // Add body class for main content adjustment
    });

    // --- Navigation ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSectionId = link.dataset.section;

            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');

            dashboardSections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetSectionId).classList.add('active');
        });
    });

    // --- Manage Search Tabs ---
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // --- Add Vehicle Form Submission ---
    addVehicleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(addVehicleForm);
        const vehicleData = {};
        formData.forEach((value, key) => {
            vehicleData[key] = value;
        });

        console.log('Vehicle Data to Send to API:', vehicleData);

        // --- Integration with My API would go here ---
        // Example using fetch API:
        /*
        fetch('/api/vehicles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehicleData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                addVehicleMessage.textContent = 'Vehicle added successfully!';
                addVehicleMessage.className = 'form-message success';
                addVehicleForm.reset();
            } else {
                addVehicleMessage.textContent = 'Error adding vehicle: ' + data.error;
                addVehicleMessage.className = 'form-message error';
            }
        })
        .catch(error => {
            addVehicleMessage.textContent = 'Network error: ' + error.message;
            addVehicleMessage.className = 'form-message error';
        });
        */

        // For now, just a client-side success message
        addVehicleMessage.textContent = 'Vehicle data submitted (API integration needed).';
        addVehicleMessage.className = 'form-message info';
        addVehicleForm.reset();
    });

    // --- Manage Search Data Functionality ---
    function addItemToSearchList(listElement, newItemText) {
        if (newItemText.trim() !== "") {
            const listItem = document.createElement('li');
            listItem.textContent = newItemText;
            // In a real application, you might want to add a delete button
            listElement.appendChild(listItem);
            return true;
        }
        return false;
    }

    // --- Manage Makes ---
    function loadMakes() {
        // In a real application, fetch existing makes from your API
        const existingMakes = ["Toyota", "BMW", "Mitsubishi"]; // Example data
        existingMakes.forEach(make => addItemToSearchList(makesList, make));
        existingMakes.forEach(make => {
            const option = document.createElement('option');
            option.value = make.toLowerCase();
            option.textContent = make;
            selectMakeForModel.appendChild(option);
        });
    }
    loadMakes();

    addMakeBtn.addEventListener('click', () => {
        const newMakeText = newMakeInput.value.trim();
        if (addItemToSearchList(makesList, newMakeText)) {
            // In a real application, send this new make to your API
            const option = document.createElement('option');
            option.value = newMakeText.toLowerCase();
            option.textContent = newMakeText;
            selectMakeForModel.appendChild(option);
            newMakeInput.value = "";
        }
    });

    // --- Manage Models ---
    function loadModels() {
        // In a real application, fetch existing models from your API based on makes
        const existingModels = {
            toyota: ["Corolla", "RAV4"],
            bmw: ["X5", "3 Series"],
            mitsubishi: ["Outlander", "Pajero"]
        }; // Example data
        const selectedMake = selectMakeForModel.value;
        modelsList.innerHTML = ""; // Clear previous models
        if (existingModels[selectedMake]) {
            existingModels[selectedMake].forEach(model => addItemToSearchList(modelsList, model));
        }
    }
    selectMakeForModel.addEventListener('change', loadModels);
    loadModels(); // Initial load

    addModelBtn.addEventListener('click', () => {
        const selectedMake = selectMakeForModel.value;
        const newModelText = newModelInput.value.trim();
        if (selectedMake && addItemToSearchList(modelsList, newModelText)) {
            // In a real application, send this new model (and its make) to your API
            newModelInput.value = "";
        } else if (!selectedMake) {
            alert("Please select a make before adding a model.");
        }
    });

    // --- Manage Years ---
    function loadYears() {
        // In a real application, fetch existing years from your API
        const existingYears = ["2020", "2021", "2022", "2023", "2024", "2025"]; // Example data
        existingYears.forEach(year => addItemToSearchList(yearsList, year));
    }
    loadYears();

    addYearBtn.addEventListener('click', () => {
        const newYearText = newYearInput.value.trim();
        if (addItemToSearchList(yearsList, newYearText)) {
            // In a real application, send this new year to your API
            newYearInput.value = "";
        }
    });

    // --- Manage Conditions ---
    function loadConditions() {
        // In a real application, fetch existing conditions from your API
        const existingConditions = ["New", "Used"]; // Example data
        existingConditions.forEach(condition => addItemToSearchList(conditionsList, condition));
    }
    loadConditions();

    addConditionBtn.addEventListener('click', () => {
        const newConditionText = newConditionInput.value.trim();
        if (addItemToSearchList(conditionsList, newConditionText)) {
            // In a real application, send this new condition to your API
            newConditionInput.value = "";
        }
    });

    // --- Manage Transmissions ---
    function loadTransmissions() {
        // In a real application, fetch existing transmissions from your API
        const existingTransmissions = ["Automatic", "Manual"]; // Example data
        existingTransmissions.forEach(transmission => addItemToSearchList(transmissionsList, transmission));
    }
    loadTransmissions();

    addTransmissionBtn.addEventListener('click', () => {
        const newTransmissionText = newTransmissionInput.value.trim();
        if (addItemToSearchList(transmissionsList, newTransmissionText)) {
            // In a real application, send this new transmission to your API
            newTransmissionInput.value = "";
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // ... (previous JavaScript code) ...

    const sidebarToggleClose = document.getElementById('sidebarToggleClose');

    // --- Sidebar Toggle (Close Button) ---
    sidebarToggleClose.addEventListener('click', () => {
        sidebar.classList.add('collapsed');
        body.classList.add('sidebar-collapsed');
    });

    // --- (Rest of your previous JavaScript code) ---
});

document.addEventListener('DOMContentLoaded', function() {
    // ... (your existing JavaScript code) ...

    const adminProfile = document.querySelector('.admin-profile');

    // --- Toggle Admin Profile Dropdown ---
    adminProfile.addEventListener('click', () => {
        adminProfile.classList.toggle('active');
    });

    // --- Close Dropdown on Outside Click ---
    document.addEventListener('click', (event) => {
        if (!adminProfile.contains(event.target)) {
            adminProfile.classList.remove('active');
        }
    });

    // ... (your existing JavaScript code) ...
});


document.addEventListener('DOMContentLoaded', function() {
    // ... (your existing JavaScript code) ...

    const logoutBtn = document.getElementById('logoutBtn');

    // --- Logout Functionality ---
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // In a real application, you would:
        // 1. Clear the authentication token from local storage or cookies.
        // 2. Optionally, make an API call to the server to invalidate the session.
        console.log('Logout clicked');
        localStorage.removeItem('adminToken'); // Example: Remove token
        window.location.href = 'admin_login.html'; // Redirect to login page
    });

    // ... (your existing JavaScript code) ...
});

document.addEventListener('DOMContentLoaded', function() {
    // ... (your existing JavaScript code) ...

    const totalVehiclesElement = document.getElementById('totalVehicles');
    const newListingsElement = document.getElementById('newListings');
    const pendingInquiriesElement = document.getElementById('pendingInquiries');

    // --- Function to fetch dashboard data from API ---
    function fetchDashboardData() {
        // Replace '/api/admin/dashboard' with your actual API endpoint
        fetch('/api/admin/dashboard')
            .then(response => response.json())
            .then(data => {
                if (data.totalVehicles !== undefined) {
                    totalVehiclesElement.textContent = data.totalVehicles;
                }
                if (data.newListings !== undefined) {
                    newListingsElement.textContent = data.newListings;
                }
                if (data.pendingInquiries !== undefined) {
                    pendingInquiriesElement.textContent = data.pendingInquiries;
                }
            })
            .catch(error => {
                console.error('Error fetching dashboard data:', error);
                // Optionally display an error message to the user
            });
    }

    // --- Call the function to fetch data when the dashboard loads ---
    fetchDashboardData();

    // ... (your existing JavaScript code) ...
});

document.addEventListener('DOMContentLoaded', function() {
    // ... (rest of your existing admin.js code, including sidebar navigation) ...

    // --- Inventory Summary Functionality ---
    const inventorySummaryGrid = document.getElementById('inventory-summary-grid');
    let allVehicles = [];
    let inventoryInitialized = false;

    function fetchInventorySummary() {
        inventorySummaryGrid.innerHTML = '<div class="loading-message"><i class=\'bx bx-loader-alt bx-spin\'></i> Loading Inventory Summary...</div>';
        // Replace '/api/admin/inventory/summary' with your actual API endpoint for summarized data
        fetch('/api/admin/inventory/summary')
            .then(response => response.json())
            .then(data => {
                allVehicles = data;
                renderInventorySummary(data);
            })
            .catch(error => {
                console.error('Error fetching inventory summary:', error);
                inventorySummaryGrid.innerHTML = '<div class="error-message">Error loading inventory summary.</div>';
            });
    }

    function renderInventorySummary(summaryData) {
        inventorySummaryGrid.innerHTML = '';
        if (summaryData && summaryData.length > 0) {
            summaryData.forEach(item => {
                const summaryItem = document.createElement('div');
                summaryItem.classList.add('inventory-summary-item');
                summaryItem.innerHTML = `
                    <h3><i class='bx bxs-car'></i> ${item.make}</h3>
                    <div class="summary-stat">
                        <span>Remaining:</span>
                        <span class="stat-value">${item.remaining}</span>
                    </div>
                    <div class="summary-stat">
                        <span>Sold:</span>
                        <span class="stat-value">${item.sold}</span>
                    </div>
                    ${item.models ? renderModelBreakdown(item.models) : ''}
                `;
                inventorySummaryGrid.appendChild(summaryItem);
            });
        } else {
            inventorySummaryGrid.innerHTML = '<div class="no-results">No inventory data available.</div>';
        }
    }

    function renderModelBreakdown(models) {
        let modelHTML = '<h4>Models:</h4>';
        for (const model in models) {
            modelHTML += `
                <div class="summary-stat model-stat">
                    <span>${model}:</span>
                    <div>
                        <span>Remaining: <span class="stat-value">${models[model].remaining}</span></span>
                        <span>Sold: <span class="stat-value">${models[model].sold}</span></span>
                    </div>
                </div>
            `;
        }
        return modelHTML;
    }

    function initializeInventory() {
        if (!inventoryInitialized) {
            fetchInventorySummary();
            inventoryInitialized = true;
        }
    }

    // Update the showSection function to call initializeInventory
    function showSection(sectionId) {
        dashboardSections.forEach(section => {
            section.classList.remove('active');
        });
        const sectionToShow = document.getElementById(sectionId);
        if (sectionToShow) {
            sectionToShow.classList.add('active');
        }

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });

        if (sectionId === 'view-inventory') {
            initializeInventory();
        }
    }

    // ... (rest of your admin.js code) ...
});




// --- Manage Vehicles Functionality ---
const manageVehiclesSection = document.getElementById('manage-vehicles');
const vehiclesTableBody = document.getElementById('vehicles-table-body');
const searchVehiclesInput = document.getElementById('search-vehicles');
const searchVehiclesBtn = document.getElementById('search-vehicles-btn');
const vehiclesPagination = document.getElementById('vehicles-pagination');
const editVehicleModal = document.getElementById('editVehicleModal');
const closeEditModalBtn = editVehicleModal ? editVehicleModal.querySelector('.close-button') : null;
const editVehicleForm = document.getElementById('editVehicleForm');

let allVehiclesData = [];
const vehiclesPerPage = 10;
let currentVehiclesPage = 1;
let currentSearchTerm = '';

function fetchVehicles(page = 1, searchTerm = '') {
    vehiclesTableBody.innerHTML = `<tr><td colspan="7" class="loading-message"><i class='bx bx-loader-alt bx-spin'></i> Loading Vehicles...</td></tr>`;
    const apiUrl = `/api/admin/vehicles?page=${page}&limit=${vehiclesPerPage}&search=${searchTerm}`; // Adjust your API endpoint
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            allVehiclesData = data.vehicles; // Assuming your API returns { vehicles: [], totalCount: number }
            renderVehiclesTable(data.vehicles);
            renderVehiclesPagination(data.totalCount);
            currentVehiclesPage = page;
            currentSearchTerm = searchTerm;
        })
        .catch(error => {
            console.error('Error fetching vehicles:', error);
            vehiclesTableBody.innerHTML = `<tr><td colspan="7" class="error-message">Error loading vehicles.</td></tr>`;
        });
}

function renderVehiclesTable(vehicles) {
    vehiclesTableBody.innerHTML = '';
    if (vehicles.length === 0) {
        vehiclesTableBody.innerHTML = `<tr><td colspan="7" class="no-results">No vehicles found.</td></tr>`;
        return;
    }
    vehicles.forEach(vehicle => {
        const row = vehiclesTableBody.insertRow();
        row.innerHTML = `
            <td><img src="${vehicle.imageUrl || '../img/default-car.png'}" alt="${vehicle.make} ${vehicle.model}"></td>
            <td>${vehicle.make}</td>
            <td>${vehicle.model}</td>
            <td>${vehicle.year}</td>
            <td>KSh ${vehicle.price.toLocaleString()}</td>
            <td>${vehicle.status || 'N/A'}</td>
            <td>
                <button class="edit-btn" data-vehicle-id="${vehicle.id}"><i class='bx bxs-edit'></i> Edit</button>
                <button class="delete-btn" data-vehicle-id="${vehicle.id}"><i class='bx bxs-trash'></i> Delete</button>
            </td>
        `;
    });

    // Add event listeners for edit and delete buttons after rendering
    addVehicleActionListeners();
}

function renderVehiclesPagination(totalCount) {
    const totalPages = Math.ceil(totalCount / vehiclesPerPage);
    vehiclesPagination.innerHTML = '';
    if (totalPages > 1) {
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            if (i === currentVehiclesPage) {
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click', () => {
                fetchVehicles(i, currentSearchTerm);
            });
            vehiclesPagination.appendChild(pageButton);
        }
    }
}

function handleSearchVehicles() {
    const searchTerm = searchVehiclesInput.value.trim();
    fetchVehicles(1, searchTerm); // Reset to page 1 on new search
}

function addVehicleActionListeners() {
    const editButtons = vehiclesTableBody.querySelectorAll('.edit-btn');
    const deleteButtons = vehiclesTableBody.querySelectorAll('.delete-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const vehicleId = this.getAttribute('data-vehicle-id');
            openEditVehicleModal(vehicleId);
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const vehicleId = this.getAttribute('data-vehicle-id');
            if (confirm('Are you sure you want to delete this vehicle?')) {
                deleteVehicle(vehicleId);
            }
        });
    });
}

function openEditVehicleModal(vehicleId) {
    // Fetch vehicle details by ID and populate the modal form
    fetch(`/api/admin/vehicles/${vehicleId}`) // Adjust your API endpoint
        .then(response => response.json())
        .then(vehicle => {
            populateEditModal(vehicle);
            editVehicleModal.style.display = "block";
        })
        .catch(error => {
            console.error('Error fetching vehicle details for edit:', error);
            alert('Failed to load vehicle details for editing.');
        });
}

function populateEditModal(vehicle) {
    editVehicleForm.innerHTML = ''; // Clear previous form fields
    for (const key in vehicle) {
        if (vehicle.hasOwnProperty(key) && key !== 'id' && key !== 'imageUrl') {
            const label = document.createElement('label');
            label.textContent = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim() + ':'; // Format label
            const input = document.createElement('input');
            input.type = 'text'; // Adjust input type based on data type
            input.name = key;
            input.value = vehicle[key];
            editVehicleForm.appendChild(label);
            editVehicleForm.appendChild(input);
        }
    }
    // Add image preview if needed
    const imageLabel = document.createElement('label');
    imageLabel.textContent = 'Image:';
    const imagePreview = document.createElement('img');
    imagePreview.src = vehicle.imageUrl || '../img/default-car.png';
    imagePreview.style.maxWidth = '100px';
    editVehicleForm.appendChild(imageLabel);
    editVehicleForm.appendChild(imagePreview);

    // Add hidden input for vehicle ID
    const idInput = document.createElement('input');
    idInput.type = 'hidden';
    idInput.name = 'id';
    idInput.value = vehicle.id;
    editVehicleForm.appendChild(idInput);

    // Re-add the submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.classList.add('btn');
    submitButton.textContent = 'Save Changes';
    editVehicleForm.appendChild(submitButton);

    // Add event listener for form submission
    editVehicleForm.addEventListener('submit', handleEditFormSubmit);
}

function handleEditFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(editVehicleForm);
    const vehicleId = formData.get('id');

    fetch(`/api/admin/vehicles/${vehicleId}`, { // Adjust your API endpoint
        method: 'PUT',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Vehicle details updated successfully!');
            closeEditVehicleModal();
            fetchVehicles(currentVehiclesPage, currentSearchTerm); // Refresh the table
        } else {
            alert('Failed to update vehicle details.');
            console.error('Update error:', data);
        }
    })
    .catch(error => {
        console.error('Error updating vehicle:', error);
        alert('Failed to update vehicle details.');
    });
}

function deleteVehicle(vehicleId) {
    fetch(`/api/admin/vehicles/${vehicleId}`, { // Adjust your API endpoint
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Vehicle deleted successfully!');
            fetchVehicles(currentVehiclesPage, currentSearchTerm); // Refresh the table
        } else {
            alert('Failed to delete vehicle.');
            console.error('Delete error:', data);
        }
    })
    .catch(error => {
        console.error('Error deleting vehicle:', error);
        alert('Failed to delete vehicle.');
    });
}

function closeEditVehicleModal() {
    editVehicleModal.style.display = "none";
    editVehicleForm.removeEventListener('submit', handleEditFormSubmit); // Remove old listener
}

// Event listeners
if (manageVehiclesSection) {
    searchVehiclesBtn.addEventListener('click', handleSearchVehicles);
    searchVehiclesInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleSearchVehicles();
        }
    });
}

if (closeEditModalBtn) {
    closeEditModalBtn.addEventListener('click', closeEditVehicleModal);
}

window.addEventListener('click', (event) => {
    if (event.target === editVehicleModal) {
        closeEditVehicleModal();
    }
});

function initializeManageVehicles() {
    fetchVehicles();
}

function showSection(sectionId) {
    dashboardSections.forEach(section => {
        section.classList.remove('active');
    });
    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.classList.add('active');
    }

    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });

    if (sectionId === 'view-inventory' && !window.inventoryInitialized) {
        initializeInventory();
        window.inventoryInitialized = true;
    } else if (sectionId === 'manage-vehicles' && !window.manageVehiclesInitialized) {
        initializeManageVehicles();
        window.manageVehiclesInitialized = true;
    }
}

let manageVehiclesInitialized = false;

