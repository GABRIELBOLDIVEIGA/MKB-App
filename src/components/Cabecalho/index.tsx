import { IonHeader, IonToolbar, IonButtons, IonMenuButton } from '@ionic/react'
import React from 'react'
import styled from 'styled-components';

interface Props {
  // texto?: string
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