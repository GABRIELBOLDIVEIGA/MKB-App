import { useMutation, useQuery } from "@apollo/client"
import { CADASTRAR_USUARIO_NOVO_BANCO, CRIAR_FUNCIONARIO, ESQUECI_SENHA, LOGIN, UPDATE_SENHA, UPDATE_USUARIO } from "./mutations"
import { GET_USUARIOS, GET_USUARIO_BY_ID } from "./queries"
import { Usuario } from "interface/Usuario"

export const useLogin = () => {
  const [efetuaLogin, { loading, error, data }] = useMutation(LOGIN, {
    onCompleted({ efetuaLogin }) {
      if (efetuaLogin) {
        localStorage.setItem('KMB_token', efetuaLogin.token);
      }
    },
  }
  );

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
  const { data, loading, error, refetch } = useQuery<{ getUsuarios: Usuario[] }>(GET_USUARIOS);

  return { data: data?.getUsuarios, loading, error, refetch };
}

export const useCriarFuncionario = () => {
  const [createUsuario, { data, loading, error }] = useMutation(CRIAR_FUNCIONARIO)

  return { createUsuario, data: data?.createUsuario, loading, error }
}

export const useUpdateUsuario = () => {
  const [updateUsuario, { data, loading, error }] = useMutation(UPDATE_USUARIO)

  return { updateUsuario, data, loading, error }
}

export const useUpdateSenha = () => { 
  const [updateSenha, { data, loading, error }] = useMutation(UPDATE_SENHA);
  
  return { updateSenha, data, loading, error };
}

export const useEsqueciMinhaSenha = () => { 
  const [esqueciMinhaSenha, { data, loading, error }] = useMutation(ESQUECI_SENHA);
  
  return { esqueciMinhaSenha, data, loading, error };
}

///////// NOVO_BANCO
export const useCadastrarUsuarioNovoBanco = () => {
  const [adicionarUsuario, { data, loading, error }] = useMutation(CADASTRAR_USUARIO_NOVO_BANCO)

  return { adicionarUsuario, data: data?.adicionarUsuario, loading, error }
}
