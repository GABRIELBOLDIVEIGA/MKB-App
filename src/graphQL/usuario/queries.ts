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