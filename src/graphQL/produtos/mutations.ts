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

export const UPDATE_PRODUTO = gql`
mutation UpdateProduto($id: ID!, $produtoInput: ProdutoInput) {
  updateProduto(ID: $id, produtoInput: $produtoInput) {
    descr_resumida
    descr_detalhada
    preco
    unidade
    cod_prod
    _id
  }
}
`