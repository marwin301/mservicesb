document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     MENU MOBILE
     ========================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.classList.toggle("active");

      mobileNav.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        mobileNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
      });
    });
  }


  /* =========================================================
     ANO AUTOMÁTICO DO FOOTER
     ========================================================= */

  const currentYear = document.getElementById("current-year");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =========================================================
     FAQ
     ========================================================= */

  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const currentItem = question.closest(".faq-item");
      const isOpen = currentItem.classList.contains("open");

      document.querySelectorAll(".faq-item.open").forEach((item) => {
        item.classList.remove("open");

        const button = item.querySelector(".faq-question");

        if (button) {
          button.setAttribute("aria-expanded", "false");
        }
      });

      if (!isOpen) {
        currentItem.classList.add("open");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });


  /* =========================================================
     FILTROS DO PORTFÓLIO
     ========================================================= */

  const filterButtons = document.querySelectorAll(".filter-button");
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {

      const filter = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      portfolioCards.forEach((card) => {

        const category = card.dataset.category;

        if (filter === "all" || category === filter) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }

      });
    });
  });


  /* =========================================================
     REVEAL ON SCROLL
     ========================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  /* =========================================================
     CONTACT FORM → WHATSAPP
     ========================================================= */

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

      event.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const company = document.getElementById("company")?.value.trim();
      const whatsapp = document.getElementById("whatsapp")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const service = document.getElementById("service")?.value;
      const message = document.getElementById("message")?.value.trim();

      if (!name || !whatsapp || !service || !message) {

        if (formStatus) {
          formStatus.textContent =
            "Por favor, preencha os campos obrigatórios.";
          formStatus.style.color = "#c62828";
        }

        return;
      }


      const whatsappNumber = "258834414049";

      const text = `
Olá, MservicesB.

Gostaria de solicitar um orçamento.

Nome: ${name}
Empresa: ${company || "Não informado"}
WhatsApp: ${whatsapp}
Email: ${email || "Não informado"}

Serviço de interesse:
${service}

Mensagem:
${message}
      `.trim();

      const whatsappUrl =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;


      if (formStatus) {
        formStatus.textContent =
          "A preparar a sua mensagem para o WhatsApp...";
        formStatus.style.color = "#155eef";
      }

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    });

  }


  /* =========================================================
     ESC — FECHAR MENU MOBILE
     ========================================================= */

  document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") return;

    if (menuToggle && mobileNav) {
      menuToggle.classList.remove("active");
      mobileNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
    }

  });


  /* =========================================================
     FECHAR MENU AO CLICAR FORA
     ========================================================= */

  document.addEventListener("click", (event) => {

    if (!menuToggle || !mobileNav) return;

    const clickedInsideMenu =
      mobileNav.contains(event.target);

    const clickedToggle =
      menuToggle.contains(event.target);

    if (
      mobileNav.classList.contains("open") &&
      !clickedInsideMenu &&
      !clickedToggle
    ) {
      menuToggle.classList.remove("active");
      mobileNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
    }

  });


  /* =========================================================
     LOG
     ========================================================= */

  console.log("MservicesB — website carregado com sucesso.");

});
