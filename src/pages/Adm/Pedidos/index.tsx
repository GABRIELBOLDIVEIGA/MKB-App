import { IonButton as ButtonRouter, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonPage, IonRow, IonText } from "@ionic/react";
import { formatadorMonetario as formatter } from "common/function/formatadorMonetario";
import BarraPesquisa from "components/BarraPesquisa";
import Cabecalho from "components/Cabecalho";
import { useGetAllPedidos } from "graphQL/pedidos/hooks";
import { useEffect, useState } from "react";
import {  } from "components/ButtonRouter"

interface IPedido {
  cliente: {
    email: string;
    nome: string;
  },
  usuario: {
    email: string;
    nome: string;
  },
  pedido: {
    _id: string,
    carrinho: [
      {
        cod_prod: string,
        descr_resumida: string,
        descr_detalhada: string,
        preco: number,
        unidade: string,
        quantidade: number
      }
    ],
    total: number
  }
}

export default function PedidosADM() {
  const [busca, setBusca] = useState("");
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const { data, error, loading, refetch } = useGetAllPedidos();

  useEffect(() => {
    console.log(data)
    setPedidos(data?.slice(0, 50))
  }, [loading])


  return (
    <IonPage>
      <Cabecalho texto="Pedidos">
        <IonGrid>
          <IonRow>
            <IonCol sizeXs="12" sizeSm="12" sizeMd="8" sizeLg="8" sizeXl="8">
              <BarraPesquisa busca={busca} setBusca={setBusca} placeholder="Encontrar Pedidos..." />
            </IonCol>
          </IonRow>
        </IonGrid>
      </Cabecalho>

      <IonContent>
        <IonGrid>
          <IonRow>

            {pedidos?.map((pedido, index) => {
              return (
                <IonCol key={index} sizeLg="12" sizeXl="6">
                  <IonCard>
                    <IonCardHeader>
                      <IonItem>
                        <IonCardTitle>{pedido.cliente.nome}</IonCardTitle>
                       <ButtonRouter ></ButtonRouter>
                      </IonItem>
                      <IonCardSubtitle>{pedido.cliente.email}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonGrid>
                        <IonRow>
                          <IonText><strong>Funcionario: </strong>{pedido.usuario.nome}</IonText>
                        </IonRow>
                        {pedido.pedido.carrinho.map(((item) => {
                          return (
                            <IonRow key={item.cod_prod}>
                              <IonCol>
                                <IonText><strong>Cod: </strong>{item.cod_prod}</IonText>
                              </IonCol>
                              <IonCol>
                                <IonText><strong>Produto: </strong>{item.descr_resumida}</IonText>
                              </IonCol>
                              <IonCol>
                                <IonText><strong>Quantidade: </strong>{item.quantidade}</IonText>
                              </IonCol>
                            </IonRow>
                          )
                        }))}
                      </IonGrid>
                      <IonRow>
                        <IonText color="success">Total: </IonText>
                        <IonText> {formatter.format(pedido.pedido.total)} </IonText>
                      </IonRow>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              )
            })}

          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
