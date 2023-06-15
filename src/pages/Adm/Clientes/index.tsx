import { IonContent, IonItem, IonPage, IonTitle } from '@ionic/react'
import ButtonRouter from 'components/ButtonRouter'
import Cabecalho from 'components/Cabecalho'
import { addCircleOutline } from 'ionicons/icons'
import TabelaClientes from './TabelaClientes'

export default function ClientesADM() {
  return (
    <IonPage>
      <Cabecalho>
        <IonTitle>Clientes</IonTitle>
        <ButtonRouter
          icon={addCircleOutline}
          routerLink="/cadastrarCliente"
          routerDirection="none"
          colorButton="primary"
          text="Adicionar Cliente"
          size="default"
          slotIcon="start"
          slotButton="end"
        />
      </Cabecalho>
      <IonContent>
        <TabelaClientes />
      </IonContent>
    </IonPage>
  )
}
