
import React, { useEffect } from 'react'
import { AuthContextProvider, useAuth } from '../context/authContext'
import { Slot, useRouter, useSegments } from 'expo-router'
import { MenuProvider } from 'react-native-popup-menu';

const MainLayout = ()=>{
    const {isAuthenticated} = useAuth()
    const segments = useSegments()
    const router = useRouter()

    useEffect(()=>{
        if(typeof(isAuthenticated) == 'undefined') return

        const inApp = segments[0]=='(app)'
        if(isAuthenticated && !inApp){
            //home page
            router.replace('home')
        }else if(isAuthenticated==false){
            //signin page
            router.replace("signin")
        }
    },[isAuthenticated])

    return <Slot/>
}

const _layout = () => {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout/>
      </AuthContextProvider>
    </MenuProvider>
  )
}

export default _layout