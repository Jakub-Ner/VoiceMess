import React, {useState} from 'react';
import {Button, ButtonGroup, Input, Layout, List, ListItem} from '@ui-kitten/components';
import {Dimensions, Image, StyleSheet, TouchableHighlight, TouchableOpacity} from "react-native";
import {useContacts} from "../hooks/useContacts";

interface IListItem {
    title: string;
    description: string;
}

export default function Contacts({navigation}) {
    const contacts = useContacts();
    const [value, setValue] = useState('');

    const navigateSettings = () => {
        navigation.navigate('settings');
    };

    const renderPerson = ({name}: { name: string }): React.ReactElement => (
        <TouchableOpacity
            style={styles.image}
            onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate('friendsSettings', {
                    name: name
                })
            }}>
            <Image source={require('../../assets/person.png')} style={styles.image}/>
        </TouchableOpacity>
    );

    function renderItem({item, index}: { item: IListItem; index: number }) {
        if (!item) {
            return null;
        }
        return (
            <ListItem
                title={item.title}
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


    return (
        <Layout style={styles.container}>
            <TouchableHighlight style={styles.logo} onPress={navigateSettings}>
                <Image source={require('../../assets/logo.png')} style={styles.logo}/>
            </TouchableHighlight>
            <Input
                style={styles.input}
                placeholder='🔍  Szukaj'
                value={value}
                onChangeText={nextValue => setValue(nextValue)}
            />

            {contacts.length > 0 && (
                <List
                    style={styles.container}
                    data={contacts}
                    renderItem={renderItem}
                />)}

        </Layout>
    );

}

const styles = StyleSheet.create({
    container: {
        marginTop: '8%',
        flex: 1,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 20,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    input: {
        width: '90%',
        alignSelf: 'center',
        borderRadius: 50,
    },
    image: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 90,
    },
});
