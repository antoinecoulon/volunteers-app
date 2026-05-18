import { supabase } from "~~/server/utils/supabase"

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  return await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })
})