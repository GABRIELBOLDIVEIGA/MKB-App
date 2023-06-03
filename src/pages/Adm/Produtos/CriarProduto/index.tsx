import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonLoading, IonModal, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonAlert } from "@ionic/react";
import Cabecalho from "components/Cabecalho";
import InputField from "components/InputField";
import { useCreateProduto } from "graphQL/produtos/hooks";
import { Produto } from "interface/Produto";
import { useRef, useState } from "react";
import CardProduto from "../CardProduto";

export default function CriarProdutoADM() {
  const { createProduto, data, loading, error } = useCreateProduto();
  const [cod, setCod] = useState("");
  const [descricaoResumida, setDescricaoResumida] = useState("");
  const [descricaoDetalhada, setDescricaoDetalhada] = useState("");
  const [unidade, setUnidade] = useState("PEÇA");
  const [preco, setPreco] = useState<string | null | undefined>("");
  const [presentAlert] = useIonAlert();
  const [isOpen, setIsOpen] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const produto: Produto = {
      cod_prod: cod,
      descr_resumida: descricaoResumida,
      descr_detalhada: descricaoDetalhada,
      preco: preco ? +preco : 0,
      unidade: unidade
    }

    createProduto({
      variables: {
        produtoInput: produto
      },
      onCompleted: () => {
        setIsOpen(true)
        formRef.current?.reset();
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

  return (
    <IonPage>
      <Cabecalho texto="Criar Produto" />
      <IonContent >
        <IonGrid>
          <IonRow>
            <IonCol offsetXl="3" sizeXl="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Informações do Produto</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <form ref={formRef} onSubmit={(ev) => handleSubmit(ev)}>
                    <InputField
                      required={true}
                      position="stacked"
                      label="Código"
                      placeholder="Código"
                      state={cod}
                      setState={setCod}
                    />
                    <InputField
                      required={true}
                      position="stacked"
                      label="Descrição Detalhada"
                      placeholder="Descrição Detalhada"
                      state={descricaoDetalhada}
                      setState={setDescricaoDetalhada}
                    />
                    <InputField
                      required={true}
                      position="stacked"
                      label="Descrição Resumida"
                      placeholder="Descrição Resumida"
                      state={descricaoResumida}
                      setState={setDescricaoResumida}
                    />
                    <InputField
                      required={true}
                      position="stacked"
                      label="Tipo"
                      placeholder="Tipo"
                      state={unidade}
                      setState={setUnidade}
                    />
                    <IonItem>
                      <IonLabel position="stacked">Preço</IonLabel>
                      <IonInput
                        type="number"
                        required
                        placeholder="Preco"
                        value={preco}
                        min="0.01"
                        step="0.01"
                        onIonChange={(ev) => { setPreco(ev.detail.value) }}
                      />
                    </IonItem>
                    <IonItem lines="none" style={{ marginTop: "10px" }}>
                      <IonButton type="reset" color="warning">Limpar</IonButton>
                      <IonButton type="submit" color="primary" slot="end">Confirmar</IonButton>
                    </IonItem>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonLoading
        isOpen={loading}
        message={'Aguarde...'}
        spinner='circles'
      />

      {data &&
        <IonModal isOpen={isOpen}>
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


