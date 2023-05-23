import { gql } from "@apollo/client";

export const CRIAR_CLIENTE = gql`
mutation CreateCliente($clienteInput: ClienteInput) {
    createCliente(clienteInput: $clienteInput)
  }
`