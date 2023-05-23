import { Produto } from "./Produto";

export interface Carrinho extends Produto {
    quantidade: number;
}
