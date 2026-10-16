```javascript
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
// 5. ANO E MENSAGEM NO CONSOLE
// ==========================================

console.log("GD Lava Car carregado com sucesso! 🚗");
```