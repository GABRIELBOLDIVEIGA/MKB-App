import { useQuery } from "@apollo/client";
import { OBTER_PRODUTOS } from "./queries";
import { Produto } from "interface/Produto";

export const useProduto = () => {
    const { data } = useQuery<{ getProdutos: Produto[] }>(OBTER_PRODUTOS);

    return data?.getProdutos;
};
