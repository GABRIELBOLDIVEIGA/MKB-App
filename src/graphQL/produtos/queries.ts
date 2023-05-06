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
