import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonRouterLink, IonText, useIonAlert, useIonLoading } from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { UsuarioContext } from "context/UsuarioContext";
import { useLogin } from "graphQL/usuario/hook";

const Login: React.FC = () => {
  const { efetuaLogin, data, error, loading } = useLogin();
  const [email, setEmail] = useState<string | number | null | undefined>("");
  const [senha, setSenha] = useState<string | number | null | undefined>("");
  const [presentAlert] = useIonAlert();
  const [showLoading, setShowLoading] = useState(false);
  const { loginValido } = useContext(UsuarioContext);

  useEffect(() => {
    console.log(data)
    console.log(error?.message)
  }, [data, error])

  useEffect(() => {
    console.log(loading)
    setShowLoading(loading)
  }, [loading])

  function handleLogin() {
    efetuaLogin({
      variables: {
        loginInput: {
          email: email,
          senha: senha
        }
      },
      onError: (err) => {
        console.log(err.message)
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
    <IonPage className={styles.login}>
      <IonCard className={styles.login__card}>
        <IonCardHeader>
          <IonCardTitle>LOGIN</IonCardTitle>
        </IonCardHeader>

        <IonItem className={styles.login__item}>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput required={true} type="text" onIonChange={(ev) => setEmail(ev.target.value)} value={email} />
        </IonItem>

        <IonItem className={styles.login__item}>
          <IonLabel position="floating">Senha</IonLabel>
          <IonInput required={true} type="password" onIonChange={(ev) => setSenha(ev.target.value)} value={senha} />
        </IonItem>

        <IonItem className={styles.login__item}>
          <IonButton onClick={handleLogin} className={styles.login__btn}>
            Login
          </IonButton>
        </IonItem>
      </IonCard>

      <IonLoading
        isOpen={showLoading}
        message={'Verificando...'}
      />
    </IonPage>
  );
};

export default Login;
