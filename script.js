document.addEventListener('DOMContentLoaded', function() {
    // Arrow functionality for scrolling
    const leftArrows = document.querySelectorAll('.arrow.left');
    const rightArrows = document.querySelectorAll('.arrow.right');
    const scrollContainers = document.querySelectorAll('.horizontal-scroll .scroll-container');

    leftArrows.forEach((leftArrow, index) => {
        leftArrow.addEventListener('click', function() {
            scrollContainers[index].scrollBy({
                top: 0,
                left: -900,
                behavior: 'smooth'
            });
        });
    });

    rightArrows.forEach((rightArrow, index) => {
        rightArrow.addEventListener('click', function() {
            scrollContainers[index].scrollBy({
                top: 0,
                left: 900,
                behavior: 'smooth'
            });
        });
    });

    // Items array for search and display
    const items = [
        { type: 'hoodie', color: 'black' },
        { type: 'hoodie', color: 'blue' },
        { type: 'hoodie', color: 'red' },
        { type: 'hoodie', color: 'orange' },
        { type: 'hoodie', color: 'yellow' },
        { type: 'hoodie', color: 'green' },
        { type: 'hoodie', color: 'purple' },
        { type: 'hoodie', color: 'pink' },
        { type: 'hoodie', color: 'white' },
        { type: 'hoodie', color: 'gray' },
        { type: 'hoodie', color: 'teal' },
        { type: 'hoodie', color: 'navy' },
        { type: 'shirt', color: 'black' },
        { type: 'shirt', color: 'blue' },
        { type: 'shirt', color: 'red' },
        { type: 'shirt', color: 'orange' },
        { type: 'shirt', color: 'yellow' },
        { type: 'shirt', color: 'green' },
        { type: 'shirt', color: 'purple' },
        { type: 'shirt', color: 'pink' },
        { type: 'shirt', color: 'white' },
        { type: 'shirt', color: 'gray' },
        { type: 'shirt', color: 'teal' },
        { type: 'shirt', color: 'navy' },
        { type: 'cap', color: 'black' },
        { type: 'cap', color: 'blue' },
        { type: 'cap', color: 'red' },
        { type: 'cap', color: 'orange' },
        { type: 'cap', color: 'yellow' },
        { type: 'cap', color: 'green' },
        { type: 'cap', color: 'purple' },
        { type: 'cap', color: 'pink' },
        { type: 'cap', color: 'white' },
        { type: 'cap', color: 'gray' },
        { type: 'cap', color: 'teal' },
        { type: 'cap', color: 'navy' },
    ];

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const dropdown = document.getElementById('dropdown');

    searchInput.addEventListener('input', filterSearch);

    function filterSearch() {
        const query = searchInput.value.toLowerCase();
        dropdown.innerHTML = '';
        if (query) {
            const filteredItems = items.filter(item => 
                item.type.includes(query) || item.color.includes(query) ||
                `${item.color} ${item.type}`.includes(query) || `${item.type} ${item.color}`.includes(query)
            );
            if (filteredItems.length) {
                dropdown.style.display = 'block';
                filteredItems.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'dropdown-item';
                    div.innerText = `${item.type} - ${item.color}`;
                    div.onclick = () => {
                        window.location.href = `display.html?type=${item.type}&color=${item.color}`;
                    };
                    dropdown.appendChild(div);
                });
            } else {
                dropdown.style.display = 'block';
                const div = document.createElement('div');
                div.className = 'dropdown-item no-entries';
                div.innerText = 'No entries were found.';
                dropdown.appendChild(div);
            }
        } else {
            dropdown.style.display = 'none';
        }
    }

    window.handleSearchSubmit = function() {
        const query = searchInput.value.toLowerCase();
        if (!query) {
            alert('Please enter a search query.');
            return false;
        }

        const valid = items.some(item => 
            `${item.color} ${item.type}` === query || `${item.type} ${item.color}` === query
        );

        if (!valid) {
            alert('No entries were found.');
            return false;
        }

        return true;
    };

    // Function to update the image and details
    function updateImage() {
        const itemType = document.getElementById('itemType').value;
        const itemColor = document.getElementById('itemColor').value;
        const displayImage = document.getElementById('displayImage');
        const itemDetails = document.getElementById('itemDetails');
        const prices = {
            hoodie: "$40.00",
            shirt: "$30.00",
            cap: "$20.00"
        };

        displayImage.src = `photos/${itemType}_${itemColor}.png`;
        itemDetails.innerHTML = `UNFAZED ${itemType.charAt(0).toUpperCase() + itemType.slice(1)} - ${itemColor.charAt(0).toUpperCase() + itemColor.slice(1)}<br>${prices[itemType]}`;
    }

    // Adding event listeners to dropdowns
    document.getElementById('itemType').addEventListener('change', updateImage);
    document.getElementById('itemColor').addEventListener('change', updateImage);

    document.getElementById('itemColor').addEventListener('mouseover', function(event) {
        if (event.target.tagName === 'OPTION') {
            const itemType = document.getElementById('itemType').value;
            const itemColor = event.target.value;
            const displayImage = document.getElementById('displayImage');
            const itemDetails = document.getElementById('itemDetails');
            const prices = {
                hoodie: "$40.00",
                shirt: "$30.00",
                cap: "$20.00"
            };

            displayImage.src = `photos/${itemType}_${itemColor}.png`;
            itemDetails.innerHTML = `UNFAZED ${itemType.charAt(0).toUpperCase() + itemType.slice(1)} - ${itemColor.charAt(0).toUpperCase() + itemColor.slice(1)}<br>${prices[itemType]}`;
        }
    });

    document.getElementById('itemColor').addEventListener('mouseout', updateImage);

    // Function to get URL parameters
    function getUrlParams() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const regex = /([^&=]+)=([^&]*)/g;
        let match;
        while (match = regex.exec(queryString)) {
            params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
        }
        return params;
    }

    // Update display based on search query
    const params = getUrlParams();
    if (params['type'] && params['color']) {
        document.getElementById('itemType').value = params['type'];
        document.getElementById('itemColor').value = params['color'];
        updateImage();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    var modal = document.getElementById("subscribeModal");
    var btns = document.querySelectorAll(".subscribe-button, .subscribe-now"); // Include the subscribe-now button
    var span = document.getElementsByClassName("close")[0];
    var emailInput = document.getElementById("email");

    // When the user clicks the button, open the modal and clear the input field
    btns.forEach(btn => {
        btn.onclick = function() {
            emailInput.value = ''; // Clear the input field
            modal.style.display = "block";
        }
    });

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Handle form submission (you can add your own submission logic here)
    document.getElementById("subscribeForm").onsubmit = function(event) {
        event.preventDefault();
        alert("Thank you for subscribing!");
        modal.style.display = "none";
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Get the overlay element
    var overlay = document.getElementById('page-overlay');

    // Fade out the overlay after a short delay
    setTimeout(function() {
        overlay.classList.add('hidden');
    }, 500); // Adjust the delay as needed
});
