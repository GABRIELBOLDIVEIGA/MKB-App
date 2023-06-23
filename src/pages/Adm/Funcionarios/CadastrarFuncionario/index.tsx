import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLoading, IonModal, IonPage, IonTitle, IonToolbar, useIonAlert } from "@ionic/react";
import Cabecalho from "components/Cabecalho";
import { useCriarFuncionario } from "graphQL/usuario/hook";
import { useState } from "react";
import CardFuncionario from "../CardFuncionario";
import { closeOutline } from 'ionicons/icons'
import { useHistory } from "react-router";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "components/Input";

type FuncionarioFormSchema = z.infer<typeof cadastroFuncionarioFormSchema>

const cadastroFuncionarioFormSchema = z.object({
  nome: z.string()
    .nonempty('Nome não pode ser vazio!')
    .min(3, 'Nome deve ter no mínimo 3 caracteres!')
    .refine(
      (nome) => (nome.replace(/[^a-z]/gi, "").length > 3),
      ({ message: 'Caracteres especiais e numeros serão ignorados.' })
    )
    .transform((nome) => {
      return nome.toLowerCase().replace(/[^a-z]/gi, "")
    }),
  email: z.string()
    .nonempty('Email não pode ser vazio!')
    .email('Não é um formato de email valido!'),
  cpf: z.string()
    .min(11, 'CPF deve ter no mínimo 11 caracteres!')
    .max(11, 'CPF deve ter no máximo 11 caracteres!')
    .refine(
      (cpf) => (cpf.replace(/[^0-9]/gi, "").length === 11),
      ({ message: 'CPF deve ter apenas numeros!' })
    )
    .transform((cpf) => {
      return cpf.replace(/[^0-9]/gi, "")
    }),
  senha: z.string()
    .nonempty('Senha não pode ser vazia!')
    .min(6, 'Senha deve ter no mínimo 6 caracteres!')
    .max(30, 'Senha deve ter no máximo 30 caracteres!'),
  confirmarSenha: z.string()
    .nonempty('Senha não pode ser vazia!')
    .min(6, 'Senha deve ter no mínimo 6 caracteres!')
    .max(30, 'Senha deve ter no máximo 30 caracteres!'),
  ddd: z.string()
    .max(2, 'DDD deve ter no máximo 2 numeros.'),
  celular: z.string()
    .max(9, 'Celular deve ter no máximo 9 numeros.'),
  telefone: z.string()
    .max(8, 'Telefone deve ter no máximo 9 numeros.'),
})

const ContainerCard = styled.section`
  display: grid;
  place-items: center;
  height: 100%;
`
const CardS = styled(IonCard)`
  @media screen and (max-width: 650px) {
    padding-top: 2rem;
    width: 100%;
    height: 100%;
  }

  @media screen and (min-width: 650px) {
    width: 50%;
    height: max-content; 
    margin: 0 !important;
    transform: translateY(-50px);
  }
`

export default function CadastrarFuncionario() {
  const { createUsuario, data, loading } = useCriarFuncionario();
  const [isOpen, setIsOpen] = useState(true);
  const [presentAlert] = useIonAlert();
  const history = useHistory();
  const {
    handleSubmit,
    formState: {
      errors
    },
    register
  } = useForm<FuncionarioFormSchema>({
    resolver: zodResolver(cadastroFuncionarioFormSchema)
  })

  const handleSubmitSchema = (data: FuncionarioFormSchema) => {

    const funcionario = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      celular: data.celular,
      telefone: data.telefone,
      cpf: data.cpf,
      privilegio: 1
    }

    if (data.senha === data.confirmarSenha) {
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
    } else {
      alert("senhas diferentes!")
    }
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
        <ContainerCard>
          <CardS>
            <IonCardHeader>
              <IonCardTitle style={{ textAlign: 'center' }}>Dados do Funcionário</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form onSubmit={handleSubmit(handleSubmitSchema)}>
                <Input
                  type="text"
                  placeholder="Digite o nome aqui"
                  label="Nome"
                  {...register('nome')}
                  hasError={errors.nome?.message}
                />
                <Input
                  type="email"
                  placeholder="Digite o email aqui"
                  label="E-mail"
                  {...register('email')}
                  hasError={errors.email?.message}
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Digite o CPF aqui"
                  label="CPF"
                  {...register('cpf')}
                  hasError={errors.cpf?.message}
                />
                <Input
                  type="password"
                  placeholder="Digite a Senha aqui"
                  label="Senha"
                  {...register('senha')}
                  hasError={errors.senha?.message}
                />
                <Input
                  type="password"
                  placeholder="Digite a Confirmar Senha aqui"
                  label="Confirmar Senha"
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
                  <IonButton color="warning" size="default" type="reset">Limpar</IonButton>
                  <IonButton slot="end" size="default" type="submit">Confirmar</IonButton>
                </IonItem>
              </form>

            </IonCardContent>
          </CardS>

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
            message={'Verificando...'}
          />

        </ContainerCard>
      </IonContent>
    </IonPage>
  )
}
