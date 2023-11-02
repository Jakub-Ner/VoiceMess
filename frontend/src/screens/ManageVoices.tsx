import React from 'react';
import {Button, ButtonGroup, Layout, ListItem, Text} from '@ui-kitten/components';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default function Settings() {
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../assets/person.png')} style={styles.image} />
            <Text category='h1'>Adam Kowalski</Text>
            <Text>{'\n'}{'\n'}</Text>
            <Button style={styles.button} accessoryLeft={renderPerson('../../assets/person.png')}>
                {evaProps => <Text {...evaProps} style={{fontSize: 22}}>⇦ Zarządzaj głosami</Text>}
            </Button>
            <Button style={styles.button}>
                {evaProps => <Text {...evaProps} style={{fontSize: 22}}>Domyślny głos ➪</Text>}
            </Button>
            <Button style={styles.button}>
                {evaProps => <Text {...evaProps} style={{fontSize: 22}}>Moje głosy ➪</Text>}
            </Button>
        </Layout>
    );
}
//'../../assets/person.png'
const renderPerson = (path): React.ReactElement => (
    <Image source={require('../../assets/person.png')} style={styles.image}/>
);

const styles = StyleSheet.create({
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'left',
    },
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
        backgroundColor: 'white',
    },
    button: {
        marginVertical: 7,
        width: '80%',
        alignItems: 'flex-start', // Ustaw tekst na lewą stronę
    },
});
