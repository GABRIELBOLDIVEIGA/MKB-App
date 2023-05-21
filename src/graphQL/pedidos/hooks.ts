import { useMutation } from "@apollo/client"
import { CRIAR_PEDIDO } from "./mutations"

interface Pedido { 
    _id: string,
    pedido: string
}

export const useCriarPedido = () => {
    const pedido = useMutation<Pedido>(CRIAR_PEDIDO);
    return pedido;
}