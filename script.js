// Lista de vagas disponíveis
const vagas = [
    { id: 'vaga-001', tipo: '', ocupado: false },
    { id: 'vaga-002', tipo: '', ocupado: false },
    { id: 'vaga-003', tipo: '', ocupado: false },
    { id: 'vaga-004', tipo: '', ocupado: false },
    { id: 'vaga-005', tipo: '', ocupado: false },
    { id: 'vaga-006', tipo: '', ocupado: false },
    { id: 'vaga-007', tipo: '', ocupado: false },
    { id: 'vaga-008', tipo: '', ocupado: false },
    { id: 'vaga-009', tipo: '', ocupado: false },
    { id: 'vaga-010', tipo: '', ocupado: false },
    { id: 'vaga-011', tipo: '', ocupado: false },
    { id: 'vaga-012', tipo: '', ocupado: false },
    { id: 'troca-oleo', tipo: 'Troca de Óleo', ocupado: false }
];

// Função para gerar as vagas na tela
function exibirVagas() {
    const vagasContainer = document.querySelector('.vagas');
    const vagaSelect = document.getElementById('vaga');

    vagasContainer.innerHTML = '';  // Limpar as vagas existentes
    vagaSelect.innerHTML = '';  // Limpar opções de vaga

    vagas.forEach((vaga, index) => {
        const vagaDiv = document.createElement('div');
        vagaDiv.classList.add('vaga');
        vagaDiv.classList.add(vaga.ocupado ? 'ocupada' : 'livre');
        vagaDiv.textContent = vaga.id;
        vagaDiv.onclick = () => selecionarVaga(vaga.id);

        vagasContainer.appendChild(vagaDiv);

        // Adicionando a vaga no select para o cadastro de cliente
        const option = document.createElement('option');
        option.value = vaga.id;
        option.textContent = vaga.id;
        if (!vaga.ocupado) {
            vagaSelect.appendChild(option);
        }
    });
}

// Função para selecionar uma vaga
function selecionarVaga(vagaId) {
    const vaga = vagas.find(v => v.id === vagaId);
    if (!vaga.ocupado) {
        vaga.ocupado = true;
        exibirVagas();
    }
}

// Função para cadastrar um cliente
document.getElementById('form-cadastro').onsubmit = function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const veiculo = document.getElementById('veiculo').value;
    const contato = document.getElementById('contato').value;
    const placa = document.getElementById('placa').value;
    const vagaSelecionada = document.getElementById('vaga').value;
    const tipoVaga = document.getElementById('tipo-vaga').value;
    const dataPagamento = new Date(document.getElementById('data-pagamento').value);

    const vaga = vagas.find(v => v.id === vagaSelecionada);
    if (!vaga || vaga.ocupado) {
        alert('A vaga selecionada já está ocupada!');
        return;
    }

    vaga.ocupado = true;
    vaga.tipo = tipoVaga;

    // Cálculo do próximo pagamento baseado no tipo de vaga
    let prazo;
    if (tipoVaga === 'mensal-carro' || tipoVaga === 'mensal-van') {
        prazo = 30; // 30 dias
    } else if (tipoVaga === 'pernoite') {
        prazo = 1; // 1 dia
    }

    const proximoPagamento = new Date(dataPagamento);
    proximoPagamento.setDate(proximoPagamento.getDate() + prazo);

    // Exibir a vaga novamente
    exibirVagas();

    alert(`Cliente cadastrado com sucesso! Próximo pagamento: ${proximoPagamento.toLocaleDateString()}`);
    gerarResumoFinanceiro();
};

// Função para gerar o resumo financeiro
function gerarResumoFinanceiro() {
    const resumoContainer = document.getElementById('resumo');
    const totalMensalCarro = vagas.filter(v => v.tipo === 'mensal-carro' && v.ocupado).length * 180;
    const totalMensalVan = vagas.filter(v => v.tipo === 'mensal-van' && v.ocupado).length * 250;
    const totalPernoite = vagas.filter(v => v.tipo === 'pernoite' && v.ocupado).length * 25;

    const total = totalMensalCarro + totalMensalVan + totalPernoite;

    resumoContainer.innerHTML = `
        <p>Total Mensal Carro: R$ ${totalMensalCarro}</p>
        <p>Total Mensal Van: R$ ${totalMensalVan}</p>
        <p>Total Pernoite: R$ ${totalPernoite}</p>
        <p><strong>Total Arrecadado: R$ ${total}</strong></p>
    `;
}

// Inicializar o app
exibirVagas();
