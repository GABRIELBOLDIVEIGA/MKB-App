import { gql } from "@apollo/client";

export const LOGIN = gql`
mutation LoginUsuario($loginInput: LoginInput) {
    loginUsuario(loginInput: $loginInput) {
      _id
      cpf
      email
      nome
      privilegio
      token
    }
  }
`