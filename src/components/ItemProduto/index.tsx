import { IonItem, IonButton, IonInput, IonIcon } from "@ionic/react";
import React, { useState } from "react";
import styles from "./ItemProduto.module.scss";
import { IProduto } from "interface/IProduto";
import { addOutline, removeOutline } from "ionicons/icons";

interface IProps {
    produto: IProduto;
}

const ItemProduto = ({ produto }: IProps) => {
    const [quantidade, setQuantidade] = useState<number>(0);

    const handlerChange = (ev: React.MouseEvent<HTMLElement>) => {
        const btn = ev.target as HTMLButtonElement;
        switch (btn.id) {
            case "subtrair":
                setQuantidade(quantidade - 1);
                break;
            case "adicionar":
                setQuantidade(quantidade + 1);
                break;
            default:
                return;
        }
    };

    return (
        <IonItem>
            <div className={styles.item}>
                <p>{produto.Descr_Detalhada}</p>
                <div className={styles.containerButtons}>
                    <IonButton
                        onClick={(ev) => {
                            handlerChange(ev);
                        }}
                        id="subtrair"
                        disabled={quantidade === 0}
                    >
                        <IonIcon src={removeOutline} />
                    </IonButton>
                    <IonInput className={styles.input} placeholder="0" id="input" value={quantidade} />
                    <IonButton
                        onClick={(ev) => {
                            handlerChange(ev);
                        }}
                        id="adicionar"
                    >
                        <IonIcon src={addOutline} />
                    </IonButton>
                </div>
            </div>
        </IonItem>
    );
};

export default React.memo(ItemProduto);
