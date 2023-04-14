import { IProduto } from 'interface/IProduto';

export interface ICarrinho {
    produto: IProduto;
    quantidade: number;
}