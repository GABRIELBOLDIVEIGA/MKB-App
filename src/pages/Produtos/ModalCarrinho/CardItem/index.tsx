import { IonCardTitle, IonCard, IonCardHeader, IonButton, IonIcon, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonInput } from '@ionic/react'
import { formatadorMonetario } from 'common/function/formatadorMonetario'
import { useCarrinhoContext } from 'context/CarrrinhoContext'
import { Carrinho } from 'interface/Carrinho'
import { trashOutline } from 'ionicons/icons'
import styled from 'styled-components'


const CardTitleS = styled(IonCardTitle)`
  display: flex;
  justify-content: space-between;
`
const CardS = styled(IonCard)`
  margin: 1rem 2rem;
`
interface IProps {
  produto: Carrinho
}

export default function CardItem({ produto }: IProps) {
  const { removerProduto, editarQuantidade } = useCarrinhoContext();

  return (
    <CardS key={produto.cod_prod}>
      <IonCardHeader>
        <CardTitleS>
          {produto.descr_resumida.toUpperCase()}
          <IonButton onClick={() => removerProduto(produto.cod_prod)} size='small' fill='solid' color='light'>
            <IonIcon icon={trashOutline} color='danger' />
          </IonButton>
        </CardTitleS>
        <IonCardSubtitle>{produto.descr_resumida.toUpperCase()}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonItem lines='none'>
          <IonItem lines='none' slot="start">R$ {produto.preco}</IonItem>
          <IonItem slot="end">
            <IonLabel position='stacked'>Quantidade: </IonLabel>
            <IonInput
              type='number'
              min={1}
              value={produto.quantidade}
              onIonChange={(ev) => {
                editarQuantidade(produto.cod_prod, +ev.target.value!)
              }}
            />
          </IonItem>
        </IonItem>

        <IonItem lines='none' >Total: {formatadorMonetario.format(produto.preco * produto.quantidade)}</IonItem>

      </IonCardContent>
    </CardS>
  )
}
