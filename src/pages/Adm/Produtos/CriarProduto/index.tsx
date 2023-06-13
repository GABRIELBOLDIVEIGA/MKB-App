import { IonButton, IonButtons, IonContent, IonHeader, IonLoading, IonModal, IonPage, IonTitle, IonToolbar, useIonAlert } from "@ionic/react";
import Cabecalho from "components/Cabecalho";
import { useCreateProduto } from "graphQL/produtos/hooks";
import { Produto } from "interface/Produto";
import { useState } from "react";
import CardProduto from "../CardProduto";
import FormProduto from "../FormProdutos";

export default function CriarProdutoADM() {
  const { createProduto, data, loading, error } = useCreateProduto();
  const [cod, setCod] = useState<string | undefined>("");
  const [descricaoResumida, setDescricaoResumida] = useState<string | undefined>("");
  const [descricaoDetalhada, setDescricaoDetalhada] = useState<string | undefined>("");
  const [unidade, setUnidade] = useState<string | undefined>("PEÇA");
  const [preco, setPreco] = useState<number | null | undefined>();
  const [presentAlert] = useIonAlert();
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const produto: Produto = {
      cod_prod: cod ? cod : "",
      descr_resumida: descricaoResumida ? descricaoResumida : "",
      descr_detalhada: descricaoDetalhada ? descricaoDetalhada : "",
      preco: preco ? +preco : 0,
      unidade: unidade ? unidade : ""
    }

    console.log(`[Submit] - Criar Produto: ${produto}`);

    createProduto({
      variables: {
        produtoInput: produto
      },
      onCompleted: () => {
        setIsOpen(true)
        setCod("")
        setDescricaoResumida("")
        setDescricaoDetalhada("")
        setUnidade("")
        setPreco(undefined)
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
        <FormProduto
          cod={cod}
          setCod={setCod}
          descricaoResumida={descricaoResumida}
          setDescricaoResumida={setDescricaoResumida}
          descricaoDetalhada={descricaoDetalhada}
          setDescricaoDetalhada={setDescricaoDetalhada}
          unidade={unidade}
          setUnidade={setUnidade}
          preco={preco}
          setPreco={setPreco}
          onSubmit={handleSubmit}
        />
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


