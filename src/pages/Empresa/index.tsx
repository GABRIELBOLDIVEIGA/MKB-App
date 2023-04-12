import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import BarraPesquisa from "components/BarraPesquisa";
import React, { useState } from "react";
import clientes from "data/clientes.json";
import ItemProduto from "components/ItemProduto";

const Empresas: React.FC = () => {
    const [busca, setBusca] = useState("");

    const b = busca && busca.toLowerCase();
    const filtro = !clientes || !b ? clientes : clientes.filter((cliente) => cliente.Nome.toLowerCase().includes(b));

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Empresas</IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <BarraPesquisa placeholder="Produto" busca={busca} setBusca={setBusca} />
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {filtro.map((cliente, index) => {
                        return <ItemProduto key={index} clientes={cliente} />;
                    })}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Empresas;
