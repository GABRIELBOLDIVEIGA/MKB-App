import { useMutation, useQuery } from "@apollo/client";
import { GET_PRODUTO_BY_ID, OBTER_PRODUTOS } from "./queries";
import { Produto } from "interface/Produto";
import { CREATE_PRODUTO, UPDATE_PRODUTO } from "./mutations";

export const useProduto = () => {
    const { data, loading, error, refetch } = useQuery<{ getProdutos: Produto[] }>(OBTER_PRODUTOS);

    return { data: data?.getProdutos, loading, error, refetch }
};

export const useGetProdutoById = (id: string) => { 
    const { data, loading, error, refetch } = useQuery<{ getProduto: Produto}>(GET_PRODUTO_BY_ID, {
        variables: {
            id: id
        }
    });

    return { data: data?.getProduto, loading, error, refetch };
}


export const useCreateProduto = () => { 
    const [createProduto, { data, error, loading }] = useMutation<{createProduto: Produto}>(CREATE_PRODUTO);

    return { createProduto, data: data?.createProduto, error, loading}
}

export const useUpdateProduto = () => { 
    const [updateProduto, { data, error, loading }] = useMutation<{updateProduto: Produto}>(UPDATE_PRODUTO)

    return {updateProduto, data: data?.updateProduto, loading, error}
}