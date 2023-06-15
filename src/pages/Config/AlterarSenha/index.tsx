import { IonCard, IonCardContent, IonContent, IonInput, IonItem, IonLabel, IonLoading, IonPage, useIonAlert } from '@ionic/react'
import Cabecalho from 'components/Cabecalho'
import styled from 'styled-components'
import { IonButton } from '@ionic/react';
import { useUserContext } from 'context/UsuarioContext';
import { useEffect, useState } from 'react';
import { useUpdateSenha } from 'graphQL/usuario/hook';

const Section = styled.section`
  display: grid;
  place-items: center;
  padding: 1rem;
`
const DivButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`

export default function AlterarSenha() {
  const { usuario, removeUser } = useUserContext();
  const [senha, setSenha] = useState<string | number | null | undefined>();
  const [novaSenha, setNovaSenha] = useState<string | number | null | undefined>();
  const [novaSenhaRepetir, setNovaSenhaRepetir] = useState<string | number | null | undefined>();
  const { updateSenha, loading } = useUpdateSenha();
  const [presentAlert] = useIonAlert();

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (novaSenhaRepetir === novaSenha) {
      updateSenha({
        variables: {
          novaSenhaInput: {
            senha,
            novaSenha,
            email: usuario.email
          }
        },
        onCompleted: (data) => {
          presentAlert({
            header: 'Sucesso!',
            subHeader: `${data.updateSenha}`,
            message: `Você será redirecionado para o Login`,
            buttons: ['OK'],
            onDidDismiss: () => {
              removeUser();
            }
          })
        },
        onError: (error) => {
          presentAlert({
            header: 'Atenção!',
            subHeader: `${error.message}`,
            message: `${error.message}`,
            buttons: ['OK'],
          })
        }
      })
    } else { 
      presentAlert({
        header: 'Atenção!',
        subHeader: "Nova Senha e Repetir Senha",
        message: "As senhas devem ser iguais.",
        buttons: ['OK'],
      })
    }
  }

  return (
    <IonPage>
      <Cabecalho texto='Alterar Senha' />
      <IonContent>

        <Section>
          <IonCard style={{width: "100%", maxWidth: "500px"}}>
            <IonCardContent>
              <form onSubmit={(ev) => { handleSubmit(ev) }}>
                <IonItem>
                  <IonLabel position='stacked'>Senha Atual</IonLabel>
                  <IonInput
                    value={senha}
                    onIonChange={(ev) => { setSenha(ev.target.value) }}
                    type='password'
                    placeholder='Senha Atual'
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position='stacked'>Nova Senha</IonLabel>
                  <IonInput 
                    value={novaSenha}
                    onIonChange={(ev) => { setNovaSenha(ev.target.value) }}
                    type='password'
                    placeholder="Nova Senha"
                    minlength={6}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position='stacked'>Repita a Senha</IonLabel>
                  <IonInput 
                    value={novaSenhaRepetir}
                    onIonChange={(ev) => { setNovaSenhaRepetir(ev.target.value) }}
                    type='password'
                    placeholder="Repita a Senha"
                    minlength={6}
                  />
                </IonItem>

                <DivButtons >
                  <IonButton type="reset" color="warning" size='small'>Limpar</IonButton>
                  <IonButton type="submit" color="primary" size='small'>Confirmar</IonButton>
                </DivButtons>

              </form>
            </IonCardContent>
          </IonCard>
        </Section>
        <IonLoading
          isOpen={loading}
          message={'Verificando...'}
        />

      </IonContent>
    </IonPage>
  )
}
