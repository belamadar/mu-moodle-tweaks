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
})();
