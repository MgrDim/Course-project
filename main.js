
(function() {
    "use strict";
  
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  
    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }
  
    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
  
    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)
  
    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      let header = select('#header')
      let offset = header.offsetHeight
  
      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      })
    }
  
    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    let selectTopbar = select('#topbar')
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add('header-scrolled')
          if (selectTopbar) {
            selectTopbar.classList.add('topbar-scrolled')
          }
        } else {
          selectHeader.classList.remove('header-scrolled')
          if (selectTopbar) {
            selectTopbar.classList.remove('topbar-scrolled')
          }
        }
      }
      window.addEventListener('load', headerScrolled)
      onscroll(document, headerScrolled)
    }
  
    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }
  
    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
      select('#navbar').classList.toggle('navbar-mobile')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })
  
    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
      }
    }, true)
  
    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault()
  
        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
      }
    }, true)
  
    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    });
  
    /**
     * Preloader
     */
    let preloader = select('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove()
      });
    }
  
    /**
     * Menu isotope and filter
     */
  
    const menuFilters = document.getElementById('menu-flters');
    const menuItems = document.querySelectorAll('.menu-item');
  
    menuFilters.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        const filter = e.target.dataset.filter;
        menuItems.forEach((item) => {
          if (filter === '*') {
            item.style.display = 'block';
          } else if (item.classList.contains(filter.replace('.', ''))) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
        menuFilters.querySelector('.filter-active').classList.remove('filter-active');
        e.target.classList.add('filter-active');
      }
    });
  

    /**
     * Events slider
     */
    new Swiper('.events-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  
    /**
     * Testimonials slider
     */
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
  
        1200: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    });
  
    /**

  
    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      })
    });
  
  })()
document.addEventListener('DOMContentLoaded', function () {
  // Get all filter buttons and menu items
  const filterButtons = document.querySelectorAll('#menu-flters li');
  const menuItems = document.querySelectorAll('.menu-item');

  // Function to filter menu items
  const filterMenu = (filter) => {
    menuItems.forEach((item) => {
      if (filter === '*' || item.classList.contains(filter)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  };

  // Add click event to each filter button
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      // Remove 'filter-active' class from all buttons
      filterButtons.forEach((button) => button.classList.remove('filter-active'));
      // Add 'filter-active' class to the clicked button
      this.classList.add('filter-active');
      // Get the filter value from the clicked button
      const filterValue = this.getAttribute('data-filter').replace('.', '');
      // Filter menu items
      filterMenu(filterValue);
    });
  });

  // Initially display all menu items
  filterMenu('*');
});


const form = document.querySelector('form');
const inputs = form.querySelectorAll('input, textarea');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let isValid = true;
  let errorMessage = '';

  inputs.forEach((input) => {
    if (input.type === 'text' || input.type === 'email' || input.type === 'number') {
      if (input.value.trim() === '') {
        isValid = false;
        errorMessage += `Please fill in the ${input.placeholder} field.\n`;
      } else if (input.dataset.rule === 'minlen:4' && input.value.length < 4) {
        isValid = false;
        errorMessage += `Please enter at least 4 characters in the ${input.placeholder} field.\n`;
      } else if (input.type === 'email' && !validateEmail(input.value)) {
        isValid = false;
        errorMessage += `Please enter a valid email address.\n`;
      } else if (input.name === 'phone' && !validatePhone(input.value)) {
        isValid = false;
        errorMessage += `Please enter a valid phone number.\n`;
      } else if (input.name === 'date' && !validateDate(input.value)) {
        isValid = false;
        errorMessage += `Please enter a valid date.\n`;
      } else if (input.name === 'time' && !validateTime(input.value)) {
        isValid = false;
        errorMessage += `Please enter a valid time.\n`;
      } else if (input.name === 'people' && !validatePeople(input.value)) {
        isValid = false;
        errorMessage += `Please enter a valid number of guests.\n`;
      } else if (input.name === 'people' && parseInt(input.value) > 100) {
        isValid = false;
        errorMessage += `The number of guests cannot be more than 100.\n`;
      }
    }
  });

  if (!isValid) {
    alert(errorMessage);
    return;
  }

  // If the form is valid, submit it
  form.submit();
});

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
  return phoneRegex.test(phone);
}

function validateDate(date) {
  const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  return dateRegex.test(date);
}

function validateTime(time) {
  const timeRegex = /^([01][0-9]|2[0-3]):([0-5][0-9])$/;
  return timeRegex.test(time);
}

function validatePeople(people) {
  const peopleRegex = /^\d+$/;
  return peopleRegex.test(people);
}