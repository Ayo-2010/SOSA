import { z } from 'zod'
import { serverSupabaseUser, serverSupabaseServiceRole } from '#supabase/server'

const schema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  graduationYear: z.string().min(1, 'Graduation year / set is required'),
  profession: z.string().optional(),
  city: z.string().optional(),
  whatsappNumber: z.string().optional(),
  bio: z.string().optional()
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return { error: parsed.error.issues[0]!.message }
  }

  const { fullName, graduationYear, profession, city, whatsappNumber, bio } = parsed.data

  const user = await serverSupabaseUser(event)
  if (!user) {
    return { error: 'Unauthorized' }
  }

  const supabase = serverSupabaseServiceRole(event)

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      graduation_set: graduationYear,
      profession: profession || null,
      city: city || null,
      whatsapp_number: whatsappNumber || null,
      bio: bio || null
    })
    .eq('id', user.id)

  if (error) {
    return { error: 'Profile update failed: ' + error.message }
  }

  return { success: true }
})
