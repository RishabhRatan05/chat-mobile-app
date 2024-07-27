import { Alert, Image, Pressable, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import Loading from '../components/Loading';
import KeyboardView from '../components/KeyboardView';
import { useAuth } from '../context/authContext';

const Signin = () => {
  const router = useRouter()
  const emailRef = useRef("")
  const passwordRef = useRef("")
  const {login} = useAuth()
  const [loading, setLoading] = useState(false)
  const handleLogin =async ()=>{
    if(!emailRef.current || !passwordRef.current){
      Alert.alert('signIn' , 'enter all fields')
      return
    }

    setLoading(true)
    const res = await login(emailRef.current, passwordRef.current)
    setLoading(false)

    if(!res.success){
      Alert.alert('Sign In',res.data)
    }

  }
  return (
    <KeyboardView>
      <StatusBar barStyle={'dark-content'}/>
      <View className='items-center mt-10'>
        <Image source={require('../assets/images/gojo.jpg')} resizeMode='contain' style={{height: hp(29)}}/>
      </View>
      <View className='items-center gap-2'>

      <Text style={{fontSize: hp(4)}} className='font-bold mt-4'>Sign In</Text>


      <View style={{height: hp(7), width: wp(90)}} className=' bg-neutral-100 flex-row items-center gap-x-2'>
        <Entypo name="mail" size={24} color="black" />
        <TextInput 
          onChangeText={value=>emailRef.current= value}
          style={{fontSize: hp(2)}} 
          placeholder='enter mail'
          placeholderTextColor='grey'
        />
      </View>
      <View className='gap-y-4'>
        <View style={{height: hp(7), width: wp(90)}} className=' bg-neutral-100 flex-row items-center gap-x-2'>
          <Entypo name="lock" size={24} color="black" />
          <TextInput 
          onChangeText={value=>passwordRef.current= value}
            style={{fontSize: hp(2)}} 
            placeholder='enter password'
            secureTextEntry
            placeholderTextColor='grey'
          />
        </View> 
        <Text  style={{fontSize: hp(2)}} className='font-semibold text-right'>Forgot Password?</Text>
      </View>
      <View>
        { loading?
          (<View>
          <Loading size={hp(7)}/>
        </View>)
          :
          (<TouchableOpacity onPress={handleLogin} style={{height: hp(7)}} className='rounded px-4 bg-blue-600 justify-center items-center'>
            <Text style={{fontSize: hp(3)}} className='text-white font-bold tracking-wider'>Sign In</Text>
          </TouchableOpacity>)
        }
      </View>
      <View className='flex-row justify-center'>
        <Text style={{fontSize: hp(2)}}>Don't have an account? </Text>
        <Pressable onPress={()=> router.push('/signup')}>
          <Text style={{fontSize: hp(2)}} className='text-indigo-500'>Sign Up</Text>
        </Pressable>
      </View>
      </View>
    </KeyboardView>
  )
}

export default Signin