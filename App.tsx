import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { useState } from 'react';
import * as WebAssembly from 'react-native-webassembly';

// Import our custom WASM module directly
import PasswordGenWasm from './password_gen.wasm';

interface PasswordGenModule {
  generate_password_number: () => number;
  calculate_strength: (password: number) => number;
  simple_hash: (input: number) => number;
  simple_encrypt: (data: number, key: number) => number;
  simple_decrypt: (encrypted: number, key: number) => number;
  set_seed: (seed: number) => void;
}

export default function App() {
  const [passwordNumber, setPasswordNumber] = useState<number | null>(null);
  const [strength, setStrength] = useState<number | null>(null);
  const [encryptedData, setEncryptedData] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const generatePassword = async () => {
    try {
      setLoading(true);
      
      // Instantiate our custom WASM module directly
      const module = await WebAssembly.instantiate<PasswordGenModule>(PasswordGenWasm);

      // Set a random seed based on current time
      const seed = Date.now() % 1000000;
      module.instance.exports.set_seed(seed);

      // Generate password number
      const password = module.instance.exports.generate_password_number();
      setPasswordNumber(password);

      // Calculate strength
      const passwordStrength = module.instance.exports.calculate_strength(password);
      setStrength(passwordStrength);

      Alert.alert('Password Generated!', 
        `Password Number: ${password}\nStrength: ${passwordStrength}%`);
    } catch (error) {
      console.error('WASM Error:', error);
      Alert.alert('Error', `Failed to generate password: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testEncryption = async () => {
    if (!passwordNumber) {
      Alert.alert('Error', 'Generate a password first!');
      return;
    }

    try {
      setLoading(true);
      
      const module = await WebAssembly.instantiate<PasswordGenModule>(PasswordGenWasm);

      // Use password as data to encrypt
      const key = 12345; // Simple encryption key
      const encrypted = module.instance.exports.simple_encrypt(passwordNumber, key);
      const decrypted = module.instance.exports.simple_decrypt(encrypted, key);

      setEncryptedData(encrypted);

      Alert.alert('Encryption Test!', 
        `Original: ${passwordNumber}\nEncrypted: ${encrypted}\nDecrypted: ${decrypted}\nMatch: ${decrypted === passwordNumber ? 'YES' : 'NO'}`);
    } catch (error) {
      console.error('WASM Error:', error);
      Alert.alert('Error', `Failed to encrypt: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Security Suite</Text>
      <Text style={styles.subtitle}>Powered by WebAssembly</Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          title={loading ? "Processing..." : "Generate Password"}
          onPress={generatePassword}
          disabled={loading}
        />
      </View>
      
      {passwordNumber !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>
            🔐 Password: {passwordNumber}
          </Text>
          <Text style={styles.strength}>
            💪 Strength: {strength}%
          </Text>
        </View>
      )}
      
      {passwordNumber && (
        <View style={styles.buttonContainer}>
          <Button 
            title="Test Encryption"
            onPress={testEncryption}
            disabled={loading}
            color="#FF6B35"
          />
        </View>
      )}
      
      {encryptedData !== null && (
        <Text style={styles.encrypted}>
          🔒 Encrypted: {encryptedData}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 40,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
  resultContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginVertical: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 8,
    textAlign: 'center',
  },
  strength: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
  },
  encrypted: {
    fontSize: 14,
    color: '#8e44ad',
    marginTop: 15,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
});
