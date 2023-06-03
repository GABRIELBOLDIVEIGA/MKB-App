import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonRow, useIonAlert } from "@ionic/react";
import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { useLogin } from "graphQL/usuario/hook";
import { useUserContext } from "context/UsuarioContext";
import logo from "assets/kbm.png"
import InputField from "components/InputField";


const Login: React.FC = () => {
  const { efetuaLogin, data, loading } = useLogin();
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [presentAlert] = useIonAlert();
  const [showLoading, setShowLoading] = useState(false);
  const { saveUser } = useUserContext();

  useEffect(() => {
    saveUser(data)
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
      <section className={styles.page}>
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
                      <IonButton type="reset" color="danger" size="default">Limpar</IonButton>
                      <IonButton slot="end" size="default" type="submit" >
                        Login
                      </IonButton>
                    </IonItem>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

        </IonGrid>
        <IonLoading
          isOpen={showLoading}
          message={'Verificando...'}
        />
      </section>
    </IonPage>
  );
};

export default Login;
