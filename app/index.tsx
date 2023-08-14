/* eslint-disable camelcase */
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_700Bold,
} from '@expo-google-fonts/inter'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useFocusEffect } from 'expo-router'
import * as Clipboard from 'expo-clipboard'
import { useMMKVObject } from 'react-native-mmkv'

import { Header } from '../components/header'
import { List } from '../components/list'

import { MMKV, storage } from '../storage/storage'

export type Data = {
  description: string
  password: string
  login: string
  title: string
}

export default function App() {
  const [fontIsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_700Bold,
  })

  const [data, _] = useMMKVObject<Data[]>('data')

  const { push } = useRouter()

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync()
    console.log(text)
  }

  fetchCopiedText()

  /** useFocusEffect(
    useCallback(() => {
      const passwords = storage.GET<Data[]>('data')

      if (passwords) {
        setData((prev) => [...prev, passwords])
      }
    }, []),
  ) */

  if (!fontIsLoaded) {
    return null
  }

  return (
    <>
      <Header.Root>
        <Header.Title bold="PASSWORDS">YOUR SECRETS</Header.Title>
        <Header.Icon />
      </Header.Root>

      <List.Root
        data={data}
        renderItem={({ item, index }) => (
          <List.Item
            onPress={() =>
              push({
                pathname: '/create',
                params: { ...item, is_create: false },
              })
            }
          >
            <List.ItemIndex>
              {index + 1 > 10 ? index + 1 : `0${index + 1}`}
            </List.ItemIndex>
            <List.ItemTitle>{item.title}</List.ItemTitle>
          </List.Item>
        )}
      />
    </>
  )
}
