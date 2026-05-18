import { supabase } from "~~/server/utils/supabase"

export default defineEventHandler(async (event) => {
  const { email, password, firstName, lastName } = await readBody(event)

  return await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName
      }
    }
  })
})