import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonFooter, IonCard, IonCardContent, IonGrid, IonCol, IonRow, IonInput, IonItem, IonButton, useIonAlert, useIonLoading } from "@ionic/react";
import InputField from "components/InputField";
import uuid from 'react-uuid';
import { useState } from "react";
import { useCreateCliente } from "graphQL/clientes/hooks";
import { useHistory } from "react-router";

export default function CadastrarCliente() {
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
  const { createCliente: criarCliente, data, loading, error } = useCreateCliente();
  const [presentAlert] = useIonAlert();
  const [present, dismiss] = useIonLoading();
  const history = useHistory()


  function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const cliente = {
      nome,
      email,
      fantasia,
      cnpj,
      celular,
      fone1,
      fone2,
      fax,
      ddd,
      cod,
      cep,
      uf,
      cidade,
      bairro,
      endereco,
      numero,
    }

    criarCliente({
      variables: {
        clienteInput: cliente
      },
      onCompleted: () => {
        console.log("[onCompleted] - ", data)
      },
      onError: (error) => {
        alert(`[onError] - ${error}`)
      }
    })

    // present({
    //   message: 'Loading...',
    //   duration: 2000,
    //   spinner: 'circles',
    // })

    // setTimeout(() => {
    //   presentAlert({
    //     header: 'Cadastro realizado',
    //     message: 'Voltar para Home',
    //     buttons: ['OK'],
    //     onDidDismiss() {
    //       reset();
    //       history.push("/home");
    //     },
    //   })
    // }, 2300)
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
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Cadastrar Cliente</IonTitle>
        </IonToolbar>
      </IonHeader>

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
