import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonItem, IonLoading, IonModal, IonPage, IonTitle, IonToolbar, useIonAlert } from "@ionic/react";
import Cabecalho from "components/Cabecalho";
import InputField from "components/InputField";
import { useCriarFuncionario } from "graphQL/usuario/hook";
import CardProduto from "pages/Adm/Produtos/CardProduto";
import { useState } from "react";
import CardFuncionario from "../CardFuncionario";
import { closeOutline } from 'ionicons/icons'
import { useHistory } from "react-router";

export default function CadastrarFuncionario() {
  const [nome, setNome] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [senha, setSenha] = useState<string | undefined>("");
  const [confirmarSenha, setConfirmarSenha] = useState<string | undefined>("");
  const [cpf, setCpf] = useState<string | undefined>("");
  const [celular, setCelular] = useState<string | undefined>("");
  const [telefone, setTelefone] = useState<string | undefined>("");
  const { createUsuario, data, error, loading } = useCriarFuncionario();
  const [isOpen, setIsOpen] = useState(true);
  const [presentAlert] = useIonAlert();
  const [showLoading, setShowLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const funcionario = {
      nome,
      email,
      senha,
      celular,
      telefone,
      cpf,
      privilegio: 1
    }

    console.log("[Senha] - ", senha);
    console.log("[Confirmar Senha] - ", confirmarSenha);

    if (senha === confirmarSenha) {
      console.log("[Funcionario] - ", funcionario);

      setShowLoading(true);
      createUsuario({
        variables: { usuarioInput: { ...funcionario } },
        onCompleted: (data) => {
          setShowLoading(false);
          setIsOpen(true);
        },
        onError: (error) => {
          console.log(error)
          setShowLoading(false);
          presentAlert({
            header: 'Atenção',
            subHeader: "Email ou CPF duplicados",
            message: `${error.message}`,
            buttons: ['OK'],
          })
        }
      })
    } else {
      alert("senhas diferentes!")
    }
  }

  const handleModalClose = () => {
    setIsOpen(false);
    setNome("");
    setEmail("");
    setSenha("");
    setConfirmarSenha("");
    setCpf("");
    setCelular("");
    setTelefone("");
    history.push('/funcionarios');
  }

  return (
    <IonPage>
      <Cabecalho><IonTitle>Cadastrar Funcionario</IonTitle></Cabecalho>
      <IonContent >
        <section style={{ display: "flex", justifyContent: "center", width: "100%", height: "100%" }}>
          <IonCard style={{ width: "50%", height: "max-content", marginTop: "6rem" }}>
            <IonCardContent>
              <form onSubmit={ev => handleSubmit(ev)}>
                <InputField label="Nome" placeholder="Nome" position="stacked" required state={nome} setState={setNome} />
                <InputField label="CPF" placeholder="CPF" position="stacked" required state={cpf} setState={setCpf} />
                <InputField label="E-mail" placeholder="E-mail" position="stacked" required state={email} setState={setEmail} />
                <InputField label="Celular" placeholder="Celular" position="stacked" state={celular} setState={setCelular} />
                <InputField label="telefone" placeholder="Telefone" position="stacked" state={telefone} setState={setTelefone} />
                <InputField type="password" label="Senha" placeholder="Senha" position="stacked" required state={senha} setState={setSenha} />
                <InputField type="password" label="Confirmar Senha" placeholder="Confirmar Senha" position="stacked" required state={confirmarSenha} setState={setConfirmarSenha} />

                <IonItem style={{ marginTop: "1rem" }}>
                  <IonButton color="warning" size="default" type="reset">Limpar</IonButton>
                  <IonButton slot="end" size="default" type="submit">Confirmar</IonButton>
                </IonItem>
              </form>
            </IonCardContent>
          </IonCard>

          {data &&
            <IonModal isOpen={isOpen} onDidDismiss={() => handleModalClose()}>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Funcionario Cadastrado com sucesso</IonTitle>
                  <IonButtons slot="end">
                    <IonButton onClick={() => handleModalClose()}><IonIcon icon={closeOutline} /></IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">
                <CardFuncionario {...data} />
              </IonContent>
            </IonModal>
          }

          <IonLoading
            isOpen={showLoading}
            message={'Verificando...'}
          />

        </section>
      </IonContent>
    </IonPage>
  )
}
