import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const supabase = createClient(
    runtimeConfig.public.supabaseUrl,
    runtimeConfig.supabaseServiceRoleKey
  )

  const body = await readBody(event)
  const fileData = body?.file as { data?: string, name?: string, type?: string } | undefined
  const bucket = (body?.bucket as string) || 'images'
  const pathPrefix = (body?.path as string) || 'uploads'

  if (!fileData?.data || !fileData.name) {
    return { error: 'No file provided' }
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Unauthorized' }
  }

  const fileName = `${pathPrefix}/${user.id}-${Date.now()}-${fileData.name.replace(/\s+/g, '-')}`
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, Buffer.from(fileData.data, 'base64'), {
      contentType: fileData.type || 'application/octet-stream',
      upsert: true
    })

  if (error) {
    return { error: error.message }
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path)

  return { url: publicUrl }
})
