import { useForm } from "react-hook-form"
import { FuncionarioForm } from "./types"
import { zodResolver } from "@hookform/resolvers/zod"
import { cadastroFuncionarioFormSchema } from "./schema"

export const useFuncionario = () => { 
  const {
    handleSubmit,
    formState: {
      errors
    },
    register,
    reset
  } = useForm<FuncionarioForm>({
    resolver: zodResolver(cadastroFuncionarioFormSchema)
  })

  return { handleSubmit, errors, register, reset }
}