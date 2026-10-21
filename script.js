/**
 * El Fogón de la Abuela — JavaScript comentado para facilitar su estudio.
 * Solo se añaden comentarios; la lógica original se conserva.
 */
// Espera a que todos los elementos HTML estén disponibles antes de ejecutar el código.
document.addEventListener("DOMContentLoaded", () => {
  // Busca el botón encargado de abrir el menú en celulares.
  const menuBtn = document.getElementById("menuBtn");
  // Localiza el contenedor de enlaces de navegación.
  const mainNav = document.getElementById("mainNav");

  // Evita errores si alguno de los elementos no existe en esta página.
  if (menuBtn && mainNav) {
    // Al pulsar el botón, alterna la clase CSS que muestra u oculta el menú.
    menuBtn.addEventListener("click", () => mainNav.classList.toggle("open"));
    mainNav
      // Selecciona todos los enlaces del menú.
      .querySelectorAll("a")
      // Recorre cada enlace para asignarle un evento de clic.
      .forEach((a) =>
        a.addEventListener("click", () => mainNav.classList.remove("open")),
      );
  }

  // Inicializa cada carrusel que aparece en el documento.
  document.querySelectorAll(".carousel-shell").forEach((shell) => {
    // Obtiene la zona horizontal que se desplaza.
    const track = shell.querySelector(".scrollable");
    // Obtiene el botón para retroceder.
    const prev = shell.querySelector(".carousel-arrow.prev");
    // Obtiene el botón para avanzar.
    const next = shell.querySelector(".carousel-arrow.next");
    // Si faltan controles o carrusel, omite esta instancia.
    if (!track || !prev || !next) return;

    // Actualiza el estado habilitado o deshabilitado de ambas flechas.
    const updateControls = () => {
      // Calcula la distancia máxima posible de desplazamiento horizontal.
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      // Desactiva la flecha anterior al llegar al principio.
      prev.disabled = track.scrollLeft <= 2;
      // Desactiva la flecha siguiente cuando ya se llegó al final.
      next.disabled = track.scrollLeft >= maxScroll - 2;
    };

    // Desplaza el carrusel una tarjeta en la dirección indicada.
    const move = (direction) => {
      // Convierte los elementos HTML hijos del carrusel en un arreglo.
      const cards = Array.from(track.children);
      // No intenta desplazarse cuando no hay tarjetas.
      if (!cards.length) return;
      // Lee la posición horizontal actual.
      const current = track.scrollLeft;
      // Calcula la distancia máxima posible de desplazamiento horizontal.
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      // Calcula la posición de inicio de cada tarjeta respecto a la primera.
      const positions = cards.map((card) => card.offsetLeft - cards[0].offsetLeft);
      // Elige la tarjeta siguiente o anterior según la dirección.
      const destination = direction > 0
        ? positions.find((position) => position > current + 2) ?? maxScroll
        : positions.filter((position) => position < current - 2).pop() ?? 0;

      // Mueve el carrusel hasta la posición calculada.
      track.scrollTo({
        // Limita la posición para no exceder los extremos del carrusel.
        left: Math.min(maxScroll, Math.max(0, destination)),
        // Respeta la preferencia del usuario por reducir animaciones.
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    };

    // Asigna a la flecha izquierda el retroceso de una tarjeta.
    prev.addEventListener("click", () => move(-1));
    // Asigna a la flecha derecha el avance de una tarjeta.
    next.addEventListener("click", () => move(1));
    // Recalcula los botones cuando el usuario desplaza manualmente el carrusel.
    track.addEventListener("scroll", updateControls, { passive: true });
    // Recalcula los límites cuando cambia el tamaño de la ventana.
    window.addEventListener("resize", updateControls);
    updateControls();
  });

  // Prepara los grupos de pestañas de las categorías.
  document.querySelectorAll("[data-tab-group]").forEach((group) => {
    // Selecciona las pestañas de este grupo.
    const tabs = group.querySelectorAll(".tab");
    // Registra el clic de cada pestaña.
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Retira el estilo activo de todas las pestañas.
        tabs.forEach((t) => t.classList.remove("active"));
        // Resalta la pestaña que acaba de pulsarse.
        tab.classList.add("active");

        // Lee qué panel corresponde a la pestaña elegida.
        const panelName = tab.dataset.tab;
        // Busca el contenedor que agrupa las pestañas y sus contenidos.
        const container = group.parentElement;
        // Muestra únicamente el panel asociado a la pestaña activa.
        container.querySelectorAll(".tab-panel").forEach((panel) => {
          panel.classList.toggle("active", panel.dataset.panel === panelName);
        });
      });
    });
  });

  // Localiza el modal que muestra detalles de un plato.
  const dishModal = document.getElementById("dishModal");

  // Configura el modal solamente si existe en esta página.
  if (dishModal) {
    document
      // Selecciona las tarjetas que tienen información de un plato.
      .querySelectorAll(".mini-card[data-modal-title]")
      .forEach((card) => {
        // Al hacer clic en una tarjeta, prepara la ventana de detalles.
        card.addEventListener("click", () => {
          // Coloca en el modal el nombre del plato seleccionado.
          document.getElementById("modalTitle").textContent =
            card.dataset.modalTitle;
          // Coloca en el modal el precio del plato.
          document.getElementById("modalPrice").textContent =
            card.dataset.modalPrice;
          // Actualiza la fotografía principal del modal.
          document.getElementById("modalImg").src = card.dataset.modalImg;
          // Hace visible la ventana modal agregando una clase CSS.
          dishModal.classList.add("open");
          // Informa a tecnologías de asistencia que el modal está visible.
          dishModal.setAttribute("aria-hidden", "false");
        });
      });
  }

  // Localiza el modal para detalles de paquetes de eventos.
  const packageModal = document.getElementById("packageModal");

  // Evita configurar un modal inexistente.
  if (packageModal) {
    // Selecciona los botones que abren información de paquetes.
    document.querySelectorAll(".details-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        // Escribe el nombre del paquete elegido.
        document.getElementById("packageTitle").textContent =
          `Paquete ${btn.dataset.package}`;
        // Abre la ventana de detalles del paquete.
        packageModal.classList.add("open");
        // Actualiza el estado accesible del modal de paquetes.
        packageModal.setAttribute("aria-hidden", "false");
      });
    });
  }

  // Encuentra los botones y zonas que permiten cerrar modales.
  document.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", () => {
      // Selecciona todas las ventanas modales que estén abiertas.
      document.querySelectorAll(".modal.open").forEach((modal) => {
        // Oculta la ventana modal.
        modal.classList.remove("open");
        // Marca el modal como oculto para lectores de pantalla.
        modal.setAttribute("aria-hidden", "true");
      });
    });
  });

  // Escucha pulsaciones de teclado para permitir cerrar modales con Escape.
  document.addEventListener("keydown", (e) => {
    // Comprueba si se presionó la tecla Escape.
    if (e.key === "Escape") {
      document
        .querySelectorAll(".modal.open")
        .forEach((modal) => modal.classList.remove("open"));
    }
  });


  // Galería de 40 imágenes con filtros y navegación accesible.
  // Listado de 40 fotos: cada elemento contiene ID de Unsplash, categoría y nombre visible.
  const galleryData = [["1517248135467-4c7edcad34c4","ambiente","Nuestro salón"],["1552566626-52f8b828add9","ambiente","Espacio acogedor"],["1544025162-d76694265947","platos","Sabores especiales"],["1504674900247-0877df9cc836","platos","Mesa criolla"],["1515003197210-e0cd71810b5f","platos","Nuestros favoritos"],["1559847844-5315695dadae","platos","Sazón casera"],["1504754524776-8f4f37790ca0","platos","Desayuno tradicional"],["1482049016688-2d3e1b311543","platos","Delicias del día"],["1559339352-11d035aa65de","ambiente","Rincón del restaurante"],["1514933651103-005eec06c04b","ambiente","Encuentro en familia"],["1466978913421-dad2ebd01d17","ambiente","Cena especial"],["1515669097368-22e68427d265","ambiente","Ambiente cálido"],["1528605248644-14dd04022da1","ambiente","Momentos compartidos"],["1551632436-cbf8dd35adfa","ambiente","Detalles del local"],["1414235077428-338989a2e8c0","ambiente","Nuestra mesa"],["1555396273-367ea4eb4db5","ambiente","Restaurante"],["1519167758481-83f550bb49b3","eventos","Celebración familiar"],["1464366400600-7168b8af9bc3","eventos","Momentos especiales"],["1527529482837-4698179dc6ce","eventos","Buffet para eventos"],["1478145046317-39f10e56b5e9","eventos","Mesa de celebración"],["1511795409834-ef04bbd61622","eventos","Atención a eventos"],["1530103862676-de8c9debad1d","eventos","Cumpleaños"],["1513151233558-d860c5398176","eventos","Brindis"],["1511578314322-379afb476865","eventos","Reunión especial"],["1556911220-bff31c812dba","cocina","Nuestra cocina"],["1556910103-1c02745aae4d","cocina","Manos a la obra"],["1547592180-85f173990554","cocina","Ingredientes frescos"],["1498837167922-ddd27525d352","cocina","Preparación artesanal"],["1473093295043-cdd812d0e601","cocina","Recetas caseras"],["1467003909585-2f8a72700288","cocina","Cocina con cariño"],["1551218808-94e220e084d2","cocina","El equipo"],["1514326640560-7d063ef2aed5","cocina","Cocina tradicional"],["1512058564366-18510be2db19","platos","Arroz con tradición"],["1565299624946-b28f40a0ae38","platos","Especialidad de la casa"],["1517457373958-b7bdd4587205","ambiente","Mesa compartida"],["1528605105345-5344ea20e269","eventos","Servicio para eventos"],["1519741497674-611481863552","eventos","Decoración del evento"],["1515668236457-83c3b8764839","ambiente","Nuestra experiencia"],["1550966871-3ed3cdb5ed0c","ambiente","Mesa preparada"],["1569058242253-92a9c755a0ec","platos","Plato del día"]];
  // Obtiene el contenedor donde se dibujarán las fotografías.
  const galleryGrid = document.getElementById("galleryGrid");
  // Localiza la ventana que amplía las fotografías.
  const galleryOverlay = document.getElementById("galleryLightbox");
  // Ejecuta la galería solo en páginas que incluyen sus elementos HTML.
  if (galleryGrid && galleryOverlay) {
    // Busca el texto que indica cuántas fotografías están disponibles.
    const galleryCounter = document.getElementById("galleryCount");
    // Busca la imagen grande dentro del visor.
    const galleryImg = document.getElementById("galleryLargeImage");
    // Localiza el título y el contador del visor.
    const galleryCaption = document.getElementById("galleryCaption");
    // Obtiene los botones para filtrar por categoría.
    const filters = document.querySelectorAll("[data-gallery-filter]");
    // Guarda las fotografías correspondientes al filtro actual.
    let visiblePhotos = galleryData;
    // Índice de la fotografía seleccionada dentro de la lista filtrada.
    let selected = 0;
    // Recuerda el botón previo para devolverle el foco al cerrar el visor.
    let previousFocus = null;
    // Relaciona los nombres internos de categoría con sus etiquetas visibles.
    const labels = { platos:"Platos",ambiente:"Ambiente",eventos:"Eventos",cocina:"Cocina" };
    // Forma la URL de Unsplash y elige una resolución grande o pequeña.
    const imageUrl = (photo,large=false) => "https://images.unsplash.com/photo-" + photo[0] + "?auto=format&fit=crop&w=" + (large ? 1600 : 700) + "&q=80";
    // Actualiza el visor con la fotografía seleccionada.
    const display = () => {
      // Obtiene los datos de la foto que corresponde al índice actual.
      const photo = visiblePhotos[selected];
      // Impide trabajar con una foto inexistente.
      if (!photo) return;
      // Asigna la imagen de alta resolución al visor.
      galleryImg.src = imageUrl(photo,true);
      // Añade un texto alternativo descriptivo a la fotografía ampliada.
      galleryImg.alt = photo[2];
      // Muestra título, categoría y posición actual de la imagen.
      galleryCaption.textContent = photo[2] + " · " + labels[photo[1]] + " · " + (selected+1) + "/" + visiblePhotos.length;
    };
    // Cierra el visor y devuelve el foco al lugar donde estaba el usuario.
    const close = () => {
      // Oculta el visor de fotografías.
      galleryOverlay.hidden = true;
      // Vuelve a permitir el desplazamiento de la página principal.
      document.body.style.overflow = "";
      // Devuelve el foco al botón que abrió la foto, cuando todavía existe.
      previousFocus?.focus();
    };
    // Vuelve a dibujar las tarjetas de acuerdo con el filtro elegido.
    function render(category="all") {
      // Si la categoría es «all», muestra todas; si no, filtra el arreglo.
      visiblePhotos = category==="all" ? galleryData : galleryData.filter(photo=>photo[1]===category);
      // Actualiza el contador según la cantidad de fotos visibles.
      galleryCounter.textContent = visiblePhotos.length + " fotografías";
      // Borra las tarjetas anteriores para evitar elementos duplicados.
      galleryGrid.replaceChildren();
      // Crea una tarjeta HTML para cada fotografía del resultado.
      visiblePhotos.forEach((photo,index)=>{
        // Crea un botón para abrir la imagen usando ratón o teclado.
        const button=document.createElement("button");
        // Agrega la clase CSS con la apariencia visual de tarjeta.
        button.className="gallery-tile";
        // Evita que el botón intente enviar un formulario accidentalmente.
        button.type="button";
        // Proporciona una descripción accesible del botón.
        button.setAttribute("aria-label","Ampliar: "+photo[2]);
        // Crea el elemento HTML que mostrará la miniatura.
        const img=document.createElement("img");
        // Asigna la URL de la miniatura.
        img.src=imageUrl(photo);
        // Añade una descripción para accesibilidad.
        img.alt=photo[2];
        // Carga la imagen cuando se aproxima al área visible para mejorar rendimiento.
        img.loading="lazy";
        // Permite que el navegador decodifique la imagen de forma asíncrona.
        img.decoding="async";
        // Crea la etiqueta visual situada sobre la fotografía.
        const caption=document.createElement("span");
        // Asigna los estilos de texto de la tarjeta.
        caption.className="gallery-tile-label";
        // Crea un texto pequeño con el nombre de la categoría.
        const categoryText=document.createElement("small");
        // Establece la categoría visible de la imagen.
        categoryText.textContent=labels[photo[1]];
        // Agrega el nombre de categoría y el título a la etiqueta.
        caption.append(categoryText,document.createTextNode(photo[2]));
        // Añade imagen y etiqueta dentro del botón.
        button.append(img,caption);
        // Al pulsar una foto, abre el visor con esa imagen.
        button.addEventListener("click",()=>{
          // Recuerda la tarjeta para restaurar el foco al cerrar.
          previousFocus=button;
          // Guarda cuál fotografía se seleccionó.
          selected=index;
          // Actualiza la imagen y su descripción en el visor.
          display();
          // Muestra la ventana de fotografía ampliada.
          galleryOverlay.hidden=false;
          // Impide desplazar la página mientras el visor está abierto.
          document.body.style.overflow="hidden";
          // Mueve el foco al botón de cierre del visor.
          document.getElementById("galleryClose").focus();
        });
        // Inserta la tarjeta recién creada dentro de la galería.
        galleryGrid.append(button);
      });
    }
    // Asigna un evento de clic a cada filtro de fotografías.
    filters.forEach(button=>button.addEventListener("click",()=>{
      // Asigna un evento de clic a cada filtro de fotografías.
      filters.forEach(b=>{b.classList.toggle("active",b===button);b.setAttribute("aria-pressed",String(b===button));});
      // Reconstruye la galería usando la categoría seleccionada.
      render(button.dataset.galleryFilter);
    }));
    // Permite cerrar el visor pulsando su botón.
    document.getElementById("galleryClose").addEventListener("click",close);
    // Retrocede una fotografía y actualiza el visor.
    document.getElementById("galleryPrevious").addEventListener("click",()=>{selected=(selected-1+visiblePhotos.length)%visiblePhotos.length;display();});
    // Avanza una fotografía y actualiza el visor.
    document.getElementById("galleryNext").addEventListener("click",()=>{selected=(selected+1)%visiblePhotos.length;display();});
    // Cierra el visor cuando se hace clic fuera de la imagen.
    galleryOverlay.addEventListener("click",event=>{if(event.target===galleryOverlay)close();});
    // Escucha pulsaciones de teclado para permitir cerrar modales con Escape.
    document.addEventListener("keydown",event=>{
      // Ignora teclas especiales cuando el visor está cerrado.
      if(galleryOverlay.hidden)return;
      // Cierra el visor cuando el usuario pulsa Escape.
      if(event.key==="Escape")close();
      // Permite retroceder con la flecha izquierda.
      if(event.key==="ArrowLeft"){selected=(selected-1+visiblePhotos.length)%visiblePhotos.length;display();}
      // Permite avanzar con la flecha derecha.
      if(event.key==="ArrowRight"){selected=(selected+1)%visiblePhotos.length;display();}
      // Controla la navegación de foco por teclado mientras el visor está abierto.
      if(event.key==="Tab"){
        // Lista los tres botones navegables de la ventana ampliada.
        const controls=[document.getElementById("galleryClose"),document.getElementById("galleryPrevious"),document.getElementById("galleryNext")];
        // Averigua cuál de esos botones tiene el foco.
        const current=controls.indexOf(document.activeElement);
        // Mueve el foco de forma circular según Tab o Shift+Tab.
        if(current>=0){event.preventDefault();controls[(current+(event.shiftKey?2:1))%3].focus();}
      }
    });
    // Muestra inicialmente todas las fotografías.
    render();
  }

  // Guarda los mensajes de testimonios que rotará el carrusel.
  const testimonials = [
    "“La comida deliciosa y la atención excelente. Hicieron de nuestro matrimonio un día inolvidable.”",
    "“Todo llegó puntual, caliente y muy bien presentado. Nuestros invitados quedaron encantados.”",
    "“Nos ayudaron con cada detalle del evento y el buffet criollo estuvo espectacular.”",
  ];

  // Índice del testimonio que se está mostrando.
  let testimonialIndex = 0;

  // Localiza el elemento que muestra el testimonio.
  const testimonialText = document.getElementById("testimonialText");

  // Actualiza el texto del testimonio visible.
  const renderTestimonial = () => {
    // Evita errores cuando la página no tiene testimonios.
    if (testimonialText)
      // Inserta el testimonio seleccionado dentro del HTML.
      testimonialText.textContent = testimonials[testimonialIndex];
  };

  // Retrocede al testimonio anterior, volviendo al último si es necesario.
  document.getElementById("prevTestimonial")?.addEventListener("click", () => {
    testimonialIndex =
      (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial();
  });
  
  // Avanza al testimonio siguiente, volviendo al primero si es necesario.
  document.getElementById("nextTestimonial")?.addEventListener("click", () => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    renderTestimonial();
  });

  // Interpreta el envío del formulario de contacto para eventos.
  document.getElementById("eventForm")?.addEventListener("submit", (e) => {
    // Evita que el navegador recargue la página al enviar el formulario.
    e.preventDefault();
    // Muestra un mensaje de confirmación simulado.
    alert(
      "¡Gracias! Tu solicitud fue registrada. Nos pondremos en contacto contigo.",
    );
    // Limpia el formulario después de pulsar Enviar.
    e.target.reset();
  });
});
