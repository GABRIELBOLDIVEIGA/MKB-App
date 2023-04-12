import { IonItem, IonButton, IonInput, IonIcon, IonCheckbox } from "@ionic/react";
import React, { useEffect, useState } from "react";
import styles from "./ItemProduto.module.scss";
import { IProduto } from "interface/IProduto";
import { addOutline, removeOutline } from "ionicons/icons";
import { useCarrinhoContext } from "common/context/CarrrinhoContext";

interface IProps {
    produto: IProduto;
}

const ItemProduto = ({ produto }: IProps) => {
    const [quantidade, setQuantidade] = useState<number | null>(null);
    const carrinho = useCarrinhoContext();
    

    const handlerChange = (ev: React.MouseEvent<HTMLElement>) => {
        const btn = ev.target as HTMLButtonElement;
        switch (btn.id) {
            case "subtrair":
                setQuantidade(quantidade! - 1);
                break;
            case "adicionar":
                setQuantidade(quantidade! + 1);
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
                    {/* <IonButton
                        onClick={(ev) => {
                            handlerChange(ev);
                        }}
                        id="subtrair"
                        disabled={quantidade === 0}
                    >
                        <IonIcon src={removeOutline} />
                    </IonButton> */}

                    <IonInput 
                        type="number" 
                        className={styles.input} 
                        placeholder="0" 
                        id="input" 
                        onIonChange={(ev) => setQuantidade(Number(ev.target.value!))} 
                        value={quantidade} 
                    />

                    <div>
                        <IonCheckbox value={produto.Cod_Prod} 
                            onIonChange={(ev) => {
                                ev.target.checked === true ? carrinho.setQuantidadeProdutos(carrinho.quantidadeProdutos + 1) : carrinho.setQuantidadeProdutos(carrinho.quantidadeProdutos - 1); 
                                
                                // carrinho.setQuantidadeProdutos()
                            }}
                        />
                    </div>
                    {/* <IonButton
                        onClick={(ev) => {
                            handlerChange(ev);
                        }}
                        id="adicionar"
                    >
                        Add
                     <IonIcon src={addOutline} />
                    </IonButton> */}
                </div>
            </div>
        </IonItem>
    );
};

export default React.memo(ItemProduto);
