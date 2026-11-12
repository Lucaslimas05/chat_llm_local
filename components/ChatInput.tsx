import { useEffect, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type ChatInputProps = {
  onSend: (text: string) => void;
  onChangeKeyboard: (open: boolean) => void;
};

function ChatInput({ onSend, onChangeKeyboard }: ChatInputProps) {
  const [text, setText] = useState('');

    useEffect(() => {
      const showSub = Keyboard.addListener('keyboardDidShow', () =>
        onChangeKeyboard(true),
      );
      const hideSub = Keyboard.addListener('keyboardDidHide', () =>
        onChangeKeyboard(false),
      );
      return () => {
        showSub.remove();
        hideSub.remove();
      };
    }, [onChangeKeyboard]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    onSend(trimmed);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Envie uma mensagem..."
        placeholderTextColor="#8e8e93"
        multiline
      />

      <TouchableOpacity
        style={styles.sendButton}
        activeOpacity={0.7}
        onPress={handleSend}
      >
        <Text style={styles.sendIcon}>↑</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#1c1c1e',
    borderRadius: 26,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginHorizontal: 12,
    marginBottom: 8,
  },
  plusButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    color: '#ffffff',
    fontSize: 26,
    lineHeight: 28,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    maxHeight: 120,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2f6bff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default ChatInput;
