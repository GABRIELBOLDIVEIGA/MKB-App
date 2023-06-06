import { useMutation, useQuery } from "@apollo/client";
import { Cliente } from "interface/Cliente";
import { OBTER_CLIENTES, OBTER_CLIENTE, OBTER_ALL_CLIENTES } from "./queries";
import { CRIAR_CLIENTE } from "./mudations";

export const useClientes = () => {
  const { data, loading, error } = useQuery<{ getClientes: Cliente[] }>(OBTER_CLIENTES);

  return { data: data?.getClientes, loading, error };
};

export const useGetAllClientes = () => {
  const { data, loading, error } = useQuery<{ getClientes: Cliente[] }>(OBTER_ALL_CLIENTES);

  return { data: data?.getClientes, loading, error };
};

export const useGetClienteById = (id: string) => {
  const { data, loading, error, refetch } = useQuery<{ getCliente: Cliente }>(OBTER_CLIENTE, {
    variables: {
      id,
    },
  });

  return { data: data?.getCliente, loading, error, refetch }
};

export const useCriarCliente = () => {
  // const criarCliente = useMutation<Cliente>(CRIAR_CLIENTE)

  // return criarCliente

  return useMutation<Cliente>(CRIAR_CLIENTE)
}