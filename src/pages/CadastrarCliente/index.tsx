import { IonPage, IonContent, IonCardContent, IonItem, IonButton, IonLoading, IonTitle, IonCardHeader, IonCardTitle } from "@ionic/react";
import Cabecalho from "components/Cabecalho";
import { Input } from "components/Input";
import * as S from "components/ClienteForm/styles";
import { useCadastrarCliente } from "./useCadastrarCliente";

export default function CadastrarCliente() {
  const { errors, register, handleSubmit, reset, handleFormSubmit, loading } = useCadastrarCliente();

  return (
    <IonPage>
      <Cabecalho>
        <IonTitle>Cadastrar Cliente</IonTitle>
      </Cabecalho>

      <IonContent>
        <S.Container>
          <S.Card>
            <IonCardHeader>
              <IonCardTitle style={{ textAlign: 'center' }}>Dados Cliente</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <fieldset>
                  <legend>Infos do Cliente</legend>
                  <Input
                    type="text"
                    placeholder="Digite o Nome aqui"
                    label="Nome (Obrigatório)"
                    {...register('nome')}
                    hasError={errors.nome?.message}
                  />
                  <Input
                    type="text"
                    placeholder="Digite o CNPJ aqui"
                    label="CNPJ (Obrigatório)"
                    {...register('cnpj')}
                    hasError={errors.cnpj?.message}
                  />
                  <Input
                    type="text"
                    placeholder="Digite o Nome Fantasia aqui"
                    label="Nome Fantasia"
                    {...register('fantasia')}
                    hasError={errors.fantasia?.message}
                  />
                  <Input
                    type="text"
                    placeholder="Digite o Codigo aqui"
                    label="Codigo"
                    {...register('cod')}
                    hasError={errors.cod?.message}
                  />
                </fieldset>

                <fieldset>
                  <legend>Endereço do Cliente</legend>
                  <Input
                    maxLength={8}
                    type="text"
                    placeholder="Digite o CEP aqui"
                    label="CEP"
                    {...register('cep')}
                    hasError={errors.cep?.message}
                  />
                  <Input
                    type="text"
                    placeholder="Digite o Endereco aqui"
                    label="Endereço"
                    {...register('endereco')}
                    hasError={errors.endereco?.message}
                  />
                  <Input
                    type="tex"
                    placeholder="Digite o Numero aqui"
                    label="Numero"
                    {...register('numero')}
                    hasError={errors.numero?.message}
                  />
                  <Input
                    type="text"
                    placeholder="Digite o Bairro aqui"
                    label="Bairro"
                    {...register('bairro')}
                    hasError={errors.bairro?.message}
                  />
                  <Input
                    type="text"
                    placeholder="Digite o Cidade aqui"
                    label="Cidade"
                    {...register('cidade')}
                    hasError={errors.cidade?.message}
                  />
                  <Input
                    type="text"
                    placeholder="Digite o UF aqui"
                    label="UF"
                    {...register('uf')}
                    hasError={errors.uf?.message}
                  />
                </fieldset>

                <fieldset>
                  <legend>Contatos do Cliente</legend>
                  <Input
                    type="text"
                    placeholder="Digite o E-mail aqui"
                    label="E-mail"
                    {...register('email')}
                    hasError={errors.email?.message}
                  />
                  <Input
                    type="text"
                    placeholder="Digite o DDD aqui"
                    label="DDD"
                    {...register('ddd')}
                    hasError={errors.ddd?.message}
                  />
                  <Input
                    type="text"
                    placeholder="Digite o Fone 1 aqui"
                    label="Fone 1"
                    {...register('fone1')}
                    hasError={errors.fone1?.message}
                  />
                  <Input
                    type="text"
                    placeholder="Digite o Fone 2 aqui"
                    label="Fone 2"
                    {...register('fone2')}
                    hasError={errors.fone2?.message}
                  />
                  <Input
                    type="text"
                    placeholder="Digite o Celular aqui"
                    label="Celular"
                    {...register('celular')}
                    hasError={errors.celular?.message}
                  />
                  <Input
                    type="text"
                    placeholder="Digite o Fax aqui"
                    label="Fax"
                    {...register('fax')}
                    hasError={errors.fax?.message}
                  />
                </fieldset>

                <IonItem lines="none" style={{ marginTop: "1rem" }}>
                  <IonButton color="warning" size="small" onClick={() => reset()}>Limpar</IonButton>
                  <IonButton slot="end" size="small" type="submit">Confirmar</IonButton>
                </IonItem>
              </form>

            </IonCardContent>
          </S.Card>
        </S.Container>

        <IonLoading
          isOpen={loading}
          message={'Cadastrando...'}
        />

      </IonContent>
    </IonPage>
  );
}
