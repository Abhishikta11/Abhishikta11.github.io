document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Selecting subtotal elements for Hotels and Cabs
    const hotelsSubtotalContainer = document.querySelector('.cart-items .item:nth-child(2)');
    const hotelsSubtotalElement = hotelsSubtotalContainer.querySelector('p');
    const cabsSubtotalElement = document.querySelector('.cart-items .item:nth-child(3) p');
    const totalPriceElement = document.querySelector('.total-price');
    const flightSubtotal = 2000; // Initial flight subtotal
    let totalPrice = flightSubtotal; // Initial total price
    let hotelSelected = false; // Flag to track if a hotel option is selected
    let hotelSubtotal = 0; // Hotel subtotal
    let cabsSubtotal = 0; // Cabs subtotal

    // Initialize total price display
    totalPriceElement.textContent = `Total: Rs. ${totalPrice.toFixed(2)}`;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-name');
            const itemPrice = parseFloat(button.getAttribute('data-price'));
            const isInHotelOptionItem = button.closest('.hotel-option-item') !== null;

            // Prevent selecting more than one hotel option
            if (isInHotelOptionItem && hotelSelected) {
                alert("You can only choose one hotel option.");
                return;
            }

            // Create cart item element
            const cartItem = document.createElement('p');
            cartItem.textContent = `${itemName} - Rs. ${itemPrice}`;

            // Create 'Remove' button
            const removeButton = document.createElement('span');
            removeButton.textContent = ' Remove';
            removeButton.classList.add('remove-item');
            removeButton.addEventListener('click', () => {
                cartItem.remove();
                
                // Adjust subtotal and flag based on where the item was added from
                if (isInHotelOptionItem) {
                    hotelSelected = false; // Reset the flag
                    hotelSubtotal = 0;
                    hotelsSubtotalElement.innerHTML = `
                        Original: Rs. 0.00<br>
                        Discount 20%: (- Rs. 0.00)<br>
                        Tax 5%: (+ Rs. 0.00)<br>
                        Total Subtotal: Rs. 0.00
                    `;
                } else {
                    cabsSubtotal -= itemPrice * 1.05; // Remove the tax-inclusive price
                    updateCabsSubtotal();
                }

                // Update total price
                totalPrice = flightSubtotal + hotelSubtotal + cabsSubtotal;
                totalPriceElement.textContent = `Total: Rs. ${totalPrice.toFixed(2)}`;

                // Show the 'Add to Cart' button again
                button.style.display = 'block';
            });
            cartItem.appendChild(removeButton);

            // Add cart item to the respective subtotal section
            if (isInHotelOptionItem) {
                hotelsSubtotalContainer.appendChild(cartItem); // Add under Hotels Subtotal
                hotelSubtotal = itemPrice * 0.8 * 1.05; // Apply discount and tax
                hotelsSubtotalElement.innerHTML = `
                    ${itemName} - Rs. ${itemPrice.toFixed(2)}<br>
                    Original: Rs. ${itemPrice.toFixed(2)}<br>
                    Discount 20%: (- Rs. ${(itemPrice * 0.2).toFixed(2)})<br>
                    Tax 5%: (+ Rs. ${(itemPrice * 0.8 * 0.05).toFixed(2)})<br>
                    Total Subtotal: Rs. ${hotelSubtotal.toFixed(2)}
                `;
                hotelSelected = true; // Set the flag to true
            } else {
                cabsSubtotalElement.parentElement.appendChild(cartItem); // Add under Cabs Subtotal
                cabsSubtotal += itemPrice * 1.05; // Apply tax
                updateCabsSubtotal();
            }

            // Update total price
            totalPrice = flightSubtotal + hotelSubtotal + cabsSubtotal;
            totalPriceElement.textContent = `Total: Rs. ${totalPrice.toFixed(2)}`;

            // Hide the 'Add to Cart' button after adding to cart
            button.style.display = 'none';
        });
            // Show the 'Add to Cart' button again and center it
               button.style.display = 'block';
              button.style.margin = '0 auto'; // Ensure it is centered
    });

    function updateCabsSubtotal() {
        if (cabsSubtotal === 0) {
            cabsSubtotalElement.innerHTML = `
                Rs. 0.00<br>
                Tax 5%: (+ Rs. 0.00)<br>
                Total Subtotal: Rs. 0.00
            `;
        } else {
            cabsSubtotalElement.innerHTML = `
                Rs. ${(cabsSubtotal / 1.05).toFixed(2)}<br>
                Tax 5%: (+ Rs. ${(cabsSubtotal * 0.05 / 1.05).toFixed(2)})<br>
                Total Subtotal: Rs. ${cabsSubtotal.toFixed(2)}
            `;
        }
    }
});

    // Popup functionality - automatically show popup on page load
    const popup = document.getElementById('myPopup');
    const popupCloseButton = document.querySelector('.popup .close');
    const bookNowButton = document.querySelector('.book');

    // Show popup on page load
    window.addEventListener('load', () => {
        popup.style.display = 'block';
    });

    // Close popup functionality
    popupCloseButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });
    // Function to close the popup
