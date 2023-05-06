import { gql } from "@apollo/client";

export const OBTER_CLIENTES = gql`
    query GetClientes($limit: Int) {
        getClientes(limit: $limit) {
            _id
            nome
        }
    }
`;

export const OBTER_CLIENTE = gql`
    query GetCliente($id: ID!) {
        getCliente(ID: $id) {
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
    }
`;
