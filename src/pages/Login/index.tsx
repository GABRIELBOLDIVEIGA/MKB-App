import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonLoading, IonPage, IonRow, IonText, useIonAlert } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useLogin } from "graphQL/usuario/hook";
import { useUserContext } from "context/UsuarioContext";
import InputField from "components/InputField";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Section = styled.section`
  padding-top: 6rem;
`

const Login: React.FC = () => {
  const { efetuaLogin, data, loading } = useLogin();
  const [email, setEmail] = useState<string | undefined>("");
  const [senha, setSenha] = useState<string | undefined>("");
  const [presentAlert] = useIonAlert();
  const [showLoading, setShowLoading] = useState(false);
  const { saveUser } = useUserContext();

  useEffect(() => {
    saveUser(data);
  }, [data])

  useEffect(() => {
    setShowLoading(loading)
  }, [loading])


  function handleLogin(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    efetuaLogin({
      variables: {
        loginInput: {
          email: email,
          senha: senha
        },
      },
      onCompleted(data) {
        if (data) {
          localStorage.setItem('KMB_token', data.loginUsuario.token);
        }
      },
      onError: (err) => {
        presentAlert({
          header: 'Atenção',
          subHeader: err.message,
          message: 'verifique email e senha e tente novamente.',
          buttons: ['OK'],
        })
      }
    })
  }

  return (
    <IonPage >
      <IonContent>
        <Section>

        <IonGrid>
          <IonRow>
            <IonCol sizeLg="6" sizeXl="4" offsetLg="3" offsetXl="4">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>LOGIN</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <form onSubmit={(ev) => handleLogin(ev)}>
                    <InputField
                      required
                      state={email}
                      setState={setEmail}
                      label="E-mail"
                      position="stacked"
                      placeholder="Email@gmail.com"
                      />
                    <InputField
                      required
                      type="password"
                      state={senha}
                      setState={setSenha}
                      label="Senha"
                      position="stacked"
                      placeholder="***********"
                      />
                    <IonItem lines="none" style={{ marginTop: "10px" }}>
                      {/* <IonButton type="reset" color="danger" size="default">Limpar</IonButton> */}
                      <IonButton style={{ width: "100%" }} size="default" type="submit" >
                        Login
                      </IonButton>
                    </IonItem>
                  </form>

                  <IonItem lines="none">
                    <Link to="/esqueciSenha">
                      <p>esqueci minha senha</p>
                    </Link>
                  </IonItem>

                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        </Section>

        <IonLoading
          isOpen={showLoading}
          message={'Verificando...'}
          />

      </IonContent>
    </IonPage>
  );
};

export default Login;
