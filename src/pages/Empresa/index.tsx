import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonItem, IonMenuButton, IonPage, IonRadioGroup, IonTitle, IonToolbar } from "@ionic/react";
import BarraPesquisa from "components/BarraPesquisa";
import { useState } from "react";
import clientes from "data/clientes.json";
import ListaEmpresas from "./ListaEmpresas";
import { Link } from "react-router-dom";

const Empresas = () => {
    const [busca, setBusca] = useState("");
    const [opcaoSelecionada, setOpcaoSelecionada] = useState(0);

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
                    <BarraPesquisa placeholder="Selecione uma Empresa" busca={busca} setBusca={setBusca} />
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonRadioGroup
                    allowEmptySelection={false}
                    onIonChange={(ev) => {
                        setOpcaoSelecionada(ev.target.value);
                    }}
                >
                    {filtro.map((cliente, index) => {
                        return <ListaEmpresas key={index} cliente={cliente} />;
                    })}
                </IonRadioGroup>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonItem>
                        <IonButton color="success" fill="outline" disabled={opcaoSelecionada === 0} size="default" slot="end">
                            <Link to="produtos">Avançar</Link>
                        </IonButton>
                    </IonItem>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default Empresas;
