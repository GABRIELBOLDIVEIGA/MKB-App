import produtos from "data/produtos.json";
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import ItemProduto from "components/ItemProduto";
import { useState } from "react";
import BarraPesquisa from "components/BarraPesquisa";
import styles from "./NovoPedido.module.scss";

export default function NovoPedido() {
    const [busca, setBusca] = useState("");

    const b = busca && busca.toLowerCase();
    const filtro = !produtos || !b ? produtos : produtos.filter((prod) => prod.Descr_Detalhada.toLowerCase().includes(b));

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Lista de Produtos</IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <BarraPesquisa placeholder="Produto" busca={busca} setBusca={setBusca} />
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonList>
                    {filtro.map((produto, index) => {
                        return <ItemProduto key={index} produto={produto} />;
                    })}
                </IonList>
            </IonContent>

            <IonFooter>
                <IonToolbar>
                    <div className={styles.rodape}>
                        <IonTitle>Valor Total: XXXX</IonTitle>
                        <IonButton>Conferir</IonButton>
                    </div>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
}
