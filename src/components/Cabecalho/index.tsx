import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonItem, IonText, IonButton } from '@ionic/react'
import BarraPesquisa from 'components/BarraPesquisa';
import ButtonRouter from 'components/ButtonRouter';
import { addCircleOutline } from 'ionicons/icons';
import React, { useState } from 'react'
import styled from 'styled-components';

interface Props {
  texto?: string
  children?: React.ReactNode;
}

const ContainerHeader = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export default function Cabecalho({ children }: Props) {

  return (
    <IonHeader>
      <IonToolbar>

        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>

        <ContainerHeader>
          {children}
        </ContainerHeader>
      
      </IonToolbar>
    </IonHeader >
  )
}