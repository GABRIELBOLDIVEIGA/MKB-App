import { IonModal, IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonList, IonItem, IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCardContent, IonFooter, IonText, useIonAlert, useIonLoading } from "@ionic/react";
import { useRef } from "react";
import { formatadorMonetario } from "common/function/formatadorMonetario";
import { Carrinho } from "interface/Carrinho";
import { useCarrinhoContext } from "context/CarrrinhoContext";
import styles from "./ModalCarrinho.module.scss";
import { useCriarPedido } from "graphQL/pedidos/hooks"
import { useHistory } from "react-router";

interface IProps {
  carrinho: Carrinho[];
}

export default function ModalCarrinho({ carrinho: itemNoCarrinho }: IProps) {
  const modal = useRef<HTMLIonModalElement>(null);
  const [criarPedido, { loading, data, error }] = useCriarPedido();
  const { carrinho, setCarrinho, cliente, valorTotalCarrinho } = useCarrinhoContext();
  const [presentAlert] = useIonAlert();
  const [present] = useIonLoading();
  const history = useHistory();

  function dismiss() {
    modal.current?.dismiss();
  }

  function submit() {
    const carrinhoFormatado = carrinho.map(produto => {
      delete produto._id
      delete produto.__typename
      return produto
    })

    criarPedido({
      variables: {
        pedidoInput: {
          clienteID: cliente._id,
          carrinho: carrinhoFormatado,
          total: valorTotalCarrinho
        }
      }
    })

    if (loading) {
      present({
        message: "Verificando...",
        duration: 3000
      })
    }

    if (error) {
      presentAlert({
        header: "Erro",
        message: "Algo estranho aconteceu, tente novamente...",
        buttons: ["OK"],
        onDidDismiss() {
          dismiss();
        }
      })
    } else {
      presentAlert({
        header: "Sucesso",
        message: "Pedido cadastrado com sucesso!",
        buttons: ["OK"],
        onDidDismiss() {
          dismiss();
          history.push('/home');
          setCarrinho([])
        }
      })
    }
  }

  return (
    <IonModal ref={modal} trigger="open-modal">
      <IonHeader>
        <IonToolbar>
          <IonItem>
            <IonButton onClick={() => dismiss()}>Voltar</IonButton>
            <IonTitle>Confira seu pedido</IonTitle>

            <IonButton
              onClick={() => {
                submit()
              }}
            >Finalizar</IonButton>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {itemNoCarrinho?.map((prod) => (
            <IonCard key={prod.cod_prod}>
              <IonCardHeader>
                <IonCardTitle>{prod.descr_detalhada}</IonCardTitle>
                <IonCardSubtitle>{prod.descr_resumida}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonItem>
                  <IonItem slot="start">R$ {prod.preco}</IonItem>
                  <IonItem slot="end">Quantidade {prod.quantidade}</IonItem>
                </IonItem>

                <IonItem>Total: {formatadorMonetario.format(prod.preco * prod.quantidade)}</IonItem>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <div className={styles.rodape}>
            <IonTitle className={styles.textoRodape}>Valor Total do pedido: {formatadorMonetario.format(valorTotalCarrinho)}</IonTitle>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
}
