import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'

export default function Layout() {
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#FFF',
            paddingHorizontal: 40,
            paddingTop: 80,
          },
          animation: 'slide_from_left',
        }}
      />
    </View>
  )
}
