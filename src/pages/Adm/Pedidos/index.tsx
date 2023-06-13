import { IonCol, IonContent, IonGrid, IonItem, IonPage, IonProgressBar, IonRow, IonText, IonTitle } from "@ionic/react";
import BarraPesquisa from "components/BarraPesquisa";
import Cabecalho from "components/Cabecalho";
import { useGetAllPedidos } from "graphQL/pedidos/hooks";
import { Suspense, useEffect, useState } from "react";
import CardPedido from "./CardPedido";
import ButtonRouter from "components/ButtonRouter";
import { addCircleOutline } from "ionicons/icons";

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
    date: string,
    total: number
  }
}

export default function PedidosADM() {
  const { data, loading, refetch } = useGetAllPedidos();
  const [busca, setBusca] = useState("");
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [filtro, setFiltro] = useState<IPedido[]>([]);

  useEffect(() => {
    refetch();
    setFiltro(data?.slice(0, 50));
    setPedidos(data)
  }, [loading])

  useEffect(() => {
    refetch();
    setFiltro(data?.slice(0, 50));
    setPedidos(data)
  },[])

  useEffect(() => {
    if (busca.length === 0) {
      console.log("[PEDIDOS] - ", pedidos)
      setFiltro(pedidos);
    } else {
      const result = pedidos?.filter(pedido => {
        if (pedido.cliente.nome.toLowerCase().includes(busca) || pedido.usuario.nome.toLowerCase().includes(busca))
          return true;
      })
      setFiltro(result);
    }
  }, [busca])

  return (
    <IonPage>
      <Cabecalho texto="Pedidos">
        <IonItem lines="none">
          <BarraPesquisa placeholder="Pesquisar..." busca={busca} setBusca={setBusca} />
          <ButtonRouter
            icon={addCircleOutline}
            slotIcon="start"
            slotButton="end"
            text="Realizar Novo Pedido"
            routerLink="/empresas"
          />
        </IonItem>
      </Cabecalho>

      <IonContent>
        <IonGrid>
          <IonRow>
            {filtro?.map((pedido, index) => {
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
