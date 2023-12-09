import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Input, Layout, List, ListItem, Text, } from '@ui-kitten/components';
import { Image, StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native";
import { useContacts } from "../hooks/useContacts";
import usePostRequest from "../hooks/usePostRequest";

interface IListItem {
  title: string;
  description: string;
}

export default function Contacts({route, navigation}) {
  // const {facebookId, name, picture} = route.params;
  const IP = route.params.IP
  const facebookId = "faceborokId"
  const name = "Agata Belczyk"
  const picture = "http://cokolwiek_mozesz_dac.jpg"
  const body = JSON.stringify({
    facebook_id: facebookId,
  });

  const data = usePostRequest(body, `${IP}/api/v1/customer/`); // TODO use const IP from config and search by facebook_id

  const contacts = useContacts();
  const [value, setValue] = useState('');
  const [filter, setFilter] = useState('');
  const navigateSettings = () => {
    navigation.navigate('settings', {name: name, picture: picture, facebookId: facebookId});
  };

  const renderPerson = ({name}: { name: string }): React.ReactElement => (
    <TouchableOpacity
      style={styles.image}
      onPress={() => {
        /* 1. Navigate to the Details route with params */
        navigation.navigate('friendsSettings', {
          name: name,
          picture: 'https://th.bing.com/th/id/R.8a75b24dfa51f6253b5b22ad74b40eb8?rik=uTUzxuqqqAHa4w&pid=ImgRaw&r=0', // TODO: Zmienić na prawdziwe zdjęcie
        })
      }}>
      <Image source={require('../../assets/person.png')} style={styles.image}/>
    </TouchableOpacity>
  );

  function renderItem({item, index}: { item: IListItem; index: number }) {
    if (!item) {
      return <></>;
    }
    if (filter && !item.title.includes(filter)) {
      return <></>;
    }
    return (
      <ListItem
        title={item.title}
        style={{justifyContent: 'center', alignItems: 'center'}}
        description={'description'}
        accessoryLeft={renderPerson({name: item.title})}
        accessoryRight={renderItemAccessory}
      />
    );
  }

  const renderItemAccessory = (): React.ReactElement => (
    <ButtonGroup>
      <Button size='tiny'>
        ▷
      </Button>
      <Button size='tiny'>
        ↻
      </Button>
    </ButtonGroup>
  );

  if (!data) {
    return <></>;
  }
  return (
    <Layout style={styles.container}>

      <TouchableHighlight style={styles.logo} onPress={navigateSettings}>
        <Image source={require('../../assets/logo.png')} style={styles.logo}/>
      </TouchableHighlight>
      <Input
        style={styles.input}
        placeholder='🔍  Szukaj'
        value={value}
        onChangeText={nextValue => {
          setValue(nextValue);
          setFilter(nextValue);
        }}
      />

      {contacts.length > 0 && (
        <List
          style={styles.container}
          data={contacts} // Filtruj dane na poziomie komponentu
          renderItem={renderItem}
        />)}

    </Layout>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: '3%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  input: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 50,
  },
  image: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'white',
    top: '-35%',
    borderRadius: 90,
  },
});
