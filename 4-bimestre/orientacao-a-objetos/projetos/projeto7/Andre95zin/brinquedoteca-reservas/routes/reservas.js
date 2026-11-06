
const express = require("express")
const router = express.Router()

const validarReserva = require("../middlewares/validarReserva")

let reservas = [
    {
        id: 1, responsavel: "Ana", brinquedo: "Quebra-Cabeca", dias: 3,situacao: "devolvida"
    },
    {
        id: 2, responsavel: "Bruno", brinquedo: "Jogo de Tabuleiro", dias: 7, situacao: "ativa"
    },
    {
        id: 3, responsavel: "Carla", brinquedo: "Blocos", dias: 5, situacao: "ativa"
    }
]

router.get("/", (req, res) => {
    let resultado = [...reservas]
    const { situacao, diasMin } = req.query
    if (situacao) {
        resultado = resultado.filter(
            reserva => reserva.situacao === situacao
        )
    }

    if (diasMin !== undefined) {
        resultado = resultado.filter(
            reserva => reserva.dias >= Number(diasMin)
        )
    }

    res.status(200).json(resultado)
})

router.get("/:id", (req, res, next) => {
    const id = Number(req.params.id)

    const reserva = reservas.find(
        reserva => reserva.id === id
    )

    if (!reserva) {
        const erro = new Error("Reserva nao encontrado")
        erro.status = 404

        return next(erro)
    }

    res.status(200).json(reserva)
})

router.post("/", validarReserva, (req, res) => {
    const { responsavel, brinquedo, dias } = req.body
    const maiorId = Math.max(...reservas.map(r => r.id))
    const novaReserva = {
        id: maiorId + 1,
        responsavel,
        brinquedo,
        dias,
        situacao: "solicitada"
    }

    reservas.push(novaReserva)

    res.status(201).json({
        mensagem: "Registro de reserva criado"
    })
})

module.exports = router