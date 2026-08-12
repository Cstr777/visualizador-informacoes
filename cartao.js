// Atualizar cartão em tempo real
function updateCard() {
    const name = document.getElementById('name').value || 'Seu Nome';
    const title = document.getElementById('title').value || 'Sua Profissão';
    const email = document.getElementById('email').value || 'seu@email.com';
    const phone = document.getElementById('phone').value || '(XX) XXXXX-XXXX';
    const location = document.getElementById('location').value || 'Sua Cidade';

    document.getElementById('previewName').textContent = name;
    document.getElementById('previewTitle').textContent = title;
    document.getElementById('previewEmail').textContent = email;
    document.getElementById('previewPhone').textContent = phone;
    document.getElementById('previewLocation').textContent = location;
}

// Mudar cor do cartão
function changeCardColor(gradient) {
    document.getElementById('businessCard').style.background = gradient;
    showToast('✨ Cor alterada!');
}

// Preencher com exemplo
function preencherExemplo() {
    document.getElementById('name').value = 'Vanessa Estevão';
    document.getElementById('title').value = 'Designer Gráfico';
    document.getElementById('email').value = 'vanessa.estevão@example.com';
    document.getElementById('phone').value = '(11) 98176-0444';
    document.getElementById('location').value = 'São Paulo, SP';
    document.getElementById('company').value = 'Vanessa Design Studio';
    updateCard();
    showToast('📋 Dados de exemplo carregados!');
}

// Limpar formulário
function limparFormulario() {
    document.getElementById('name').value = '';
    document.getElementById('title').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('location').value = '';
    document.getElementById('company').value = '';
    updateCard();
    showToast('🗑️ Formulário limpo!');
}

// Exportar como PNG
function exportarPNG() {
    // Usar html2canvas para captura de tela (requer biblioteca externa)
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.onload = function() {
        const card = document.getElementById('businessCard');
        html2canvas(card, {
            backgroundColor: null,
            scale: 2
        }).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = `cartao-visita-${document.getElementById('name').value || 'novo'}.png`;
            link.click();
            showToast('📥 Cartão exportado como PNG!');
        });
    };
    document.head.appendChild(script);
}

// Exportar como JSON
function exportarJSON() {
    const dados = {
        nome: document.getElementById('name').value,
        profissao: document.getElementById('title').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('phone').value,
        localizacao: document.getElementById('location').value,
        empresa: document.getElementById('company').value,
        dataCriacao: new Date().toLocaleString('pt-BR')
    };

    const dataStr = JSON.stringify(dados, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cartao-visita-${dados.nome || 'novo'}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('💾 Cartão exportado como JSON!');
}

// Mostrar notificação
function showToast(message, duration = 2000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Inicializar
window.addEventListener('load', () => {
    console.log('Cartão de Visita Digital iniciado!');
    updateCard();
});
