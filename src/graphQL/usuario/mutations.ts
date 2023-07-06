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
    ddd
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

export const UPDATE_SENHA = gql`
  mutation UpdateSenha($novaSenhaInput: NovaSenhaInput) {
  updateSenha(novaSenhaInput: $novaSenhaInput)
}
`

export const ESQUECI_SENHA = gql`
  mutation EsqueciMinhaSenha($esqueciSenhaInput: EsqueciSenhaInput) {
  esqueciMinhaSenha(esqueciSenhaInput: $esqueciSenhaInput)
}
`

///////// NOVO_BANCO

export const CADASTRAR_USUARIO_NOVO_BANCO = gql`
  mutation AdicionarUsuario($usuarioInput: UsuarioInput) {
  adicionarUsuario(usuarioInput: $usuarioInput) {
    _id
    nome
    documento
    razaoSocial
  }
}
`

