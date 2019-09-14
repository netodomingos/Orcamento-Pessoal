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