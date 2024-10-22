import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

type CollapsibleProps = PropsWithChildren & {
  title: string;
  isOpen: boolean; // Receive isOpen from parent
  onToggle: () => void; // Function to toggle the open/close state
};

export function Collapsible({
  children,
  title,
  isOpen,
  onToggle,
}: CollapsibleProps) {
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={styles.heading}
        onPress={onToggle} // Use the onToggle passed from parent
        activeOpacity={0.8}
      >
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
