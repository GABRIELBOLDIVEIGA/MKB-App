import { createContext, useContext, useEffect, useState } from "react";
import { ICarrinho } from "./../../interface/ICarrinho";
import { IProduto } from "interface/IProduto";
import { ProdutoNoCarrinho } from "interface/IProdutoNoCarrinho";

type CurrentCarrinhoContextType = {
    carrinho: IProdCarrinho[];
    setCarrinho: React.Dispatch<React.SetStateAction<IProdCarrinho[]>>;
    quantidadeDoItem: number;
    setQuantidadeDoItem: React.Dispatch<React.SetStateAction<number>>;
    valorTotalCarrinho: number;
    setValorTotalCarrinho: React.Dispatch<React.SetStateAction<number>>;
    quantidadeDeProdutos: number;
    setQuantidadeDeProdutos: React.Dispatch<React.SetStateAction<number>>;
};

export const CarrinhoContext = createContext<CurrentCarrinhoContextType | null>(null);
CarrinhoContext.displayName = "Carrinho";

interface IProps {
    children: string | JSX.Element | JSX.Element[];
}

export const CarrinhoProvider = ({ children }: IProps) => {
    const [carrinho, setCarrinho] = useState<IProdCarrinho[]>([]);
    const [quantidadeDoItem, setQuantidadeDoItem] = useState(0);
    const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0);
    const [quantidadeDeProdutos, setQuantidadeDeProdutos] = useState(0);

    return (
        <CarrinhoContext.Provider
            value={{
                carrinho,
                setCarrinho,
                quantidadeDoItem,
                setQuantidadeDoItem,
                quantidadeDeProdutos,
                setQuantidadeDeProdutos,
                valorTotalCarrinho,
                setValorTotalCarrinho,
            }}
        >
            {children}
        </CarrinhoContext.Provider>
    );
};

interface IProdCarrinho {
    produto: IProduto;
    quantidade: number;
}

export const useCarrinhoContext = () => {
    const carrinhoContext = useContext(CarrinhoContext);
    if (!carrinhoContext) return null;

    const { 
        carrinho, 
        setCarrinho, 
        quantidadeDoItem, 
        setQuantidadeDoItem,
        quantidadeDeProdutos,
        setQuantidadeDeProdutos,
        valorTotalCarrinho,
    } = carrinhoContext;
     
     
    const adicionaProduto = (produto: IProduto, unidades: number | null) => {
        const uni: number = unidades === null ? 0 : unidades;
        setCarrinho([...carrinho, {produto: produto, quantidade: uni}]);
        verificaItemExistente(produto);
    }

    const verificaItemExistente = (produto: IProduto) => {
        const existe = carrinho.map(element => element.produto.Cod_Prod);
        console.log(existe)
    }
    

    return {
        quantidadeDeProdutos,
        setQuantidadeDeProdutos,
        quantidadeDoItem,
        setQuantidadeDoItem,
        adicionaProduto,
    };
};
