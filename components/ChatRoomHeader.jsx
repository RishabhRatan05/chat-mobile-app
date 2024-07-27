import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Entypo } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Zocial } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


export default function ChatRoomHeader({user,router}) {
  return (
    <Stack.Screen
        options={{
            title:'',
            headerShadowVisible: false,
            headerLeft:()=>(
                <View className='flex-row items-center gap-2'>
                    <TouchableOpacity onPress={()=>router.back()}>
                        <Entypo name="chevron-left" size={hp(5)} color="black" />
                    </TouchableOpacity>
                    <View className='flex-row items-center gap-3'>
                        <Image
                            source={user?.profileUrl}
                            style={{height:hp(5), aspectRatio:1, borderRadius:100}}
                        />
                        <Text style={{fontSize:hp(3)}} className='text-bold'>{user?.username}</Text>
                    </View>
                </View>
            ),
            headerRight:()=>(
                <View className='flex-row items-center gap-3'>
                    <Zocial name="call" size={24} color="black" />
                    <MaterialIcons name="videocam" size={24} color="black" />
                </View>
            )
        }}
    >

    </Stack.Screen>
  )
}