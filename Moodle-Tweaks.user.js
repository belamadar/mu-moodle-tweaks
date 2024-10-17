// ==UserScript==
// @name         Moodle Tweaks
// @namespace    https://github.com/belamadar/mu-moodle-tweaks
// @version      Alpha-v2
// @description  Enhancements for Moodle interface (e.g., hiding items, marking as done, etc.)
// @author       belamadar
// @match        https://moodle.maynoothuniversity.ie/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/belamadar/mu-moodle-tweaks/main/Moodle-Tweaks.user.js
// @downloadURL  https://raw.githubusercontent.com/belamadar/mu-moodle-tweaks/main/Moodle-Tweaks.user.js
// @supportURL   https://github.com/belamadar/mu-moodle-tweaks/issues
// ==/UserScript==


(function() {
    'use strict';

    // Select the navbar element
    const navbar = document.querySelector('.fixed-top.navbar');

    if (navbar) {
        // Reduce navbar height
        navbar.style.setProperty('height', '50px', 'important');
        navbar.style.setProperty('overflow', 'hidden', 'important');
        navbar.style.setProperty('padding', '5px 0', 'important');

        // Optionally, reduce font size of navbar items
        const links = navbar.querySelectorAll('a');
        links.forEach(link => {
            link.style.setProperty('font-size', '12px', 'important');
        });

        // Hide logo if unnecessary
        const logo = navbar.querySelector('.logo');
        if (logo) {
            logo.style.setProperty('height', '30px', 'important');
        }
    }

    // Remove padding/margin below the navbar
    const pageWrapper = document.querySelector('#page-wrapper');
    if (pageWrapper) {
        pageWrapper.style.setProperty('margin-top', '0', 'important');
        pageWrapper.style.setProperty('padding-top', '0', 'important');
    }

    // Remove padding/margin on body or container elements if they exist
    document.body.style.setProperty('padding-top', '0', 'important');
    document.body.style.setProperty('margin-top', '0', 'important');

    const mainContainer = document.querySelector('.container-fluid');
    if (mainContainer) {
        mainContainer.style.setProperty('margin-top', '0', 'important');
        mainContainer.style.setProperty('padding-top', '0', 'important');
    }

    // Adding space below the navbar to avoid content overlap
    const contentSpacer = document.createElement('div');
    contentSpacer.style.height = "60px"; // Adjust as needed for enough spacing
    document.body.insertBefore(contentSpacer, document.body.firstChild);

    // Optionally, try reducing padding/margin on all immediate children of #page-wrapper
    const children = document.querySelectorAll('#page-wrapper > *');
    children.forEach(child => {
        child.style.setProperty('margin-top', '0', 'important');
        child.style.setProperty('padding-top', '0', 'important');
    });
})();


(function() {
    'use strict';

    // Function to remove the user alerts element
    function removeUserAlerts() {
        const userAlerts = document.querySelector('.useralerts');
        if (userAlerts) {
            userAlerts.style.setProperty('display', 'none', 'important'); // Completely remove the useralerts element
        }
    }

    // Repeatedly apply modifications to ensure the element is gone
    const interval = setInterval(() => {
        removeUserAlerts();
    }, 500); // Apply changes every 500 milliseconds

    // Set a timeout to clear the interval after a reasonable time (e.g., 30 seconds)
    setTimeout(() => {
        clearInterval(interval);
    }, 30000); // Stop after 30 seconds
})();

