import { gql } from "@apollo/client";

export const CRIAR_CLIENTE = gql`
mutation CreateCliente($clienteInput: ClienteInput) {
    createCliente(clienteInput: $clienteInput)
  }
`

export const UPDATE_CLIENTE = gql`
mutation UpdateCliente($id: ID!, $clienteUpdateInput: ClienteUpdateInput) {
  updateCliente(ID: $id, clienteUpdateInput: $clienteUpdateInput) {
    nome
    _id
    cod
    cnpj
    endereco
    bairro
    cidade
    cep
    uf
    email
    ddd
    fone1
    fone2
    celular
    fax
    fantasia
    numero
  }
}
`

///////////////////// NOVO BANCO

export const CADASTRAR_CLIENTE_NOVO_BANCO = gql`
  mutation AdicionarCliente($clienteInput: ClienteInput) {
  adicionarCliente(clienteInput: $clienteInput) {
    _id
    nome
    documento
    inscricaoEstadual
    razaoSocial
    cep
    endereco
    numero
    complemento
    bairro
    municipio
    uf
    telefone
    email
    observacoes
    usuario {
      _id
      nome
      documento
      razaoSocial
      cep
      endereco
      numero
      complemento
      bairro
      municipio
      uf
      telefone
      email
      observacoes
      ativo
      jwt
      senha
      permicao
      dataCadastro
    }
  }
}
` 