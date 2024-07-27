import { View, Text, Platform } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/authContext';
import {Image} from 'expo-image'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import MenuItem from './MenuItem';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const blurhash ='|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const ios = Platform.OS == 'ios'
export default function HomeHeader() {
    const {user, logout} = useAuth()
    const {top} = useSafeAreaInsets()
    const handleProfile=()=>{
    }
    const handleLogout=async()=>{
      await logout()
    }
  return (
    <View style={{paddingTop: ios? top: top+10}} className='bg-black flex-row justify-between items-center px-5 pb-2 shadow'>
      <View>
        <Text style={{fontSize: hp(3)}} className='text-white'>Chats</Text>
      </View>
      <View>
      </View>
        <Menu>
      <MenuTrigger>
        <Image
            style={{height:hp(4), aspectRatio:1, borderRadius:100}}
            source={user?.profileUrl}
            placeholder={blurhash}
            transition={500}
        />

      </MenuTrigger>
      <MenuOptions 
        customStyles={{
          optionsContainer:{
            marginTop:40,
            marginLeft:-20
          }
        }}
      >
        <MenuItem 
          text="Profile"
          action={handleProfile}
          value={null}
          icon={<Entypo name="user" size={24} color="black" />}
        />
        <Divider/>
        <MenuItem 
          text="Signout"
          action={handleLogout}
          value={null}
          icon={<MaterialIcons name="logout" size={24} color="black" />}
        />
      </MenuOptions>
    </Menu>
    </View>
  )
}

const Divider = ()=>{
  return(
    <View className='p-[1px] w-[90%] justify-center bg-slate-300'></View>
  )
}