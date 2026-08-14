import { z } from 'zod'
import { serverSupabaseServiceRole } from '#supabase/server'

const schema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  graduationYear: z.string().min(1, 'Graduation year / set is required'),
  profession: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return { error: parsed.error.issues[0]!.message }
  }

  const { fullName, graduationYear, profession, email, phone, password } = parsed.data

  const supabase = serverSupabaseServiceRole(event)

  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  })

  if (authError) {
    return { error: authError.message }
  }

  if (!authData.user) {
    return { error: 'User creation failed' }
  }

  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: authData.user.id,
      full_name: fullName,
      graduation_set: graduationYear,
      profession: profession || null,
      city: null,
      whatsapp_number: phone || null,
      bio: null,
      created_at: new Date().toISOString()
    })

  if (profileError) {
    return { error: 'Profile save failed: ' + profileError.message }
  }

  return { success: true }
})
