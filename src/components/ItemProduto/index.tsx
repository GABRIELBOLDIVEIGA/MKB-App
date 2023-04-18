import { IonItem, IonInput, IonCheckbox } from "@ionic/react";
import React, { useState } from "react";
import { useCarrinhoContext } from "common/context/CarrrinhoContext";
import styles from "./ItemProduto.module.scss";
import { IProdutoNew } from "interface/IProduto";

interface IProps {
    produto: IProdutoNew;
}

const ItemProduto = ({ produto }: IProps) => {
    const [inputQuantidade, setInputQuantidade] = useState<number>(0);
    const [checkBoxDisabled, setCheckBoxDisabled] = useState(true);
    const {adicionaProduto, removerProduto} = useCarrinhoContext();

    return (
        <IonItem>
            <div className={styles.item}>
                <p>{produto.descr_detalhada}</p>
                <div className={styles.container}>
                    <IonInput
                        type="number"
                        className={styles.input}
                        placeholder="0"
                        id="input"
                        onIonChange={(ev) => {
                            setInputQuantidade(Number(ev.target.value));
                            inputQuantidade === 0 ? setCheckBoxDisabled(true) : setCheckBoxDisabled(false);
                        }}
                        value={inputQuantidade}
                    />
                    <div >
                        <IonCheckbox
                            value={produto.cod_prod}
                            disabled={checkBoxDisabled}
                            onIonChange={(ev) => {
                                if (ev.target.checked) {
                                    adicionaProduto(produto, inputQuantidade);
                                } else {
                                    setInputQuantidade(0);
                                    removerProduto(produto.cod_prod!);
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
