import { z } from "zod";
import { produtoForm } from "./schema";

export type ProdutoForm = z.infer<typeof produtoForm>