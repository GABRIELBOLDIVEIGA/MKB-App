import { useForm } from "react-hook-form"
import { UsuarioForm } from "./types"
import { zodResolver } from "@hookform/resolvers/zod"
import { usuarioFormSchema } from "./schema"
import { useEffect } from "react"
import { useGetUsuarioById } from "graphQL/usuario/hook"
import { useParams } from "react-router"

export const useFuncionario = () => {
  const params = useParams<{ id: string }>();
  const { data: user, error, loading } = useGetUsuarioById(params.id);

  const { handleSubmit, reset, formState: { errors }, register, setValue } = useForm<UsuarioForm>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(usuarioFormSchema),
    defaultValues: {
      usuario: {
        nome: '',
        email: '',
        cpf: '',
        ddd: '',
        celular: '',
        telefone: ''
      }
    }
  })

  useEffect(() => {
    setValue('usuario.nome', user?.nome ? user.nome : "")
    setValue('usuario.email', user?.email ? user.email : "")
    setValue('usuario.cpf', user?.cpf ? user.cpf : "")
    setValue('usuario.ddd', user?.ddd ? user.ddd : "")
    setValue('usuario.celular', user?.celular ? user.celular : "")
    setValue('usuario.telefone', user?.telefone ? user.telefone : "")
  }, [user])

  return {
    handleSubmit,
    errors,
    register,
    loading,
    error,
    user,
    reset
  }
}