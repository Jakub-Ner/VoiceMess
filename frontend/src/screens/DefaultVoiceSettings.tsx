import React from 'react';
import { Radio, RadioGroup, Button, Layout, Text } from '@ui-kitten/components';
import { Image, StyleSheet } from "react-native";

export default function Settings({navigation}) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    return (
        <>
                <Layout style={{flex: 1, alignItems: 'flex-start', padding:'10%', marginTop:'8%'}}>
                <Text category='h4' style={{marginBottom: '2%'}}>Moje głosy</Text>
                <RadioGroup
                    selectedIndex={selectedIndex}
                    onChange={index => setSelectedIndex(index)}
                    style={{flex: 1, alignItems: 'flex-start'}}
                >
                    <Radio>
                        {evaProps => <Text {...evaProps} style={{fontSize: 22}}> Adam Fronczewski</Text>}
                    </Radio>
                    <Radio>
                        {evaProps => <Text {...evaProps} style={{fontSize: 22}}> Mama</Text>}
                    </Radio>
                    <Radio>
                        {evaProps => <Text {...evaProps} style={{fontSize: 22}}> Krystyna Czubówna</Text>}
                    </Radio>
                </RadioGroup>
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
