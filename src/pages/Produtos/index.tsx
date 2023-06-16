import { IonButton, IonContent, IonFooter, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon, IonItem, IonLoading, IonSearchbar } from "@ionic/react";
import ItemProduto from "components/ItemProduto";
import { useEffect, useState } from "react";
import styles from "./Produtos.module.scss";
import { cartOutline } from "ionicons/icons";
import { useCarrinhoContext } from "context/CarrrinhoContext";
import { Produto } from "interface/Produto";
import ModalCarrinho from "components/ModalCarrinho";
import { formatadorMonetario } from "common/function/formatadorMonetario";
import { useProduto } from "graphQL/produtos/hooks";
import { useProdutosContext } from "context/ProdutosContext";

export default function Produtos() {
  const [busca, setBusca] = useState<string | null | undefined>("");
  const [filtro, setFiltro] = useState<Produto[]>([]);
  const { carrinho, valorTotalCarrinho } = useCarrinhoContext();
  const { produtos, loading } = useProdutosContext();

  useEffect(() => {
    if (produtos) {
      if (produtos.length >= 50) {
        setFiltro(produtos.slice(0, 100));
      } else {
        setFiltro(produtos);
      }
    }
    console.log("[Produtos]- ", produtos)
  }, [produtos]);

  useEffect(() => {
    const b = busca && busca.toLowerCase();

    const result = produtos?.filter((prod) => prod.descr_detalhada.toLowerCase().includes(b!));

    if (result) {
      if (result.length >= 50) {
        setFiltro(result.slice(0, 100));
      } else {
        setFiltro(result);
      }
    }
  }, [busca])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem>
            <IonMenuButton />
            <IonTitle>Lista de Produtos </IonTitle>
            <IonButton color="primary">
              <IonIcon src={cartOutline} slot="start" />
              {carrinho.length}
            </IonButton>
          </IonItem>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            placeholder="Filtro..."
            color="light"
            showCancelButton="focus"
            animated={true}
            onIonChange={(ev) => setBusca(ev.target.value)}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {filtro?.map((produto, index) => {
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
            >
              Conferir
            </IonButton>
          </div>
        </IonToolbar>
      </IonFooter>
      <IonLoading
        isOpen={loading}
        message={'Carregando lista de produtos...'}
      />
    </IonPage>
  );
}
