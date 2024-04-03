import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoList from './Component/TodoList';
import FallingStar from './Component/FallingStar';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <NavigationContainer>
      <View style={styles.container}>
        {/* <FallingStar />  */}
        <Stack.Navigator>
          <Stack.Screen
            name="TodoList"
            options={{
              title: 'Todo List',
              headerRight: () => (
                <TouchableOpacity onPress={toggleDarkMode} style={styles.toggleButton}>
                  <Ionicons name={darkMode ? 'moon-outline' : 'sunny-outline'} size={24} color="white" style={styles.icon} />
                </TouchableOpacity>
              ),
            }}
          >
            {props => <TodoList {...props} darkMode={darkMode} setDarkMode={setDarkMode} />}
          </Stack.Screen>
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleButton: {
    padding: 10,
  },
  icon: {
    marginRight: 10,
    height: 30,
    color: 'black'
  },
});

export default App;
