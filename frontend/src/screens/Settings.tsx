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
                {evaProps => <Text {...evaProps} style={{fontSize: 22}}>⇦ Ustawienia profilu</Text>}
            </Button>
            <Button style={styles.button}>
                {evaProps => <Text {...evaProps} style={{fontSize: 22}}>Zarządzaj głosami ➪</Text>}
            </Button>
            <Button style={styles.button}>
                {evaProps => <Text {...evaProps} style={{fontSize: 22}}>Subskrypcja ➪</Text>}
            </Button>
            <Button style={styles.button}>
                {evaProps => <Text {...evaProps} style={{fontSize: 22}}>Regulamin ➪</Text>}
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
