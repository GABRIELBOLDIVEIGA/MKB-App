import { IonButton } from "@ionic/react";
import { Input } from "components/Input";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

type CreateUserFormData = z.infer<typeof createUserFormSchema>
const createUserFormSchema = z.object({
  nome: z.string()
    .nonempty('O nome é obrigatório!')
    .min(3, 'Nome deve ter no minimo 3 Letras'),
  email: z.string()
    .nonempty('O e-mail é obrigatório!')
    .email('Formato de email invalido!'),
  cpf: z.string()
    .nonempty('CPf não pode ser vazio!')
    .min(11, 'CPF deve ter no minimo 11 numeros!')
    .max(11, 'CPF deve ter no maximo 11 numeros!')
})


export default function Zod() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
    // mode: 'onBlur'
  });

  // console.log(errors)

  function createUser(data: CreateUserFormData) {
    console.log("[CreateUser] - ", data)
  }

  return (
    <form onSubmit={handleSubmit(createUser)}>

      <Input
        label="Nome"
        placeholder="Digite seu nome"
        type="text"
        {...register('nome')}
        hasError={errors.nome?.message}
      />

      <Input
        label="E-mail"
        placeholder="Digite seu email"
        type="email"
        {...register('email')}
        hasError={errors.email?.message}
      />

      <Input
        label="CPF"
        placeholder="Digite seu CPF"
        type="numer"
        {...register('cpf')}
        hasError={errors.cpf?.message}
      />

      <div>
        <IonButton type="reset" color='warning'>Limpar</IonButton>
        <IonButton type='submit' color='primary'>Confirmar</IonButton>
      </div>
    </form>
  )
}
