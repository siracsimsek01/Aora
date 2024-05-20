import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

  return (
 
      <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-xl focus:border-secondary items-center flex-row space-x-4">
        <TextInput
          className="flex-1 text-white font-pregular text-base mt-0.5"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />

        {title === 'Password' && (
            <TouchableOpacity onPress={() => 
                setShowPassword(!showPassword)
            }>
                <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="contain"/>
            </TouchableOpacity>
        )}
      </View>

  )
}

export default SearchInput