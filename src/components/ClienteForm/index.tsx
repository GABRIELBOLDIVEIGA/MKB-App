import { IonAlert, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle } from "@ionic/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { useCreateCliente } from "graphQL/clientes/hooks";
import { useHistory } from "react-router";
import Cabecalho from "components/Cabecalho";

const Span = styled.span`
  color: #ff5b71;
  font-size: 12px;
`

const Section = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`

const createClienteFormSchema = z.object({
  cod: z.string().nonempty("Código é obrigatório!"),
  nome: z.string().nonempty("Nome é obrigatório!"),
  email: z.string().nonempty().email("Formato de e-mail inválido!"),
  fantasia: z.string(),
  cnpj: z.string().max(14, "CNPJ não deve ter mais de 14 números!"),
  celular: z.string(),
  fone1: z.string(),
  fone2: z.string(),
  fax: z.string(),
  ddd: z.string().max(2, "DDD não deve ter mais de 2 dígitos!"),
  cep: z.string().nonempty("CEP é obrigatório!").max(8, "CEP não deve ter mais de 8 dígitos!"),
  uf: z.string().nonempty("UF é obrigatório!").max(2, "UF não deve ter mais de 2 dígitos!"),
  cidade: z.string().nonempty("Cidade é obrigatório!"),
  bairro: z.string().nonempty("Bairro é obrigatório!"),
  endereco: z.string().nonempty("Endereçoé obrigatório!"),
  numero: z.string().nonempty("Número é obrigatório!")
})

type CreateClienteFormType = z.infer<typeof createClienteFormSchema>

export default function ClienteForm() {
  const { createCliente, data, loading, error } = useCreateCliente();
  const [alertErrorIsOpen, setAlertErrorIsOpen] = useState<boolean>(false);
  const [alertSuccessIsOpen, setAlertSuccessIsOpen] = useState<boolean>(false);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors } } = useForm<CreateClienteFormType>({
      resolver: zodResolver(createClienteFormSchema)
    });

  const createClienteZod = (form: CreateClienteFormType) => {
    createCliente({
      variables: {
        clienteInput: { ...form }
      },
      onCompleted: () => {
        setAlertSuccessIsOpen(true);
      },
      onError: () => {
        setAlertErrorIsOpen(true);
      }
    })
  }

  return (
    <IonPage>
      <IonAlert
        isOpen={alertErrorIsOpen}
        subHeader="Erro !"
        message={`${error?.graphQLErrors?.[0].message
          }`}
        buttons={['OK']}
      />
      <IonAlert
        isOpen={alertSuccessIsOpen}
        subHeader="Sucesso"
        message="Cliente cadastrado com sucesso!"
        buttons={['OK']}
        onDidDismiss={() => {
          history.push("/pedidos")
        }}
      />
      <Cabecalho>
        <IonTitle>Cadastrar Cliente</IonTitle>
      </Cabecalho>

      <IonContent>
        <Section>
          <IonCard style={{ width: "100%", maxWidth: "1200px" }}>
            <IonCardContent>
              <form onSubmit={handleSubmit(createClienteZod)}>
                <IonGrid>
                  <IonItem>
                    <IonLabel position="stacked">Código</IonLabel>
                    <IonInput
                      placeholder="Código"
                      type="number"
                      {...register('cod')}
                    />
                    {errors.cod && <Span>{errors.cod.message}</Span>}
                  </IonItem>

                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">Nome</IonLabel>
                        <IonInput
                          placeholder="Nome"
                          type="text"
                          {...register('nome')}
                        />
                        {errors.nome && <Span>{errors.nome.message}</Span>}
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">E-mail</IonLabel>
                        <IonInput
                          placeholder="E-mail@gmail.com"
                          type="email"
                          {...register('email')}
                        />
                        {errors.email && <Span>{errors.email.message}</Span>}
                      </IonItem>
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">Nome Fantasia</IonLabel>
                        <IonInput
                          placeholder="Nome Fantasia"
                          type="text"
                          {...register('fantasia')}
                        />
                        {errors.fantasia && <Span>{errors.fantasia.message}</Span>}
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">CNPJ</IonLabel>
                        <IonInput
                          placeholder="CNPJ"
                          type="number"
                          {...register('cnpj')}
                        />
                        {errors.cnpj && <Span>{errors.cnpj.message}</Span>}
                      </IonItem>
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">DDD</IonLabel>
                        <IonInput
                          placeholder="00"
                          type="number"
                          {...register('ddd')}
                        />
                        {errors.ddd && <Span>{errors.ddd.message}</Span>}
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">Número de Fax</IonLabel>
                        <IonInput
                          placeholder="0000-0000"
                          type="number"
                          {...register('fax')}
                        />
                        {errors.fax && <Span>{errors.fax.message}</Span>}
                      </IonItem>
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">Número de Telefone 1</IonLabel>
                        <IonInput

                          placeholder="0000-0000"
                          type="number"
                          {...register('fone1')}
                        />
                        {errors.fone1 && <Span>{errors.fone1.message}</Span>}
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">Número de Telefone 2</IonLabel>
                        <IonInput

                          placeholder="0000-0000"
                          type="number"
                          {...register('fone2')}
                        />
                        {errors.fone2 && <Span>{errors.fone2.message}</Span>}
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">Número de Celular</IonLabel>
                        <IonInput

                          placeholder="99999-9999"
                          type="number"
                          {...register('celular')}
                        />
                        {errors.celular && <Span>{errors.celular.message}</Span>}
                      </IonItem>
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">CEP</IonLabel>
                        <IonInput

                          placeholder="CEP"
                          type="number"
                          {...register('cep')}
                        />
                        {errors.cep && <Span>{errors.cep.message}</Span>}
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">UF</IonLabel>
                        <IonInput
                          placeholder="UF"
                          type="text"
                          {...register('uf')}
                        />
                        {errors.uf && <Span>{errors.uf.message}</Span>}
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">Cidade</IonLabel>
                        <IonInput
                          placeholder="Cidade"
                          type="text"
                          {...register('cidade')}
                        />
                        {errors.cidade && <Span>{errors.cidade.message}</Span>}
                      </IonItem>
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">Bairro</IonLabel>
                        <IonInput
                          placeholder="Bairro"
                          type="text"
                          {...register('bairro')}
                        />
                        {errors.bairro && <Span>{errors.bairro.message}</Span>}
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">Endereço</IonLabel>
                        <IonInput
                          placeholder="Endereço"
                          type="text"
                          {...register('endereco')}
                        />
                        {errors.endereco && <Span>{errors.endereco.message}</Span>}
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">Número</IonLabel>
                        <IonInput
                          placeholder="Número"
                          type="text"
                          {...register('numero')}
                        />
                        {errors.numero && <Span>{errors.numero.message}</Span>}
                      </IonItem>
                    </IonCol>
                  </IonRow>

                  <IonItem lines="none" style={{ marginTop: "1rem" }}>
                    <IonButton onClick={() => clearErrors()} type="reset" color="warning" size="small">Limpar</IonButton>
                    <IonButton type="submit" size="small" slot="end">Cadastrar</IonButton>
                  </IonItem>
                </IonGrid>
              </form>
            </IonCardContent>
          </IonCard>
        </Section>
      </IonContent>
    </IonPage >
  )
}
