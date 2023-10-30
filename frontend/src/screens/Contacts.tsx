import React from 'react';
import {Button, ButtonGroup, Input, Layout, List, ListItem} from '@ui-kitten/components';
import {StyleSheet} from "react-native";
import {StatusBar} from "expo-status-bar";

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
            <Input
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
        height: '100%',
    },
});