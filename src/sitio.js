// Menú móvil
(function () {
  var boton = document.querySelector(".menu-boton");
  var menu = document.querySelector(".menu");
  if (boton && menu) {
    boton.addEventListener("click", function () {
      var abierto = menu.classList.toggle("abierto");
      boton.setAttribute("aria-expanded", abierto ? "true" : "false");
    });
  }
})();

// Número de WhatsApp de ZLT (formato 504XXXXXXXX)
var ZLT_WHATSAPP = "50488947017";
function enlaceWhatsApp(texto) {
  return "https://wa.me/" + ZLT_WHATSAPP + "?text=" + encodeURIComponent(texto);
}

// Cotizador (tarifas de EJEMPLO hasta tener las oficiales)
(function () {
  var form = document.getElementById("cotizador");
  if (!form) return;
  var TARIFAS = {
    "usa-aereo":   { nombre: "EE.UU. aéreo",   porLibra: 3.5,  minimo: 1,  divisor: 166, dias: "3 a 5 días hábiles" },
    "usa-maritimo":{ nombre: "EE.UU. marítimo",porLibra: 1.75, minimo: 10, divisor: 0,   dias: "12 a 18 días hábiles" },
    "china-aereo": { nombre: "China aéreo",    porLibra: 8,    minimo: 1,  divisor: 166, dias: "10 a 15 días hábiles" },
    "mexico-aereo":{ nombre: "México aéreo",   porLibra: 5,    minimo: 1,  divisor: 166, dias: "5 a 8 días hábiles" }
  };
  var dinero = function (n) { return "US$ " + n.toFixed(2); };
  function calcular() {
    var t = TARIFAS[form.servicio.value];
    var peso = Math.max(0, parseFloat(form.peso.value) || 0);
    var l = parseFloat(form.largo.value) || 0, a = parseFloat(form.ancho.value) || 0, h = parseFloat(form.alto.value) || 0;
    var vol = t.divisor ? (l * a * h) / t.divisor : 0;
    var cobrable = Math.max(Math.ceil(Math.max(peso, vol)), t.minimo);
    var flete = cobrable * t.porLibra;
    var valor = Math.max(0, parseFloat(form.valor.value) || 0);
    var seguro = form.seguro.checked ? Math.max(1, valor * 0.03) : 0;
    var total = flete + seguro;
    document.getElementById("r-total").textContent = dinero(total);
    document.getElementById("r-servicio").textContent = t.nombre;
    document.getElementById("r-real").textContent = peso.toFixed(1) + " lb";
    document.getElementById("r-vol").textContent = t.divisor ? vol.toFixed(1) + " lb" : "No aplica";
    document.getElementById("r-cobrable").textContent = cobrable + " lb";
    document.getElementById("r-flete").textContent = dinero(flete);
    document.getElementById("r-seguro").textContent = seguro ? dinero(seguro) : "—";
    document.getElementById("r-dias").textContent = t.dias;
    document.getElementById("r-whatsapp").href = enlaceWhatsApp(
      "Hola ZLT, quiero confirmar una cotización: " + t.nombre + ", " + cobrable + " lb cobrables, valor declarado US$ " + valor.toFixed(2) + ". Estimado en la web: " + dinero(total) + "."
    );
  }
  form.addEventListener("input", calcular);
  form.addEventListener("submit", function (e) { e.preventDefault(); calcular(); });
  calcular();
})();

// Rastreo (datos de demostración hasta conectar el sistema)
(function () {
  var form = document.getElementById("rastreo");
  if (!form) return;
  var salida = document.getElementById("rastreo-resultado");
  var DEMO = {
    "ZLT-260412": {
      origen: "Miami, FL", destino: "San Pedro Sula", peso: "4.2 lb", estado: "En aduana",
      eventos: [
        ["hecho", "08 oct 2026 · 10:14", "Recibido en bodega Miami"],
        ["hecho", "09 oct 2026 · 18:40", "Salió de Miami en vuelo consolidado"],
        ["hecho", "10 oct 2026 · 07:05", "Llegó a Honduras"],
        ["actual", "10 oct 2026 · 09:30", "En proceso de aduana"],
        ["", "", "Listo para entrega o retiro en sucursal San Pedro Sula"]
      ]
    }
  };
  function mostrar(codigo) {
    var p = DEMO[codigo];
    if (!p) {
      salida.innerHTML = '<div class="tarjeta"><h3>No encontramos la guía ' + codigo.replace(/[<>&"]/g, "") + '</h3><p>Revisa que esté bien escrita. Si acabas de comprar, la guía aparece cuando el paquete llega a nuestra bodega. También puedes preguntarnos por WhatsApp.</p><div class="botones"><a class="boton boton--marca" target="_blank" rel="noopener" href="' + enlaceWhatsApp("Hola ZLT, quiero saber el estado de mi paquete con guía " + codigo) + '">Preguntar por WhatsApp</a></div></div>';
      return;
    }
    var html = '<div class="tarjeta"><div class="botones" style="justify-content:space-between;align-items:center"><h3>Guía ' + codigo + '</h3><span class="estado">' + p.estado + '</span></div>';
    html += '<p>' + p.origen + ' → ' + p.destino + ' · ' + p.peso + '</p><ol class="linea-tiempo">';
    p.eventos.forEach(function (e) { html += '<li class="' + e[0] + '"><div><strong>' + e[2] + '</strong>' + (e[1] ? '<time>' + e[1] + '</time>' : '') + '</div></li>'; });
    salida.innerHTML = html + '</ol></div>';
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var codigo = form.guia.value.trim().toUpperCase();
    if (codigo) mostrar(codigo);
  });
  form.guia.value = "ZLT-260412";
  mostrar("ZLT-260412");
})();

// Formularios que se envían por WhatsApp (contacto y registro de casillero)
(function () {
  document.querySelectorAll("form[data-whatsapp]").forEach(function (form) {
    var enlace = form.querySelector("[data-enlace]");
    function armar() {
      var lineas = [form.getAttribute("data-whatsapp")];
      form.querySelectorAll("input, select, textarea").forEach(function (c) {
        if (c.value && c.name) lineas.push(c.getAttribute("data-rotulo") + ": " + c.value);
      });
      enlace.href = enlaceWhatsApp(lineas.join("\n"));
    }
    form.addEventListener("input", armar);
    form.addEventListener("submit", function (e) { e.preventDefault(); armar(); enlace.focus(); });
    armar();
  });
})();

// Marca la página actual en el menú
(function () {
  var actual = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a:not(.boton)").forEach(function (a) {
    if (a.getAttribute("href") === actual) a.setAttribute("aria-current", "page");
  });
})();
