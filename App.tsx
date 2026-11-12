/**
 * Chat IA Local
 *
 * @format
 */

import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ChatScreen from './components/ChatScreen';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <ChatScreen />
    </SafeAreaProvider>
  );
}

export default App;
