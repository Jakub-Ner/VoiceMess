import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Image, StyleSheet } from "react-native";
import IconButton from "../components/IconButton";

export default function Settings({navigation}) {
    const navigateDefautlVoiceSettings = () => {
        navigation.navigate('defaultVoiceSettings');
    };
  return (
    <>
      <Layout style={{flex: 1, alignItems: 'center', marginTop: '8%'}}>
        <Image source={require('../../assets/person.png')} style={styles.image}/>
        <Text category='h1' style={{marginBottom: '20%'}}>Adam Kowalski</Text>

        <IconButton text={"Zarządzaj głosami"} file={require('../../assets/speakingHead.png')} onPress={navigateDefautlVoiceSettings} />
        <IconButton text={"Subskrypcja"} file={require('../../assets/payment.png')} onPress={() => console.log('goto subskrypcja')} />
        <IconButton text={"Regulamin"} file={require('../../assets/statute.png')} onPress={() => console.log('goto regulamin')} />
      </Layout>
    </>
  );
}


const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold', // Ustawienie pogrubionej czcionki
    textAlign: 'left',
    // fontSize: 16
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white'
  },
  button: {
    marginVertical: 7,
    width: '80%'
  },
});
