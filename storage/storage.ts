import { MMKV as MMKVStorage } from 'react-native-mmkv'

const MMKV = new MMKVStorage()

const DEFAULT_PATH = '@passave:'

function SET<T>(path: string, data: T) {
  MMKV.set(DEFAULT_PATH + path, JSON.stringify(data))
}

function GET<T>(path: string) {
  const data = MMKV.getString(DEFAULT_PATH + path)

  return JSON.parse(data) as T
}

export const storage = {
  SET,
  GET,
}
