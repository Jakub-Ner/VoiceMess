import React from 'react';
import { IndexPath, Layout, Select, SelectItem, Text } from '@ui-kitten/components';
import { Image, StyleSheet } from "react-native";
import useRequest from "../hooks/useRequest";

export default function FriendsSettings({route, navigation}) {
  const {name, picture} = route.params;
  const IP = route.params.IP
  const facebookId = route.params.facebookId

  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | IndexPath[]>(new IndexPath(0));
  const data = useRequest(`${IP}/api/v1/vocoder/list/${facebookId}`,'GET');
  if (!data) {
    return <></>;
  }
  const vocoders = data.map((vocoder) => vocoder.name);
  return (
    <>
      <Layout style={{flex: 1, alignItems: 'center',}}>
        <Image source={picture ? {uri: picture} : require('../../assets/person.png')} style={styles.image}/>
        <Text category='h1' style={{marginBottom: '20%'}}>{name}</Text>
        <Select
            // @ts-ignore
          value={vocoders[selectedIndex.row]}
          selectedIndex={selectedIndex}
          style={{width: '80%', height: '10%'}}
          onSelect={index => setSelectedIndex(index)}
        >
          {vocoders.map((vocoderName, index) => (
            <SelectItem key={index} title={vocoderName}/>
          ))}
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
