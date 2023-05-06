import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonItem, IonMenuButton, IonPage, IonRadioGroup, IonTitle, IonToolbar } from "@ionic/react";
import BarraPesquisa from "components/BarraPesquisa";
import { useState } from "react";

import ListaEmpresas from "./ListaEmpresas";
import { Link } from "react-router-dom";
import { Cliente } from "interface/Cliente";
import styles from "./Empresa.module.scss";
import { useCarrinhoContext } from "context/CarrrinhoContext";
import { useQuery } from "@apollo/client";
import { OBTER_CLIENTES } from "graphQL/clientes/queries";
import { useCliente } from "graphQL/clientes/hooks";

const Empresas = () => {
    const [busca, setBusca] = useState("");
    const [btnAvancar, setBtnAvancar] = useState(false);
    // const [filtro, setFiltro] = useState<Cliente[]>([]);
    // const [listaFixa, setListaFixa] = useState<Cliente[]>([]);
    const { selecionaCliente } = useCarrinhoContext();

    const data = useCliente();
    // console.log("[Empresas]: ", data);

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
                        return <ListaEmpresas key={index} cliente={cliente} />;
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

export default Empresas;
