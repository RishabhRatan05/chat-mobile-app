import { Text, View } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Loading from '../components/Loading'

const RootLayout = () => {
  return (
    <View className='justify-center items-center'>
      <Loading size={hp(7)}/>
    </View>
  )
}

export default RootLayout

