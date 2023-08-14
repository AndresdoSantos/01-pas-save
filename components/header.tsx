import { Pressable, Text, TextProps, View, ViewProps } from 'react-native'
import { Link, useRouter } from 'expo-router'

function Root({ children, ...props }: ViewProps) {
  return (
    <View className="flex-row items-center justify-between mt-12" {...props}>
      {children}
    </View>
  )
}

function Title({ children, bold, ...props }: TextProps & { bold: string }) {
  return (
    <View>
      <Text className="text-lg text-zinc-700 font-300" {...props}>
        {children}
      </Text>
      <Text className="text-lg text-zinc-700 font-700">{bold}</Text>
    </View>
  )
}

function Icon() {
  const { push } = useRouter()

  return (
    <Pressable
      onPress={() =>
        push({
          pathname: '/create',
          params: {
            is_create: true,
          },
        })
      }
      className="items-center justify-center h-10 w-10 rounded-full bg-zinc-700"
    >
      <View className="absolute w-4 h-[1px] bg-white" />
      <View className="h-4 w-[1px] bg-white" />
    </Pressable>
  )
}

export const Header = {
  Root,
  Title,
  Icon,
}
