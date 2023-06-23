import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLoading, IonModal, IonPage, IonTitle, IonToolbar, useIonAlert } from "@ionic/react";
import Cabecalho from "components/Cabecalho";
import InputField from "components/InputField";
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
    .transform((nome) => {
      return nome.toLowerCase().replace(/[^a-z]/gi, "")
    }),
  email: z.string()
    .nonempty('Email não pode ser vazio!')
    .email('Não é um formato de email valido!'),
  cpf: z.string()
    .min(11, '')
    .max(11, '')
    .transform((cpf) => { 
      return cpf.replace(/[^0-9]/gi, "")
    })
    // .lte(11, 'CPF deve ter no máximo 11 números!'),
  // senha: z.string()
  //   .nonempty('Senha não pode ser vazia!')
  //   .min(11, 'Senha deve ter no mínimo 6 caracteres!')
  //   .max(30, 'Senha deve ter no máximo 30 caracteres!'),
  // confirmarSenha: z.string()
  //   .nonempty('Senha não pode ser vazia!')
  //   .min(11, 'Senha deve ter no mínimo 6 caracteres!')
  //   .max(30, 'Senha deve ter no máximo 30 caracteres!'),
  // ddd: z.number().positive('O número deve ser positivo'),
  // celular: z.number().positive('O número deve ser positivo'),
  // telefone: z.number().positive('O número deve ser positivo'),
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
  // const [nome, setNome] = useState<string | undefined>("");
  // const [email, setEmail] = useState<string | undefined>("");
  // const [senha, setSenha] = useState<string | undefined>("");
  // const [confirmarSenha, setConfirmarSenha] = useState<string | undefined>("");
  // const [cpf, setCpf] = useState<string | undefined>("");
  // const [celular, setCelular] = useState<string | undefined>("");
  // const [telefone, setTelefone] = useState<string | undefined>("");

  const { createUsuario, data, error, loading } = useCriarFuncionario();
  const [isOpen, setIsOpen] = useState(true);
  const [presentAlert] = useIonAlert();
  const [showLoading, setShowLoading] = useState(false);
  const history = useHistory();


  const { handleSubmit, formState: { errors }, register } = useForm<FuncionarioFormSchema>({ resolver: zodResolver(cadastroFuncionarioFormSchema) })


  console.log('[Error] - ', errors)

  const cadastro = (data: FuncionarioFormSchema) => {
    console.log('[Funcionario] - ', data)
  }

  // const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
  //   ev.preventDefault();
  //   const funcionario = {
  //     nome,
  //     email,
  //     senha,
  //     celular,
  //     telefone,
  //     cpf,
  //     privilegio: 1
  //   }

  //   if (senha === confirmarSenha) {
  //     setShowLoading(true);
  //     createUsuario({
  //       variables: { usuarioInput: { ...funcionario } },
  //       onCompleted: (data) => {
  //         setShowLoading(false);
  //         setIsOpen(true);
  //       },
  //       onError: (error) => {
  //         setShowLoading(false);
  //         presentAlert({
  //           header: 'Atenção',
  //           subHeader: "Email ou CPF duplicados",
  //           message: `${error.message}`,
  //           buttons: ['OK'],
  //         })
  //       }
  //     })
  //   } else {
  //     alert("senhas diferentes!")
  //   }
  // }

  const handleModalClose = () => {
    // setIsOpen(false);
    // setNome("");
    // setEmail("");
    // setSenha("");
    // setConfirmarSenha("");
    // setCpf("");
    // setCelular("");
    // setTelefone("");
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
              {/* <form onSubmit={ev => handleSubmit(ev)}>
                <InputField label="Nome" placeholder="Nome" position="stacked" required state={nome} setState={setNome} />
                <InputField label="CPF" placeholder="CPF" position="stacked" required state={cpf} setState={setCpf} />
                <InputField label="E-mail" placeholder="E-mail" position="stacked" required state={email} setState={setEmail} />
                <InputField label="Celular" placeholder="Celular" position="stacked" state={celular} setState={setCelular} />
                <InputField label="telefone" placeholder="Telefone" position="stacked" state={telefone} setState={setTelefone} />
                <InputField type="password" label="Senha" placeholder="Senha" position="stacked" required state={senha} setState={setSenha} />
                <InputField type="password" label="Confirmar Senha" placeholder="Confirmar Senha" position="stacked" required state={confirmarSenha} setState={setConfirmarSenha} />

                <IonItem lines="none" style={{ marginTop: "1rem" }}>
                  <IonButton color="warning" size="default" type="reset">Limpar</IonButton>
                  <IonButton slot="end" size="default" type="submit">Confirmar</IonButton>
                </IonItem>
              </form> */}

              <form onSubmit={handleSubmit(cadastro)}>
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
            isOpen={showLoading}
            message={'Verificando...'}
          />

        </ContainerCard>
      </IonContent>
    </IonPage>
  )
}
