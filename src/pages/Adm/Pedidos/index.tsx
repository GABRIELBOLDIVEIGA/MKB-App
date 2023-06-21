import { IonContent, IonPage, IonTitle } from "@ionic/react";
import Cabecalho from "components/Cabecalho";
import ButtonRouter from "components/ButtonRouter";
import { addCircleOutline } from "ionicons/icons";
import { useClientesContext } from "context/ClientesContext";
import { useProdutosContext } from "context/ProdutosContext";
import TabelaPedidos from "./TabelaPedidos";

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
  useClientesContext();
  useProdutosContext();

  return (
    <IonPage>
      <Cabecalho >
        <IonTitle>Pedidos</IonTitle>
        <ButtonRouter
          icon={addCircleOutline}
          slotIcon="start"
          text="Realizar Novo Pedido"
          routerLink="/empresas"
        />
      </Cabecalho>

      <IonContent>
        <TabelaPedidos />
      </IonContent>
    </IonPage>
  )
}
