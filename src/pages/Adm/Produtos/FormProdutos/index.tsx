import { IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, useIonAlert } from "@ionic/react";
import InputField from "components/InputField";
import { useEffect, useRef, useState } from "react";

interface Props {
  cod?: string | undefined;
  setCod?: React.Dispatch<React.SetStateAction<string | undefined>>
  descricaoResumida?: string | undefined;
  setDescricaoResumida?: React.Dispatch<React.SetStateAction<string | undefined>>
  descricaoDetalhada?: string | undefined;
  setDescricaoDetalhada?: React.Dispatch<React.SetStateAction<string | undefined>>
  unidade?: string | undefined;
  setUnidade?: React.Dispatch<React.SetStateAction<string | undefined>>
  preco?: number | undefined | null;
  setPreco?: React.Dispatch<React.SetStateAction<number | null | undefined>>
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void;
}

const FormProduto = (props: Props) => {
  // const [cod, setCod] = useState<string | undefined>(props.cod);
  // const [descricaoResumida, setDescricaoResumida] = useState<string | undefined>(props.descricaoResumida);
  // const [descricaoDetalhada, setDescricaoDetalhada] = useState<string | undefined>(props.descricaoDetalhada);
  // const [unidade, setUnidade] = useState<string | undefined>("PEÇA");
  // const [preco, setPreco] = useState<number | null | undefined>(props.preco);
  const [isOpen, setIsOpen] = useState(true);
  const [presentAlert] = useIonAlert();

  useEffect(() => {
    // setCod(props.cod)
    // setDescricaoResumida(props.descricaoResumida)
    // setDescricaoDetalhada(props.descricaoDetalhada)
    // setUnidade(props.unidade)
    // setPreco(props.preco)
  }, [props])

  // const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
  //   ev.preventDefault();

  //   const produto: Produto = {
  //     cod_prod: cod ? cod : "",
  //     descr_resumida: descricaoResumida ? descricaoResumida : "",
  //     descr_detalhada: descricaoDetalhada ? descricaoDetalhada : "",
  //     preco: preco ? preco : 0,
  //     unidade: unidade ? unidade : ""
  //   }

  //   console.log("[submit] - FormProdutos")

  //   createProduto({
  //     variables: {
  //       produtoInput: produto
  //     },
  //     onCompleted: () => {
  //       setIsOpen(true)
  //       formRef.current?.reset();
  //     },
  //     onError: (error) => {
  //       presentAlert({
  //         header: 'Atenção!',
  //         subHeader: `${error.message}`,
  //         buttons: ['OK'],
  //       })
  //     }
  //   })
  // }

  return (
    <IonGrid>
      <IonRow>
        <IonCol offsetXl="3" sizeXl="6">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Informações do Produto</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form onSubmit={(ev) => props.onSubmit(ev)} >
                <InputField
                  required={true}
                  position="stacked"
                  label="Código"
                  placeholder="Código"
                  state={props.cod}
                  setState={props.setCod}
                />
                <InputField
                  required={true}
                  position="stacked"
                  label="Descrição Detalhada"
                  placeholder="Descrição Detalhada"
                  state={props.descricaoDetalhada}
                  setState={props.setDescricaoDetalhada}
                />
                <InputField
                  required={true}
                  position="stacked"
                  label="Descrição Resumida"
                  placeholder="Descrição Resumida"
                  state={props.descricaoResumida}
                  setState={props.setDescricaoResumida}
                />
                <InputField
                  required={true}
                  position="stacked"
                  label="Tipo"
                  placeholder="Tipo"
                  state={props.unidade}
                  setState={props.setUnidade}
                />
                <IonItem>
                  <IonLabel position="stacked">Preço</IonLabel>
                  <IonInput
                    type="number"
                    required
                    placeholder="Preco"
                    value={props.preco}
                    min="0.01"
                    step="0.01"
                    onIonChange={(ev) => {
                      if (ev.target.value && props.setPreco) {
                        props.setPreco(+ev.detail.value!)
                      }
                    }}
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
  )
}

export default FormProduto;