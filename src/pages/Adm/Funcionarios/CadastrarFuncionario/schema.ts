import { z } from "zod"

export const cadastroFuncionarioFormSchema = z.object({
    nome: z.string()
      .nonempty('Nome não pode ser vazio.')
      .transform(name => {
        return name.trim().split(' ').map(word => {
          return word[0].toLocaleUpperCase().concat(word.substring(1))
        }).join(' ')
      }),
    email: z.string()
      .nonempty('Email não pode ser vazio.')
      .email('Não é um formato de email valido.'),
    cpf: z.string()
      .default(""),
    senha: z.string()
      .nonempty('Senha não pode ser vazia.')
      .min(6, 'Senha deve ter no mínimo 6 caracteres.')
      .max(30, 'Senha deve ter no máximo 30 caracteres.'),
    confirmarSenha: z.string()
      .nonempty('Senha não pode ser vazia.')
      .min(6, 'Senha deve ter no mínimo 6 caracteres.')
      .max(30, 'Senha deve ter no máximo 30 caracteres.'),
    ddd: z.string()
      .max(2, 'DDD deve ter no máximo 2 números.')
      .optional(),
    celular: z.string()
      .max(9, 'Celular deve ter no máximo 9 números.')
      .optional(),
    telefone: z.string()
      .max(8, 'Telefone deve ter no máximo 8 números.')
      .optional(),
  })
    .refine(({ senha, confirmarSenha }) => senha === confirmarSenha, {
      message: "As Senhas devem ser iguais.",
      path: ["confirmarSenha"]
    })