import { View, Text } from 'react-native'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export default function MenuItem({text, action, value, icon}) {
  return (
    <MenuOption onSelect={()=>action(value)}>
        <View className='flex-row justify-between items-center px-4'>
            <Text>{text}</Text>
            {icon}
        </View>
    </MenuOption>
  )
}