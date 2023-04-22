import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonItem, IonMenuButton, IonPage, IonRadioGroup, IonTitle, IonToolbar } from "@ionic/react";
import BarraPesquisa from "components/BarraPesquisa";
import { useEffect, useState } from "react";

import ListaEmpresas from "./ListaEmpresas";
import { Link } from "react-router-dom";

import API from "services/serviceAPI";
import { Cliente } from "interface/Cliente";
import styles from "./Empresa.module.scss";
import { useCarrinhoContext } from "common/context/CarrrinhoContext";

const Empresas = () => {
    const [busca, setBusca] = useState("");
    const [btnAvancar, setBtnAvancar] = useState(false);
    const [filtro, setFiltro] = useState<Cliente[]>([]);
    const [listaFixa, setListaFixa] = useState<Cliente[]>([]);
    const { selecionaCliente } = useCarrinhoContext();

    useEffect(() => {
        API.get("/clientes?_page=1&_limit=50")
            .then((resp) => {
                setFiltro(resp.data);
                setListaFixa(resp.data);
            })
            .catch((err) => alert(err));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (busca.length >= 3) {
            API.get(`/clientes?q=${busca}&_limit=50`)
                .then((resp) => {
                    setFiltro(resp.data);
                })
                .catch((erro) => {
                    alert(erro);
                });
        }

        if (busca.length === 0) {
            setFiltro(listaFixa);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [busca, setBusca]);

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
                    {filtro.map((cliente, index) => {
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
