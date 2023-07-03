import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonLoading, IonPage, IonRow, IonText, useIonAlert } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useLogin } from "graphQL/usuario/hook";
import { useUserContext } from "context/UsuarioContext";
import InputField from "components/InputField";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "assets/logo_kmb.jpeg";

import { Input } from "components/Input";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

type LoginFormData = z.infer<typeof loginFormSchema>
const loginFormSchema = z.object({
  email: z.string()
    .nonempty('O e-mail é obrigatório!')
    .email('Formato de e-mail invalido!'),
  senha: z.string()
    .nonempty('Senha não pode ser vazia!')
    .min(6, 'Senha deve ter no mínimo 6 caracteres!')
    .max(30, 'Senha deve ter no máximo 30 caracteres!')
})

const Section = styled.section`
  padding-top: 6rem;
`
const ContainerImg = styled.div`
  display: grid;
  place-items: center;
`
const Img = styled.img`
width: 50%;
border-radius: 999%;
`

const Login: React.FC = () => {
  const { efetuaLogin, data, loading } = useLogin();
  const [presentAlert] = useIonAlert();
  const [showLoading, setShowLoading] = useState(false);
  const { saveUser } = useUserContext();
  const { register, handleSubmit, formState: { errors }, } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  useEffect(() => {
    saveUser(data);
  }, [data])

  useEffect(() => {
    setShowLoading(loading)
  }, [loading])

  const handleLogin = (data: LoginFormData) => {
    efetuaLogin({
      variables: {
        loginInput: {
          email: data.email,
          senha: data.senha
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
                    <ContainerImg>
                      <Img src={logo} />
                    </ContainerImg>
                  </IonCardHeader>
                  <IonCardContent>
                    <form onSubmit={handleSubmit(handleLogin)}>
                      <Input
                        label="E-mail"
                        placeholder="Digite seu email"
                        type="email"
                        {...register('email')}
                        hasError={errors.email?.message}
                      />
                      <Input
                        label="Senha"
                        placeholder="Digite sua Senha"
                        type="password"
                        {...register('senha')}
                        hasError={errors.senha?.message}
                      />
                      <IonItem lines="none" style={{ marginTop: "10px" }}>
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
