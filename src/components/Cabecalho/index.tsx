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

        <IonItem>
          <IonTitle>{texto}</IonTitle>
          {children
            ? <IonItem>{children}</IonItem>
            : <></>
          }
        </IonItem>
      </IonToolbar>

    </IonHeader >
  )
}