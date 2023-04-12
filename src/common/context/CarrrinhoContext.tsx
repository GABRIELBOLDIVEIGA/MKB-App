import { createContext, useContext, useState } from "react";
import { ICarrinho } from './../../interface/ICarrinho';
import { IProduto } from 'interface/IProduto';

type CurrentCarrinhoContextType = {
    carrinho: ICarrinho[];
    setCarrinho: React.Dispatch<React.SetStateAction<ICarrinho[]>>;
    quantidadeProdutos: number;
    setQuantidadeProdutos: React.Dispatch<React.SetStateAction<number>>;
    valorTotalCarrinho: number;
    setValorTotalCarrinho: React.Dispatch<React.SetStateAction<number>>;
};

export const CarrinhoContext = createContext<CurrentCarrinhoContextType | null>(null);
CarrinhoContext.displayName = "Carrinho";

interface IProps {
    children: string | JSX.Element | JSX.Element[];
}

export const CarrinhoProvider = ({ children }: IProps) => {
    const [carrinho, setCarrinho] = useState<ICarrinho[]>([]);
    const [quantidadeProdutos, setQuantidadeProdutos] = useState(0);
    const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0);

    return (
        <CarrinhoContext.Provider
            value={{
                carrinho,
                setCarrinho,
                quantidadeProdutos,
                setQuantidadeProdutos,
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
    if (!carrinhoContext) return null;

    const { carrinho, setCarrinho, quantidadeProdutos, setQuantidadeProdutos, valorTotalCarrinho, setValorTotalCarrinho } = carrinhoContext;

    function mudarQuantidade(Cod_Prod: string, quantidade: number) {
        return carrinho.map(itemDoCarrinho => {
            if(itemDoCarrinho.item.Cod_Prod === Cod_Prod) itemDoCarrinho.quantidade += quantidade;
            return itemDoCarrinho;
        })
    }

    function adicionaProduto(novoProduto: IProduto) {
        const temOProduto = carrinho.some(itemDoCarrinho => itemDoCarrinho.item.Cod_Prod === novoProduto.Cod_Prod);

        return temOProduto;
    }

    return {
        quantidadeProdutos,
        setQuantidadeProdutos
    }
};
