import { IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol, IonText, IonList, IonSkeletonText, IonIcon, IonButton } from '@ionic/react'
import { useUserContext } from 'context/UsuarioContext';
import dataJSON from "data/GetPedidosByUserIdV2.json"
import { useGetPedidosByUserIdV2 } from 'graphQL/pedidos/hooks';
import { useEffect } from 'react';
import { Cliente } from 'interface/Cliente';
import { addCircleOutline } from "ionicons/icons";
import { formatadorMonetario } from 'common/function/formatadorMonetario';
import { dateFormatter } from 'common/function/formatadorDataPT-BR';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const LinkEstilizado = styled(Link)`
  color: var(--ion-color-dark-shade);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
`

interface IPedido {
  pedido: {
    carrinho: [
      {
        descr_resumida: string,
        preco: number;
        quantidade: number,
      }
    ],
    date: Date,
    total: number
  },
  cliente: Cliente
}

export default function ListaDePedidos() {
  const { usuario } = useUserContext();
  const { data, loading, refetch } = useGetPedidosByUserIdV2(usuario._id!)

  useEffect(() => {
    refetch({ id: usuario._id })
  }, [data])

  return (
    <>
      {data?.length === 0 ?
        (
          <IonCard style={{ minWidth: "95%" }}>
            <IonCardHeader>
              <IonCardSubtitle>Os pedidos realizados irão aparecer aqui.</IonCardSubtitle>
              <IonCardSubtitle>Você não fez nem um pedido ate o momento.</IonCardSubtitle>
              <IonCardSubtitle>Você pode fazer seu primeiro pedido na aba
                <strong style={{ fontSize: "1rem", color: "#ffffff" }}>
                  <LinkEstilizado to='/empresas'>
                    {" "}<IonIcon icon={addCircleOutline} color='dark' /> Novo Pedido {" "}
                  </LinkEstilizado>
                </strong>
                no menu acima.
              </IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
        )
        :
        (
          <>
            {!loading ? (
              <>
               {/* <IonList style={{ minHeight: "100%" }}> */}
                {data?.map((pedido: IPedido, index: number) => {
                  return (
                    // <IonItem key={index}>
                      <IonCard key={index} style={{ minWidth: "95%" }}>
                        <IonCardHeader>
                          <IonCardTitle>{pedido.cliente.nome}</IonCardTitle>
                          <IonCardSubtitle>{pedido.cliente.email}</IonCardSubtitle>
                          <IonCardSubtitle>{dateFormatter(pedido.pedido.date)}</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>
                          {pedido.pedido.carrinho.map((item, index) => {
                            return (
                              <IonItem style={{ fontSize: ".75rem", color: "#949494" }} key={index}>
                                <IonGrid style={{ paddingLeft: "0px" }}>
                                  <IonRow >
                                    <IonCol style={{ paddingLeft: "0px" }} size="6">
                                      <IonText>{item.descr_resumida}</IonText>
                                    </IonCol>
                                    <IonCol style={{ paddingLeft: "0px" }} size="3">
                                      <IonText>{`R$: ${item.preco}`}</IonText>
                                    </IonCol>
                                    <IonCol style={{ paddingLeft: "0px" }} size="3">
                                      <IonText>{`Qtd: ${item.quantidade}`}</IonText>
                                    </IonCol>
                                  </IonRow>
                                </IonGrid>
                              </IonItem>
                            )
                          })}

                          <IonItem style={{ fontSize: "1rem", color: "#949494" }} key={index}>
                            {`Total: ${formatadorMonetario.format(pedido.pedido.total)}`}
                          </IonItem>
                        </IonCardContent>
                      </IonCard>
                    // </IonItem>
                  )
                })}
               {/* </IonList> */}
                </>
            ) : (
              <IonList style={{ minHeight: "100%" }}>
                {dataJSON?.getPedidosByUserIdV2.map((pedido, index) => {
                  return (
                    <IonItem key={index}>
                      <IonCard style={{ minWidth: "95%" }}>
                        <IonCardHeader>
                          <IonCardTitle><IonSkeletonText animated={true} style={{ height: '2rem' }} /></IonCardTitle>
                          <IonCardSubtitle><IonSkeletonText animated={true} style={{ height: '1rem' }} /></IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>
                          {pedido.pedido.carrinho.map((_, index) => {
                            return (
                              <IonItem key={index}>
                                <IonGrid >
                                  <IonRow >
                                    <IonCol size="5">
                                      <IonText><IonSkeletonText animated={true} style={{ height: '1rem' }} /></IonText>
                                    </IonCol>
                                    <IonCol offset='1' size="2">
                                      <IonText><IonSkeletonText animated={true} style={{ height: '1rem' }} /></IonText>
                                    </IonCol>
                                    <IonCol offset='1' size="2">
                                      <IonText><IonSkeletonText animated={true} style={{ height: '1rem' }} /></IonText>
                                    </IonCol>
                                  </IonRow>
                                </IonGrid>
                              </IonItem>
                            )
                          })}
                          <IonItem key={index}><IonSkeletonText animated={true} style={{ height: '1.5rem' }} /></IonItem>
                        </IonCardContent>
                      </IonCard>
                    </IonItem>
                  )
                })}
              </IonList>
            )}
          </>
        )
      }
    </>
  )
}
