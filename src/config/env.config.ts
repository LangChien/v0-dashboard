import { z } from 'zod'

const configSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().default('http://localhost:8000'),
  DELAY_TIME: z.coerce.number().default(0),
})

export const getEnvConfig = () => {
  try {
    const parsedConfig = configSchema.parse({
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      DELAY_TIME: process.env.DELAY_TIME,
    })
    return parsedConfig
  } catch (err) {
    if (err instanceof z.ZodError) {
      err.errors.forEach((error) => {
        if (error.path[0]) {
          console.error(`Env config error in ${error.path[0]}: ${error.message}`)
        }
      })
    }
    process.exit(1)
  }
}

export const envConfig = getEnvConfig()
