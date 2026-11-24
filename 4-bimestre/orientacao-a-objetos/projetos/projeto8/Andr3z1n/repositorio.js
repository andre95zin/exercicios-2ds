const fs = require('node:fs/promises')

function obterCaminhoArquivo() {
  return process.env.ARQUIVO_RESERVAS || 'reservas.json'
}

async function listar() {
  const caminho = obterCaminhoArquivo()

  try {
    const conteudo = await fs.readFile(caminho, 'utf8')
    return JSON.parse(conteudo)
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      return [];
    }
    throw erro;
  }
}

async function gravarLista(lista) {
  const caminho = obterCaminhoArquivo()
  await fs.writeFile(caminho, JSON.stringify(lista, null, 2), 'utf8')
}

async function salvar(reserva) {
  const lista = await listar()
  lista.push(reserva)
  await gravarLista(lista)
  return reserva
}

async function atualizar(id, dados) {
  const lista = await listar()
  const indice = lista.findIndex((item) => item.id === id)

  if (indice === -1) {
    return null
  }

  const registroAtualizado = {
    ...lista[indice],
    ...dados,
    id: lista[indice].id,
  }

  lista[indice] = registroAtualizado;
  await gravarLista(lista)
  return registroAtualizado
}

async function remover(id) {
  const lista = await listar()
  const novaLista = lista.filter((item) => item.id !== id)

  if (novaLista.length === lista.length) {
    return false
  }

  await gravarLista(novaLista)
  return true
}

module.exports = {
  listar,
  salvar,
  atualizar,
  remover,
}