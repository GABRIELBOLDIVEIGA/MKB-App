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