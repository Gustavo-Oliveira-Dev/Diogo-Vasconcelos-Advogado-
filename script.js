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


document.addEventListener("DOMContentLoaded", () => {
    // ... outros códigos ...

    const menuIcon = document.getElementById("menuIcon");
    const menuList = document.getElementById("menuList");

    if (menuIcon && menuList) {
        menuIcon.addEventListener("click", () => {
            // Isso vai alternar a classe 'ativo' no CSS
            menuList.classList.toggle("ativo");
            console.log("Clique no menu detectado!"); // Abra o console (F12) pra ver se aparece isso
        });

        // Fechar ao clicar num link
        const links = document.querySelectorAll("nav ul li a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                menuList.classList.remove("ativo");
            });
        });
    } else {
        console.error("Erro: Elementos do menu não encontrados no HTML.");
    }
});

