import { z } from "zod";

export const clienteFormSchema = z.object({
  nome: z.string()
    .nonempty("Este campo não pode ser vazio.")
    
    .transform((nome) => nome.toUpperCase()),
  cnpj: z.string()
    .nonempty("Este campo não pode ser vazio.")
    .max(20, "Maximo de 20 caracteres são permitidos.")
    
    ,
  fantasia: z.string()
    .max(50, "Maximo de 50 caracteres são permitidos.")
    
    .optional()
    .or(z.literal('')),
  cod: z.string()
    .default("")
    .optional()
    .or(z.literal('')),
  
    
  cep: z.string()
    .default("")
    .optional()
    .or(z.literal('')),
  endereco: z.string()
  .default("")
    .optional()
    .or(z.literal('')),
  numero: z.string()
  .default("")
    .optional()
    .or(z.literal('')),
  bairro: z.string()
  .default("")
    .optional()
    .or(z.literal('')),
  cidade: z.string()
  .default("")
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
  .default("")
    .optional()
    .or(z.literal('')),
  
  
  fone1: z.string()
  .default("")
    .optional()
    .or(z.literal('')),
  fone2: z.string()
  .default("")
    .optional()
    .or(z.literal('')),
  celular: z.string()
  .default("")
    .optional()
    .or(z.literal('')),
  fax: z.string()
  .default("")
    .optional()
    .or(z.literal('')),
}) 