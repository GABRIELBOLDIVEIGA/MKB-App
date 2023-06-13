import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonInput, IonItem, IonLabel, IonPage } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const Section = styled.section`
  display: grid;
  place-items: center;
  height: 50vh;
`

const Div = styled.div`
  width: 450px;
  max-width: 450px;
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
                <IonCardTitle>Esqueci minha senha</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <form onSubmit={(ev) => handleSubmit(ev)}>
                  <IonItem>
                    <IonLabel position="stacked">Email</IonLabel>
                    <IonInput value={email} onIonChange={(ev) => setEmail(ev.target.value)} type="email" placeholder="Digite seu email aqui..." />
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
