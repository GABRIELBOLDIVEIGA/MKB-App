import { IonButton, IonCard, IonCardContent, IonContent, IonItem, IonLoading, IonPage, useIonAlert } from "@ionic/react";
import Cabecalho from "components/Cabecalho";
import InputField from "components/InputField";
import { useGetUsuarioById, useUpdateUsuario } from "graphQL/usuario/hook";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { Usuario } from 'interface/Usuario';

const Section = styled.section`
  margin-top: 5rem;
  display:  flex;
  justify-content: center;

`

export default function EditarFuncionario() {
  const params = useParams<{ id: string }>();
  const { data, error, loading, refetch } = useGetUsuarioById(params.id);
  const { updateUsuario, data: updateData, error: updateError, loading: updateLoading } = useUpdateUsuario();
  const [presentAlert] = useIonAlert();
  const [showLoading, setShowLoading] = useState(false);
  const history = useHistory();

  const [nome, setNome] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [cpf, setCpf] = useState<string | undefined>();
  const [telefone, setTelefone] = useState<string | undefined>();
  const [celular, setCelular] = useState<string | undefined>();

  useEffect(() => {
    refetch()

    if (data) {
      setNome(data.nome);
      setEmail(data.email);
      setCpf(data.cpf);
      setTelefone(data.telefone);
      setCelular(data.celular);
    }
  }, [loading])

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    setShowLoading(true);
    updateUsuario({
      variables: {
        usuarioUpdateInput: {
          nome,
          cpf,
          email,
          telefone,
          celular,
          privilegio: data?.privilegio ? data.privilegio : 1
        },
        id: data?._id
      },
      onCompleted: () => {
        setShowLoading(false);
        presentAlert({
          header: 'Sucesso',
          subHeader: "Dados alterados com sucesso",
          buttons: ['OK'],
          onDidDismiss: () => {
            history.push("/funcionarios")
          }
        })
      },
      onError: (errorUpdate) => {
        setShowLoading(false);
        presentAlert({
          header: 'Atenção',
          subHeader: "Email ou CPF duplicados",
          message: 'Verifique email e cpf e tente novamente.',
          buttons: ['OK'],
        })
      }
    })

  }

  return (
    <IonPage>
      <Cabecalho texto="Editar funcionario" />

      <IonContent>
        <Section >
          <IonCard style={{ width: "50%" }}>
            <IonCardContent>
              <form onSubmit={(ev) => { handleSubmit(ev) }} >
                <InputField label="Nome" placeholder="Nome" position="stacked" state={nome} setState={setNome} />
                <InputField label="E-mail" placeholder="E-mail" position="stacked" type="email" state={email} setState={setEmail} />
                <InputField label="CPF" placeholder="CPF" position="stacked" state={cpf} setState={setCpf} />
                <InputField label="Celular" placeholder="Celular" position="stacked" state={celular} setState={setCelular} />
                <InputField label="Telefone" placeholder="Telefone" position="stacked" state={telefone} setState={setTelefone} />

                <IonItem lines="none" style={{ marginTop: "1rem" }}>
                  <IonButton type="reset" color="warning" size="default">Limpar</IonButton>
                  <IonButton type="submit" color="primary" size="default" slot="end">Atualizar</IonButton>
                </IonItem>
              </form>
            </IonCardContent>
          </IonCard>
        </Section>

        <IonLoading
          isOpen={showLoading}
          message={'Verificando...'}
        />

      </IonContent>
    </IonPage>
  )
}
