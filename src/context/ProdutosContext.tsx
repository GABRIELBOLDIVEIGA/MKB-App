import { useClientes } from "graphQL/clientes/hooks";
import { useProduto } from "graphQL/produtos/hooks";
import { Cliente } from "interface/Cliente";
import { Produto } from "interface/Produto";
import { createContext, useContext, useEffect, useState } from "react";

type ProdutosContextType = {
    produtos: Produto[] | undefined;
    setProdutos: React.Dispatch<React.SetStateAction<Produto[] | undefined>>;
}

const DEFAULT_VALUE = {
    produtos: [],
    setProdutos: () => { }
}

export const ProdutosContext = createContext<ProdutosContextType>(DEFAULT_VALUE);
ProdutosContext.displayName = "Produtos";

interface IProps {
    children: string | JSX.Element | JSX.Element[];
  }
export const ProdutosProvider = ({children}:IProps) => {
    const [produtos, setProdutos] = useState<Produto[] | undefined>();
    return <ProdutosContext.Provider
        value={{produtos, setProdutos}}
    >
        {children}
    </ProdutosContext.Provider>
}

export const useProdutosContext = () => {
    const produtosContext = useContext(ProdutosContext);
    // const { produtos, setProdutos } = produtosContext;
    const { data, loading, error } = useProduto();

    // setProdutos(data);

    const produtos = data

    return {produtos, loading, error}
}