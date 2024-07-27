import { KeyboardAvoidingView, Platform, ScrollView} from 'react-native'
import React from 'react'

const ios = Platform.OS === 'ios'
export default function KeyboardView({children, inChat}) {
  let kConfig ={}
  let scrollVConfig ={}
  if(inChat){
    kConfig= {keyboardVerticalOffset:90}
    scrollVConfig = {contentContainerStyle:{flex:1 }}
  }
  return (
    <KeyboardAvoidingView
        {...kConfig}
        behaviour={ios? 'padding': 'height'}    
        style={{flex : 1}}
    >
        <ScrollView
            {...scrollVConfig}
            style={{flex:1}}
            bounces={false}
            showsVerticalScrollIndicator={false}
        >
            {children}
        </ScrollView>
    </KeyboardAvoidingView>
  )
}