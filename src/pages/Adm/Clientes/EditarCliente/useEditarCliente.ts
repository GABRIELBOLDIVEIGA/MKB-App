import { zodResolver } from "@hookform/resolvers/zod";
import { useIonAlert } from "@ionic/react";
import axios from "axios";
import { clienteFormSchema } from "components/ClienteForm/schema";
import { ClienteForm, ViaCEP } from "components/ClienteForm/types";
import { useGetClienteById, useUpdateCliente } from "graphQL/clientes/hooks";
import { Cliente } from "interface/Cliente";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";

export const useEditarCliente = () => { 
  const params = useParams<{ id: string }>();
  const { data, loading: loadingGetCliente } = useGetClienteById(params.id);
  const [presentAlert] = useIonAlert();
  const { updateCliente, data: dataUpdate, error: errorUpdate, loading: loaddingUpdateCliente } = useUpdateCliente();
  const history = useHistory();
  const {
    formState: {
      errors
    },
    register,
    reset,
    handleSubmit,
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
    updateCliente({
      variables: {
        id: params.id,
        clienteUpdateInput: {
          ...data
        }
      },
      onCompleted: () => {
        presentAlert({
          header: 'Sucesso',
          subHeader: "Dados alterados com sucesso.",
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
    },
      
    )
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

  const handleSetDataCliente = (data: Cliente) => { 
    setValue('nome', data.nome)
    setValue('cnpj', data.cnpj)
    setValue('fantasia', data.fantasia)
    setValue('cod', data.cod)
    setValue('cep', data.cep)
    setValue('endereco', data.endereco)
    setValue('numero', data.numero)
    setValue('bairro', data.bairro)
    setValue('cidade', data.cidade)
    setValue('uf', data.uf)
    setValue('email', data.email)
    setValue('ddd', data.ddd)
    setValue('fone1', data.fone1)
    setValue('fone2', data.fone2)
    setValue('celular', data.celular)
    setValue('fax', data.fax)
  }

  useEffect(() => {
    setValue('cep', zipCode);
    if (zipCode?.length != 8) return

    handleFetchAddress(zipCode)
  }, [setValue, handleFetchAddress, zipCode])


  useEffect(() => { 
    if(data) handleSetDataCliente(data)
  },[data])


  return { errors, register, handleSubmit, reset, handleFormSubmit, loadingGetCliente, loaddingUpdateCliente }
}