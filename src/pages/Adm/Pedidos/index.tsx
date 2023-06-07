import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import BarraPesquisa from "components/BarraPesquisa";
import Cabecalho from "components/Cabecalho";
import { useGetAllPedidos } from "graphQL/pedidos/hooks";
import { useEffect, useState } from "react";
import CardPedido from "./CardPedido";

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
        <BarraPesquisa busca={busca} setBusca={setBusca} placeholder="Encontrar Pedidos..." />
      </Cabecalho>

      <IonContent>
        <IonGrid>
          <IonRow>
            {pedidos?.map((pedido, index) => {
              return (
                <IonCol key={index} sizeLg="12" sizeXl="6">
                  <CardPedido {...pedido} />
                </IonCol>
              )
            })}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
