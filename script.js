// ==========================================
// GD LAVA CAR — JAVASCRIPT
// ==========================================


// ==========================================
// 1. MENU MOBILE
// ==========================================

const botaoMenu = document.getElementById("menu-mobile");
const menu = document.getElementById("menu");

if (botaoMenu && menu) {

    botaoMenu.addEventListener("click", () => {

        // Abre ou fecha o menu
        const menuAberto = menu.classList.toggle("ativo");

        // Atualiza o estado do botão
        botaoMenu.setAttribute("aria-expanded", menuAberto);

        // Troca o ícone do botão
        botaoMenu.textContent = menuAberto ? "✕" : "☰";

        // Atualiza a descrição para acessibilidade
        botaoMenu.setAttribute(
            "aria-label",
            menuAberto ? "Fechar menu" : "Abrir menu"
        );

    });


    // Fecha o menu quando clicar em um link
    const linksMenu = menu.querySelectorAll("a");

    linksMenu.forEach((link) => {

        link.addEventListener("click", () => {

            menu.classList.remove("ativo");

            botaoMenu.textContent = "☰";

            botaoMenu.setAttribute("aria-expanded", "false");

            botaoMenu.setAttribute("aria-label", "Abrir menu");

        });

    });

}


// ==========================================
// 2. ANO AUTOMÁTICO NO RODAPÉ
// ==========================================

const elementoAno = document.getElementById("ano");

if (elementoAno) {
    elementoAno.textContent = new Date().getFullYear();
}


// ==========================================
// 3. ROLAGEM SUAVE PARA AS SEÇÕES
// ==========================================

const linksInternos = document.querySelectorAll('a[href^="#"]');

linksInternos.forEach((link) => {

    link.addEventListener("click", (evento) => {

        const destino = link.getAttribute("href");

        // Ignora links vazios
        if (!destino || destino === "#") {
            return;
        }

        const secao = document.querySelector(destino);

        // Só altera o comportamento se a seção existir
        if (secao) {

            evento.preventDefault();

            secao.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// ==========================================
// 4. ANIMAÇÃO DOS ELEMENTOS AO APARECER
// ==========================================

const elementosAnimados = document.querySelectorAll(
    ".card-servico, .card-comparacao, .foto-trabalho"
);

if ("IntersectionObserver" in window) {

    const observador = new IntersectionObserver((entradas, observer) => {

        entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("visivel");

                observer.unobserve(entrada.target);

            }

        });

    }, {
        threshold: 0.15
    });

    elementosAnimados.forEach((elemento) => {

        elemento.classList.add("revelar");

        observador.observe(elemento);

    });

}


// ==========================================
// 5. AMPLIAR FOTOS DA GALERIA E DO ANTES E DEPOIS
// ==========================================

const seletorFotosAmpliaveis =
    "#trabalhos .foto-trabalho img, #antes-depois .comparacao-imagens img";
const visualizador = document.getElementById("visualizador-imagem");
const fotoAmpliada = document.getElementById("visualizador-foto");
const legendaAmpliada = document.getElementById("visualizador-legenda");
const botaoFecharVisualizador = document.getElementById("visualizador-fechar");

if (visualizador instanceof HTMLDialogElement && fotoAmpliada && legendaAmpliada) {
    const abrirVisualizador = (foto) => {
        fotoAmpliada.src = foto.currentSrc || foto.src;
        fotoAmpliada.alt = foto.alt;
        legendaAmpliada.textContent = foto.alt;
        visualizador.showModal();
    };

    document.querySelectorAll(seletorFotosAmpliaveis).forEach((foto) => {
        const areaClicavel = foto.parentElement;

        areaClicavel.tabIndex = 0;
        areaClicavel.setAttribute("role", "button");
        areaClicavel.setAttribute("aria-haspopup", "dialog");
        areaClicavel.setAttribute("aria-controls", "visualizador-imagem");
        areaClicavel.setAttribute("aria-label", `Ampliar imagem: ${foto.alt}`);
        areaClicavel.addEventListener("click", () => abrirVisualizador(foto));
        areaClicavel.addEventListener("keydown", (evento) => {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                abrirVisualizador(foto);
            }
        });
    });

    botaoFecharVisualizador?.addEventListener("click", () => visualizador.close());
    visualizador.addEventListener("click", (evento) => {
        if (evento.target === visualizador) {
            visualizador.close();
        }
    });
    visualizador.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            evento.preventDefault();
            visualizador.close();
        }
    });
    visualizador.addEventListener("close", () => {
        fotoAmpliada.removeAttribute("src");
    });
}


// ==========================================
// 6. ANO E MENSAGEM NO CONSOLE
// ==========================================

console.log("GD Lava Car carregado com sucesso! 🚗");