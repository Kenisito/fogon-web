document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const mainNav = document.getElementById("mainNav");

  if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", () => mainNav.classList.toggle("open"));
    mainNav
      .querySelectorAll("a")
      .forEach((a) =>
        a.addEventListener("click", () => mainNav.classList.remove("open")),
      );
  }

  document.querySelectorAll(".carousel-shell").forEach((shell) => {
    const track = shell.querySelector(".scrollable");
    const prev = shell.querySelector(".carousel-arrow.prev");
    const next = shell.querySelector(".carousel-arrow.next");
    if (!track || !prev || !next) return;

    const updateControls = () => {
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= maxScroll - 2;
    };

    const move = (direction) => {
      const cards = Array.from(track.children);
      if (!cards.length) return;
      const current = track.scrollLeft;
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      const positions = cards.map((card) => card.offsetLeft - cards[0].offsetLeft);
      const destination = direction > 0
        ? positions.find((position) => position > current + 2) ?? maxScroll
        : positions.filter((position) => position < current - 2).pop() ?? 0;

      track.scrollTo({
        left: Math.min(maxScroll, Math.max(0, destination)),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    };

    prev.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));
    track.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);
    updateControls();
  });

  document.querySelectorAll("[data-tab-group]").forEach((group) => {
    const tabs = group.querySelectorAll(".tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        const panelName = tab.dataset.tab;
        const container = group.parentElement;
        container.querySelectorAll(".tab-panel").forEach((panel) => {
          panel.classList.toggle("active", panel.dataset.panel === panelName);
        });
      });
    });
  });

  const dishModal = document.getElementById("dishModal");

  if (dishModal) {
    document
      .querySelectorAll(".mini-card[data-modal-title]")
      .forEach((card) => {
        card.addEventListener("click", () => {
          document.getElementById("modalTitle").textContent =
            card.dataset.modalTitle;
          document.getElementById("modalPrice").textContent =
            card.dataset.modalPrice;
          document.getElementById("modalImg").src = card.dataset.modalImg;
          dishModal.classList.add("open");
          dishModal.setAttribute("aria-hidden", "false");
        });
      });
  }

  const packageModal = document.getElementById("packageModal");

  if (packageModal) {
    document.querySelectorAll(".details-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.getElementById("packageTitle").textContent =
          `Paquete ${btn.dataset.package}`;
        packageModal.classList.add("open");
        packageModal.setAttribute("aria-hidden", "false");
      });
    });
  }

  document.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", () => {
      document.querySelectorAll(".modal.open").forEach((modal) => {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
      });
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document
        .querySelectorAll(".modal.open")
        .forEach((modal) => modal.classList.remove("open"));
    }
  });

  const testimonials = [
    "“La comida deliciosa y la atención excelente. Hicieron de nuestro matrimonio un día inolvidable.”",
    "“Todo llegó puntual, caliente y muy bien presentado. Nuestros invitados quedaron encantados.”",
    "“Nos ayudaron con cada detalle del evento y el buffet criollo estuvo espectacular.”",
  ];

  let testimonialIndex = 0;

  const testimonialText = document.getElementById("testimonialText");

  const renderTestimonial = () => {
    if (testimonialText)
      testimonialText.textContent = testimonials[testimonialIndex];
  };

  document.getElementById("prevTestimonial")?.addEventListener("click", () => {
    testimonialIndex =
      (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial();
  });
  
  document.getElementById("nextTestimonial")?.addEventListener("click", () => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    renderTestimonial();
  });

  document.getElementById("eventForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(
      "¡Gracias! Tu solicitud fue registrada. Nos pondremos en contacto contigo.",
    );
    e.target.reset();
  });
});
