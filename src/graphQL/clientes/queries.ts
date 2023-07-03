import { gql } from "@apollo/client";

export const OBTER_CLIENTES = gql`
    query GetClientes($limit: Int) {
        getClientes(limit: $limit) {
            _id
            nome
            cnpj
        }
    }
`;

export const OBTER_ALL_CLIENTES = gql`
    query GetClientes($limit: Int) {
        getClientes(limit: $limit) {
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
