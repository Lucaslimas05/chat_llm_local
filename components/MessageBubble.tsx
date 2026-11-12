import { StyleSheet, Text, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { Message } from 'react-native-executorch';

type MessageBubbleProps = {
  message: Message;
};

function MessageBubble({ message }: MessageBubbleProps) {
  const isMine = message.role === 'user';

  return (
    <View style={[styles.row, isMine ? styles.rowMine : styles.rowOther]}>
      <View
        style={[styles.bubble, isMine ? styles.bubbleMine : styles.bubbleOther]}
      >
        {isMine ? (
          <Text style={styles.text}>{message.content}</Text>
        ) : (
          <Markdown style={markdownStyles}>{message.content}</Markdown>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    marginVertical: 4,
    flexDirection: 'row',
  },
  rowMine: {
    justifyContent: 'flex-end',
  },
  rowOther: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  bubbleMine: {
    backgroundColor: '#2f6bff',
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: '#2a2a2d',
    borderBottomLeftRadius: 4,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 22,
  },
});

const markdownStyles = StyleSheet.create({
  body: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 22,
  },
  heading1: { color: '#ffffff', fontSize: 22, fontWeight: '700', marginTop: 4, marginBottom: 4 },
  heading2: { color: '#ffffff', fontSize: 20, fontWeight: '700', marginTop: 4, marginBottom: 4 },
  heading3: { color: '#ffffff', fontSize: 18, fontWeight: '700', marginTop: 4, marginBottom: 4 },
  strong: { color: '#ffffff', fontWeight: '700' },
  em: { color: '#ffffff', fontStyle: 'italic' },
  link: { color: '#7fb0ff', textDecorationLine: 'underline' },
  bullet_list: { marginVertical: 4 },
  ordered_list: { marginVertical: 4 },
  list_item: { color: '#ffffff', marginVertical: 2 },
  blockquote: {
    backgroundColor: '#1f1f22',
    borderLeftColor: '#7fb0ff',
    borderLeftWidth: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
  },
  code_inline: {
    color: '#ffd479',
    backgroundColor: '#1f1f22',
    borderRadius: 4,
    paddingHorizontal: 4,
    fontFamily: 'Courier',
  },
  code_block: {
    color: '#e6e6e6',
    backgroundColor: '#1f1f22',
    borderRadius: 8,
    padding: 10,
    marginVertical: 4,
    fontFamily: 'Courier',
  },
  fence: {
    color: '#e6e6e6',
    backgroundColor: '#1f1f22',
    borderRadius: 8,
    padding: 10,
    marginVertical: 4,
    fontFamily: 'Courier',
  },
  hr: { backgroundColor: '#3a3a3d', height: 1, marginVertical: 8 },
});

export default MessageBubble;
