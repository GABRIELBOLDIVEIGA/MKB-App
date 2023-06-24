import { useHistory } from "react-router-dom";
import { useUpdateProduto } from "graphQL/produtos/hooks";
import { IonButton, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonItem, IonLoading, IonPage, IonTitle, useIonAlert } from "@ionic/react";
import Cabecalho from "components/Cabecalho";
import * as S from "../FormProduto/styles"
import { Input } from 'components/Input'
import { useCadastrarProdutoForm } from './useEditarProduto'
import { ProdutoForm } from '../FormProduto/types'

export default function EditarProduto() {
  const { errors, handleSubmit, loading, register, reset, produto } = useCadastrarProdutoForm()
  const { updateProduto, loading: loadingUpdate } = useUpdateProduto();
  const [presentAlert] = useIonAlert();
  const history = useHistory();

  const editarProduto = (data: ProdutoForm) => {
    updateProduto({
      variables: {
        produtoUpdateInput: {
          cod_prod: data.cod_prod,
          descr_resumida: data.descr_resumida,
          descr_detalhada: data.descr_detalhada,
          preco: data.preco,
          unidade: data.unidade,
        },
        id: produto?._id,
      },
      onCompleted: () => {
        presentAlert({
          header: 'Sucesso',
          subHeader: "Dados alterados com sucesso.",
          buttons: ['OK'],
          onDidDismiss: () => {
            history.push("/produto")
          }
        })
      },
      onError: (erro) => {
        presentAlert({
          header: 'Erro',
          subHeader: "Algo estranho aconteceu",
          message: `${erro}`,
          buttons: ['OK'],
        })
      }
    })
  }

  return (
    <IonPage>
      <Cabecalho>
        <IonTitle>Editar Produto</IonTitle>
      </Cabecalho>

      <IonContent>
        <S.Container>
          <S.Card>
            <IonCardHeader>
              <IonCardTitle style={{ textAlign: 'center' }}>Dados do Produto</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form onSubmit={handleSubmit(editarProduto)}>
                <Input
                  type="text"
                  placeholder="Digite o Codigo aqui"
                  label="Codigo"
                  {...register('cod_prod')}
                  hasError={errors.cod_prod?.message}
                />
                <Input
                  type="text"
                  placeholder="Digite a Descrição Resumida aqui"
                  label="Descrição Resumida"
                  {...register('descr_resumida')}
                  hasError={errors.descr_resumida?.message}
                />
                <Input
                  type="text"
                  placeholder="Digite a Descrição Detalhada aqui"
                  label="Descrição Detalhada"
                  {...register('descr_detalhada')}
                  hasError={errors.descr_detalhada?.message}
                />
                <Input
                  type="number"
                  step={0.01}
                  placeholder="Digite o Preço aqui"
                  label="Preço"
                  {...register('preco')}
                  hasError={errors.preco?.message}
                />
                <Input
                  type="text"
                  placeholder="Digite a Unidade aqui"
                  label="Unidade"
                  {...register('unidade')}
                  hasError={errors.unidade?.message}
                />
                <IonItem lines="none" style={{ marginTop: "1rem" }}>
                  <IonButton color="warning" size="small" onClick={() => reset()}>Limpar</IonButton>
                  <IonButton slot="end" size="small" type="submit">Confirmar</IonButton>
                </IonItem>
              </form>
            </IonCardContent>
          </S.Card>
        </S.Container>

        <IonLoading
          isOpen={loading}
          message={'Buscando Dados...'}
        />
        <IonLoading
          isOpen={loadingUpdate}
          message={'Atualizando Dados...'}
        />
      </IonContent>
    </IonPage>
  )
}
