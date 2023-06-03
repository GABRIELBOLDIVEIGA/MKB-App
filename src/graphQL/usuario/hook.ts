import { useMutation, useQuery } from "@apollo/client"
import { LOGIN } from "./mutations"
import { GET_USUARIOS } from "./queries"
import { Usuario } from "interface/Usuario"

export const useLogin = () => {
  const [efetuaLogin, { loading, data, error }] = useMutation(LOGIN)

  return { efetuaLogin, loading, data: data?.loginUsuario, error };
}

export const useGetUsuarios = () => { 
  const { data, loading, error, refetch } = useQuery<{getUsuarios : Usuario[]}>(GET_USUARIOS);

  return { data: data?.getUsuarios, loading, error, refetch };
}