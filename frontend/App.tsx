import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function App() {
  const db = SQLite.openDatabase('dbName');

  db.exec([{ sql: 'CREATE TABLE Test', args: [] }], false, () =>
      console.log('Foreign keys turned on')
  );

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

// async function openDatabase(pathToDatabaseFile: string): Promise<SQLite.WebSQLDatabase> {
//   if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
//     await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
//   }
//   await FileSystem.downloadAsync(
//       Asset.fromModule(require(pathToDatabaseFile)).uri,
//       FileSystem.documentDirectory + 'SQLite/myDatabaseName.db'
//   );
//   return SQLite.openDatabase('myDatabaseName.db');
// }