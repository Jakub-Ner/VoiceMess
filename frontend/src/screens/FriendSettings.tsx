import React from 'react';
import { Layout, Text, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { Image, StyleSheet } from "react-native";
import IconButton from "../components/IconButton";

export default function FriendsSettings({route, navigation}) {
  const {name} = route.params;
  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | IndexPath[]>(new IndexPath(0));
  const vocoders = ['Krzysztof Ibisz', 'Mama', 'Piotr Fronczewski'];

  return (
    <>
      <Layout style={{flex: 1, alignItems: 'center',}}>
        <Image source={require('../../assets/person.png')} style={styles.image}/>
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
