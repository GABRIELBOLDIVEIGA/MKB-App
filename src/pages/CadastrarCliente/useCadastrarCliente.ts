import { useForm } from "react-hook-form"
import { ClienteForm, ViaCEP } from "components/ClienteForm/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { clienteFormSchema } from "components/ClienteForm/schema"
import { useCallback, useEffect } from "react"
import axios from "axios";
import { useCreateCliente } from "graphQL/clientes/hooks"
import { useIonAlert } from "@ionic/react"
import { useHistory } from "react-router"

export const useCadastrarCliente = () => {
  const [presentAlert] = useIonAlert();
  const { createCliente, loading } = useCreateCliente();
  const history = useHistory();
  const {
    formState: {
      errors
    },
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<ClienteForm>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(clienteFormSchema),
    defaultValues: {
      nome: '',
      cnpj: '',
      fantasia: '',
      cod: '',
      cep: '',
      endereco: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: '',
      email: '',
      ddd: '',
      fone1: '',
      fone2: '',
      celular: '',
      fax: ''
    }
  })

  const zipCode = watch('cep');

  const handleFormSubmit = (data: ClienteForm) => {
    createCliente({
      variables: {
        clienteInput: {
          cod: data.cod,
          nome: data.nome,
          cnpj: data.cnpj,
          endereco: data.endereco,
          bairro: data.bairro,
          cidade: data.cidade,
          cep: data.cep,
          uf: data.uf,
          email: data.email,
          fone1: data.fone1,
          ddd: data.ddd,
          fone2: data.fone2,
          celular: data.celular,
          fax: data.fax,
          fantasia: data.fantasia,
          numero: data.numero
        }
      },
      onCompleted: () => { 
        presentAlert({
          header: 'Sucesso',
          subHeader: "Cliente cadastrado com sucesso.",
          buttons: ['OK'],
          onDidDismiss: () => {
            history.push("/login")
          }
        })
      },
      onError: (error) => {
        presentAlert({
          header: 'Error',
          subHeader: `${error.message}`,
          buttons: ['OK'],
        })
      }
    })
  }

  const handleSetData = useCallback((data: ViaCEP) => {
    setValue("bairro", data.bairro)
    setValue("cidade", data.localidade)
    setValue("endereco", data.logradouro)
    setValue("uf", data.uf)

  }, [setValue])


  const handleFetchAddress = useCallback(
    async (zipCode: string) => {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${zipCode}/json/`);

      handleSetData(data)
    }, [handleSetData]
  )

  useEffect(() => {
    setValue('cep', zipCode);
    if (zipCode?.length != 8) return

    handleFetchAddress(zipCode)
  }, [setValue, handleFetchAddress, zipCode])


  return { errors, register, handleSubmit, reset, handleFormSubmit, loading }
}