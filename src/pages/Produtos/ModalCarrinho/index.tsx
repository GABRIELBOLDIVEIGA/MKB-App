import React, { useState } from 'react';
import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, IonPage, IonItem, IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import styled from 'styled-components';
import { Carrinho } from 'interface/Carrinho';
import { formatadorMonetario } from 'common/function/formatadorMonetario';

const CabecalhoModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 1rem;
`

const Title = styled.h2`
  width: max-content !important;
  margin: 0;
`

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  carrinho?: Carrinho[];
}
export default function ModalCarrinho({ isOpen, setIsOpen, carrinho }: IProps) {

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <CabecalhoModal>
            <IonButton size='small' color='success' onClick={() => setIsOpen(false)}>Finalizar</IonButton>
            <Title>Carrinho</Title>
            <IonButton size='small' color='warning' onClick={() => setIsOpen(false)}>Fechar</IonButton>
          </CabecalhoModal>

        </IonToolbar>
      </IonHeader>
      <IonContent>
        
          {carrinho?.map((prod) => (
            <IonCard key={prod.cod_prod}>
              <IonCardHeader>
                <IonCardTitle>{prod.descr_detalhada.toUpperCase()}</IonCardTitle>
                <IonCardSubtitle>{prod.descr_resumida.toUpperCase()}</IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>
                <IonItem>
                  <IonItem slot="start">R$ {prod.preco}</IonItem>
                  <IonItem slot="end">Quantidade {prod.quantidade}</IonItem>
                </IonItem>

                <IonItem>Total: {formatadorMonetario.format(prod.preco * prod.quantidade)}</IonItem>

              </IonCardContent>
            </IonCard>
          ))}
    
      </IonContent>
    </IonModal>
  )
}
