import { IonButton, IonCard, IonCardContent, IonContent, IonItem, IonPage } from "@ionic/react";
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

const createUserFormSchema = z.object({
  name: z.string()
    .nonempty('O nome é obrigatório!')
    .transform(name => {
      return name.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(' ')
    }),
  email: z.string()
    .nonempty('O e-mail é obrigatório!')
    .email('Formato de email invalido')
    .refine(email => {
      return email.endsWith('@gmail.com')
    }, 'O e-mail precisa ser gmail.com'),
  password: z.string()
    .nonempty('A senha é obrigatória!')
    .min(6, 'A senha deve ter no minimo 6 caracteres'),
  techs: z.array(z.object({
    title: z.string().nonempty('Titulo é obrigatorio'),
    knowledge: z.coerce.number().min(1, 'Minimo 1').max(100, 'Maximo 100'),
  })).min(2, "Insira pelo menos 2 Tecnologias.")
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

export default function FormCliente() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "techs",
  })

  function addNewTech() {
    append({ title: "", knowledge: 0 })
  }

  function createUser(data: CreateUserFormData) {
    console.log("[CreateUser] - ", data)
  }

  return (
    <IonPage>
      <IonContent >
        <IonCard>
          <IonCardContent>
            <form onSubmit={handleSubmit(createUser)}>
              <IonItem>
                <input
                  type="text"
                  {...register('name')}
                />
              </IonItem>
              {errors.name && <span>{errors.name.message}</span>}
              <IonItem>
                <input
                  type="email"
                  {...register('email')}
                />
              </IonItem>
              {errors.email && <span>{errors.email.message}</span>}
              <IonItem>
                <input
                  type="password"
                  {...register('password')}
                />
              </IonItem>
              {errors.password && <span>{errors.password.message}</span>}


              <div>
                <label>Tecnologias
                  <IonButton type="button" onClick={addNewTech}>Adicionar</IonButton>
                </label>
                {fields.map((field, index) => {
                  return (
                    <div key={field.id}>
                      <IonItem>
                        <input
                          type="text"
                          {...register(`techs.${index}.title`)}
                        />
                      </IonItem>
                      {errors.techs?.[index]?.title && <span>{errors.techs?.[index]?.title?.message}</span>}
                      <IonItem>
                        <input
                          type="number"
                          {...register(`techs.${index}.knowledge`)}
                        />
                      </IonItem>
                      {errors.techs?.[index]?.knowledge && <span>{errors.techs?.[index]?.knowledge?.message}</span>}
                    </div>
                  )
                })}
              </div>
              {errors.techs && <span className="text-red-500 text-sm">{errors.techs.message}</span>}

              <IonItem>
                <button type="submit">Salvar</button>
              </IonItem>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}
