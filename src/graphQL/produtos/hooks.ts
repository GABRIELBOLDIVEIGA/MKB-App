import { useMutation, useQuery } from "@apollo/client";
import { OBTER_PRODUTOS } from "./queries";
import { Produto } from "interface/Produto";
import { CREATE_PRODUTO } from "./mutations";

export const useProduto = () => {
    const { data, loading, error, refetch } = useQuery<{ getProdutos: Produto[] }>(OBTER_PRODUTOS);

    return { data: data?.getProdutos, loading, error, refetch }
};


export const useCreateProduto = () => { 
    const [createProduto, { data, error, loading }] = useMutation<{createProduto: Produto}>(CREATE_PRODUTO);

    return { createProduto, data: data?.createProduto, error, loading}
}