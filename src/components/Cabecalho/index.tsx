import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonItem } from '@ionic/react'
import React from 'react'

interface Props {
  texto?: string;
  children?: React.ReactNode;
}

export default function Cabecalho({ texto, children }: Props) {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>

        <IonItem lines='none'>
          {texto && <IonTitle>{texto}</IonTitle>}
          {children
            ? <IonItem lines='none'>{children}</IonItem>
            : <></>
          }
        </IonItem>
      </IonToolbar>

    </IonHeader >
  )
}