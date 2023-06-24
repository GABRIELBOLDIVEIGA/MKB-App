import { z } from "zod"

export const produtoForm = z.object({
  cod_prod: z.string()
    .nonempty("Este campo não pode ser vazio.")
    .regex(/^[a-zA-Z0-9]+$/, "Apenas Letras e numeros são permitidos.")
    .transform((cod) => cod.toUpperCase()),
  descr_resumida: z.string()
    .nonempty("Este campo não pode ser vazio.")
    .regex(/^[^\'\"\!\@\#\$\%\^\&\*\(\)\_\+\,\.\s]+$/, "Caracteres não permitidos.")
    .transform((cod) => cod.toUpperCase()),
  descr_detalhada: z.string()
    .nonempty("Este campo não pode ser vazio.")
    .regex(/^[^\'\"\!\@\#\$\%\^\&\*\(\)\_\+\,\.\s]+$/, "Caracteres não permitidos.")
    .transform((cod) => cod.toUpperCase()),
  preco: z.coerce.number().positive("Preço deve ser maior que R$ 0.01"),
  unidade: z.string()
    .nonempty("Este campo não pode ser vazio.")
    .regex(/^[^\'\"\!\@\#\$\%\^\&\*\(\)\_\+\,\.\s]+$/, "Caracteres não permitidos.")
    .transform((cod) => cod.toUpperCase()),
})