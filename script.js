document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // SETTINGS
  // =========================

  const WHATSAPP_NUMBER = "79996118911";

  const isArabic = document.documentElement.lang === "ar";

  const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

const formatUSD = value => isArabic
  ? `${Number(value).toLocaleString("en-US")} DH`
  : currency.format(Number(value) || 0);

  const messages = {
    empty: isArabic ? "السلة ديالك مازال خاوية." : "Your cart is empty.",
    added: isArabic ? "تزاد المنتوج للسلة" : "Product added to cart",
    removed: isArabic ? "تحيد المنتوج من السلة" : "Product removed from cart",
    confirmClear: isArabic ? "واش متأكد بغيتي تفرغ السلة؟" : "Are you sure you want to clear the cart?",
    checkoutEmpty: isArabic ? "زيد شي منتوج للسلة قبل ما تكمل الطلب." : "Add a product before checkout.",
    orderTitle: isArabic ? "سلام، بغيت نطلب هاد المنتجات:" : "Hello, I would like to order these products:",
    total: isArabic ? "المجموع" : "Total",
    quantity: isArabic ? "العدد" : "Quantity"
  };


  // =========================
  // MOBILE MENU
  // =========================

  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

      navMenu.classList.toggle("open");

      const icon = menuToggle.querySelector("i");

      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
      }

    });

    navMenu.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        const icon = menuToggle.querySelector("i");

        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-xmark");
        }

      });

    });

  }


  // =========================
  // NAVBAR SCROLL EFFECT
  // =========================

  const navbar = document.querySelector(".navbar");

  function updateNavbar() {

    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    }

  }

  window.addEventListener("scroll", updateNavbar);

  updateNavbar();


  // =========================
  // ACTIVE NAV LINKS
  // =========================

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveLink() {

    let currentSection = "";

    sections.forEach(section => {

      const sectionTop = section.offsetTop - 150;

      if (window.scrollY >= sectionTop) {
        currentSection = section.id;
      }

    });

    navLinks.forEach(link => {

      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentSection}`
      );

    });

  }

  window.addEventListener("scroll", updateActiveLink);


  // =========================
  // SMOOTH SCROLL
  // =========================

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });


  // =========================
  // REVEAL ANIMATIONS
  // =========================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);

        }

      });

    }, {
      threshold: 0.12
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  // =========================
  // CURRENT YEAR
  // =========================

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // =========================
  // SHOPPING CART
  // =========================

  let cart = [];

  const cartPanel = document.querySelector(".cart-panel");
  const cartOverlay = document.querySelector(".cart-overlay");
  const cartOpenButtons = document.querySelectorAll(".cart-open");
  const cartCloseButton = document.querySelector(".cart-close");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartCountElements = document.querySelectorAll(".cart-count");
  const cartTotalElement = document.querySelector(".cart-total-value");
  const checkoutButton = document.querySelector(".checkout-btn");
  const clearCartButton = document.querySelector(".clear-cart-btn");


  // OPEN CART

  function openCart() {

    if (!cartPanel || !cartOverlay) return;

    cartPanel.classList.add("open");
    cartOverlay.classList.add("active");

    document.body.classList.add("cart-open");

    cartPanel.setAttribute("aria-hidden", "false");

  }


  // CLOSE CART

  function closeCart() {

    if (!cartPanel || !cartOverlay) return;

    cartPanel.classList.remove("open");
    cartOverlay.classList.remove("active");

    document.body.classList.remove("cart-open");

    cartPanel.setAttribute("aria-hidden", "true");

  }


  cartOpenButtons.forEach(button => {
    button.addEventListener("click", openCart);
  });


  if (cartCloseButton) {
    cartCloseButton.addEventListener("click", closeCart);
  }


  if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCart);
  }


  // UPDATE CART

  function updateCart() {

    if (!cartItemsContainer) return;

    const totalQuantity = cart.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);

    const totalPrice = cart.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);


    cartCountElements.forEach(element => {
      element.textContent = totalQuantity;
    });


    if (cartTotalElement) {
      cartTotalElement.textContent = formatUSD(totalPrice);
    }


    if (checkoutButton) {
      checkoutButton.disabled = cart.length === 0;
    }


    if (cart.length === 0) {

      cartItemsContainer.innerHTML = `
        <p class="empty-cart">${messages.empty}</p>
      `;

      return;

    }


    cartItemsContainer.innerHTML = cart.map(item => `

      <div class="cart-item" data-id="${item.id}">

        <div class="cart-item-info">

          <strong>${escapeHTML(item.name)}</strong>

          <span>
            ${escapeHTML(item.value)} × ${item.quantity}
          </span>

        </div>

        <strong class="cart-item-price">
          ${formatUSD(item.price * item.quantity)}
        </strong>

        <button
          class="remove-item"
          type="button"
          data-remove="${item.id}"
          aria-label="${isArabic ? "حذف المنتوج" : "Remove product"}">

          <i class="fa-solid fa-trash"></i>

        </button>

      </div>

    `).join("");

  }


  // =========================
  // HTML SECURITY
  // =========================

  function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, character => {

      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      };

      return entities[character];

    });

  }


  // =========================
  // ADD PRODUCT TO CART
  // =========================

  document.querySelectorAll(".add-to-cart-btn").forEach(button => {

    button.addEventListener("click", () => {

      const id = button.dataset.id;
      const name = button.dataset.product;
      const value = button.dataset.value;
      const price = Number(button.dataset.price);


      if (!id || !name || !value || !Number.isFinite(price) || price <= 0) {
        return;
      }


      const existingItem = cart.find(item => item.id === id);


      if (existingItem) {

        existingItem.quantity += 1;

      } else {

        cart.push({
          id,
          name,
          value,
          price,
          quantity: 1
        });

      }


      updateCart();


      const originalHTML = button.innerHTML;

      button.classList.add("added");

      button.innerHTML = `
        <i class="fa-solid fa-check"></i> ${messages.added}
      `;


      window.setTimeout(() => {

        button.classList.remove("added");

        button.innerHTML = originalHTML;

      }, 1000);

    });

  });


  // =========================
  // REMOVE PRODUCT
  // =========================

  if (cartItemsContainer) {

    cartItemsContainer.addEventListener("click", event => {

      const removeButton = event.target.closest("[data-remove]");

      if (!removeButton) return;

      const productId = removeButton.dataset.remove;

      cart = cart.filter(item => item.id !== productId);

      updateCart();

    });

  }


  // =========================
  // CLEAR CART
  // =========================

  if (clearCartButton) {

    clearCartButton.addEventListener("click", () => {

      if (cart.length === 0) return;

      if (window.confirm(messages.confirmClear)) {

        cart = [];

        updateCart();

      }

    });

  }


  // =========================
  // WHATSAPP CHECKOUT
  // =========================

  if (checkoutButton) {

    checkoutButton.addEventListener("click", () => {

      if (cart.length === 0) {

        alert(messages.checkoutEmpty);

        return;

      }


      const totalPrice = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);


      let orderMessage = `${messages.orderTitle}\n\n`;


      cart.forEach((item, index) => {

        orderMessage +=
          `${index + 1}. ${item.name} - ${item.value}\n` +
          `${messages.quantity}: ${item.quantity}\n` +
          `${formatUSD(item.price * item.quantity)}\n\n`;

      });


      orderMessage += `----------------------\n`;

      orderMessage += `${messages.total}: ${formatUSD(totalPrice)}`;


      const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderMessage)}`;


      window.open(whatsappURL, "_blank", "noopener,noreferrer");

    });

  }


  // INITIAL CART DISPLAY

  updateCart();



  // =========================
  // CUSTOMER REVIEWS
  // =========================

  const reviewForm = document.getElementById("reviewForm");
  const reviewList = document.getElementById("reviewList");

  const reviewStorageKey = "maai_xg_customer_reviews_v1";

  let customerReviews = [];


  // LOAD SAVED REVIEWS

  try {

    const savedReviews = JSON.parse(
      localStorage.getItem(reviewStorageKey) || "[]"
    );

    customerReviews = Array.isArray(savedReviews) ? savedReviews : [];

  } catch (error) {

    customerReviews = [];

  }


  // DISPLAY REVIEWS

  function renderReviews() {

    const count = customerReviews.length;

    const average = count
      ? customerReviews.reduce((sum, review) => sum + review.rating, 0) / count
      : 0;


    const averageRating = document.getElementById("averageRating");
    const averageStars = document.getElementById("averageStars");
    const reviewCount = document.getElementById("reviewCount");


    if (averageRating) {
      averageRating.textContent = count ? average.toFixed(1) : "—";
    }


    if (averageStars) {

      averageStars.textContent = count
        ? "★".repeat(Math.round(average)) +
          "☆".repeat(5 - Math.round(average))
        : "☆☆☆☆☆";

    }


    if (reviewCount) {

      reviewCount.textContent = count === 1
        ? "1 customer review"
        : `${count} customer reviews`;

    }


    if (!reviewList) return;


    if (!count) {

      reviewList.innerHTML = `
        <div class="no-reviews">
          <i class="fa-regular fa-comment-dots"></i>
          <strong>Be the first to review</strong>
          <span>Customer reviews will appear here.</span>
        </div>
      `;

      return;

    }


    reviewList.innerHTML = [...customerReviews].reverse().map(review => `

      <article class="review-item">

        <div class="review-item-top">

          <strong>${escapeHTML(review.name)}</strong>

          <span class="review-item-date">
            ${escapeHTML(review.date)}
          </span>

        </div>

        <div class="review-item-stars"
             aria-label="${review.rating} out of 5 stars">

          ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}

        </div>

        <p>${escapeHTML(review.text)}</p>

      </article>

    `).join("");

  }


  // SUBMIT REVIEW

  if (reviewForm) {

    reviewForm.addEventListener("submit", event => {

      event.preventDefault();


      const name = document.getElementById("reviewName").value.trim();

      const rating = Number(
        document.getElementById("reviewRating").value
      );

      const reviewText = document.getElementById("reviewText").value.trim();

      const status = document.getElementById("reviewStatus");


      if (
        !name ||
        !reviewText ||
        !Number.isInteger(rating) ||
        rating < 1 ||
        rating > 5
      ) {
        return;
      }


      customerReviews.push({

        name: name.slice(0, 40),

        rating,

        text: reviewText.slice(0, 400),

        date: new Date().toLocaleDateString("en-US")

      });


      try {

        localStorage.setItem(
          reviewStorageKey,
          JSON.stringify(customerReviews)
        );

        if (status) {
          status.textContent =
            "Thank you! Your review has been added on this device.";
        }

      } catch (error) {

        if (status) {
          status.textContent =
            "Could not save this review in your browser.";
        }

      }


      reviewForm.reset();

      renderReviews();

    });

  }


  renderReviews();



  // =========================
  // RIPPLE EFFECT
  // =========================

  document.querySelectorAll(
    ".btn, .add-to-cart-btn, .checkout-btn"
  ).forEach(button => {

    button.addEventListener("click", event => {

      const rect = button.getBoundingClientRect();

      const ripple = document.createElement("span");

      const size = Math.max(rect.width, rect.height);

      ripple.className = "ripple";

      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;

      ripple.style.left =
        `${event.clientX - rect.left - size / 2}px`;

      ripple.style.top =
        `${event.clientY - rect.top - size / 2}px`;


      button.style.position = "relative";
      button.style.overflow = "hidden";

      button.appendChild(ripple);


      window.setTimeout(() => {
        ripple.remove();
      }, 650);

    });

  });



  // =========================
  // PRODUCT CARD TILT
  // =========================

  const productCards = document.querySelectorAll(".product-card");


  productCards.forEach(card => {

    card.addEventListener("mousemove", event => {

      if (window.innerWidth <= 850) return;


      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (centerY - y) / 35;
      const rotateY = (x - centerX) / 35;


      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

    });


    card.addEventListener("mouseleave", () => {

      card.style.transform = "";

    });

  });



  // =========================
  // CONTACT HOVER
  // =========================

  document.querySelectorAll(".contact-btn").forEach(button => {

    button.addEventListener("mouseenter", () => {

      button.style.borderColor = "rgba(0, 234, 255, 0.45)";

    });


    button.addEventListener("mouseleave", () => {

      button.style.borderColor = "";

    });

  });


  console.log("MAAI_XG STORE - Cart system loaded successfully.");

});
