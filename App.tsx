import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { useState } from 'react';
import * as WebAssembly from 'react-native-webassembly';

export default function App() {
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const testWasm = async () => {
    try {
      setLoading(true);
      
      // Download the hello-world.wasm example
      const response = await fetch('https://github.com/torch2424/wasm-by-example/raw/master/examples/hello-world/demo/assemblyscript/hello-world.wasm');
      const bufferSource = await response.arrayBuffer();

      // Instantiate the WASM module
      const module = await WebAssembly.instantiate<{
        add: (a: number, b: number) => number;
      }>(bufferSource);

      // Test the add function
      const sum = module.instance.exports.add(5, 3);
      setResult(sum);
      
      Alert.alert('Success!', `WASM add(5, 3) = ${sum}`);
    } catch (error) {
      console.error('WASM Error:', error);
      Alert.alert('Error', `Failed to load WASM: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native WASM Demo</Text>
      <Text style={styles.subtitle}>Testing WebAssembly Integration</Text>
      
      <Button 
        title={loading ? "Loading WASM..." : "Test WASM Add Function"}
        onPress={testWasm}
        disabled={loading}
      />
      
      {result !== null && (
        <Text style={styles.result}>
          Result: add(5, 3) = {result}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 20,
  },
});
