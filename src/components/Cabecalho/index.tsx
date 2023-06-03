import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react'
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
        <IonTitle>{texto}</IonTitle>
      </IonToolbar>
      {children
        ? <IonToolbar>{children}</IonToolbar>
        : <></>
      }

    </IonHeader>
  )
}