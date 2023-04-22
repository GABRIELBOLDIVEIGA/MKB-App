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
    const [opcaoSelecionada, setOpcaoSelecionada] = useState(0);
    const [filtro, setFiltro] = useState<Cliente[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const { selecionaCliente } = useCarrinhoContext();

    useEffect(() => {
        API.get("/clientes?_page=1&_limit=30")
            .then((resp) => {
                setClientes(resp.data);
                setFiltro(resp.data)
            })
            .catch((err) => alert(err));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(busca.length >= 3) {
            console.log("API")
            API.get(`/clientes?q=${busca}`)
                .then((resp) => {
                    console.log(resp.data)
                    setFiltro(resp.data)
                })
                .catch((erro) => {
                    console.log(erro)
                })
        }

    },[busca, setBusca])

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
                        selecionaCliente(ev.target.value);
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
                            <IonButton slot="end" color="primary" fill="outline" disabled={opcaoSelecionada === 0} size="default">
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
