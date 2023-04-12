import produtos from "data/produtos.json";
import { IonBadge, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon } from "@ionic/react";
import ItemProduto from "components/ItemProduto";
import { useContext, useState } from "react";
import BarraPesquisa from "components/BarraPesquisa";
import styles from "./Produtos.module.scss";
import { IProduto } from "interface/IProduto";
import { cartOutline } from "ionicons/icons";
import { useCarrinhoContext } from './../../common/context/CarrrinhoContext';

export default function Produtos() {
    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] = useState<IProduto[]>([]);
    const carrinho = useCarrinhoContext();
    if (!carrinho) return null;
    console.log(carrinho)
    

    const aplicarFiltro = () => {
        const b = busca && busca.toLowerCase();
        const result = !produtos || !b ? produtos : produtos.filter((prod) => prod.Descr_Detalhada.toLowerCase().includes(b));
        setFiltro(result);
        console.log(result);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>
                        Lista de Produtos{" "}
                        <IonButton color="primary">
                            <IonIcon src={cartOutline} />
                            {carrinho.quantidadeProdutos}
                        </IonButton>
                    </IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <BarraPesquisa placeholder="Produto" busca={busca} setBusca={setBusca} />
                    <IonButton onClick={aplicarFiltro} slot="end">
                        Filtrar
                    </IonButton>
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