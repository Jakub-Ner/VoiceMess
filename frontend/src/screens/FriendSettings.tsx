import React from 'react';
import { Layout, Radio, RadioGroup, Text } from '@ui-kitten/components';
import { Image, StyleSheet } from "react-native";
import useVocoders from "../hooks/useVocoders";
import { getDefaultVocoderIndex, lackOfDefaultVocoder, useDefaultVocoder } from "../hooks/useDefaultVocoder";



export default function FriendsSettings({route, navigation}) {
  const {name, picture} = route.params;
  const IP = route.params.IP
  const facebookId = route.params.facebookId

  const [vocoders, setVocoders, data, setData] = useVocoders(IP, facebookId, [lackOfDefaultVocoder]);
  const [defaultVocoder, setDefaultVocoder] = useDefaultVocoder(IP, name);
  const selectedIndex = getDefaultVocoderIndex(vocoders, data, defaultVocoder);

  if (!vocoders) {
    return <></>;
  }
  return (
    <>
      <Layout style={{flex: 1, alignItems: 'center'}}>
        <Image source={picture ? {uri: picture} : require('../../assets/person.png')} style={styles.image}/>
        <Text category='h1' style={{marginBottom: '20%'}}>{name}</Text>
        <Text category='h5' style={{marginBottom: '5%'}}>Domyślny głos:</Text>
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={index => setDefaultVocoder(data[index - 1]?.eleven_labs_id)}
          style={{alignItems: 'center', justifyContent: 'center'}}
        >
          {vocoders.map((vocoderName, index) => (
              <Radio style={styles.button} key={index} onLongPress={() => console.log(data[index - 1]?.name)}>
                {evaProps => <Text {...evaProps} style={{fontSize: 22}}> {vocoderName}</Text>}
              </Radio>
            )
          )
          }
        </RadioGroup>
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
