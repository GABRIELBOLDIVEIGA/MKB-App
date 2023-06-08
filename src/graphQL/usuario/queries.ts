import { gql } from "@apollo/client"

export const GET_USUARIOS = gql`
query GetUsuarios {
    getUsuarios {
      _id
      cpf
      email
      senha
      privilegio
      nome
      token
      telefone
      celular
    }
  }
` 

export const GET_USUARIO_BY_ID = gql`
  query GetUsuario($id: ID!) {
  getUsuario(ID: $id) {
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
}
`