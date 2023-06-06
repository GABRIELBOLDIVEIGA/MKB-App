import { useParams } from "react-router-dom";
import FormProduto from "../FormProdutos";
import { useGetProdutoById, useUpdateProduto } from "graphQL/produtos/hooks";
import { useEffect, useRef, useState } from "react";
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import Cabecalho from "components/Cabecalho";
import CardProduto from "../CardProduto";

export default function EditarProduto() {
  const params = useParams<{ id: string }>();
  const { data, error, loading, refetch } = useGetProdutoById(params.id);
  const { updateProduto, data: dataUpDate, error: errorUpdate, loading: loadingUpdate } = useUpdateProduto();

  const [cod, setCod] = useState<string | undefined>("");
  const [descricaoResumida, setDescricaoResumida] = useState<string | undefined>("");
  const [descricaoDetalhada, setDescricaoDetalhada] = useState<string | undefined>("");
  const [unidade, setUnidade] = useState<string | undefined>("PEÇA");
  const [preco, setPreco] = useState<number | null | undefined>();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setCod(data?.cod_prod)
    setDescricaoResumida(data?.descr_resumida)
    setDescricaoDetalhada(data?.descr_detalhada)
    setUnidade(data?.unidade)
    setPreco(data?.preco)

    refetch()
  }, [data])

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    updateProduto({
      variables: {
        produtoInput: {
          descr_resumida: descricaoResumida,
          descr_detalhada: descricaoDetalhada,
          preco: preco,
          unidade: unidade,
          cod_prod: cod,
        },
        id: params.id,
      },
      onCompleted: () => {
        setIsOpen(true)
      },
      onError: (err) => {
        alert(err.message);
      }
    })
  }

  return (
    <IonPage>
      <Cabecalho texto="Editar Produto" />

      <IonContent>
        <FormProduto
          onSubmit={handleSubmit}
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
        />

        {dataUpDate &&
          <IonModal isOpen={isOpen}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Produto Editado com sucesso</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <CardProduto {...dataUpDate} />
            </IonContent>
          </IonModal>
        }
      </IonContent>

    </IonPage>
  )
}
