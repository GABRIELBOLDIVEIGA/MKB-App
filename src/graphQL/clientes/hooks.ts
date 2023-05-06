import { useQuery } from "@apollo/client";
import { Cliente } from "interface/Cliente";
import { OBTER_CLIENTES } from "./queries";

export const useCliente = () => {
    const { data } = useQuery<{ getClientes: Cliente[] }>(OBTER_CLIENTES);

    return data?.getClientes;
};
