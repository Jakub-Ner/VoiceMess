import React from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';
import { Image, StyleSheet } from "react-native";

export default function Settings({navigation}) {
  return (
    <>
      <Layout style={{flex: 1, alignItems: 'center', marginTop: '8%'}}>
        <Image source={require('../../assets/person.png')} style={styles.image}/>
        <Text category='h1' style={{marginBottom: '20%'}}>Adam Kowalski</Text>

        <Button style={styles.button}>
          <Text style={styles.text}>Zarządzaj głosami</Text>
        </Button>
        <Button style={styles.button}>
          <Text style={styles.text}>Subskrypcja</Text>
        </Button>
        <Button style={styles.button}>
          <Text style={styles.text}>Regulamin</Text>
        </Button>
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
    marginVertical: 3,
    marginHorizontal: 10,
    width: '80%'
  },
});
