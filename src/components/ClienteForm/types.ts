import { z } from "zod";
import { clienteFormSchema } from "./schema";

export type ClienteForm = z.infer<typeof clienteFormSchema>

export type ViaCEP = {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
}