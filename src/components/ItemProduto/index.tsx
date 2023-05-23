import { IonItem, IonInput, IonCheckbox } from "@ionic/react";
import React, { memo, useEffect, useMemo, useState } from "react";
import { useCarrinhoContext } from "context/CarrrinhoContext";
import styles from "./ItemProduto.module.scss";
import { Produto } from "interface/Produto";

interface IProps {
    produto: Produto;
}

const ItemProduto = ({ produto }: IProps) => {
    const [inputQuantidade, setInputQuantidade] = useState<number>(0);
    const [checkBoxDisabled, setCheckBoxDisabled] = useState(true);
    const [checked, setChecked] = useState(false);
    const { adicionaProduto, removerProduto, carrinho } = useCarrinhoContext();

    // useEffect(() => {
    //     const temProduto = carrinho.some((itensNoCarrinho) => itensNoCarrinho.cod_prod === produto.cod_prod);

    //     if (temProduto) {
    //         const prod = carrinho.filter((itensNoCarrinho) => itensNoCarrinho.cod_prod === produto.cod_prod)
    //         setInputQuantidade(prod[0].quantidade);
    //         setChecked(true);
    //     }

    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

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
                        disabled={checked}
                    />
                    <div>
                        <IonCheckbox
                            checked={checked}
                            value={produto.cod_prod}
                            disabled={checkBoxDisabled}
                            onIonChange={(ev) => {
                                setChecked(!checked);
                                if (ev.target.checked) {
                                    adicionaProduto(produto, inputQuantidade);
                                } else {
                                    setInputQuantidade(0);
                                    removerProduto(produto.cod_prod);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </IonItem>
    );
};

export default memo(ItemProduto);
