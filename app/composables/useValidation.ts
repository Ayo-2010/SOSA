export const validateEmail = (email: string): string => {
  if (!email.trim()) return 'Email is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address'
  return ''
}

export const validateRequired = (value: string, fieldName: string): string => {
  if (!value.trim()) return `${fieldName} is required`
  return ''
}

export const validatePassword = (password: string): string => {
  if (!password) return 'Password is required'
  if (password.length < 6) return 'Password must be at least 6 characters'
  return ''
}

export const validatePasswordMatch = (password: string, confirmPassword: string): string => {
  if (password !== confirmPassword) return 'Passwords do not match'
  return ''
}
