import { gql } from "@apollo/client";

export const CRIAR_PEDIDO = gql`
mutation CreatePedido($pedidoInput: PedidoInput!) {
  createPedido(pedidoInput: $pedidoInput)
}
`