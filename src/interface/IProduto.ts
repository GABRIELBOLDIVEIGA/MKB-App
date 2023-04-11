export interface IProduto {
    Cod_Prod?: string;
    Linha?: number;
    Categoria?: string;
    Sequencial?: number;
    Descr_Resumida?: string;
    Descr_Detalhada?: string;
    Preco_Venda?: number | undefined;
    Peso_Unit?: number;
    Unidade?: string;
    NCMSH?: string;
    EAN?: string;
}
