import { IonButton, IonButtons, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLoading, IonModal, IonPage, IonTitle, IonToolbar, useIonAlert } from "@ionic/react";
import Cabecalho from "components/Cabecalho";
import { useCriarFuncionario } from "graphQL/usuario/hook";
import { useState } from "react";
import CardFuncionario from "../CardFuncionario";
import { closeOutline } from 'ionicons/icons'
import { useHistory } from "react-router";
import { Input } from "components/Input";
import { FuncionarioForm } from "./types";
import * as S from "./styles"
import { useFuncionario } from "./useFuncionario";

export default function CadastrarFuncionario() {
  const { handleSubmit, errors, register, reset } = useFuncionario()
  const { createUsuario, data, loading } = useCriarFuncionario();
  const [isOpen, setIsOpen] = useState(true);
  const [presentAlert] = useIonAlert();
  const history = useHistory();

  const cadastrarFuncionario = (data: FuncionarioForm) => {
    const funcionario = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      ddd: data.ddd,
      celular: data.celular,
      telefone: data.telefone,
      cpf: data.cpf,
      privilegio: 1
    }

    createUsuario({
      variables: { usuarioInput: { ...funcionario } },
      onCompleted: () => {
        setIsOpen(true);
      },
      onError: (error) => {
        presentAlert({
          header: 'Atenção',
          subHeader: "Email ou CPF duplicados",
          message: `${error.message}`,
          buttons: ['OK'],
        })
      }
    })
  }

  const handleModalClose = () => {
    history.push('/funcionarios');
  }

  return (
    <IonPage>
      <Cabecalho>
        <IonTitle>Cadastrar Funcionário</IonTitle>
      </Cabecalho>

      <IonContent >
        <S.Container>
          <S.Card>
            <IonCardHeader>
              <IonCardTitle style={{ textAlign: 'center' }}>Dados do Funcionário</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form onSubmit={handleSubmit(cadastrarFuncionario)}>
                <Input
                  type="text"
                  placeholder="Digite o nome aqui"
                  label="Nome *"
                  {...register('nome')}
                  hasError={errors.nome?.message}
                />
                <Input
                  type="email"
                  placeholder="Digite o email aqui"
                  label="E-mail *"
                  {...register('email')}
                  hasError={errors.email?.message}
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Digite o CPF ou CNPJ aqui"
                  label="CPF ou CNPJ *"
                  {...register('cpf')}
                  hasError={errors.cpf?.message}
                />
                <Input
                  type="password"
                  placeholder="Digite a Senha aqui"
                  label="Senha *"
                  {...register('senha')}
                  hasError={errors.senha?.message}
                />
                <Input
                  type="password"
                  placeholder="Digite a Senha aqui"
                  label="Confirmar Senha *"
                  {...register('confirmarSenha')}
                  hasError={errors.confirmarSenha?.message}
                />
                <Input
                  type="number"
                  placeholder="Digite o DDD aqui"
                  label="DDD"
                  {...register('ddd')}
                  hasError={errors.ddd?.message}
                />
                <Input
                  type="number"
                  placeholder="Digite o Celular aqui"
                  label="Celular"
                  {...register('celular')}
                  hasError={errors.celular?.message}
                />
                <Input
                  type="number"
                  placeholder="Digite o telefone aqui"
                  label="Telefone"
                  {...register('telefone')}
                  hasError={errors.telefone?.message}
                />

                <IonItem lines="none" style={{ marginTop: "1rem" }}>
                  <IonButton color="warning" size="small" onClick={() => reset()}>Limpar</IonButton>
                  <IonButton slot="end" size="small" type="submit">Confirmar</IonButton>
                </IonItem>
              </form>

            </IonCardContent>
          </S.Card>

          {data &&
            <IonModal isOpen={isOpen} onDidDismiss={() => handleModalClose()}>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Funcionario Cadastrado com sucesso</IonTitle>
                  <IonButtons slot="end">
                    <IonButton onClick={() => handleModalClose()}><IonIcon icon={closeOutline} /></IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">
                <CardFuncionario {...data} />
              </IonContent>
            </IonModal>
          }
          <IonLoading
            isOpen={loading}
            message={'Cadastrando...'}
          />
        </S.Container>
      </IonContent>
    </IonPage>
  )
}
