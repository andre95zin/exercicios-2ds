
function validarReserva(req, res, next) {
    const { responsavel, brinquedo, dias } = req.body
    if (!responsavel) {
        return res.status(400).json({
            erro: "O campo responsavel e obrigatorio"
        })
    }
    
    if (!brinquedo) {
        return res.status(400).json({
            erro: "O campo brinquedo e obrigatorio"
        })
    }

    if (typeof dias !== "number") {
        return res.status(400).json({
            erro: "O campo dias deve ser um numero"
        })
    }

    if (dias <= 0) {
        return res.status(400).json({
            erro: "O campo dias deve ser maior que zero"
        })
    }

    next()
}

module.exports = validarReserva