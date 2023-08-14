/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pressable, Text, View } from 'react-native'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { useMMKVObject } from 'react-native-mmkv'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { Ionicons } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { zinc } from 'tailwindcss/colors'
import * as Clipboard from 'expo-clipboard'

import { Header } from '../components/header'
import { Input } from '../components/input'

import type { Data } from '.'

const CreateSchema = z.object({
  title: z.string().max(100, 'Must be 100 characters.'),
  description: z.string().max(300, 'Must be 300 characters.'),
  login: z.string().max(300, 'Must be 300 characters.'),
  password: z.string(),
})

type CreateInput = z.input<typeof CreateSchema>

export default function Create() {
  const default_values = useLocalSearchParams() as Data & { is_create: string }

  const is_update = default_values.is_create === 'false'

  const { back } = useRouter()
  const [data, setData] = useMMKVObject<CreateInput[]>('data')

  const { control, handleSubmit } = useForm<CreateInput>({
    resolver: zodResolver(CreateSchema),
    defaultValues: default_values,
  })

  function handleSavePassword(input: CreateInput) {
    if (is_update) {
      const filtered_data = data.filter(
        (item) => item.title !== default_values.title,
      )

      setData([...filtered_data, input])
    } else {
      setData([...data, input])
    }

    back()
  }

  // bottom_sheet
  const bottom_sheet_modal_ref = useRef<BottomSheetModal>(null)

  const snapPoints = useMemo(() => ['80%', '90%'], [])

  // remove
  const handleRemovePassword = useCallback(
    (id: string) => {
      setData([])

      back()
    },
    [back, setData],
  )

  // cp to clipboard
  const [copied, set_copied] = useState(false)

  async function copyToClipboard() {
    await Clipboard.setStringAsync(default_values.password).then(() =>
      set_copied(true),
    )
  }

  useEffect(() => {
    let handler

    if (copied) {
      handler = setInterval(() => set_copied(false), 4000)
    }

    return () => {
      clearInterval(handler)
    }
  }, [copied])

  return (
    <>
      <Pressable
        onPress={back}
        hitSlop={20}
        className="absolute top-20 left-10"
      >
        <Ionicons name="arrow-back" size={20} color={zinc[700]} />
      </Pressable>

      <Header.Root>
        <Header.Title bold="PASSWORD">CREATE A SECRET</Header.Title>
      </Header.Root>

      <BottomSheetModalProvider>
        <View className="mt-10">
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <Input
                placeholder="A title, but be discreet"
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <Input
                placeholder="Some description?"
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />

          <Controller
            control={control}
            name="login"
            render={({ field }) => (
              <Input
                autoCorrect={false}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Your email, I promise not to send offers."
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                placeholder="Shhh...put your password"
                secureTextEntry
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />

          <Pressable
            className="h-10 w-full bg-zinc-800 items-center justify-center mb-2.5"
            onPress={handleSubmit(handleSavePassword)}
          >
            <Text className="text-xs font-400 text-white">
              {is_update ? '...is there more to this story?' : 'Tell secret'}
            </Text>
          </Pressable>

          {is_update ? (
            <>
              <Pressable
                className="h-10 w-full border border-red-500 items-center justify-center"
                onPress={() => bottom_sheet_modal_ref.current.present()}
              >
                <Text className="text-xs font-400 text-red-500">
                  {`It's time to say goodbye`}
                </Text>
              </Pressable>

              <View className="h-[1px] w-full bg-zinc-200 my-5" />

              <Pressable
                className={`h-10 w-full border items-center justify-center ${
                  copied ? 'border-green-500' : 'border-zinc-800'
                }`}
                onPress={copyToClipboard}
              >
                <Text
                  className={`text-xs font-400 ${
                    copied ? 'text-green-800' : 'text-zinc-800'
                  }`}
                >
                  {copied ? (
                    <>
                      <Ionicons name="checkmark" size={16} /> Copied
                    </>
                  ) : (
                    'Copy'
                  )}
                </Text>
              </Pressable>
            </>
          ) : (
            <Link href="/" asChild>
              <Pressable className="h-10 w-full border border-zinc-800 items-center justify-center">
                <Text className="text-xs font-400 text-zinc-800">
                  Never mind
                </Text>
              </Pressable>
            </Link>
          )}
        </View>

        <BottomSheetModal
          ref={bottom_sheet_modal_ref}
          index={1}
          snapPoints={snapPoints}
          // onChange={handleSheetChanges}
          style={{ borderTopWidth: 1, borderTopColor: zinc[200] }}
          handleIndicatorStyle={{
            marginVertical: 20,
            height: 2,
            width: 100,
            backgroundColor: zinc[800],
          }}
        >
          <View className="flex-1 px-10">
            <Text className="text-lg font-300">
              do you really want to <Text className="font-700">remove</Text>{' '}
              this password?
            </Text>

            <Pressable
              className="h-10 w-full bg-red-500 items-center justify-center mt-10"
              onPress={() => handleRemovePassword(default_values.title)}
            >
              <Text className="text-xs font-400 text-white">
                {`Yes, I don't want this password anymore`}
              </Text>
            </Pressable>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  )
}
