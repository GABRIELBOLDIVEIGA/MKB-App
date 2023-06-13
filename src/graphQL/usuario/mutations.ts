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

export const CRIAR_FUNCIONARIO = gql`
mutation CreateUsuario($usuarioInput: UsuarioInput) {
  createUsuario(usuarioInput: $usuarioInput) {
    celular
    cpf
    email
    nome
    privilegio
    senha
    telefone
  }
}
`

export const UPDATE_USUARIO = gql`
mutation UpdateUsuario($id: ID!, $usuarioUpdateInput: UsuarioUpdateInput) {
  updateUsuario(ID: $id, usuarioUpdateInput: $usuarioUpdateInput)
}
`