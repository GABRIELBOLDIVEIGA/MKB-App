import { useMutation, useQuery } from "@apollo/client"
import { CRIAR_PEDIDO } from "./mutations"
import { GET_ALL_PEDIDOS, GET_PEDIDOS_BY_ID_2_CSV, GET_PEDIDOS_BY_USER_ID, GET_PEDIDOS_BY_USER_ID_V2, GET_PEDIDO_BY_ID } from "./queries"
import { Pedido } from "interface/Pedido";
import { Cliente } from "interface/Cliente";
import { Usuario } from "interface/Usuario";
import { PedidoCSV } from "interface/PedidoCSV";

export const useCriarPedido = () => {
  const [criarPedido, { data, loading, error }] = useMutation(CRIAR_PEDIDO);

  return { criarPedido, data, loading, error }
};

export const useGetPedidoByUserId = (id: string) => {
  const { data, loading, error, refetch } = useQuery(GET_PEDIDOS_BY_USER_ID, {
    variables: {
      id
    }
  })

  return { data: data?.getPedidosByUserId, loading, error, refetch }
}

export const useGetPedidosByUserIdV2 = (id: string) => {
  const { data, loading, error, refetch } = useQuery(GET_PEDIDOS_BY_USER_ID_V2, {
    variables: {
      id
    }
  })

  return { data: data?.getPedidosByUserIdV2, loading, error, refetch }
}

export const useGetAllPedidos = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_PEDIDOS)

  return { data: data?.getPedidos, loading, error, refetch }
}

interface IPedido {
  cliente: Cliente;
  usuario: Usuario;
  pedido: Pedido;
}
export const useGetPedidoById = (id: string) => {
  const { data, loading, error, refetch } = useQuery<{ getPedido: IPedido }>(GET_PEDIDO_BY_ID, {
    variables: {
      id
    }
  });

  return { data: data?.getPedido, loading, error, refetch };
}

export const useGetPedidoById2Csv = (id: string) => {
  const { data, loading, error, refetch } = useQuery<{getPedido: PedidoCSV }>(GET_PEDIDOS_BY_ID_2_CSV, {
    variables: {
      id
    }
  });

  return { data: data?.getPedido, loading, error, refetch };
}