document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formContato");
    const status = document.getElementById("mensagemStatus");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault(); // Impede o recarregamento da página

            // Feedback visual de carregamento
            const button = form.querySelector("button");
            const originalButtonText = button.innerText;
            button.innerText = "Enviando...";
            button.disabled = true;

            const data = new FormData(event.target);

            try {
                const response = await fetch(event.target.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Sucesso
                    status.innerHTML = "✅ Mensagem enviada com sucesso! Entraremos em contato em breve.";
                    status.style.color = "green";
                    form.reset(); // Limpa os campos
                } else {
                    // Erro retornado pelo servidor
                    const result = await response.json();
                    status.innerHTML = "❌ Erro: " + (result.errors ? result.errors.map(e => e.message).join(", ") : "Não foi possível enviar.");
                    status.style.color = "red";
                }
            } catch (error) {
                // Erro de rede ou conexão
                status.innerHTML = "❌ Ops! Ocorreu um erro ao conectar ao servidor.";
                status.style.color = "red";
            } finally {
                // Restaura o botão
                button.innerText = originalButtonText;
                button.disabled = false;
            }
        });
    }
});
setTimeout(() => {
  window.open(
    "https://wa.me/5584991887917?text=Enviei%20uma%20mensagem%20pelo%20site%20e%20gostaria%20de%20continuar%20o%20atendimento.",
    "_blank"
  );
}, 1500);

document.addEventListener("DOMContentLoaded", () => {
    // ... seu código existente ...

    // Lógica do Menu Sanduíche
    const menuIcon = document.getElementById("menuIcon");
    const menuList = document.getElementById("menuList");

    if (menuIcon && menuList) {
        // Abre/Fecha ao clicar no ícone
        menuIcon.addEventListener("click", () => {
            menuList.classList.toggle("ativo");
        });

        // Fecha o menu ao clicar em um link
        const links = document.querySelectorAll("nav ul li a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                menuList.classList.remove("ativo");
            });
        });
    }
});

