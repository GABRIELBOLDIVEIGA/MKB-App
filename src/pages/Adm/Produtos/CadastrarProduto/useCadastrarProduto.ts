import { useForm } from "react-hook-form"
import { ProdutoForm } from "../FormProduto/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { produtoForm } from "../FormProduto/schema"

export const useCadastrarProdutoForm = () => { 
  const { handleSubmit, formState: { errors }, register, reset } = useForm<ProdutoForm>({ resolver: zodResolver(produtoForm)})

  return {
    handleSubmit,
    errors,
    register,
    reset
  }
}