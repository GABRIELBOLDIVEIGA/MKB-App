import { IonItem, IonInput, IonCheckbox } from "@ionic/react";
import React, { useState } from "react";
import { IProduto } from "interface/IProduto";
import { useCarrinhoContext } from "common/context/CarrrinhoContext";
import styles from "./ItemProduto.module.scss";

interface IProps {
    produto: IProduto;
}

const ItemProduto = ({ produto }: IProps) => {
    const [inputQuantidade, setInputQuantidade] = useState<number>(0);
    const [checkBoxDisabled, setCheckBoxDisabled] = useState(true);
    const {adicionaProduto, removerProduto} = useCarrinhoContext();

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
                        onIonChange={(ev) => {
                            setInputQuantidade(Number(ev.target.value));
                            inputQuantidade === 0 ? setCheckBoxDisabled(true) : setCheckBoxDisabled(false);
                        }}
                        value={inputQuantidade}
                    />
                    <div >
                        <IonCheckbox
                            value={produto.Cod_Prod}
                            disabled={checkBoxDisabled}
                            onIonChange={(ev) => {
                                if (ev.target.checked) {
                                    adicionaProduto(produto, inputQuantidade);
                                } else {
                                    setInputQuantidade(0);
                                    removerProduto(produto.Cod_Prod!);
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
