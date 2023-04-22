import { IonModal, IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonList, IonItem, IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCardContent } from "@ionic/react";
import { useRef } from "react";
import { formatadorMonetario } from "common/function/formatadorMonetario";
import { Carrinho } from "interface/Carrinho";

interface IProps {
    carrinho: Carrinho[];
}

export default function ModalCarrinho({ carrinho }: IProps) {

    const modal = useRef<HTMLIonModalElement>(null);

    function dismiss() {
        modal.current?.dismiss();
    }

    return (
        <IonModal ref={modal} trigger="open-modal">
            <IonHeader>
                <IonToolbar>
                    <IonItem>
                        <IonButton onClick={() => dismiss()}>Voltar</IonButton>
                        <IonTitle>Confira seu pedido</IonTitle>

                        <IonButton onClick={() => console.log("finalizar")}>Finalizar</IonButton>
                    </IonItem>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    {carrinho?.map((prod) => (
                        <IonCard key={prod.produto.cod_prod}>
                            <IonCardHeader>
                                <IonCardTitle>{prod.produto.descr_detalhada}</IonCardTitle>
                                <IonCardSubtitle>{prod.produto.descr_resumida}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonItem>
                                    <IonItem slot="start">R$ {prod.produto.preco}</IonItem>
                                    <IonItem slot="end">Quantidade {prod.quantidade}</IonItem>
                                </IonItem>

                                <IonItem>Total: {formatadorMonetario.format(prod.produto.preco * prod.quantidade)}</IonItem>
                            </IonCardContent>
                        </IonCard>
                    ))}
                </IonList>
            </IonContent>
        </IonModal>
    );
}
