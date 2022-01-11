import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import * as ScopedStorage from 'react-native-scoped-storage';

const Button = ({title, onPress}: {title: string; onPress: () => void}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'green',
        padding: 12,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <Text
        style={{
          color: 'white',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const App = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
      }}>
      <Button
        onPress={async () => {
          try {
            let dir = await ScopedStorage.openDocumentTree(true);
            let text = 'Hello world';

            await ScopedStorage.writeFile(
              dir.uri,
              'helloworld.txt',
              'text/plain',
              text,
            );
          } catch (e) {
            console.log(e);
          }
        }}
        title="Select a directory to read/write files"
      />

      <Button
        onPress={async () => {
          try {
            await ScopedStorage.openDocument();
          } catch (e) {
            console.log(e);
          }
        }}
        title="Select a file"
      />

      <Button
        onPress={async () => {
          try {
            let file = await ScopedStorage.createDocument(
              'helloworld.txt',
              'text/plain',
              'hello world',
            );
            console.log('File saved!',file);
          } catch (e) {
            console.log(e);
          }
        }}
        title="Create a new file in user selected directory"
      />
    </View>
  );
};

export default App;
