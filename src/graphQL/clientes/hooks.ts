import { useMutation, useQuery } from "@apollo/client";
import { Cliente } from "interface/Cliente";
import { OBTER_CLIENTES, OBTER_CLIENTE, OBTER_ALL_CLIENTES } from "./queries";
import { CADASTRAR_CLIENTE_NOVO_BANCO, CRIAR_CLIENTE, UPDATE_CLIENTE } from "./mudations";
import { ClienteForm } from "components/ClienteForm/types";

export const useClientes = () => {
  const { data, loading, error } = useQuery<{ getClientes: Cliente[] }>(OBTER_CLIENTES);

  return { data: data?.getClientes, loading, error };
};

export const useGetAllClientes = () => {
  const { data, loading, error, refetch } = useQuery<{ getClientes: Cliente[] }>(OBTER_ALL_CLIENTES);

  return { data: data?.getClientes, loading, error, refetch };
};

export const useGetClienteById = (id: string) => {
  const { data, loading, error, refetch } = useQuery<{ getCliente: Cliente }>(OBTER_CLIENTE, {
    variables: {
      id,
    },
  });

  return { data: data?.getCliente, loading, error, refetch }
};

export const useCreateCliente = () => {
  const [createCliente, { data, loading, error }] = useMutation<Cliente>(CRIAR_CLIENTE)

  return { createCliente, data, loading, error }
}

export const useUpdateCliente = () => { 
  const [updateCliente, { data, loading, error }] = useMutation<Cliente>(UPDATE_CLIENTE)
  
  return {updateCliente, data, loading, error }
}

////////// NOVO BANCO
export const useCadastrarClientesNovoBanco = () => {
  const [adicionarCliente, { data, loading, error }] = useMutation(CADASTRAR_CLIENTE_NOVO_BANCO)

  return { adicionarCliente, data, loading, error }
}