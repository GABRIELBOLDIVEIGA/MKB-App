import { createContext, useContext, useEffect, useState } from "react";
import { Produto } from "interface/Produto";
import { Carrinho } from "interface/Carrinho";
import { Cliente } from "interface/Cliente";
import { OBTER_CLIENTE } from "graphQL/clientes/queries";
import { useGetClienteById } from "graphQL/clientes/hooks";

type CurrentCarrinhoContextType = {
  cliente: Cliente;
  setCliente: React.Dispatch<React.SetStateAction<Cliente>>;
  carrinho: Carrinho[];
  setCarrinho: React.Dispatch<React.SetStateAction<Carrinho[]>>;
  quantidadeDoItem: number;
  setQuantidadeDoItem: React.Dispatch<React.SetStateAction<number>>;
  quantidadeDeProdutos: number;
  setQuantidadeDeProdutos: React.Dispatch<React.SetStateAction<number>>;
  valorTotalCarrinho: number;
  setValorTotalCarrinho: React.Dispatch<React.SetStateAction<number>>;
};

const DEFAULT_CLIENTE = {
  _id: "",
  cod: "",
  nome: "",
  cnpj: "",
  endereco: "",
  bairro: "",
  cidade: "",
  cep: "",
  uf: "",
  email: "",
  ddd: "",
  fone1: "",
  fone2: "",
  celular: "",
  fax: "",
  fantasia: "",
  contato: "",
};

const DEFAULT_CARRINHO = [
  {
    _id: "",
    cod_prod: "",
    descr_resumida: "",
    descr_detalhada: "",
    preco: 0,
    unidade: "",
    quantidade: 0,
  },
];

const DEFAULT_VALUE = {
  cliente: DEFAULT_CLIENTE,
  setCliente: () => { },

  carrinho: DEFAULT_CARRINHO,
  setCarrinho: () => { },

  quantidadeDoItem: 0,
  setQuantidadeDoItem: () => { },

  quantidadeDeProdutos: 0,
  setQuantidadeDeProdutos: () => { },

  valorTotalCarrinho: 0,
  setValorTotalCarrinho: () => { },
};

export const CarrinhoContext = createContext<CurrentCarrinhoContextType>(DEFAULT_VALUE);
CarrinhoContext.displayName = "Carrinho";

interface IProps {
  children: string | JSX.Element | JSX.Element[];
}

export const CarrinhoProvider = ({ children }: IProps) => {
  const [carrinho, setCarrinho] = useState<Carrinho[]>([]);
  const [quantidadeDoItem, setQuantidadeDoItem] = useState(0);
  const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0);
  const [quantidadeDeProdutos, setQuantidadeDeProdutos] = useState(0);
  const [cliente, setCliente] = useState<Cliente>(DEFAULT_CLIENTE);

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
        cliente,
        setCliente,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinhoContext = () => {
  const carrinhoContext = useContext(CarrinhoContext);

  const { carrinho, setCarrinho, quantidadeDoItem, setQuantidadeDoItem, quantidadeDeProdutos, setQuantidadeDeProdutos, valorTotalCarrinho, setValorTotalCarrinho, cliente, setCliente } = carrinhoContext;

  const queryCliente = useGetClienteById("");

  useEffect(() => {
    let soma = 0;
    carrinho.forEach((item) => {
      soma += item.quantidade * item.preco;
    });

    setValorTotalCarrinho(soma);
  }, [carrinho, setValorTotalCarrinho]);

  const selecionaCliente = (_id: string) => {
    queryCliente.refetch({ id: _id })
      .then((res) => {
        setCliente(res.data.getCliente);
      })
  };

  const adicionaProduto = (produto: Produto, unidades: number) => {
    if (unidades === 0) return;

    setCarrinho([...carrinho, { ...produto, quantidade: unidades }]);
  };

  const removerProduto = (cod_prod: string) => {
    // if (quantidadeDeProdutos === 0) return;

    const novaLista = carrinho.filter((produto) => !(produto.cod_prod === cod_prod));

    setCarrinho(novaLista);
  };

  return {
    // quantidadeDeProdutos,
    setQuantidadeDeProdutos,
    quantidadeDoItem,
    setQuantidadeDoItem,
    adicionaProduto,
    removerProduto,
    valorTotalCarrinho,
    carrinho,
    setCarrinho,
    cliente,
    selecionaCliente,
  };
};
