import { IonButton, IonContent, IonIcon, IonItem, IonPage, IonText } from '@ionic/react'
import Cabecalho from 'components/Cabecalho'
import { lockClosedOutline } from "ionicons/icons"

export default function Config() {
  return (
    <IonPage>
      <Cabecalho texto='Configurações'/>
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
