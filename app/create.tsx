import { Pressable, Text, TextInput, View } from 'react-native'
import { Link } from 'expo-router'

import { Header } from '../components/header'
import { storage } from '../storage/storage'

export default function Create() {
  function handleCreateSave() {
    storage.SET('password', '123')
  }

  return (
    <>
      <Header.Root>
        <Header.Title bold="PASSWORD">CREATE A SECRET</Header.Title>
      </Header.Root>

      <View className="mt-10 space-y-10">
        <TextInput
          className="border-b border-b-zinc-200 h-10 focus:border-b-zinc-500 font-400 -tracking-wider"
          placeholder="A title, but be discreet"
        />

        <TextInput
          className="border-b border-b-zinc-200 h-10 focus:border-b-zinc-500 font-400 -tracking-wider"
          placeholder="Some description?"
        />

        <TextInput
          className="border-b border-b-zinc-200 h-10 focus:border-b-zinc-500 font-400 -tracking-wider"
          placeholder="Shhh...put your password"
        />

        <Link asChild href="/">
          <Pressable
            className="h-10 w-full bg-zinc-800 items-center justify-center"
            onPress={handleCreateSave}
          >
            <Text className="text-xs font-400 text-white">Tell secret</Text>
          </Pressable>
        </Link>
      </View>
    </>
  )
}
