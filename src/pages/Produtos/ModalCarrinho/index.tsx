import React, { useState } from 'react';
import { IonButton, IonModal, IonHeader, IonContent, IonToolbar, useIonAlert, IonLoading, IonAlert, IonItem, IonSelect, IonSelectOption, IonLabel, IonFooter, IonText, IonTitle, IonInput } from '@ionic/react';
import styled from 'styled-components';
import { useCarrinhoContext } from 'context/CarrrinhoContext';
import CardItem from './CardItem';
import { useCriarPedido } from 'graphQL/pedidos/hooks';
import { useUserContext } from 'context/UsuarioContext';
import { useHistory } from 'react-router';
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

const ContinerDescontos = styled(IonItem)`

` 

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalCarrinho({ isOpen, setIsOpen }: IProps) {
  const { usuario } = useUserContext();
  const { carrinho, cliente, valorTotalCarrinho, setCarrinho } = useCarrinhoContext();
  const { criarPedido, loading } = useCriarPedido();
  const [presentAlert] = useIonAlert();
  const history = useHistory();
  const [alerta, setAlerta] = useState(false)

  const handleCriarPedido = () => {
    if (carrinho.length === 0 || valorTotalCarrinho === 0) {
      presentAlert({
        header: "Erro",
        message: "Pedido deve conter ao menos 1 item e valor maior que R$ 0.00",
        buttons: ["OK"],
      })
    } else {

      const carrinhoFiltrado = carrinho.filter((prod) => prod.quantidade != 0)

      const carrinhoFormatado = carrinhoFiltrado.map(produto => {
        delete produto._id
        delete produto.__typename
        return produto
      })

      criarPedido({
        variables: {
          pedidoInput: {
            clienteID: cliente._id,
            usuarioID: usuario._id,
            carrinho: carrinhoFormatado,
            total: valorTotalCarrinho
          }
        },
        onCompleted: () => {
          presentAlert({
            header: "Sucesso",
            message: "Pedido cadastrado com sucesso!",
            buttons: ["OK"],
            onDidDismiss() {
              history.push('/home');
              setCarrinho([])
            }
          })
        },
        onError: () => {
          presentAlert({
            header: "Erro",
            message: "Algo estranho aconteceu, tente novamente...",
            buttons: ["OK"],
          })
        }
      })
    }
  }

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <CabecalhoModal>
            <IonButton
              size='small'
              color='success'
              onClick={() => setAlerta(true)}>Finalizar</IonButton>
            <Title>Carrinho</Title>
            <IonButton size='small' color='warning' onClick={() => setIsOpen(false)}>Fechar</IonButton>
          </CabecalhoModal>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <ContinerDescontos>
          <IonItem style={{width: "80%"}}>
            <IonLabel position='stacked'>Desconto 1</IonLabel>
            <IonInput type='number' min={0} max={100} />
          </IonItem>
          <IonItem style={{width: "80%"}}>
            <IonLabel position='stacked'>Desconto 2</IonLabel>
            <IonInput type='number' min={0} max={100} />
          </IonItem>
          <IonItem style={{width: "80%"}}>
            <IonLabel position='stacked'>Desconto 3</IonLabel>
            <IonInput type='number' min={0} max={100} />
          </IonItem>
        </ContinerDescontos>

        {carrinho?.map((prod) => (
          <CardItem key={prod.cod_prod} produto={prod} />
        ))}

      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonItem>
            <IonTitle>Valor Total: {formatadorMonetario.format(valorTotalCarrinho)}</IonTitle>
          </IonItem>
        </IonToolbar>
      </IonFooter>

      <IonAlert
        isOpen={alerta}
        header="Confirmar pedido ?"
        subHeader=""
        message="Após confirmar o pedido será registrado"
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              setAlerta(false)
            },
          },
          {
            text: 'Confirmar',
            role: 'confirm',
            handler: () => {
              setAlerta(false);
              handleCriarPedido();
            },
          },
        ]}

      ></IonAlert>

      <IonLoading isOpen={loading} message="Enviando pedido..." />
    </IonModal>
  )
}
