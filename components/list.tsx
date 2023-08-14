import {
  FlatList,
  FlatListProps,
  Text,
  TextProps,
  Pressable,
  PressableProps,
} from 'react-native'
import { Feather } from '@expo/vector-icons'

type RootProps<T> = FlatListProps<T>

function Root<T>({ data, ...props }: RootProps<T>) {
  return <FlatList className="mt-20" data={data} {...props} />
}

function Item({
  children,
  ...props
}: Omit<PressableProps, 'children'> & {
  children: JSX.Element | JSX.Element[]
}) {
  return (
    <Pressable className="flex-row items-center w-full mb-5" {...props}>
      {children}

      <Feather name="arrow-up-right" size={16} style={{ marginLeft: 'auto' }} />
    </Pressable>
  )
}

function ItemIndex({ children, ...props }: TextProps) {
  return (
    <Text
      className="text-2xl text-zinc-300 font-700 w-20 -tracking-widest"
      {...props}
    >
      {children}
    </Text>
  )
}

function ItemTitle({ children, ...props }: TextProps) {
  return (
    <Text className="text-[14px] text-zinc-800 font-400" {...props}>
      {children}
    </Text>
  )
}

export const List = {
  Root,
  Item,
  ItemIndex,
  ItemTitle,
}
