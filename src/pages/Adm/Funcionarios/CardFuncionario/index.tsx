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
import { pencilOutline } from "ionicons/icons";

interface Props {
  _id?: string;
  cpf?: string;
  email?: string;
  nome?: string;
  telefone?: string;
  celular?: string;
  privilegio?: number;
}

export default function CardFuncionario({ _id, cpf, email, nome, telefone, celular, privilegio }: Props) {
  return (
    <IonCard >
      <IonCardHeader>
        <IonCardTitle> {nome} </IonCardTitle>
        <IonCardSubtitle>{email}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonText>ID: {_id}</IonText>
          </IonRow>
          <IonRow>
            <IonText>CPF: {cpf}</IonText>
          </IonRow>
          <IonRow>
            <IonText>Telefone: {telefone}</IonText>
          </IonRow>
          <IonRow>
            <IonText>Celular: {celular}</IonText>
          </IonRow>
          <IonRow>
            <IonText>Privilegio: {privilegio}</IonText>
          </IonRow>
        </IonGrid>
        <IonItem lines="none">
          <ButtonRouter
            icon={pencilOutline}
            routerLink={`/funcionarios/EditarFuncionario/${_id}`}
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
