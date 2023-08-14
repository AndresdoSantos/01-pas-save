import { TextInput, TextInputProps } from 'react-native'

export function Input({ ...props }: TextInputProps) {
  return (
    <TextInput
      className="border-b border-b-zinc-200 h-10 focus:border-b-zinc-800 font-400 -tracking-wider mb-10"
      {...props}
    />
  )
}
