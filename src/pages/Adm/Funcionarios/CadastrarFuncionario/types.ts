import { z } from "zod";
import { cadastroFuncionarioFormSchema } from "./schema";

export type FuncionarioForm = z.infer<typeof cadastroFuncionarioFormSchema>