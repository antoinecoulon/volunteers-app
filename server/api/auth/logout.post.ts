export default defineEventHandler(async (event) => {
  const { error } = await supabase.auth.signOut({ scope: 'local' })
  return error ?? { success: 'ok' };
})