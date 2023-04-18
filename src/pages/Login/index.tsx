import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonInput, IonItem, IonLabel, IonPage, IonRouterLink, IonText, useIonAlert, useIonLoading } from "@ionic/react";
import React, { useContext, useState } from "react";
import styles from "./Login.module.scss";
import { UsuarioContext } from "common/context/UsuarioContext";

const Login: React.FC = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userSenha, setUserSenha] = useState("");

    const [presentAlert] = useIonAlert();
    const [present, dismiss] = useIonLoading();
    const userContext = useContext(UsuarioContext);
    if (!userContext) return null;
    const { email, senha, setLoginValido } = userContext;

    // const solicitaLogin = async (userEmail: string, userSenha: string) => {
    //     const resposta = await fetch("http://localhost/ronney_api/public/pages/login/loginapi.php", {
    //         method: "POST",
    //         headers: {
    //             "Content-type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             senha: userSenha,
    //             email: userEmail,
    //         }),
    //     });

    //     if (resposta.ok) {
    //         return resposta.body;
    //     }
    //     throw new Error("Algo de errado não esta certo...");
    // };

    const handleChangeEmail = (ev: Event) => {
        let query = "";
        const target = ev.target as HTMLIonSearchbarElement;
        if (target) query = target.value!.toLowerCase();

        setUserEmail(query);
    };

    const handleChangePassword = (ev: Event) => {
        let query = "";
        const target = ev.target as HTMLIonSearchbarElement;
        if (target) query = target.value!.toLowerCase();

        setUserSenha(query);
    };

    const handlerFakeLogin = () => {
        if (senha !== userSenha || email !== userEmail) {
            presentAlert({
                header: "Atenção",
                subHeader: "Senha ou Email invalidos.",
                message: "Não foi possivel efetuar o login.",
                buttons: ["OK"],
            });

            return;
        } else {
            present({
                message: "Verificando...",
                duration: 1600,
            });

            setTimeout(() => {
                setLoginValido(true);
            }, 1500);
        }
    };

    return (
        <IonPage className={styles.login}>
            <IonCard className={styles.login__card}>
                <IonCardHeader>
                    <IonCardTitle>Tribunal de Justiça do Espírito Santo</IonCardTitle>
                </IonCardHeader>

                {/* LOGO aqui */}

                <IonItem className={styles.login__item}>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput required={true} type="text" onIonChange={(ev) => handleChangeEmail(ev)} value={userEmail} />
                </IonItem>

                <IonItem className={styles.login__item}>
                    <IonLabel position="floating">Senha</IonLabel>
                    <IonInput required={true} type="password" onIonChange={(ev) => handleChangePassword(ev)} value={userSenha} />
                </IonItem>

                <IonItem className={styles.login__item}>
                    <IonButton onClick={handlerFakeLogin /*solicitaLogin(userSenha, userEmail)*/} className={styles.login__btn}>
                        Login
                    </IonButton>
                </IonItem>

                <IonRouterLink routerLink="/recuperarSenha">Esqueci minha senha </IonRouterLink>

                <IonText>
                    Não tem cadastro?
                    <IonRouterLink routerLink="/fazerCadastro">Cadastre-se aqui</IonRouterLink>
                </IonText>
            </IonCard>
        </IonPage>
    );
};

export default Login;