(function() {
    'use strict';

    // Function to modify the course cards: remove images, color-code borders, clean up icons, and adjust widths
    function modifyCourseCards() {
        // Select all course overview cards with the class 'course-listitem'
        const courseCards = document.querySelectorAll('.course-listitem');

        courseCards.forEach(card => {
            // Remove the course image if present
            const courseImage = card.querySelector('.list-view-bgimage');
            if (courseImage) {
                courseImage.remove(); // Completely remove the image element
            }

            // Remove the summary icons if present
            const summaryIcons = card.querySelector('.col-md-4.span4.summary-icons');
            if (summaryIcons) {
                summaryIcons.remove(); // Completely remove the summary-icons element
            }

            // Adjust the left flex block to be wider
            const leftBlock = card.querySelector('.col-md-7');
            if (leftBlock) {
                leftBlock.style.setProperty('flex', '0 0 90%', 'important'); // Make the left block wider (70%)
                leftBlock.style.setProperty('max-width', '90%', 'important');
                leftBlock.style.setProperty('width', '90%', 'important'); // Expand the left block to 70% of the card width
                leftBlock.style.setProperty('padding-right', '10px', 'important'); // Adjust padding to look good with the new layout
            }

            // Adjust the right block to align properly
            const rightBlock = card.querySelector('.col-md-1');
            if (rightBlock) {
                rightBlock.style.setProperty('flex', '0 0 10%', 'important'); // Adjust the right block to take 30% of the space
                rightBlock.style.setProperty('max-width', '10%', 'important');
                rightBlock.style.setProperty('width', '10%', 'important');
                rightBlock.style.setProperty('margin-left', 'auto', 'important'); // Align the right block to the right
            }

            // Find the element with the category name inside each card
            const categoryElement = card.querySelector('.categoryname');

            if (categoryElement) {
                const categoryText = categoryElement.textContent.toLowerCase();

                // Determine the border color based on the category name
                let borderColor;
                if (categoryText.includes('mathematics')) {
                    borderColor = 'purple';
                } else if (categoryText.includes('education')) {
                    borderColor = 'orange';
                } else if (categoryText.includes('computer')) {
                    borderColor = 'lightblue';
                } else {
                    borderColor = 'red';
                }

                // Set the border color on the left side of the card
                card.style.setProperty('border-left', `10px solid ${borderColor}`, 'important');
            }
        });
    }

    // Repeatedly apply modifications to ensure the changes persist
    const interval = setInterval(() => {
        modifyCourseCards();
    }, 500); // Apply changes every 500 milliseconds

    // Set a timeout to clear the interval after a reasonable time (e.g., 30 seconds)
    setTimeout(() => {
        clearInterval(interval);
    }, 30000); // Stop after 30 seconds
(function() {
    'use strict';

    // Function to generate a unique ID based on item content
    function generateUniqueId(item) {
        const title = item.querySelector('.event-name a')?.textContent.trim();
        const dueDate = item.querySelector('small')?.textContent.trim();
        const courseName = item.querySelector('.event-name-container small')?.textContent.trim();

        // Combine title, due date, and course name into a unique identifier
        const uniqueId = `${title}-${dueDate}-${courseName}`;
        return uniqueId.replace(/\s+/g, '-').toLowerCase(); // Normalize and return
    }

    // Function to add a dropdown with "Mark as done" and move existing buttons
    function addDropdownActions() {
        // Select all timeline items
        const timelineItems = document.querySelectorAll('[data-region="event-list-item"]');

        timelineItems.forEach(item => {
            // Generate a unique item identifier
            const itemId = generateUniqueId(item);
            if (!itemId) {
                console.error('Failed to generate unique ID for item');
                return;
            }

            // Check if the dropdown already exists
            if (item.querySelector('.dropdown-action')) {
                return;
            }

            // Create the dropdown container
            const dropdownContainer = document.createElement('div');
            dropdownContainer.className = 'ml-auto dropdown dropdown-action';

            // Create the three-dot button
            const button = document.createElement('button');
            button.className = 'btn btn-link btn-icon icon-size-3';
            button.type = 'button';
            button.setAttribute('data-toggle', 'dropdown');
            button.innerHTML = '<i class="icon fa fa-ellipsis-v fa-fw m-0"></i>';

            // Create the dropdown menu
            const dropdownMenu = document.createElement('div');
            dropdownMenu.className = 'dropdown-menu dropdown-menu-right';

            // Move existing buttons (View, Add submission) to the dropdown
            const existingActions = item.querySelector('.timeline-action-button');
            if (existingActions) {
                const actionLinks = existingActions.querySelectorAll('a');
                actionLinks.forEach(link => {
                    const dropdownItem = document.createElement('a');
                    dropdownItem.className = 'dropdown-item';
                    dropdownItem.href = link.href;
                    dropdownItem.textContent = link.textContent;
                    dropdownMenu.appendChild(dropdownItem);
                });
                // Remove existing action buttons from the original location
                existingActions.remove();
            }

            // Create "Mark as done" dropdown item
            const markAsDoneItem = document.createElement('a');
            markAsDoneItem.className = 'dropdown-item';
            markAsDoneItem.href = '#';
            markAsDoneItem.textContent = 'Mark as done';

            // Add click event to "Mark as done"
            markAsDoneItem.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`Marking item ${itemId} as done`); // Log for debugging
                markAsDone(itemId, item); // Call function to mark the item as done
            });

            // Append "Mark as done" to the dropdown menu
            dropdownMenu.appendChild(markAsDoneItem);

            // Append the button and dropdown menu to the container
            dropdownContainer.appendChild(button);
            dropdownContainer.appendChild(dropdownMenu);

            // Append the dropdown to the timeline item
            item.querySelector('.d-flex.flex-wrap').appendChild(dropdownContainer);

            // Apply the "Mark as done" status from LocalStorage if exists
            applyMarkAsDoneState(itemId, item);
        });
    }

    // Function to mark an item as done
    function markAsDone(itemId, item) {
        // Add a visual indication that the item is done (e.g., greying out or strike-through)
        item.classList.add('done'); // Add visual indicator
        console.log(`Storing item ${itemId} as done in LocalStorage`); // Log for debugging
        localStorage.setItem(itemId, 'done'); // Store the state in LocalStorage
    }

    // Function to apply the "Mark as done" state on page load
    function applyMarkAsDoneState(itemId, item) {
        // Check if the item is already marked as done in LocalStorage
        if (localStorage.getItem(itemId) === 'done') {
            console.log(`Item ${itemId} is marked as done, applying class`); // Log for debugging
            item.classList.add('done'); // Apply visual indicator if marked as done
        }
    }

    // Function to observe timeline changes and add dropdown actions to new items
    function observeTimeline() {
        const timelineContainer = document.querySelector('[data-region="timeline"]');
        if (timelineContainer) {
            const observer = new MutationObserver(() => {
                addDropdownActions(); // Reapply dropdowns when new items are detected
            });
            observer.observe(timelineContainer, { childList: true, subtree: true });
        }
    }

    // Initial function call on page load
    window.addEventListener('load', () => {
        addDropdownActions();
        observeTimeline();
    });
})();
    
