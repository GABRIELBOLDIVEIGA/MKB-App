import { IonButton, IonCard, IonCardContent, IonContent, IonItem, IonPage } from "@ionic/react";
import Cabecalho from "components/Cabecalho";
import InputField from "components/InputField";
import { useGetUsuarioById, useUpdateUsuario } from "graphQL/usuario/hook";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Usuario } from 'interface/Usuario';

const Section = styled.section`
  margin-top: 5rem;
  display:  flex;
  justify-content: center;

`

export default function EditarFuncionario() {
  const params = useParams<{ id: string }>();
  const { data, error, loading, refetch } = useGetUsuarioById(params.id);
  const { updateUsuario, data: updateData, error: updateError, loading: updateLoading } = useUpdateUsuario()

  const [nome, setNome] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [cpf, setCpf] = useState<string | undefined>();
  const [telefone, setTelefone] = useState<string | undefined>();
  const [celular, setCelular] = useState<string | undefined>();

  useEffect(() => {
    refetch()
    console.log(params)
    console.log(data)

    setNome(data?.nome)
    setEmail(data?.email)
    setCpf(data?.cpf)
    setTelefone(data?.telefone)
    setCelular(data?.celular)
  }, [data])

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    updateUsuario({
      variables: {
        usuarioInput: {
          nome,
          cpf,
          email,
          senha: data?.senha,
          telefone,
          celular,
          privilegio: data?.privilegio ? data.privilegio : 1
        },
        id: data?._id
      },
      onCompleted: (updateData) => { console.log(updateData) },
      onError: (errorUpdate) => {console.log(errorUpdate) }
    })

  }

  return (
    <IonPage>
      <Cabecalho texto="Editar funcionario" />

      <IonContent>
        <Section >
          <IonCard style={{ width: "50%" }}>
            <IonCardContent>
              <form onSubmit={(ev) => { handleSubmit(ev) }} >
                <InputField label="Nome" placeholder="Nome" position="stacked" state={nome} setState={setNome} />
                <InputField label="E-mail" placeholder="E-mail" position="stacked" type="email" state={email} setState={setEmail} />
                <InputField label="CPF" placeholder="CPF" position="stacked" state={cpf} setState={setCpf} />
                <InputField label="Celular" placeholder="Celular" position="stacked" state={celular} setState={setCelular} />
                <InputField label="Telefone" placeholder="Telefone" position="stacked" state={telefone} setState={setTelefone} />

                <IonItem lines="none" style={{ marginTop: "1rem" }}>
                  <IonButton type="reset" color="warning" size="default">Limpar</IonButton>
                  <IonButton type="submit" color="primary" size="default" slot="end">Atualizar</IonButton>
                </IonItem>
              </form>
            </IonCardContent>
          </IonCard>
        </Section>


      </IonContent>
    </IonPage>
  )
}