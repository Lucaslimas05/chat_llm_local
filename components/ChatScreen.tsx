import { useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  Alert,
} from 'react-native';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useLLM, models, Message, } from 'react-native-executorch';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

const INITIAL_MESSAGES: Message[] = [
  { role: 'assistant', content: 'Olá! Como posso te ajudar hoje?'},
];

function ChatScreen() {
  const insets = useSafeAreaInsets();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const llm = useLLM({ model: models.llm.llama3_2_1b() });

  useEffect(() => {
    if (!llm.isReady) return;

    llm.configure({
      chatConfig: {
        systemPrompt:
          'Você é um assistente útil e prestativo. Responda sempre em português de forma clara e concisa.',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [llm?.isReady]);

  const handleSend = async (text: string) => {
    if (!text.trim() || llm.isGenerating || !llm.isReady) return;
    try {
      await llm.sendMessage(text.trim());
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      Alert.alert('Não foi possível enviar a mensagem. Tente novamente.');
    }
  };

  const renderFooter = () => {
    if(llm.isGenerating ){
      return <Text style={[styles.subtext, {color: 'gray'}]} >Pensando...</Text>
    }
    return null
  }

  const renderLoading = () => {
    return (
          <View style={styles.containerLoading}>
            <Text style={styles.progressText}>Carregando Modelo</Text>
            <Text style={styles.subtext}>
              Isso pode levar alguns minutos na primeira vez...
            </Text>
            {llm.error && (
              <Text style={[styles.subtext, { color: 'red' }]}>
                Erro ao carregar modelo: {String(llm.error)}
              </Text>
            )}
          </View>
        )
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right}]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        {llm.isReady ? (
          <>
            <FlatList
              data={!llm.messageHistory?.length ? INITIAL_MESSAGES : llm.messageHistory}
              renderItem={({ item }) => <MessageBubble message={item} />}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={renderFooter}
            />
            <View
              style={{ paddingBottom: keyboardVisible ? 0 : insets.bottom }}
            >
              <ChatInput
                onSend={handleSend}
                onChangeKeyboard={setKeyboardVisible}
              />
            </View>
          </>
        ) : renderLoading()}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  flex: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  subtext: {
    color: '#fff',
    fontSize: 16,
  },
  progressText: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 16,
  },
  containerLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatScreen;
