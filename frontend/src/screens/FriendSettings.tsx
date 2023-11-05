import React from 'react';
import { IndexPath, Layout, Select, SelectItem, Text } from '@ui-kitten/components';
import { Image, StyleSheet } from "react-native";
import useGetRequest from "../hooks/useGetRequest";

export default function FriendsSettings({route, navigation}) {
  const {name, picture} = route.params;
  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | IndexPath[]>(new IndexPath(0));

  const data = useGetRequest("http://192.168.14.7:8080/api/v1/vocoder/"); // TODO use const IP from config and search by facebook_id
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
