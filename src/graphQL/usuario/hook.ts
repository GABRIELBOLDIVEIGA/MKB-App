import { useMutation } from "@apollo/client"
import { LOGIN } from "./mutation"

export const useLogin = () => {
  const [efetuaLogin, { loading, data, error }] = useMutation(LOGIN)

  return { efetuaLogin, loading, data, error };
}