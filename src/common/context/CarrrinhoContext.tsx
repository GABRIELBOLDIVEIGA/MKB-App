import { createContext, useContext, useEffect, useState } from "react";
import { ICarrinho } from "./../../interface/ICarrinho";
import { IProduto } from "interface/IProduto";
import { ProdutoNoCarrinho } from "interface/IProdutoNoCarrinho";

type CurrentCarrinhoContextType = {
    carrinho: IProdCarrinho[];
    setCarrinho: React.Dispatch<React.SetStateAction<IProdCarrinho[]>>;
    quantidadeDoItem: number;
    setQuantidadeDoItem: React.Dispatch<React.SetStateAction<number>>;
    quantidadeDeProdutos: number;
    setQuantidadeDeProdutos: React.Dispatch<React.SetStateAction<number>>;
    valorTotalCarrinho: number;
    setValorTotalCarrinho: React.Dispatch<React.SetStateAction<number>>;
};

const DEFAULT_VALUE = {
    carrinho: [{ produto: {}, quantidade: 0 }],
    setCarrinho: () => {},

    quantidadeDoItem: 0,
    setQuantidadeDoItem: () => {},

    quantidadeDeProdutos: 0,
    setQuantidadeDeProdutos: () => {},

    valorTotalCarrinho: 0,
    setValorTotalCarrinho: () => {},
};

export const CarrinhoContext = createContext<CurrentCarrinhoContextType>(DEFAULT_VALUE);
// export const CarrinhoContext = createContext<CurrentCarrinhoContextType | null>(null);
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
    // if (!carrinhoContext) return null;

    const { 
        carrinho, 
        setCarrinho, 
        quantidadeDoItem, 
        setQuantidadeDoItem, 
        quantidadeDeProdutos, 
        setQuantidadeDeProdutos, 
        valorTotalCarrinho, 
        setValorTotalCarrinho 
    } = carrinhoContext;

    useEffect(() => {
        let soma = 0;
        carrinho.forEach((item) => {
            soma += item.quantidade * +item.produto.Preco_Venda!;
        });
        console.log(soma);
        setValorTotalCarrinho(soma);
    }, [carrinho, setValorTotalCarrinho]);

    const adicionaProduto = (produto: IProduto, unidades: number) => {
        if (unidades === 0) return;

        const temProduto = carrinho.some((itensNoCarrinho) => itensNoCarrinho.produto.Cod_Prod === produto.Cod_Prod);

        if (temProduto) {
            return;
        }

        setQuantidadeDeProdutos(quantidadeDeProdutos + 1);
        setCarrinho([...carrinho, { produto: produto, quantidade: unidades }]);
    };

    const removerProduto = (Cod_Prod: string) => {
        if (quantidadeDeProdutos === 0) return;

        const novaLista = carrinho.filter((produto) => !(produto.produto.Cod_Prod === Cod_Prod));

        setQuantidadeDeProdutos(quantidadeDeProdutos - 1);
        setCarrinho(novaLista);
    };

    return {
        quantidadeDeProdutos,
        setQuantidadeDeProdutos,
        quantidadeDoItem,
        setQuantidadeDoItem,
        adicionaProduto,
        removerProduto,
        valorTotalCarrinho,
    };
};
