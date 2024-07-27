import { Alert, Image, Pressable, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import Loading from '../components/Loading';
import KeyboardView from '../components/KeyboardView';
import { useAuth } from '../context/authContext';

const Signup = () => {
  const router = useRouter()
  const {register} = useAuth()
  const emailRef = useRef("")
  const passwordRef = useRef("")
  const userRef = useRef("")
  const profileRef = useRef("")
  const [loading, setLoading] = useState(false)
  const handleRegister =async ()=>{
    if(!emailRef.current || !passwordRef.current || !userRef.current || !profileRef.current){
      Alert.alert('SignUp' , 'enter all fields')
      return
    }

    setLoading(true)
    let res = await register(emailRef.current, passwordRef.current, userRef.current, profileRef.current)

    setLoading(false)


    if(!res.success){
      Alert.alert('Sign Up', res.data)
    }
  }
  return (
    <KeyboardView>
      <StatusBar barStyle={'dark-content'}/>
      <View className='items-center mt-10'>
        <Image source={require('../assets/images/gojo.jpg')} resizeMode='contain' style={{height: hp(29)}}/>
      </View>
      <View className='items-center gap-2'>

      <Text style={{fontSize: hp(4)}} className='font-bold mt-4'>Create New Account</Text>

      {/* name */}
      <View style={{height: hp(7), width: wp(90)}} className=' bg-neutral-100 flex-1 flex-row items-center gap-x-2 '>
        <Entypo name="user" size={24} color="black" />
        <TextInput 
          onChangeText={value=>userRef.current= value}
          style={{fontSize: hp(2)}} 
          placeholder='Username'
          placeholderTextColor='grey'
          className='flex-1'
        />
      </View>
{/* profile */}
      <View style={{height: hp(7), width: wp(90)}} className=' bg-neutral-100 flex-row items-center gap-x-2'>
        <Entypo name="image-inverted" size={24} color="black" />
        <TextInput 
          onChangeText={value=>profileRef.current= value}
          style={{fontSize: hp(2)}} 
          placeholder='Profile url'
          placeholderTextColor='grey'
        />
      </View>
{/* mail */}
      
      <View style={{height: hp(7), width: wp(90)}} className=' bg-neutral-100 flex-row items-center gap-x-2'>
        <Entypo name="mail" size={24} color="black" />
        <TextInput 
          onChangeText={value=>emailRef.current= value}
          style={{fontSize: hp(2)}} 
          placeholder='enter email'
          placeholderTextColor='grey'
        />
      </View>

{/* password */}

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


      <View>
        { loading?
          (<View>
          <Loading size={hp(7)}/>
        </View>)
          :
          (<TouchableOpacity onPress={handleRegister} style={{height: hp(7)}} className='rounded px-4 bg-blue-600 justify-center items-center'>
            <Text style={{fontSize: hp(3)}} className='text-white font-bold tracking-wider'>Sign Up</Text>
          </TouchableOpacity>)
        }
      </View>
      <View className='flex-row justify-center'>
        <Text style={{fontSize: hp(2)}}>Already have an account? </Text>
        <Pressable onPress={()=> router.push('/signin')}>
          <Text style={{fontSize: hp(2)}} className='text-indigo-500'>Sign In</Text>
        </Pressable>
      </View>
      </View>
    </KeyboardView>
  )
}

export default Signup