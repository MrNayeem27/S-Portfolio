document.addEventListener('DOMContentLoaded', () => {
    /* =============================================== */
    /*              SIDEBAR TOGGLE                     */
    /* =============================================== */
    const navMenu = document.getElementById('sidebar');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-sidebar');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-sidebar');
        });
    }

    /* =============================================== */
    /*   DYNAMIC PORTFOLIO & FILTERING SCRIPT          */
    /* =============================================== */

    // 1. YOUR PORTFOLIO DATA
    // MODIFIED: Standardized category names to match the data-filters in the HTML.
    const portfolioData = [
        { imgSrc: 'assets/works/Safee Portfolio _-images-1.jpg', title: '', category: 'brochures' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-2.jpg', title: '', category: 'brochures' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-3.jpg', title: '', category: 'brochures' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-4.jpg', title: '', category: 'brochures' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-5.jpg', title: '', category: 'brochures' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-6.jpg', title: '', category: 'brochures' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-7.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-8.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-9.jpg', title: '', category: 'menu-cards' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-10.jpg', title: '', category: 'menu-cards' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-11.jpg', title: '', category: 'menu-cards' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-12.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-13.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-14.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-15.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-16.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-17.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-18.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-19.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-20.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-21.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-22.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-23.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-24.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-25.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-26.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-27.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-28.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-29.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-30.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-31.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-32.jpg', title: '', category: 'social-media' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-33.jpg', title: '', category: 'carton-boxes' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-34.jpg', title: '', category: 'carton-boxes' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-35.jpg', title: '', category: 'carton-boxes' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-36.jpg', title: '', category: 'carton-boxes' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-37.jpg', title: '', category: 'carton-boxes' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-38.jpg', title: '', category: 'carton-boxes' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-39.jpg', title: '', category: 'carton-boxes' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-40.jpg', title: '', category: 'carton-boxes' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-41.jpg', title: '', category: 'carton-boxes' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-42.jpg', title: '', category: 'carton-boxes' },
        { imgSrc: 'assets/works/Safee Portfolio _-images-43.jpg', title: '', category: 'carton-boxes' },
    ];

    const workContainer = document.querySelector('.work-container');

    function generatePortfolioItems(items) {
        workContainer.innerHTML = ''; 
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'work-card';
            card.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.title}" class="work-img" loading="lazy">
                <h3 class="work-title work-button">${item.title}<i class="uil uil-arrow-right work-button-icon"></i></h3>
            `;
            workContainer.appendChild(card);
        });
        addPopupListeners();
    }

    const filters = document.querySelectorAll('.work-filter');
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            filters.forEach(f => f.classList.remove('active-work'));
            this.classList.add('active-work');
            const filterValue = this.getAttribute('data-filter');
            
            if (filterValue === 'all') {
                generatePortfolioItems(portfolioData);
            } else {
                const filteredData = portfolioData.filter(item => item.category === filterValue);
                generatePortfolioItems(filteredData);
            }
        });
    });

    // 4. INITIAL LOAD
    // MODIFIED: Set the initial category to 'brochures' and filter the data to display it on page load.
    const initialCategory = 'carton-boxes';
    const initialItems = portfolioData.filter(item => item.category === initialCategory);
    generatePortfolioItems(initialItems);


    /* =============================================== */
    /*           PORTFOLIO POPUP SCRIPT                */
    /* =============================================== */
    const portfolioPopup = document.querySelector('.portfolio-popup');
    const portfolioPopupClose = document.querySelector('.portfolio-popup-close');
    const portfolioPopupImg = document.querySelector('.portfolio-popup-img');

    function openPopup() {
        portfolioPopup.classList.add('open');
    }

    function closePopup() {
        portfolioPopup.classList.remove('open');
    }

    function addPopupListeners() {
        document.querySelectorAll('.work-card').forEach(card => {
            const showImagePopup = () => {
                const imgSrc = card.querySelector('.work-img').getAttribute('src');
                portfolioPopupImg.src = imgSrc;
                openPopup();
            };
            card.querySelector('.work-img').addEventListener('click', showImagePopup);
            card.querySelector('.work-button').addEventListener('click', showImagePopup);
        });
    }

    if (portfolioPopupClose) {
        portfolioPopupClose.addEventListener('click', closePopup);
    }
    portfolioPopup.addEventListener('click', (e) => {
        if (e.target.classList.contains('portfolio-popup')) {
            closePopup();
        }
    });
});