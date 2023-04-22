import { IonButton, IonContent, IonFooter, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon, IonItem } from "@ionic/react";
import ItemProduto from "components/ItemProduto";
import { useEffect, useMemo, useState } from "react";
import BarraPesquisa from "components/BarraPesquisa";
import styles from "./Produtos.module.scss";
import { cartOutline } from "ionicons/icons";
import { useCarrinhoContext } from "common/context/CarrrinhoContext";
import API from "services/serviceAPI";
import { Produto } from "interface/Produto";
import ModalCarrinho from "components/ModalCarrinho";
import { formatadorMonetario } from "common/function/formatadorMonetario";

export default function Produtos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] = useState<Produto[]>([]);
    const { carrinho, quantidadeDeProdutos, valorTotalCarrinho } = useCarrinhoContext();

    useEffect(() => {
        API.get("/produtos")
            .then((resp) => {
                setProdutos(resp.data);
                setFiltro(resp.data.slice(0, 100));
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    const aplicarFiltro = () => {
        const b = busca && busca.toLowerCase();
        const result = !produtos || b ? produtos : produtos.filter((prod) => prod.descr_detalhada.toLowerCase().includes(b));
        
        if (result.length >= 50) {
            setFiltro(result.slice(0, 100));
        } else {
            setFiltro(result);
        }
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
