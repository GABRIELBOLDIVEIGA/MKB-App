import { useQuery } from "@apollo/client";
import { OBTER_PRODUTOS } from "./queries";
import { Produto } from "interface/Produto";

export const useProduto = () => {
    const { data, loading, error } = useQuery<{ getProdutos: Produto[] }>(OBTER_PRODUTOS);

    return { data: data?.getProdutos, loading, error }
};
