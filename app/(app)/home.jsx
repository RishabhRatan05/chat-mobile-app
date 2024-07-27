import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Loading from '../../components/Loading';
import Chatlist from '../../components/Chatlist';
import { getDocs, query, where } from 'firebase/firestore';
import { userRef } from '../../FirebaseConfig';

const Home = () => {
  const {logout,user} = useAuth()
  const [users,setUsers] = useState([])
  useEffect(()=>{
    if(user?.userId){
      getUsers()
    }
  },[user])
  const getUsers=async()=>{
    const q= query(userRef, where('userId', '!=', user?.userId))
    const querySnapshot = await getDocs(q)
    const data = []

    querySnapshot.forEach(doc=>{
      data.push({...doc.data()})
    })  
    setUsers(data )
  }
  return (
    <View className='flex-1'>
      {
        users.length>0 ?(
          <Chatlist users={users} currentUser={user}/>
        )
        :(
        <View style={{top: hp(30)}} className='flex items-center'>
          <Loading size={hp(10)}/>
        </View>
        )
      }
    </View>
  )
}

export default Home