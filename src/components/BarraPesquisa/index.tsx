import { IonSearchbar } from "@ionic/react";
import React from "react";
import styles from "./BarraPessquisa.module.scss" ;


interface IProps {
    busca: string;
    setBusca: React.Dispatch<React.SetStateAction<string>>;
    placeholder?: string;
}

export default function BarraPesquisa({ placeholder = "Digite aqui...", setBusca }: IProps) {
    const handleChange = (ev: Event) => {
        let query = "";
        const target = ev.target as HTMLIonSearchbarElement;
        if (target) query = target.value!.toLowerCase();

        setBusca(query);
    };

    return <IonSearchbar className={styles.barraPesquisa} onIonChange={(ev) => handleChange(ev)} color="light" showCancelButton="focus" animated={true} placeholder={placeholder} />
}
