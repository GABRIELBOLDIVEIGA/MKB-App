import { IonItem, IonSearchbar } from "@ionic/react";
import React from "react";
import styled from "styled-components";

const BarraPesquisaestilizada = styled(IonSearchbar)`
    width: 100%;
    max-width: 450px;
`

interface IProps {
    busca: string;
    setBusca: React.Dispatch<React.SetStateAction<string>>;
    placeholder?: string;
}

export default function BarraPesquisa({ placeholder = "Digite aqui...", setBusca, busca }: IProps) {
    const handleChange = (ev: Event) => {
        let query = "";
        const target = ev.target as HTMLIonSearchbarElement;
        if (target) query = target.value!.toLowerCase();

        setBusca(query);
    };

    return <IonItem lines="none">
        <BarraPesquisaestilizada value={busca} onIonChange={(ev) => handleChange(ev)} color="light" showCancelButton="focus" animated={true} placeholder={placeholder} />
    </IonItem>
}