function closePopup() {
    const popup = document.getElementById('myPopup');
    popup.style.display = 'none';
}

// 20% discount popup
$(document).ready(function() {
    $('.popup-button').on('click', function() {
        // Existing code for calculating and updating subtotals...

        // Close the popup
        closePopup();
    });
});

    //20%discount pop up

    $(document).ready(function() {
        $('.popup-button').on('click', function() {
            // Get the current hotel subtotal
            const hotelSubtotalText = hotelsSubtotalElement.textContent.split(' ')[1];
            const hotelSubtotal = parseFloat(hotelSubtotalText);

            // Calculate 20% discount
            const discount = 0.2 * hotelSubtotal;
            const discountedSubtotal = hotelSubtotal - discount;

            // Calculate tax (5%)
            const tax = 0.05 * discountedSubtotal;
            const totalHotelSubtotal = discountedSubtotal + tax;

            // Prepare text to display original value, discount statement, tax, and modified amount
            const originalValueText = `Original: Rs. ${hotelSubtotal.toFixed(2)}`;
            const discountText = `Discount 20%: (- Rs. ${discount.toFixed(2)})`;
            const taxText = `Tax 5%: (+ Rs. ${tax.toFixed(2)})`;
            const modifiedAmountText = `Total Subtotal: Rs. ${totalHotelSubtotal.toFixed(2)}`;

            // Update the HTML elements accordingly
            hotelsSubtotalElement.innerHTML = `
                ${hotelsSubtotalElement.innerHTML.split('<br>')[0]}<br>
                ${originalValueText}<br>
                ${discountText}<br>
                ${taxText}<br>
                ${modifiedAmountText}
            `;

            // Optionally, update the total price if needed
            const flightsSubtotal = 2000; // Example flights subtotal
            const cabsSubtotalText = cabsSubtotalElement.textContent.split(' ')[1];
            const cabsSubtotal = parseFloat(cabsSubtotalText);

            // Calculate tax for cabs
            const cabsTax = 0.05 * cabsSubtotal;
            const totalCabsSubtotal = cabsSubtotal + cabsTax;

            // Prepare text to display selected option, tax, and modified amount for cabs
            const cabsOptionText = cabsSubtotalElement.innerHTML.split('<br>')[0];
            const cabsTaxText = `Tax 5%: (+ Rs. ${cabsTax.toFixed(2)})`;
            const cabsModifiedAmountText = `Total Subtotal: Rs. ${totalCabsSubtotal.toFixed(2)}`;

            // Update the HTML elements for cabs accordingly
            cabsSubtotalElement.innerHTML = `
                ${cabsOptionText}<br>
                ${cabsTaxText}<br>
                ${cabsModifiedAmountText}
            `;

            const total = flightsSubtotal + totalHotelSubtotal + totalCabsSubtotal;
            totalPriceElement.textContent = `Total: Rs. ${total.toFixed(2)}`;

            // Close the popup
            closePopup();
            
        });
       
        // Function to close the popup
        function closePopup() {
            const popup = document.getElementById('myPopup');
            popup.style.display = 'none';
        }
    });



//search box js
document.addEventListener('DOMContentLoaded', function () {
    const tripTypeSelect = document.getElementById('trip-type');
    const departDateInput = document.getElementById('depart');
    const returnDateInput = document.getElementById('return');
    const passengersInput = document.getElementById('passengers');
    const searchButton = document.getElementById('search-button');
    const flights = document.querySelectorAll('.flight');

    // Disable return date initially
    returnDateInput.disabled = true;

    // Event listener for trip type change
    tripTypeSelect.addEventListener('change', function () {
        if (tripTypeSelect.value === 'one-way') {
            returnDateInput.disabled = true;
            returnDateInput.value = '';
        } else {
            returnDateInput.disabled = false;
        }
    });

    // Event listener for search button click
    searchButton.addEventListener('click', function () {
        // Validate inputs based on trip type
        if (tripTypeSelect.value === 'round-trip' && (!departDateInput.value || !returnDateInput.value)) {
            alert('Please enter both departure and return dates for round trip.');
            return;
        }

        // Update flight prices based on number of passengers
        flights.forEach(flight => {
            const priceElement = flight.querySelector('.price');
            if (priceElement) {
                let price = parseInt(priceElement.innerText.replace('₹', '').replace(',', ''));
                const passengers = parseInt(passengersInput.value);
                if (passengers <= 0) {
                    passengers = 1;
                }
                price *= passengers;
                priceElement.innerText = `₹${price.toLocaleString()}`;
            }
        });

        // Redirect or handle further actions (e.g., booking process)
        // Example: window.location.href = 'booking_page.html';
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const selectAllCheckbox = document.getElementById("select-all");
    const rideCheckboxes = document.querySelectorAll(".ride-checkbox");
    const countDisplay = document.querySelector(".count");

    function updateCount() {
        const checkedCount = document.querySelectorAll(".ride-checkbox:checked").length;
        countDisplay.textContent = `${checkedCount}/4`;
    }

    selectAllCheckbox.addEventListener("change", function () {
        rideCheckboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
        updateCount();
    });

    rideCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateCount);
    });

    updateCount();
});