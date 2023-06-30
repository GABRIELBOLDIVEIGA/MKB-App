import { IonLabel, IonCheckbox, IonItem } from '@ionic/react';
import { useCarrinhoContext } from 'context/CarrrinhoContext';
import { Produto } from 'interface/Produto';
import styled from 'styled-components';

const ContainerItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 1rem;
`
const ContainerTexto = styled.p`
  overflow-wrap: break-word;
  padding-right: 1rem;
  margin-right: 1rem;
`
const Checkbox = styled(IonCheckbox)`
  min-width: 20px !important;
  min-height: 20px !important;
`
interface IProps {
  item: Produto;
}

export default function ProdutoItem({ item }: IProps) {
  const { adicionaProduto, removerProduto, carrinho } = useCarrinhoContext();

  return (
    <IonItem>
      <ContainerItem>
        <ContainerTexto>{item.descr_resumida}</ContainerTexto>
        <Checkbox
          value={item._id}
          onIonChange={(ev) => {
            if (ev.target.checked) {
              adicionaProduto(item, 1);
            } else {
              removerProduto(item.cod_prod);
            }
          }}
          checked={carrinho.some((prod) => prod._id === item._id)}
        />
      </ContainerItem>
    </IonItem>
  )
}
