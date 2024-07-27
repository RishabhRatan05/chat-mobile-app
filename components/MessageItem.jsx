import { View, Text } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function MessageItem({message, key, currentUser}) {
  if(currentUser?.userId == message?.userId){

  return (
    <View className='flex-row justify-end mb-3 mr-3'>
        <View style={{width: wp(80)}}>
            <View className='flex self-end rounded-xl bg-pink-200 border p-3 border-pink-300'>
                <Text style={{fontSize: hp(2.2)}}>{message.text}</Text>
            </View>
        </View>
    </View>
  )
  }
  else{
    return (
    <View className='flex-row  mb-3 ml-3'>
        <View style={{width: wp(80)}}>
            <View className='flex self-start rounded-xl bg-sky-200 border p-3 border-sky-300'>
                <Text style={{fontSize: hp(2.2)}}>{message.text}</Text>
            </View>
        </View>
    </View>
  )  
  }
}