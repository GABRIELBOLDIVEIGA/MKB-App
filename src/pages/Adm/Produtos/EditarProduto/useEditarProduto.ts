import { useForm } from "react-hook-form"
import { ProdutoForm } from "../FormProduto/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useParams } from "react-router"
import { useGetProdutoById } from "graphQL/produtos/hooks"
import { produtoForm } from "../FormProduto/schema"

export const useCadastrarProdutoForm = () => {
  const params = useParams<{ id: string }>();
  const { data: produto, loading } = useGetProdutoById(params.id);
  const {
    handleSubmit,
    formState: {
      errors
    },
    register,
    reset,
    setValue
  } = useForm<ProdutoForm>({ resolver: zodResolver(produtoForm) })

  useEffect(() => {
    if (produto) {
      setValue('cod_prod', produto.cod_prod)
      setValue('descr_resumida', produto.descr_resumida)
      setValue('descr_detalhada', produto.descr_detalhada)
      setValue('preco', produto.preco)
      setValue('unidade', produto.unidade)
    }
  }, [produto])


  return {
    handleSubmit,
    errors,
    register,
    reset,
    loading,
    produto
  }
}