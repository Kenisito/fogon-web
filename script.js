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


  // Galería de 40 imágenes con filtros y navegación accesible.
  const galleryData = [["1517248135467-4c7edcad34c4","ambiente","Nuestro salón"],["1552566626-52f8b828add9","ambiente","Espacio acogedor"],["1544025162-d76694265947","platos","Sabores especiales"],["1504674900247-0877df9cc836","platos","Mesa criolla"],["1515003197210-e0cd71810b5f","platos","Nuestros favoritos"],["1559847844-5315695dadae","platos","Sazón casera"],["1504754524776-8f4f37790ca0","platos","Desayuno tradicional"],["1482049016688-2d3e1b311543","platos","Delicias del día"],["1559339352-11d035aa65de","ambiente","Rincón del restaurante"],["1514933651103-005eec06c04b","ambiente","Encuentro en familia"],["1466978913421-dad2ebd01d17","ambiente","Cena especial"],["1515669097368-22e68427d265","ambiente","Ambiente cálido"],["1528605248644-14dd04022da1","ambiente","Momentos compartidos"],["1551632436-cbf8dd35adfa","ambiente","Detalles del local"],["1414235077428-338989a2e8c0","ambiente","Nuestra mesa"],["1555396273-367ea4eb4db5","ambiente","Restaurante"],["1519167758481-83f550bb49b3","eventos","Celebración familiar"],["1464366400600-7168b8af9bc3","eventos","Momentos especiales"],["1527529482837-4698179dc6ce","eventos","Buffet para eventos"],["1478145046317-39f10e56b5e9","eventos","Mesa de celebración"],["1511795409834-ef04bbd61622","eventos","Atención a eventos"],["1530103862676-de8c9debad1d","eventos","Cumpleaños"],["1513151233558-d860c5398176","eventos","Brindis"],["1511578314322-379afb476865","eventos","Reunión especial"],["1556911220-bff31c812dba","cocina","Nuestra cocina"],["1556910103-1c02745aae4d","cocina","Manos a la obra"],["1547592180-85f173990554","cocina","Ingredientes frescos"],["1498837167922-ddd27525d352","cocina","Preparación artesanal"],["1473093295043-cdd812d0e601","cocina","Recetas caseras"],["1467003909585-2f8a72700288","cocina","Cocina con cariño"],["1551218808-94e220e084d2","cocina","El equipo"],["1514326640560-7d063ef2aed5","cocina","Cocina tradicional"],["1512058564366-18510be2db19","platos","Arroz con tradición"],["1565299624946-b28f40a0ae38","platos","Especialidad de la casa"],["1517457373958-b7bdd4587205","ambiente","Mesa compartida"],["1528605105345-5344ea20e269","eventos","Servicio para eventos"],["1519741497674-611481863552","eventos","Decoración del evento"],["1515668236457-83c3b8764839","ambiente","Nuestra experiencia"],["1550966871-3ed3cdb5ed0c","ambiente","Mesa preparada"],["1569058242253-92a9c755a0ec","platos","Plato del día"]];
  const galleryGrid = document.getElementById("galleryGrid");
  const galleryOverlay = document.getElementById("galleryLightbox");
  if (galleryGrid && galleryOverlay) {
    const galleryCounter = document.getElementById("galleryCount");
    const galleryImg = document.getElementById("galleryLargeImage");
    const galleryCaption = document.getElementById("galleryCaption");
    const filters = document.querySelectorAll("[data-gallery-filter]");
    let visiblePhotos = galleryData;
    let selected = 0;
    let previousFocus = null;
    const labels = { platos:"Platos",ambiente:"Ambiente",eventos:"Eventos",cocina:"Cocina" };
    const imageUrl = (photo,large=false) => "https://images.unsplash.com/photo-" + photo[0] + "?auto=format&fit=crop&w=" + (large ? 1600 : 700) + "&q=80";
    const display = () => {
      const photo = visiblePhotos[selected];
      if (!photo) return;
      galleryImg.src = imageUrl(photo,true);
      galleryImg.alt = photo[2];
      galleryCaption.textContent = photo[2] + " · " + labels[photo[1]] + " · " + (selected+1) + "/" + visiblePhotos.length;
    };
    const close = () => {
      galleryOverlay.hidden = true;
      document.body.style.overflow = "";
      previousFocus?.focus();
    };
    function render(category="all") {
      visiblePhotos = category==="all" ? galleryData : galleryData.filter(photo=>photo[1]===category);
      galleryCounter.textContent = visiblePhotos.length + " fotografías";
      galleryGrid.replaceChildren();
      visiblePhotos.forEach((photo,index)=>{
        const button=document.createElement("button");
        button.className="gallery-tile";
        button.type="button";
        button.setAttribute("aria-label","Ampliar: "+photo[2]);
        const img=document.createElement("img");
        img.src=imageUrl(photo);
        img.alt=photo[2];
        img.loading="lazy";
        img.decoding="async";
        const caption=document.createElement("span");
        caption.className="gallery-tile-label";
        const categoryText=document.createElement("small");
        categoryText.textContent=labels[photo[1]];
        caption.append(categoryText,document.createTextNode(photo[2]));
        button.append(img,caption);
        button.addEventListener("click",()=>{
          previousFocus=button;
          selected=index;
          display();
          galleryOverlay.hidden=false;
          document.body.style.overflow="hidden";
          document.getElementById("galleryClose").focus();
        });
        galleryGrid.append(button);
      });
    }
    filters.forEach(button=>button.addEventListener("click",()=>{
      filters.forEach(b=>{b.classList.toggle("active",b===button);b.setAttribute("aria-pressed",String(b===button));});
      render(button.dataset.galleryFilter);
    }));
    document.getElementById("galleryClose").addEventListener("click",close);
    document.getElementById("galleryPrevious").addEventListener("click",()=>{selected=(selected-1+visiblePhotos.length)%visiblePhotos.length;display();});
    document.getElementById("galleryNext").addEventListener("click",()=>{selected=(selected+1)%visiblePhotos.length;display();});
    galleryOverlay.addEventListener("click",event=>{if(event.target===galleryOverlay)close();});
    document.addEventListener("keydown",event=>{
      if(galleryOverlay.hidden)return;
      if(event.key==="Escape")close();
      if(event.key==="ArrowLeft"){selected=(selected-1+visiblePhotos.length)%visiblePhotos.length;display();}
      if(event.key==="ArrowRight"){selected=(selected+1)%visiblePhotos.length;display();}
      if(event.key==="Tab"){
        const controls=[document.getElementById("galleryClose"),document.getElementById("galleryPrevious"),document.getElementById("galleryNext")];
        const current=controls.indexOf(document.activeElement);
        if(current>=0){event.preventDefault();controls[(current+(event.shiftKey?2:1))%3].focus();}
      }
    });
    render();
  }

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
