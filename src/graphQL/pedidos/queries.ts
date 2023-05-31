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

export const GET_PEDIDOS_BY_USER_ID_V2 = gql`
query GetPedidosByUserIdV2($id: ID!) {
  getPedidosByUserIdV2(ID: $id) {
    pedido {
      carrinho {
        descr_resumida
        preco
        quantidade
      }
      total
    }
    cliente {
      nome
      cnpj
      email
    }
  }
}
`