export interface Pedido { 
  _id: string,
  clienteID: string,
  usuarioID: string,
  carrinho: [
    {
      cod_prod: string,
      descr_resumida: string,
      descr_detalhada: string,
      preco: number,
      unidade: string,
      quantidade: number
    }
  ],
  total: number
}