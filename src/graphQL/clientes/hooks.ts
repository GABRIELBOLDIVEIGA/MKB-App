import { useMutation, useQuery } from "@apollo/client";
import { Cliente } from "interface/Cliente";
import { OBTER_CLIENTES, OBTER_CLIENTE } from "./queries";
import { CRIAR_CLIENTE } from "./mudations";

export const useClientes = () => {
    const { data } = useQuery<{ getClientes: Cliente[] }>(OBTER_CLIENTES);

    return data?.getClientes;
};

export const useCliente = (id: string) => {
    return useQuery<{ getCliente: Cliente }>(OBTER_CLIENTE, {
        variables: {
            id,
        },
    });
};

export const useCriarCliente = () => {
    // const criarCliente = useMutation<Cliente>(CRIAR_CLIENTE)

    // return criarCliente

    return useMutation<Cliente>(CRIAR_CLIENTE)
}