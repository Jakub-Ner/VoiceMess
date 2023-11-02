import React from "react";
import { Button, Layout, Text } from '@ui-kitten/components';
import { StyleSheet, Image, Dimensions } from 'react-native';


export default function IconButton(props: {
  text: string,
  file: NodeRequire,
  onPress: () => void,
}) {
  const {text, file, onPress} = props;
  return (
    <Button style={styles.button} accessoryLeft={() => renderIcon(file)} onPress={onPress}>
      {evaProps =>
        <Text {...evaProps} style={{fontSize: 22, marginLeft: 20}}>{text}</Text>}
    </Button>
  )
};

const renderIcon = (file): React.ReactElement => (
  <Image source={file} style={styles.icon}/>
);


const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
    justifyContent: 'flex-start',
  },
  button: {
    justifyContent: 'flex-start',
    marginVertical: 7,
    width: '80%',
  },
});
