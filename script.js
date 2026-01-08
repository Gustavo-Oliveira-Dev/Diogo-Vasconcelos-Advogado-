document.addEventListener("DOMContentLoaded", () => {
    
    // --- LÓGICA DO MENU CELULAR ---
    const menuIcon = document.getElementById("menuIcon");
    const menuList = document.getElementById("menuList");

    if (menuIcon && menuList) {
        menuIcon.addEventListener("click", () => {
            menuList.classList.toggle("ativo");
        });

        const links = document.querySelectorAll("nav ul li a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                menuList.classList.remove("ativo");
            });
        });
    }

    // --- LÓGICA DO FORMULÁRIO DE CONTATO ---
    const form = document.getElementById("formContato");
    const status = document.getElementById("mensagemStatus");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault(); 

            const button = form.querySelector("button");
            const originalButtonText = button.innerText;
            button.innerText = "Enviando...";
            button.disabled = true;

            const data = new FormData(event.target);

            try {
                const response = await fetch(event.target.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    status.innerHTML = "✅ Mensagem enviada com sucesso!";
                    status.style.color = "green";
                    form.reset();

                    // --- O CÓDIGO DO WHATSAPP VEM AQUI AGORA ---
                    // Só executa se o envio deu certo
                    setTimeout(() => {
                        window.open(
                            "https://wa.me/5584991887917?text=Enviei%20uma%20mensagem%20pelo%20site%20e%20gostaria%20de%20continuar%20o%20atendimento.",
                            "_blank"
                        );
                    }, 1500); 

                } else {
                    const result = await response.json();
                    status.innerHTML = "❌ Erro: " + (result.errors ? result.errors.map(e => e.message).join(", ") : "Erro ao enviar.");
                    status.style.color = "red";
                }
            } catch (error) {
                status.innerHTML = "❌ Erro ao conectar ao servidor.";
                status.style.color = "red";
            } finally {
                button.innerText = originalButtonText;
                button.disabled = false;
            }
        });
    }
});

