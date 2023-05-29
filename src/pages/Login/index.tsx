import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonInput, IonItem, IonLabel, IonLoading, IonPage, useIonAlert } from "@ionic/react";
import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { useLogin } from "graphQL/usuario/hook";
import { useUserContext } from "context/UsuarioContext";


const Login: React.FC = () => {
  const { efetuaLogin, data, loading } = useLogin();
  const [email, setEmail] = useState<string | number | null | undefined>("");
  const [senha, setSenha] = useState<string | number | null | undefined>("");
  const [presentAlert] = useIonAlert();
  const [showLoading, setShowLoading] = useState(false);
  const { saveUser } = useUserContext();


  useEffect(() => {
    saveUser(data)
  }, [data])

  useEffect(() => {
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
      <IonCard >
        <IonCardHeader>
          <IonCardTitle>LOGIN</IonCardTitle>
        </IonCardHeader>

        <IonItem >
          <IonLabel position="floating">Email</IonLabel>
          <IonInput required={true} type="text" onIonChange={(ev) => setEmail(ev.target.value)} value={email} />
        </IonItem>

        <IonItem >
          <IonLabel position="floating">Senha</IonLabel>
          <IonInput required={true} type="password" onIonChange={(ev) => setSenha(ev.target.value)} value={senha} />
        </IonItem>

        <IonItem >
          <IonButton onClick={handleLogin} >
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
