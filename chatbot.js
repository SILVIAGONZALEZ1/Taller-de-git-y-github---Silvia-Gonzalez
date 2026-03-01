(function () {
  // --- CSS ---
  var style = document.createElement("style");
  style.textContent =
    "#da-chatbot-btn{" +
    "position:fixed;bottom:90px;right:20px;z-index:9999;" +
    "width:56px;height:56px;border-radius:50%;border:none;cursor:pointer;" +
    "background:#d16c7c;color:#fff;font-size:28px;display:flex;align-items:center;justify-content:center;" +
    "box-shadow:0 5px 15px rgba(0,0,0,.1);transition:transform .2s}" +
    "#da-chatbot-btn:hover{transform:scale(1.1)}" +
    "#da-chatbot-window{" +
    "position:fixed;bottom:160px;right:20px;z-index:9999;" +
    "width:340px;max-height:480px;border-radius:15px;overflow:hidden;" +
    "box-shadow:0 5px 15px rgba(0,0,0,.1);display:none;flex-direction:column;" +
    "font-family:'Segoe UI',sans-serif;background:#fff6f0}" +
    "#da-chatbot-window.open{display:flex}" +
    "#da-chat-header{" +
    "background:#d16c7c;color:#fff;padding:14px 16px;font-size:15px;font-weight:600;" +
    "display:flex;align-items:center;justify-content:space-between}" +
    "#da-chat-header button{background:none;border:none;color:#fff;font-size:20px;cursor:pointer;line-height:1}" +
    "#da-chat-body{" +
    "flex:1;overflow-y:auto;padding:14px 12px;display:flex;flex-direction:column;gap:10px;" +
    "max-height:340px}" +
    ".da-msg{max-width:85%;padding:10px 14px;border-radius:15px;font-size:14px;line-height:1.45;color:#4b2e2e}" +
    ".da-msg.bot{background:#fff;align-self:flex-start;border:1px solid #f0d6d6}" +
    ".da-msg.user{background:#d16c7c;color:#fff;align-self:flex-end}" +
    ".da-options{display:flex;flex-wrap:wrap;gap:8px;padding:4px 0}" +
    ".da-opt-btn{" +
    "background:#fff;border:1.5px solid #d16c7c;color:#7a4a3b;border-radius:25px;" +
    "padding:8px 16px;font-size:13px;cursor:pointer;transition:all .2s;font-family:inherit}" +
    ".da-opt-btn:hover{background:#d16c7c;color:#fff}" +
    "@media(max-width:420px){" +
    "#da-chatbot-window{width:calc(100vw - 24px);right:12px;bottom:140px;max-height:60vh}" +
    "}";
  document.head.appendChild(style);

  // --- HTML ---
  var btn = document.createElement("button");
  btn.id = "da-chatbot-btn";
  btn.title = "Chat con Dulce Aroma";
  btn.textContent = "\uD83E\uDDD1\u200D\uD83C\uDF73"; // emoji chef
  document.body.appendChild(btn);

  var win = document.createElement("div");
  win.id = "da-chatbot-window";
  win.innerHTML =
    '<div id="da-chat-header">' +
    "<span>\uD83C\uDF70 Dulce Aroma Chat</span>" +
    '<button id="da-chat-close">&times;</button>' +
    "</div>" +
    '<div id="da-chat-body"></div>';
  document.body.appendChild(win);

  var body = document.getElementById("da-chat-body");

  // --- Data ---
  var mainMenu = [
    { label: "Ver productos", key: "productos" },
    { label: "Consultar precios", key: "precios" },
    { label: "Promociones", key: "promos" },
    { label: "Formas de pago", key: "pagos" },
    { label: "Hacer un pedido", key: "pedido" },
    { label: "Horarios y entregas", key: "entregas" },
  ];

  var responses = {
    productos:
      "Nuestros productos:\n\n" +
      "\uD83C\uDF82 <b>Tortas personalizadas</b> \u2014 Para cumplea\u00f1os, aniversarios y eventos\n" +
      "\uD83E\uDDC1 <b>Cupcakes</b> \u2014 Cl\u00e1sicos y gourmet\n" +
      "\uD83C\uDF6A <b>Cookies artesanales</b> \u2014 Crujientes por fuera, suaves por dentro\n" +
      "\uD83C\uDF6E <b>Postres individuales</b> \u2014 Brownies, Chocotorta, Lemon Pie, Cheesecake\n" +
      "\uD83C\uDF89 <b>Mesas dulces</b> \u2014 Para eventos de 20+ personas",

    precios:
      "Nuestros precios:\n\n" +
      "\uD83C\uDF82 <b>Tortas:</b> desde $8.500/kg hasta $16.500/kg\n" +
      "\uD83E\uDDC1 <b>Cupcakes:</b> $2.500 a $3.800 c/u (m\u00edn. 6)\n" +
      "\uD83C\uDF6A <b>Cookies:</b> $1.800 a $2.800 c/u (m\u00edn. 6)\n" +
      "\uD83C\uDF6E <b>Postres:</b> $2.000 a $3.500 c/u\n" +
      "\uD83C\uDF89 <b>Mesas dulces:</b> desde $45.000 (20 personas)\n\n" +
      'Pod\u00e9s ver los precios completos en <a href="informacion-precios.html" style="color:#d16c7c">Precios e Info</a>.',

    promos:
      "Promos vigentes:\n\n" +
      "\uD83C\uDF81 <b>Combo Cumplea\u00f1os:</b> Torta 2kg + 12 Cupcakes por $40.000 (ahorr\u00e1s $7.000)\n" +
      "\u2615 <b>Pack Merienda:</b> 12 Cookies + 6 Brownies por $28.000 (ahorr\u00e1s $5.600)\n" +
      "\uD83D\uDCE6 <b>Llev\u00e1 M\u00e1s, Pag\u00e1 Menos:</b> 2 docenas de cupcakes con 15% OFF\n" +
      "\u2B50 <b>Programa Fidelidad:</b> Acumul\u00e1 puntos por cada $10.000 y obt\u00e9n hasta 20% OFF\n" +
      "\uD83D\uDE9A <b>Env\u00edo gratis</b> en compras mayores a $50.000",

    pagos:
      "Formas de pago:\n\n" +
      "\uD83D\uDCB5 <b>Efectivo:</b> 10% de descuento\n" +
      "\uD83D\uDCB8 <b>Transferencia / Mercado Pago:</b> 5% de descuento\n" +
      "\uD83D\uDCF1 <b>Tarjeta de d\u00e9bito:</b> Precio de lista\n" +
      "\uD83D\uDCB3 <b>Tarjeta de cr\u00e9dito:</b> Hasta 3 cuotas sin inter\u00e9s\n\n" +
      "\u26A0\uFE0F Se requiere se\u00f1a del 50% para confirmar el pedido.",

    pedido:
      "\u00A1Genial! Para hacer tu pedido escrib\u00ednos por WhatsApp y te armamos un presupuesto personalizado.\n\n" +
      '<a href="https://wa.me/5492610000000" target="_blank" style="color:#d16c7c;font-weight:600">' +
      "\uD83D\uDCF2 Abrir WhatsApp</a>",

    entregas:
      "Entregas y retiros:\n\n" +
      "\uD83D\uDE97 <b>Env\u00edo a domicilio:</b>\n" +
      "\u2022 Zona centro Mendoza: $1.500\n" +
      "\u2022 Gran Mendoza: $2.500 - $4.000\n" +
      "\u2022 Gratis en compras mayores a $50.000\n\n" +
      "\uD83C\uDFEA <b>Retiro en local:</b> Sin cargo \u2014 Mendoza, zona Godoy Cruz\n" +
      "Coordin\u00e1 el horario por WhatsApp.",
  };

  // --- Helpers ---
  function addMsg(text, sender) {
    var div = document.createElement("div");
    div.className = "da-msg " + sender;
    div.innerHTML = text.replace(/\n/g, "<br>");
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function showOptions(options) {
    var wrap = document.createElement("div");
    wrap.className = "da-options";
    options.forEach(function (opt) {
      var b = document.createElement("button");
      b.className = "da-opt-btn";
      b.textContent = opt.label;
      b.addEventListener("click", function () {
        handleOption(opt);
      });
      wrap.appendChild(b);
    });
    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
  }

  function handleOption(opt) {
    // Remove all option buttons
    var allOpts = body.querySelectorAll(".da-options");
    allOpts.forEach(function (el) {
      el.remove();
    });

    addMsg(opt.label, "user");

    if (opt.key === "menu") {
      showMenu();
      return;
    }

    var answer = responses[opt.key];
    if (answer) {
      setTimeout(function () {
        addMsg(answer, "bot");
        showOptions([{ label: "Volver al men\u00fa", key: "menu" }]);
      }, 400);
    }
  }

  function showMenu() {
    addMsg(
      "\u00A1Hola! Soy el asistente de Dulce Aroma \uD83C\uDF70 \u00BFEn qu\u00e9 puedo ayudarte?",
      "bot"
    );
    showOptions(mainMenu);
  }

  // --- Toggle ---
  btn.addEventListener("click", function () {
    var isOpen = win.classList.toggle("open");
    if (isOpen && body.children.length === 0) {
      showMenu();
    }
  });

  document.getElementById("da-chat-close").addEventListener("click", function () {
    win.classList.remove("open");
  });
})();
