import { View, Text, StatusBar, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router'
import ChatRoomHeader from '../../components/ChatRoomHeader'
import MessageList from '../../components/MessageList';
import { useEffect, useRef, useState } from 'react';
import KeyboardView from '../../components/KeyboardView';
import { useAuth } from '../../context/authContext';
import { getRoomId } from '../../utils/getRoomId';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';

export default function ChatRoom() {
    const item = useLocalSearchParams()
    const router = useRouter()
    const {user} = useAuth()
    const [messages,setMessages] = useState([])
    const textRef = useRef('')
    const inputRef = useRef(null)
    const scrollViewRef = useRef(null)
    useEffect(()=>{
        createRoomIfNotExists()

        let roomId = getRoomId(user?.userId, item?.userId)
        const docRef = doc(db, 'rooms', roomId)
        const messageRef = collection(docRef,'messages')
        const q = query(messageRef,orderBy('createdAt','asc'))

        let unsub = onSnapshot(q,(snapshot)=>{
            let allMessages = snapshot.docs.map(doc=>{
                return doc.data()
            })
            setMessages(allMessages)
        })

        const  KeyboardShow = Keyboard.addListener('keyboardDidShow',updateScrollView)

        return ()=>{
            unsub()
            KeyboardShow.remove()
        }
    },[])

    useEffect(()=>{
        updateScrollView()
    },[messages])
    const updateScrollView = ()=>{
        setTimeout(()=>{
            scrollViewRef?.current?.scrollToEnd({animated:false})
        },1000)
    }

    const createRoomIfNotExists =async ()=>{
        let roomId = getRoomId(user?.userId, item?.userId)
        await setDoc(doc(db,'rooms',roomId),{
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        })
    }

    const handleSendMessage= async()=>{
        let message = textRef.current
        if(!message) return
        try {
            let roomId = getRoomId(user?.userId, item?.userId)
            const docRef = doc(db, 'rooms',roomId)
            const messageRef = collection(docRef,'messages')
            textRef.current = ''
            if(inputRef) inputRef?.current?.clear()
            const newDoc = await  addDoc(messageRef,{
                userId: user?.userId,
                text: message,
                profileUrl: user?.profileUrl,
                senderName:user?.username,
                createdAt: Timestamp.fromDate(new Date())
            })
        } catch (error) {
            Alert.alert('Message',error.message)
            
        }
    }
  return (
    <KeyboardView inChat={true}>

    <View className='flex-1 bg-white'>
        <StatusBar barStyle={'dark-content'}></StatusBar>
        <ChatRoomHeader user={item} router={router}/>
        <View className='h-[1px] bg-black'></View>
        <View className='flex-1 justify-between overflow-visible'>
            <View className='flex-1'>
                <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user}/>
            </View>
            <View style={{marginBottom: hp(2)}} className='pt-2'>
            <View className='flex-row p-2 justify-between rounded-full bg-white border items-center border-slate-600 mx-2'>
                <TextInput
                    ref={inputRef}
                    onChangeText={value=>textRef.current = value}
                    placeholder='Type message...'
                    style={{fontSize:hp(2)}}
                    className='flex-1 mr-2'
                />
                <TouchableOpacity onPress={handleSendMessage}>
                    <FontAwesome name="send" size={24} color="black" />
                </TouchableOpacity>
            </View>
            </View>
        </View>
    </View>
    </KeyboardView>
  )
}