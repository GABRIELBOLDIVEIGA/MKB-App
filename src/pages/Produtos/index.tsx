import { IonButton, IonContent, IonFooter, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon, IonItem } from "@ionic/react";
import ItemProduto from "components/ItemProduto";
import { useEffect, useState } from "react";
import BarraPesquisa from "components/BarraPesquisa";
import styles from "./Produtos.module.scss";
import { cartOutline } from "ionicons/icons";
import { useCarrinhoContext } from "common/context/CarrrinhoContext";
import API from "services/serviceAPI";
import { IProdutoNew } from "interface/IProduto";
import ModalCarrinho from "components/ModalCarrinho";
import { formatadorMonetario } from "common/function/formatadorMonetario";

export default function Produtos() {
    const [produtos, setProdutos] = useState<IProdutoNew[]>([]);
    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] = useState<IProdutoNew[]>([]);
    const { carrinho, quantidadeDeProdutos, valorTotalCarrinho } = useCarrinhoContext();

    useEffect(() => {
        API.get("/produtos")
            .then((resp) => {
                setProdutos(resp.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    // se fizer o filtro com produtos ja adicionados ao carrinho,
    // a nova lista resultante nao vai aparecer com o checkbox marcado dos itens q ja estao dentro do carrinho
    const aplicarFiltro = () => {
        console.log(produtos);
        const b = busca && busca.toLowerCase();
        const result = !produtos || !b ? produtos : produtos.filter((prod) => prod.descr_detalhada.toLowerCase().includes(b));
        setFiltro(result);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonItem>
                        <IonMenuButton />
                        <IonTitle>Lista de Produtos </IonTitle>
                        <IonButton color="primary">
                            <IonIcon src={cartOutline} slot="start" />
                            {quantidadeDeProdutos}
                        </IonButton>
                    </IonItem>
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

                {carrinho.length > 0 && <ModalCarrinho carrinho={carrinho} />}
            </IonContent>

            <IonFooter>
                <IonToolbar>
                    <div className={styles.rodape}>
                        <IonTitle>Valor Total: {formatadorMonetario.format(valorTotalCarrinho)}</IonTitle>
                        <IonButton
                            id="open-modal"
                            expand="block"
                            onClick={() => {
                                console.log(JSON.stringify(carrinho), valorTotalCarrinho);
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
