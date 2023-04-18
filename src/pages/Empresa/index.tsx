import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonItem, IonMenuButton, IonPage, IonRadioGroup, IonTitle, IonToolbar } from "@ionic/react";
import BarraPesquisa from "components/BarraPesquisa";
import { useEffect, useState } from "react";

import ListaEmpresas from "./ListaEmpresas";
import { Link } from "react-router-dom";

import API from "services/serviceAPI";
import { IClientesNew } from "interface/ICliente";
import styles from "./Empresa.module.scss"; 

const Empresas = () => {
    const [busca, setBusca] = useState("");
    const [opcaoSelecionada, setOpcaoSelecionada] = useState(0);
    const [filtro, setFiltro] = useState<IClientesNew[]>([]);
    const [clientes, setClientes] = useState<IClientesNew[]>([]);

    useEffect(() => {
        API.get("/clientes")
            .then((resp) => {
                setClientes(resp.data);
            })
            .catch((err) => alert(err));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const aplicarFiltro = () => {
        const b = busca && busca.toLowerCase();
        const result = !clientes || !b ? clientes : clientes.filter((cliente) => cliente.nome.toLowerCase().includes(b));

        setFiltro(result);
    };

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
                    <IonButton slot="end" onClick={() => aplicarFiltro()}>
                        Filtrar
                    </IonButton>
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
                        <div className={styles.ionButtonContainer}>
                            <Link to="produtos">
                                <IonButton slot="end" color="primary" fill="outline" disabled={opcaoSelecionada === 0} size="default">
                                    Avançar
                                </IonButton>
                            </Link>
                        </div>
                    </IonItem>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default Empresas;
