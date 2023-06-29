import { IonButton, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonItem, IonLoading, IonPage, IonTitle, useIonAlert } from "@ionic/react";
import Cabecalho from "components/Cabecalho";
import { useUpdateUsuario } from "graphQL/usuario/hook";
import { useHistory } from "react-router-dom";
import { Input } from "components/Input";
import { UsuarioForm } from './types';
import { useFuncionario } from "./useFuncionario";
import * as S from "./styles";

export default function EditarFuncionario() {
  const { handleSubmit, errors, register, loading, user, reset } = useFuncionario();
  const { updateUsuario, loading: updateLoading } = useUpdateUsuario();
  const [presentAlert] = useIonAlert();
  const history = useHistory();

  const atualizarFuncionario = (data: UsuarioForm) => {
    updateUsuario({
      variables: {
        usuarioUpdateInput: {
          nome: data.usuario.nome,
          cpf: data.usuario.cpf,
          email: data.usuario.email,
          ddd: data.usuario.ddd,
          telefone: data.usuario.telefone,
          celular: data.usuario.celular,
          privilegio: user?.privilegio
        },
        id: user?._id
      },
      onCompleted: () => {
        presentAlert({
          header: 'Sucesso',
          subHeader: "Dados alterados com sucesso",
          buttons: ['OK'],
          onDidDismiss: () => {
            history.push("/funcionarios")
          }
        })
      },
      onError: () => {
        presentAlert({
          header: 'Atenção',
          subHeader: "Email ou CPF duplicados",
          message: 'Verifique email e cpf e tente novamente.',
          buttons: ['OK'],
        })
      }
    })
  }

  return (
    <IonPage>
      <Cabecalho>
        <IonTitle>Editar Funcionário</IonTitle>
      </Cabecalho>
      <IonContent>
        <S.Section >
          <S.Card>
            <IonCardHeader>
              <IonCardTitle style={{ textAlign: 'center' }}>Dados do Funcionário</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form onSubmit={handleSubmit(atualizarFuncionario)}>
                <Input
                  type="text"
                  placeholder="Digite o nome aqui"
                  label="Nome"
                  {...register('usuario.nome')}
                  hasError={errors.usuario?.nome?.message}
                />
                <Input
                  type="email"
                  placeholder="Digite o email aqui"
                  label="E-mail"
                  {...register('usuario.email')}
                  hasError={errors.usuario?.email?.message}
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Digite o CPF aqui"
                  label="CPF"
                  {...register('usuario.cpf')}
                  hasError={errors.usuario?.cpf?.message}
                />
                <Input
                  type="number"
                  placeholder="Digite o DDD aqui"
                  label="DDD"
                  {...register('usuario.ddd')}
                  hasError={errors.usuario?.ddd?.message}
                />
                <Input
                  type="number"
                  placeholder="Digite o Celular aqui"
                  label="Celular"
                  {...register('usuario.celular')}
                  hasError={errors.usuario?.celular?.message}
                />
                <Input
                  type="number"
                  placeholder="Digite o telefone aqui"
                  label="Telefone"
                  {...register('usuario.telefone')}
                  hasError={errors.usuario?.telefone?.message}
                />

                <IonItem lines="none" style={{ marginTop: "1rem" }}>
                  <IonButton color="warning" size="small" onClick={() => reset()}>Limpar</IonButton>
                  <IonButton slot="end" size="small" type="submit">Confirmar</IonButton>
                </IonItem>
              </form>
            </IonCardContent>
          </S.Card>
        </S.Section>

        <IonLoading
          isOpen={updateLoading}
          message={'Atualizando Dados...'}
        />
        <IonLoading
          isOpen={loading}
          message={'Buscando Dados...'}
        />

      </IonContent>
    </IonPage>
  )
}
