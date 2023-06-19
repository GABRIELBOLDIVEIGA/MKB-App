import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonInput, IonItem, IonLabel, IonLoading, IonPage, useIonAlert } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import logo from "assets/logo5.png";
import { useEsqueciMinhaSenha } from "graphQL/usuario/hook";

const Section = styled.section`
  display: grid;
  place-items: center;
  padding-top: 6rem;
`

const Div = styled.div`
  width: 100%;
  max-width: 450px;
`

const ContainerImg = styled.div`
  display: grid;
  place-items: center;
`
const Img = styled.img`
width: 50%;
`

export default function EsqueciSenha() {
  const [email, setEmail] = useState<string | number | null | undefined>('');
  const [cpf, setCpf] = useState<string | number | null | undefined>('');
  const { esqueciMinhaSenha, loading } = useEsqueciMinhaSenha();
  const history = useHistory();
  const [presentAlert] = useIonAlert();

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    esqueciMinhaSenha({
      variables: {
        esqueciSenhaInput: {
          email,
          cpf: `${cpf}`
        }
      },
      onCompleted: () => {
        presentAlert({
          header: "Sucesso",
          subHeader: "Uma nova senha vai chegar no seu email.",
          message: "Email enviado com sucesso!",
          buttons: ["OK"],
          onDidDismiss() {
            history.push('/login');
          }
        })
      },
      onError: (error) => {
        presentAlert({
          header: "Atenção!",
          subHeader: "Não conseguimos completar o processo...",
          message: `${error.message}`,
          buttons: ["OK"],
        })
      }
    })
  }

  return (
    <IonPage>
      <IonContent>
        <Section>
          <Div>
            <IonCard>
              <IonCardHeader>
                <ContainerImg>
                  <Img src={logo} />
                </ContainerImg>
                <IonCardTitle>Esqueci minha senha</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <form onSubmit={(ev) => handleSubmit(ev)}>
                  <IonItem>
                    <IonLabel position="stacked">Email</IonLabel>
                    <IonInput
                      value={email}
                      onIonChange={(ev) => setEmail(ev.target.value)}
                      type="email"
                      placeholder="Digite seu email aqui..."
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">CPF</IonLabel>
                    <IonInput
                      value={cpf}
                      onIonChange={(ev) => setCpf(ev.target.value)}
                      type="number"
                      placeholder="Digite seu CPF aqui..."
                    />
                  </IonItem>
                  <IonButton style={{ width: "100%" }} type="submit">Enviar</IonButton>
                </form>
              </IonCardContent>
            </IonCard>
          </Div>
        </Section>
      </IonContent>

      <IonLoading isOpen={loading} message="Carregando..." />
    </IonPage>
  )
}
