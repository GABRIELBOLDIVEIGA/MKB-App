import { IonSelect, IonSelectOption } from "@ionic/react";
import React from "react";
import opcoes from "./opcao.json";
import styles from "./Ordenador.module.scss";

interface IProps {
    setOrdenador: React.Dispatch<React.SetStateAction<string>>;
}

export default function Ordenador({ setOrdenador }: IProps) {
    return (
        <IonSelect className={styles.select} onIonChange={(ev) => setOrdenador(ev.detail.value)} interface="popover" placeholder="Ordenar por...">
            {opcoes.map((opcao) => {
                return (
                    <IonSelectOption key={opcao.value} value={opcao.value}>
                        {opcao.nome}
                    </IonSelectOption>
                );
            })}
        </IonSelect>
    );
}
