import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { formatDate, getRoomId } from '../utils/getRoomId';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
const blurhash ='|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


export default function ChatItem({item, noBorder, router, currentUser}) {
  const [lastMsg, setLastMsg] = useState(undefined)
  useEffect(()=>{
          let roomId = getRoomId(currentUser?.userId, item?.userId)
          const docRef = doc(db, 'rooms', roomId)
          const messageRef = collection(docRef,'messages')
          const q = query(messageRef,orderBy('createdAt','desc'))

          let unsub = onSnapshot(q,(snapshot)=>{
              let allMessages = snapshot.docs.map(doc=>{
                  return doc.data()
              })
              setLastMsg(allMessages[0]? allMessages[0]: null)
          })
          return unsub
      },[])
  const renderLastMsg = ()=>{
    if(typeof(lastMsg)=='undefined') return 'Loading...'
    if(lastMsg){
      let msg 
      if(currentUser?.userId == lastMsg?.userId) {
        msg = 'You: ' + lastMsg?.text
      } else{
        msg= lastMsg?.text
      }
      return msg.substring(0,30)
    }else{
      return 'Start convo'
    }
  }
  const renderTime = ()=>{
    if(lastMsg){
      return ( formatDate( new Date(lastMsg?.createdAt?.seconds * 1000)))
    }
    return ''
  }
  const openChatRoom=()=>{
    router.push({pathname:'/chatRoom', params: item})
  }
  return (
    <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 gap-3 items-center  mb-4 pb-2 ${noBorder? '' :'border-b border-b-slate-600'}`}>
      <Image 
        source={{uri:item.profileUrl}} 
        style={{height: hp(6), width: hp(6), aspectRatio:1}}
        placeholder={blurhash}
        transition={500}
        className='rounded-full'
      ></Image>


      <View className='flex-1 gap-1 '>
        <View className='flex-row justify-between'>
          <Text className='font-bold'>{item.username}</Text>
          <Text>
            {renderTime()}
          </Text>
        </View>
        <Text>
            {renderLastMsg()}
        </Text>
      </View>
    </TouchableOpacity>

  )
}