import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native'
import AuthProvider from './context/AuthProvider';







export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
    <StackNavigator/>
    </AuthProvider>
    </NavigationContainer>
   
  );
}
