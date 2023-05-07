import { gql } from "@apollo/client";

export const ADD_USER = gql`
    mutation CreateUsuario($usuarioInput: UsuarioInput) {
        createUsuario(usuarioInput: $usuarioInput)
    }
`;
