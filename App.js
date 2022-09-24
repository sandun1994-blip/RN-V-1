import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './hooks/AuthProvider';
import { Text, View } from 'react-native';





export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
    <StackNavigator/>
    </AuthProvider>
    </NavigationContainer>
   
  );
}
