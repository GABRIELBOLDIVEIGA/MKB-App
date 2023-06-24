import { z } from "zod";

export const clienteFormSchema = z.object({
  nome: z.string()
    .nonempty("Este campo não pode ser vazio.")
    .regex(/^[a-zA-Z-0-9À-ÿ\&\@\s]+$/, "Alguns caracteres especiais não são permitidos")
    .transform((nome) => nome.toUpperCase()),
  cnpj: z.string()
    .nonempty("Este campo não pode ser vazio.")
    .max(20, "Maximo de 20 caracteres são permitidos.")
    .regex(/^[0-9]+$/, "Apenas números são permitidos.")
    ,
  fantasia: z.string()
    .max(50, "Maximo de 50 caracteres são permitidos.")
    .regex(/^[a-zA-Z-0-9À-ÿ\&\@\s]+$/, "Caracteres especiais não são permitidos")
    .optional()
    .or(z.literal('')),
  cod: z.string()
    .regex(/^[a-zA-Z\0-9]+$/i, "Alguns caracteres não são permitidos.")
    .optional()
    .or(z.literal('')),
  
    
  cep: z.string()
    .regex(/^[0-9\s]+$/i, "Apenas numeros são permitidos.")
    .optional()
    .or(z.literal('')),
  endereco: z.string()
    .regex(/^[a-zA-Z0-9À-ÿ\s]+$/, "Apenas letras e numeros são permitidos.")
    .optional()
    .or(z.literal('')),
  numero: z.string()
    .regex(/^[a-zA-Z-0-9\s]+$/, "Apenas letras e numeros são permitidos.")
    .optional()
    .or(z.literal('')),
  bairro: z.string()
    .regex(/^[a-zA-Z0-9À-ÿ\s]+$/, "Apenas letras e numeros são permitidos.")
    .optional()
    .or(z.literal('')),
  cidade: z.string()
    .regex(/^[a-zA-Z0-9À-ÿ\s]+$/, "Apenas letras e numeros são permitidos.")
    .optional()
    .or(z.literal('')),
  uf: z.string()
    .optional()
    .or(z.literal('')),
  
  
  email: z.string()
    .email('Digite um formato de email valido.')
    .optional()
    .or(z.literal('')),
  ddd: z.string()
    .min(2, "DDD deve ter 2 digitos")
    .max(2, "DDD deve ter 2 digitos")
    .regex(/^[0-9]+$/, "Apenas numeros são permitidos.")
    .optional()
    .or(z.literal('')),
  
  
  fone1: z.string()
    .min(8, "Telefone deve ter 8 digitos")
    .max(8, "Telefone deve ter 8 digitos")
    .regex(/^[0-9]+$/, "Apenas numeros são permitidos.")
    .optional()
    .or(z.literal('')),
  fone2: z.string()
    .min(8, "Telefone deve ter 8 digitos")
    .max(8, "Telefone deve ter 8 digitos")
    .regex(/^[0-9]+$/, "Apenas numeros são permitidos.")
    .optional()
    .or(z.literal('')),
  celular: z.string()
    .min(9, "Telefone deve ter 9 digitos")
    .max(9, "Telefone deve ter 9 digitos")
    .regex(/^[0-9]+$/, "Apenas numeros são permitidos.")
    .optional()
    .or(z.literal('')),
  fax: z.string()
    .max(15, "Fax deve ter 15 digitos")
    .regex(/^[0-9]+$/, "Apenas numeros são permitidos.")
    .optional()
    .or(z.literal('')),
}) 