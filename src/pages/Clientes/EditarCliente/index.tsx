import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonLoading } from "@ionic/react";
import Cabecalho from "components/Cabecalho";
import InputField from "components/InputField";
import { useCriarCliente, useGetClienteById, useUpdateCliente } from "graphQL/clientes/hooks";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import uuid from "react-uuid";

export default function EditarCliente() {
  const params = useParams<{ id: string }>();
  const { data, error, loading, refetch } = useGetClienteById(params.id);
  const { updateCliente, data: dataUpdate, error: errorUpdate, loading: loaddingUpdate } = useUpdateCliente();


  const [nome, setNome] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [fantasia, setFantasia] = useState<string | undefined>("");
  const [cnpj, setCnpj] = useState<string | undefined>("");
  const [celular, setCelular] = useState<string | undefined>("");
  const [fone1, setFone1] = useState<string | undefined>("");
  const [fone2, setFone2] = useState<string | undefined>("");
  const [fax, setFax] = useState<string | undefined>("");
  const [ddd, setDDD] = useState<string | undefined>("");
  const [cod, setCod] = useState(uuid());
  const [cep, setCep] = useState<string | undefined>("");
  const [uf, setUf] = useState<string | undefined>("");
  const [cidade, setCidade] = useState<string | undefined>("");
  const [bairro, setBairro] = useState<string | undefined>("");
  const [endereco, setEndereco] = useState<string | undefined>("");
  const [numero, setNumero] = useState<string | undefined>("");

  const [presentAlert] = useIonAlert();
  const [present, dismiss] = useIonLoading();
  const history = useHistory();


  useEffect(() => {
    console.log("[UseEffect] - EditarCliente: ", data);

    setNome(data?.nome)
    setEmail(data?.email)
    setFantasia(data?.fantasia)
    setCnpj(data?.cnpj)
    setCelular(data?.celular)
    setFone1(data?.fone1)
    setFone2(data?.fone2)
    setFax(data?.fax)
    setDDD(data?.ddd)
    setCep(data?.cep)
    setUf(data?.uf)
    setCidade(data?.cidade)
    setBairro(data?.bairro)
    setEndereco(data?.endereco)
    setNumero(data?.numero)

    refetch()
  }, [data])


  function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const cliente = {
      nome,
      cod,
      email,
      fantasia,
      cnpj,
      celular,
      fone1,
      fone2,
      fax,
      ddd,
      cep,
      uf,
      cidade,
      bairro,
      endereco,
      numero,
    }

    console.log("[Update] - cliente:", cliente)

    updateCliente({
      variables: {
        id: data?._id,
        clienteInput: {
          ...cliente
        }
      },
      onCompleted: (dataUpdate) => {
        console.log("[onCompleted] - ", dataUpdate)
      },
      onError: (errorUpdate) => {
        console.log("[onError] - ", errorUpdate)
      }
    })
  }

  function reset() {
    setNome("")
    setEmail("")
    setFantasia("")
    setCnpj("")
    setCelular("")
    setFone1("")
    setFone2("")
    setFax("")
    setDDD("")
    setCod(uuid())
    setCep("")
    setUf("")
    setCidade("")
    setBairro("")
    setEndereco("")
    setNumero("")
  }

  return (
    <IonPage>
      <Cabecalho texto="Editar Cliente" />

      <IonContent>
        <IonCard>
          <IonCardContent>
            <form onSubmit={submit}>
              <IonGrid>
                <IonRow>
                  <IonCol size-xs="12" size-md="12" size-lg="6">
                    <InputField label="Nome" placeholder="Digite o nome da empresa" state={nome} setState={setNome} />
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size-xs="12" size-md="12" size-lg="6">
                    <InputField label="E-mail" placeholder="Digite o E-mail da empresa" state={email} setState={setEmail} />
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size-xs="12" size-md="12" size-lg="6">
                    <InputField label="Nome Fantasia" placeholder="Nome Fantasia" state={fantasia} setState={setFantasia} />
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size-xs="12" size-md="12" size-lg="6">
                    <InputField label="CNPJ" placeholder="Digite o CNPJ" state={cnpj} setState={setCnpj} />
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size-xs="12" size-md="12" size-lg="6">
                    <InputField label="Celular" placeholder="Digite o Numero de celular" state={celular} setState={setCelular} />
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size-xs="12" size-md="12" size-lg="6">
                    <InputField label="Telefone 1" placeholder="Telefone 1" state={fone1} setState={setFone1} />
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size-xs="12" size-md="12" size-lg="6">
                    <InputField label="Telefone 2" placeholder="Telefone 2" state={fone2} setState={setFone2} />
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size-xs="12" size-md="12" size-lg="6">
                    <InputField label="Fax" placeholder="Fax" state={fax} setState={setFax} />
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size-xs="12" size-md="12" size-lg="6">
                    <InputField label="DDD" placeholder="DDD" state={ddd} setState={setDDD} />
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size-xs="12" size-md="12" size-lg="6">
                    <InputField label="CEP" placeholder="CEP" state={cep} setState={setCep} />
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size-xs="12" size-md="12" size-lg="6">
                    <InputField label="UF" placeholder="UF" state={uf} setState={setUf} />
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size-xs="12" size-md="12" size-lg="6">
                    <InputField label="Cidade" placeholder="Cidade" state={cidade} setState={setCidade} />
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size-xs="12" size-md="12" size-lg="6">
                    <InputField label="Bairro" placeholder="Bairro" state={bairro} setState={setBairro} />
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size-xs="12" size-md="12" size-lg="6">
                    <InputField label="Endereço" placeholder="Endereço" state={endereco} setState={setEndereco} />
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size-xs="12" size-md="12" size-lg="6">
                    <InputField label="Número" placeholder="Número" state={numero} setState={setNumero} />
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonButton type="reset" color="danger" size="default">Apagar</IonButton>
                      <IonButton type="submit" color="primary" size="default" slot="end" >Cadastrar</IonButton>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </form>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
}

