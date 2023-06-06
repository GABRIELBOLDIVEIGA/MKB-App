import { gql } from "@apollo/client";

export const OBTER_PRODUTOS = gql`
    query GetProdutos {
        getProdutos {
            _id
            cod_prod
            descr_resumida
            descr_detalhada
            preco
            unidade
        }
    }
`;

export const GET_PRODUTO_BY_ID = gql`
query GetProduto($id: ID!) {
    getProduto(ID: $id) {
      _id
      cod_prod
      descr_resumida
      descr_detalhada
      preco
      unidade
    }
  }
`
