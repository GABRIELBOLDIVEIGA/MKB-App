import { IonCol, IonCard, IonCardHeader, IonItem, IonCardTitle, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonText } from "@ionic/react"
import ButtonRouter from "components/ButtonRouter"
import { formatadorMonetario } from 'common/function/formatadorMonetario';
import { dateFormatter } from "common/function/formatadorDataPT-BR";

interface Props {
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

export default function CardPedido({ cliente, usuario, pedido }: Props) {

  return (
    <IonCard>
      <IonCardHeader>
        <IonItem>
          <IonCardTitle>{cliente.nome}</IonCardTitle>
          <ButtonRouter
            routerLink={`/pedidoDetalhado/${pedido._id}`}
            routerDirection="none"
            colorButton="medium"
            text="Detalhes"
            size="small"
            slotButton="end"
          />
        </IonItem>
        <IonCardSubtitle>{cliente.email}</IonCardSubtitle>
        <IonCardSubtitle><strong>data: </strong>{dateFormatter(pedido.date)}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonText><strong>Funcionario: </strong>{usuario.nome}</IonText>
          </IonRow>
          {pedido.carrinho.map(((item) => {
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
          <IonText>{`Total: ${formatadorMonetario.format(pedido.total)}`} </IonText>
        </IonRow>
      </IonCardContent>
    </IonCard>

  )
}
