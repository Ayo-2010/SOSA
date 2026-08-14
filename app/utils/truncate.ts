export const truncate = (text: string, wordCount = 20): string => {
  const words = text.split(' ')
  if (words.length <= wordCount) return text
  return words.slice(0, wordCount).join(' ') + '...'
}
