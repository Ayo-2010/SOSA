export default defineNuxtRouteMiddleware(async (_to) => {
  const user = useSupabaseUser()
  if (!user.value) {
    return navigateTo('/login')
  }
})
