import React from 'react';
import { IndexPath, Layout, Select, SelectItem, Text } from '@ui-kitten/components';
import { Image, StyleSheet } from "react-native";
import useVocoders from "../hooks/useVocoders";

export default function FriendsSettings({route, navigation}) {
  const {name, picture} = route.params;
  const IP = route.params.IP
  const facebookId = route.params.facebookId

  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | IndexPath[]>(new IndexPath(0));
  const [vocoders] = useVocoders(IP, facebookId);
  if (!vocoders) {
    return <></>;
  }
  return (
    <>
      <Layout style={{flex: 1, alignItems: 'center',}}>
        <Image source={picture ? {uri: picture} : require('../../assets/person.png')} style={styles.image}/>
        <Text category='h1' style={{marginBottom: '20%'}}>{name}</Text>
        <Select
            // @ts-ignore
          value={vocoders[selectedIndex.row]}
          placeholder='Brak dostępnych głosów'
          // selectedIndex={selectedIndex}
          style={{width: '80%', height: '10%'}}
          onSelect={index => setSelectedIndex(index)}
        >
          {vocoders.length != 0 ? (vocoders.map((vocoderName, index) => (
            <SelectItem key={index} title={vocoderName}/>
          ))
          ): (<SelectItem key={0} title={'Brak dostępnych głosów'}/>)
        }
        </Select>
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
