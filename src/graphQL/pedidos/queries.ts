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
export const GET_ALL_PEDIDOS = gql`
query GetPedidos {
  getPedidos {
    cliente {
      nome
      email
    }
    usuario {
      nome
      email
    }
    pedido {
      _id
      total
      carrinho {
        cod_prod
        descr_resumida
        descr_detalhada
        preco
        unidade
        quantidade
      }
    }
  }
}
`

export const GET_PEDIDO_BY_ID = gql`
query GetPedido($id: ID!) {
  getPedido(ID: $id) {
    cliente {
      _id
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
    }
    usuario {
      _id
      cpf
      email
      senha
      telefone
      celular
      privilegio
      nome
      token
    }
    pedido {
      _id
      usuarioID
      carrinho {
        cod_prod
        descr_resumida
        descr_detalhada
        preco
        unidade
        quantidade
      }
      total
      clienteID
    }
  }
}
`