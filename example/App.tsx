import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import * as ScopedStorage from "react-native-scoped-storage";

const App = () => {


  return <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <TouchableOpacity
      onPress={async () => {
        console.log(await ScopedStorage.openDocumentTree());
      }}
    >
      <Text
        style={{
          color: 'white'
        }}
      >
        Click Me
      </Text>
    </TouchableOpacity>
  </View>
};

export default App;
