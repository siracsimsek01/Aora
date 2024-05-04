import { View, Text } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router' 

const TabIcon = () => {
    return (
        <View>
            <Image />
        </View>
    )
}

const TabsLayout = () => {
  return (
   <>
   <Tabs>
    <Tabs.Screen name="home" options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({ color, focused}) => (

        )
    }}/>
   </Tabs>
   </>
  )
}

export default TabsLayout