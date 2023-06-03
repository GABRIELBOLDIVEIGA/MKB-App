import { gql } from "@apollo/client"

export const CREATE_PRODUTO = gql`
mutation CreateProduto($produtoInput: ProdutoInput!) {
  createProduto(produtoInput: $produtoInput) {
    _id
    cod_prod
    descr_resumida
    descr_detalhada
    preco
    unidade
  }
}
`