import produtos from "data/produtos.json";
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon } from "@ionic/react";
import ItemProduto from "components/ItemProduto";
import { useEffect, useState } from "react";
import BarraPesquisa from "components/BarraPesquisa";
import styles from "./Produtos.module.scss";
import { cartOutline } from "ionicons/icons";
import { useCarrinhoContext } from "common/context/CarrrinhoContext";
import API from "services/serviceAPI";
import { IProdutoNew } from "interface/IProdutoNew";


export default function Produtos() {
    const [produtos, setProdutos] = useState<IProdutoNew[]>([]);
    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] = useState<IProdutoNew[]>([]);
    const { carrinho, quantidadeDeProdutos, valorTotalCarrinho } = useCarrinhoContext();

    useEffect(() => {
        API.get("/produtos")
            .then((resp) => {
                console.log(resp.data);
                setProdutos(resp.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    const formatador = Intl.NumberFormat("pt-br", { style: "currency", currency: "BRL" });

    const aplicarFiltro = () => {
        const b = busca && busca.toLowerCase();
        const result = !produtos || !b ? produtos : produtos.filter((prod) => prod.descr_detalhada.toLowerCase().includes(b));
        setFiltro(result);
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
                            {quantidadeDeProdutos}
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
                        <IonTitle>Valor Total: {formatador.format(valorTotalCarrinho)}</IonTitle>
                        <IonButton
                            onClick={() => {
                                console.log(JSON.stringify(carrinho));
                                console.table(carrinho);
                                console.log("Carrinho: ", carrinho);
                            }}
                        >
                            Conferir
                        </IonButton>
                    </div>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
}
