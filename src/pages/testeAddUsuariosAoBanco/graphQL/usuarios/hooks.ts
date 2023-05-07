import { useMutation } from "@apollo/client";
import { ADD_USER } from "./queries";
import { Usuario } from "interface/Usuario";

export const useAdicionarItem = (usuario: Usuario) => {
    return useMutation(ADD_USER, {
        variables: {
            nome: usuario.nome,
            cpf: usuario.cpf,
            email: usuario.email,
            senha: usuario.senha,
            privilegio: usuario.privilegio,
        },
    });
};
