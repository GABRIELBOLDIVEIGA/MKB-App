import { z } from "zod";
import { usuarioFormSchema } from "./schema";

export type UsuarioForm = z.infer<typeof usuarioFormSchema>
