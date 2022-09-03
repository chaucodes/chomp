import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { Container } from './components/Container';
import { Home } from './pages/Home';

export default function App() {
  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <Home />
        <StatusBar style='auto' />
      </SafeAreaView>
    </Container>
  );
}
