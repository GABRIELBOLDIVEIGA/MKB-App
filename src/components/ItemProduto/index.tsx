import { IonItem, IonInput, IonCheckbox } from "@ionic/react";
import React, { useEffect, useState } from "react";
import styles from "./ItemProduto.module.scss";
import { IProduto } from "interface/IProduto";
import { useCarrinhoContext } from "common/context/CarrrinhoContext";

interface IProps {
    produto: IProduto;
}

const ItemProduto = ({ produto }: IProps) => {
    const [inputQuantidade, setInputQuantidade] = useState<number | null>(null);
    const carrinho = useCarrinhoContext();


    const handlerChange = (ev: React.MouseEvent<HTMLElement>) => {
        const btn = ev.target as HTMLButtonElement;
        switch (btn.id) {
            case "subtrair":
                setInputQuantidade(inputQuantidade! - 1);
                break;
            case "adicionar":
                setInputQuantidade(inputQuantidade! + 1);
                break;
            default:
                return;
        }
    };

    if (!carrinho) return null;

    return (
        <IonItem>
            <div className={styles.item}>
                <p>{produto.Descr_Detalhada}</p>
                <div className={styles.container}>
                    <IonInput
                        type="number"
                        className={styles.input}
                        placeholder="0"
                        id="input"
                        onIonChange={(ev) => setInputQuantidade(Number(ev.target.value!))}
                        value={inputQuantidade}
                    />

                    <div>
                        <IonCheckbox
                            value={produto.Cod_Prod}
                            disabled={inputQuantidade === null}
                            onIonChange={(ev) => {
                                if (ev.target.checked) {
                                    carrinho.adicionaProduto(produto, inputQuantidade)
                                } else {
                                    // setInputQuantidade(null);
                                    // setInputQuantidade(0);
                                    carrinho.removerProduto(produto.Cod_Prod!)
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </IonItem>
    );
};

export default React.memo(ItemProduto);
