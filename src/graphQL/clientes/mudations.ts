import { gql } from "@apollo/client";

export const CRIAR_CLIENTE = gql`
mutation CreateCliente($clienteInput: ClienteInput) {
    createCliente(clienteInput: $clienteInput)
  }
`

export const UPDATE_CLIENTE = gql`
mutation UpdateCliente($id: ID!, $clienteInput: ClienteInput) {
  updateCliente(ID: $id, clienteInput: $clienteInput) {
    cod
    nome
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
    _id
  }
}
`