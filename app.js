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
}
class Bd {
    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0) // Setando valor null para 0
        }
    }
    getNextId() {
        let nextId = localStorage.getItem('id') //Recuperar Dado
        return parseInt(nextId + 1) // Aumentando o Id
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

    // Chamada de função que armazena os dados
    bd.gravarDados(despesa)
}