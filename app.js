// Classe Despesa
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano,
            this.mes = mes,
            this.dia = dia,
            this.tipo = tipo,
            this.descricao = descricao,
            this.valor = valor
    }

    // Validação dos dados
    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }

}

// Classe que armazena os dados
class Bd {
    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0) // Setando valor null para 0
        }
    }
    getNextId() {
        let nextId = localStorage.getItem('id') //Recuperar Dado
        return Number(nextId) + 1// Aumentando o Id
    }
    gravarDados(d) {
        let id = this.getNextId()

        localStorage.setItem(id, JSON.stringify(d)) // Gravando dados com LocalStorage

        localStorage.setItem('id', id) //Atualização do Id
    }
    recuperarTodosRegistros() {

        // Array de despesas
        let despesas = []

        let id = localStorage.getItem('id')

        // Recuperar todas as despesas cadastradas
        for (let i = 1; i <= id; i++) {

            // Recuperando despesa
            let despesa = JSON.parse(localStorage.getItem(i))

            // Possibilidade de indíces nulos

            if (despesa === null) {
                // pula para a próxima interação
                continue
            }
            despesa.id = i
            despesas.push(despesa)
        }

        return despesas
    }
    pesquisar(despesa) {
        let despesasFiltradas = []

        despesasFiltradas = this.recuperarTodosRegistros()

        if (despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        if (despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        if (despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }
        if (despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        if (despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        if (despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltradas
    }
    remover(id) {
        localStorage.removeItem(id)
    }
}

let bd = new Bd()

// Cadastrando Despesas
const cadastrarDespesas = () => {

    // Recuperando dados
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    // Objeto literal
    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    // Melhorias no modal
    if (despesa.validarDados()) {
        bd.gravarDados(despesa)

        document.querySelector('h5').innerHTML = 'Yerh! Despesa adicionada.'

        document.getElementById('divTextColor').className = 'modal-header text-success'

        document.getElementById('divText').innerHTML = 'Despesas gravadas com sucesso!'

        document.getElementById('button').className = 'btn btn-success'

        document.getElementById('button').innerHTML = 'Voltar'

        $('#modalRegistroDespesa').modal('show')

        // Deixando os campos em branco após salvamento
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''



    }
    else {
        document.querySelector('h5').innerHTML = 'Oh não! Algo errado aconteceu :('

        document.getElementById('divTextColor').className = 'modal-header text-danger'

        document.getElementById('divText').innerHTML = 'Existem campos obrigatórios que não foram preenchidos.'

        document.getElementById('button').className = 'btn btn-danger'

        document.getElementById('button').innerHTML = 'Voltar e Corrigir'

        $('#modalRegistroDespesa').modal('show')
    }
}

// Renderizando elementos na página de consulta
const carregaListaDespesas = (despesas = [], filtro = false) => {

    if (despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarTodosRegistros()
    }
    let listaDespesas = document.getElementById('listaDespesas')

    listaDespesas.innerHTML = ''

    despesas.forEach(function (d) {

        // Criando linhas
        let linha = listaDespesas.insertRow()

        // Criando as colunas
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        switch (d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = `R$ ${d.valor}`

        // Criação do botão de exclusão
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-trash-alt"></i>'
        btn.id = `id_despesa_${d.id}`

        btn.onclick = () => {
            let id = btn.id.replace('id_despesa_', '')
            bd.remover(id)

            location.reload()
        }
        linha.insertCell(4).append(btn)
    })
}

const pesquisarDespesa = () => {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    carregaListaDespesas(despesas, true)
}