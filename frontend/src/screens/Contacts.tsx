import React from 'react';
import { Button, ButtonGroup, Input, Layout, List, ListItem } from '@ui-kitten/components';
import { Dimensions, Image, StyleSheet } from "react-native";

interface IListItem {
  title: string;
  description: string;
}

export default function Contacts() {
  const [value, setValue] = React.useState('');

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

  const renderItem = ({item, index}: { item: IListItem; index: number }): React.ReactElement => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
      accessoryRight={renderItemAccessory}
    />
  );

  return (
    <Layout style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.image}/>
      <Input
        style={styles.input}
        placeholder='🔍  Szukaj'
        value={value}
        onChangeText={nextValue => setValue(nextValue)}
      />
      <List
        style={styles.container}
        data={data}
        renderItem={renderItem}
      />
    </Layout>
  );
}

const data = new Array(13).fill({
  title: 'Osoba nr',
  description: 'Wiadomosc nr ',
});

const styles = StyleSheet.create({
  container: {
    marginTop: Dimensions.get('window').height * 0.04,
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  input: {
    width: '70%',
    alignSelf: 'center',
    borderRadius: 50,
  }
});
