import { IonButton, IonButtons, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonItem, IonLoading, IonModal, IonPage, IonTitle, IonToolbar, useIonAlert } from "@ionic/react";
import Cabecalho from "components/Cabecalho";
import { useCreateProduto } from "graphQL/produtos/hooks";
import { Produto } from "interface/Produto";
import { useState } from "react";
import CardProduto from "../CardProduto";
import * as S from "../FormProduto/styles"
import { Input } from "components/Input";
import { useCadastrarProdutoForm } from "./useCadastrarProduto";
import { ProdutoForm } from "../FormProduto/types";
import { useHistory } from "react-router";

export default function CadastrarProduto() {
  const { errors, handleSubmit, register, reset } = useCadastrarProdutoForm();
  const { createProduto, data, loading } = useCreateProduto();
  const [presentAlert] = useIonAlert();
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();
  
  const cadastrarProduto = (data: ProdutoForm) => {
    const produto: Produto = {
      cod_prod: data.cod_prod,
      descr_resumida: data.descr_resumida,
      descr_detalhada: data.descr_detalhada,
      preco: data.preco,
      unidade: data.unidade
    }

    createProduto({
      variables: {
        produtoInput: produto
      },
      onCompleted: () => {
        setIsOpen(true)
      },
      onError: (error) => {
        presentAlert({
          header: 'Atenção!',
          subHeader: `${error.message}`,
          buttons: ['OK'],
        })
      }
    })
  }

  const handleModalClose = () => {
    history.push('/produto');
  }

  return (
    <IonPage>
      <Cabecalho>
        <IonTitle>Criar Produto</IonTitle>
      </Cabecalho>
      <IonContent >
        <S.Container>
          <S.Card>
            <IonCardHeader>
              <IonCardTitle style={{ textAlign: 'center' }}>Dados do Produto</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form onSubmit={handleSubmit(cadastrarProduto)}>
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

      </IonContent>
      <IonLoading
        isOpen={loading}
        message={'Cadastrando...'}
      />

      {data &&
        <IonModal isOpen={isOpen}onDidDismiss={() => handleModalClose()}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Produto Cadastrado com sucesso</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <CardProduto {...data} />
          </IonContent>
        </IonModal>
      }

    </IonPage>
  )
}


