import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonInput, IonItem, IonLabel, IonPage } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import logo from "assets/logo5.png";

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
  const history = useHistory();

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    alert(`Uma nova senha foi enviada para este email: ${email}`);

    history.push("/login");
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
                  <IonButton style={{ width: "100%" }} type="submit">Enviar</IonButton>
                </form>
              </IonCardContent>
            </IonCard>
          </Div>
        </Section>
      </IonContent>
    </IonPage>
  )
}
