import { IonButton, IonContent, IonFooter, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon, IonItem, IonLoading, IonSearchbar } from "@ionic/react";
import ItemProduto from "components/ItemProduto";
import { useEffect, useState } from "react";
import styles from "./Produtos.module.scss";
import { cartOutline } from "ionicons/icons";
import { useCarrinhoContext } from "context/CarrrinhoContext";
import { Produto } from "interface/Produto";
// import ModalCarrinho from "components/ModalCarrinho";
import { formatadorMonetario } from "common/function/formatadorMonetario";
import { useProdutosContext } from "context/ProdutosContext";
import ModalCarrinho from "./ModalCarrinho";
import InfiniteScroll from "./InfiniteScroll";

export default function Produtos() {
  const [busca, setBusca] = useState<string>("");
  const [filtro, setFiltro] = useState<Produto[]>([]);

  const { carrinho, valorTotalCarrinho } = useCarrinhoContext();
  const { produtos, loading } = useProdutosContext();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    produtos ? setFiltro(produtos) : setFiltro([]);
  }, [produtos]);

  useEffect(() => {
    const b = busca && busca.toLowerCase();

    const result: Produto[] | undefined = produtos?.filter((prod) => prod.descr_detalhada.toLowerCase().includes(b!));

    result ? setFiltro(result) : setFiltro([]);

  }, [busca])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem>
            <IonMenuButton />
            <IonTitle>Lista de Produtos </IonTitle>
            <IonButton color="primary" onClick={() => setIsOpen(!isOpen)}>
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
            onIonChange={(ev) => setBusca(ev.target.value!)}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent>

        {produtos && <InfiniteScroll produtos={produtos} filtro={filtro} />}
        {isOpen && <ModalCarrinho isOpen={isOpen} setIsOpen={setIsOpen} />}

      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonTitle>Valor Total: {formatadorMonetario.format(valorTotalCarrinho)}</IonTitle>
        </IonToolbar>
      </IonFooter>
      <IonLoading
        isOpen={loading}
        message={'Carregando lista de produtos...'}
      />

    </IonPage>
  );
}
