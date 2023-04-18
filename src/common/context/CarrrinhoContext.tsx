import { createContext, useContext, useEffect, useState } from "react";
import { IProdutoNew } from "interface/IProduto";
import { ICarrinho } from "interface/ICarrinho";

type CurrentCarrinhoContextType = {
    carrinho: ICarrinho[];
    setCarrinho: React.Dispatch<React.SetStateAction<ICarrinho[]>>;
    quantidadeDoItem: number;
    setQuantidadeDoItem: React.Dispatch<React.SetStateAction<number>>;
    quantidadeDeProdutos: number;
    setQuantidadeDeProdutos: React.Dispatch<React.SetStateAction<number>>;
    valorTotalCarrinho: number;
    setValorTotalCarrinho: React.Dispatch<React.SetStateAction<number>>;
};

const DEFAULT_VALUE = {
    carrinho: [
        {
            produto: {
                cod_prod: "",
                descr_resumida: "",
                descr_detalhada: "",
                preco_venda: 0,
                unidade: "",
                id: 0,
            },
            quantidade: 0,
        },
    ],
    setCarrinho: () => {},

    quantidadeDoItem: 0,
    setQuantidadeDoItem: () => {},

    quantidadeDeProdutos: 0,
    setQuantidadeDeProdutos: () => {},

    valorTotalCarrinho: 0,
    setValorTotalCarrinho: () => {},
};

export const CarrinhoContext = createContext<CurrentCarrinhoContextType>(DEFAULT_VALUE);
CarrinhoContext.displayName = "Carrinho";

interface IProps {
    children: string | JSX.Element | JSX.Element[];
}

export const CarrinhoProvider = ({ children }: IProps) => {
    const [carrinho, setCarrinho] = useState<ICarrinho[]>([]);
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

export const useCarrinhoContext = () => {
    const carrinhoContext = useContext(CarrinhoContext);

    const { carrinho, setCarrinho, quantidadeDoItem, setQuantidadeDoItem, quantidadeDeProdutos, setQuantidadeDeProdutos, valorTotalCarrinho, setValorTotalCarrinho } = carrinhoContext;

    useEffect(() => {
        let soma = 0;
        carrinho.forEach((item) => {
            soma += item.quantidade * +item.produto.preco_venda!;
        });
        
        setValorTotalCarrinho(soma);
    }, [carrinho, setValorTotalCarrinho]);

    const adicionaProduto = (produto: IProdutoNew, unidades: number) => {
        if (unidades === 0) return;

        const temProduto = carrinho.some((itensNoCarrinho) => itensNoCarrinho.produto.cod_prod === produto.cod_prod);

        if (temProduto) {
            return;
        }

        setQuantidadeDeProdutos(quantidadeDeProdutos + 1);
        setCarrinho([...carrinho, { produto: produto, quantidade: unidades }]);
    };

    const removerProduto = (cod_prod: string) => {
        if (quantidadeDeProdutos === 0) return;

        const novaLista = carrinho.filter((produto) => !(produto.produto.cod_prod === cod_prod));

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
        carrinho,
    };
};
