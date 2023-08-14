import { MMKV as MMKVStorage } from 'react-native-mmkv'

export const MMKV = new MMKVStorage()

const DEFAULT_PATH = '@passave:'

function SET<T>(path: string, data: T) {
  const prev = GET('data') as [] | null

  if (prev?.length > 0) {
    MMKV.set(DEFAULT_PATH + path, JSON.stringify([...prev, data]))
  } else {
    MMKV.set(DEFAULT_PATH + path, JSON.stringify(data))
  }
}

function GET<T>(path: string) {
  const data = MMKV.getString(DEFAULT_PATH + path)

  return data ? (JSON.parse(data) as T) : null
}

function REMOVE(title: string) {
  console.log(title)
}

export const storage = {
  SET,
  GET,
  REMOVE,
}
