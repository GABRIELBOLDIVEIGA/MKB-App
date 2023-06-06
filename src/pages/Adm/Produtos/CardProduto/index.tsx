import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonGrid,
  IonItem,
  IonRow,
  IonText
} from "@ionic/react";
import ButtonRouter from "components/ButtonRouter";
import { Produto } from "interface/Produto";
import { pencilOutline } from "ionicons/icons";

export default function CardProduto({ _id, cod_prod, descr_resumida, descr_detalhada, preco, unidade }: Produto) {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle> {descr_detalhada} </IonCardTitle>
        <IonCardSubtitle>{descr_resumida}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonText>COD: {cod_prod}</IonText>
          </IonRow>
          <IonRow>
            <IonText>Preço: {preco}</IonText>
          </IonRow>
          <IonRow>
            <IonText>Unidade: {unidade}</IonText>
          </IonRow>
        </IonGrid>
        <IonItem lines="none">
          <ButtonRouter
            icon={pencilOutline}
            routerLink={`/produto/${_id}`}
            routerDirection="none"
            colorButton="medium"
            colorIcon="light"
            text="Editar"
            size="small"
            slotIcon="end"
            slotButton="end"
          />
        </IonItem>
      </IonCardContent>
    </IonCard>
  )
}
