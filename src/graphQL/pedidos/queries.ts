import { gql } from "@apollo/client";

export const GET_PEDIDOS_BY_USER_ID = gql`
query GetPedidosByUserId($id: ID!) {
  getPedidosByUserId(ID: $id) {
    _id
    clienteID
    carrinho {
      descr_resumida
      preco
      quantidade
      cod_prod
      descr_detalhada
      unidade
    }
    usuarioID
    total
  }
}
`