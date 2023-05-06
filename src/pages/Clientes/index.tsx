import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonItem, IonMenuButton, IonPage, IonRadioGroup, IonTitle, IonToolbar } from "@ionic/react";
import BarraPesquisa from "components/BarraPesquisa";
import { useState } from "react";

import ListaDeClientes from "./ListaDeClientes";
import { Link } from "react-router-dom";
import styles from "./Empresa.module.scss";
import { useCarrinhoContext } from "context/CarrrinhoContext";
import { useClientes } from "graphQL/clientes/hooks";

const Clientes = () => {
    const [busca, setBusca] = useState("");
    const [btnAvancar, setBtnAvancar] = useState(false);
    // const [filtro, setFiltro] = useState<Cliente[]>([]);
    // const [listaFixa, setListaFixa] = useState<Cliente[]>([]);
    const { selecionaCliente } = useCarrinhoContext();

    const data = useClientes();

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
                        selecionaCliente(ev.target.value);
                        setBtnAvancar(true);
                    }}
                >
                    {data?.map((cliente, index) => {
                        return <ListaDeClientes key={index} cliente={cliente} />;
                    })}
                </IonRadioGroup>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonItem>
                        <div className={styles.ionButtonContainer}>
                            <IonButton slot="end" color="primary" fill="outline" disabled={!btnAvancar} size="default">
                                <Link to="produtos">Avançar</Link>
                            </IonButton>
                        </div>
                    </IonItem>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default Clientes;
