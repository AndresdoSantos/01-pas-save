/* eslint-disable camelcase */
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_700Bold,
} from '@expo-google-fonts/inter'

import { Header } from '../components/header'
import { List } from '../components/list'
import { storage } from '../storage/storage'

export default function App() {
  const [fontIsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_700Bold,
  })

  if (!fontIsLoaded) {
    return null
  }

  const keys = ['Email', 'Facebook', 'Instagram']

  console.log('--', storage.GET('password'))

  return (
    <>
      <Header.Root>
        <Header.Title bold="PASSWORDS">YOUR SECRETS</Header.Title>
        <Header.Icon />
      </Header.Root>

      <List.Root
        data={keys}
        renderItem={({ item, index }) => (
          <List.Item>
            <List.ItemIndex>
              {index + 1 > 10 ? index + 1 : `0${index + 1}`}
            </List.ItemIndex>
            <List.ItemTitle>{item}</List.ItemTitle>
          </List.Item>
        )}
      />
    </>
  )
}

/** Tasks
 *
 * [ ] Put cp to clipboard
 * [ ] Animations
 * [ ] Use nativewind SVG to test plus icon
 * [ ] Route animations
 * [ ] Update password page
 */
