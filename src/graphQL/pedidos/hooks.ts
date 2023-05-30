import { useMutation, useQuery } from "@apollo/client"
import { CRIAR_PEDIDO } from "./mutations"
import { GET_PEDIDOS_BY_USER_ID } from "./queries"

interface Pedido { 
    _id: string,
    pedido: string
}

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
    return  { data: data?.getPedidosByUserId, loading, error, refetch }
}