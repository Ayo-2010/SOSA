export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return

  const client = useSupabaseClient()
  const user = useSupabaseUser()

  if (!user.value) {
    return navigateTo('/login')
  }

  try {
    const userId = user.value.id || user.value.sub
    const { data } = await client
      .from('admin_users')
      .select('id')
      .eq('id', userId)
      .single()

    if (!data) {
      return navigateTo('/')
    }
  } catch (error) {
    console.error('Error checking admin status:', error)
    return navigateTo('/')
  }
})
