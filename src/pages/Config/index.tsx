import { IonButton, IonContent, IonIcon, IonItem, IonPage, IonText, IonTitle } from '@ionic/react'
import Cabecalho from 'components/Cabecalho'
import { lockClosedOutline } from "ionicons/icons"

export default function Config() {
  return (
    <IonPage>
      <Cabecalho>
        <IonTitle>Configurações</IonTitle>
      </Cabecalho>
      <IonContent>
        <IonItem lines="none">
          <IonText>Mudar senha</IonText>
          <IonButton routerLink="/alterarSenha" slot='end'>
            <IonIcon icon={lockClosedOutline} slot='start' />
            Alterar Senha
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  )
}
