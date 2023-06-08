import { useMutation, useQuery } from "@apollo/client"
import { CRIAR_FUNCIONARIO, LOGIN } from "./mutations"
import { GET_USUARIOS, GET_USUARIO_BY_ID } from "./queries"
import { Usuario } from "interface/Usuario"

export const useLogin = () => {
  const [efetuaLogin, { loading, data, error }] = useMutation(LOGIN)

  return { efetuaLogin, loading, data: data?.loginUsuario, error };
}

export const useGetUsuarioById = (id: string) => { 
  const { data, loading, error, refetch } = useQuery<{ getUsuario: Usuario }>(GET_USUARIO_BY_ID, {
    variables: {
      id
    }
  });

  return { data: data?.getUsuario, loading, error, refetch } 
}

export const useGetUsuarios = () => { 
  const { data, loading, error, refetch } = useQuery<{getUsuarios : Usuario[]}>(GET_USUARIOS);

  return { data: data?.getUsuarios, loading, error, refetch };
}

export const useCriarFuncionario = () => {
  const [createUsuario, {data, loading, error} ] = useMutation(CRIAR_FUNCIONARIO)

  return {createUsuario, data: data?.createUsuario, loading, error}
}