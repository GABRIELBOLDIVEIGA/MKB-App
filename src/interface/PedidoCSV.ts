export interface PedidoCSV { 
  cliente: {
    cod: string;
    nome: string;
    cnpj: string;
    email: string;
    fantasia: string;
  }
  usuario: {
    cpf: string;
    email: string;
    nome: string;
  }
  pedido: {
    carrinho: {
      cod_prod: string;
      descr_resumida: string;
      preco: number;
      quantidade: number;
      unidade: string;
      descr_detalhada: string;
    }
    date: string;
    total: number;
    _id: string;
  }
} 