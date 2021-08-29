import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import * as ScopedStorage from "react-native-scoped-storage";

const App = () => {

  const Button = ({ title, onPress }: { title: string, onPress: () => void }) => {

    return <TouchableOpacity
      style={{
        backgroundColor: "green",
        padding: 12,
        borderRadius: 5,
        marginBottom: 10
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: 'white'
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  }


  return <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Button onPress={async () => {
      try {
        console.log(await ScopedStorage.openDocumentTree());
      } catch (e) {
        console.log(e)
      }
    }}
      title="openDocumentTree" />

    <Button onPress={async () => {
      try {
        // Reading an image
        console.log(await ScopedStorage.openDocument(true,'base64'));
      } catch (e) {
        console.log(e)
      }
    }}
      title="openDocument" />


  </View>
};

export default App;
