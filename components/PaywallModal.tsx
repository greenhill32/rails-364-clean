import { Modal, View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { X } from 'lucide-react-native';
import Colors from '@/constants/colors';

type PaywallModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function PaywallModal({ visible, onClose }: PaywallModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <Pressable
            style={styles.closeButton}
            onPress={onClose}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <View pointerEvents="none">
              <X size={24} color={Colors.gold} />
            </View>
          </Pressable>

          {/* Top Divider */}
          <View style={styles.divider}>
            <View style={styles.line} />
            <View style={styles.diamond} />
            <View style={styles.line} />
          </View>

          {/* Title */}
          <Text style={styles.title}>364 Ways to Say No</Text>

          {/* Body */}
          <Text style={styles.body}>You&apos;ve used your 3 free excuses.</Text>
          <Text style={styles.subCopy}>Unlock all 364 to keep saying no in style.</Text>

          {/* Bottom Divider */}
          <View style={styles.divider}>
            <View style={styles.line} />
            <View style={styles.diamond} />
            <View style={styles.line} />
          </View>

          {/* Unlock Button */}
          <TouchableOpacity
            style={styles.unlockButton}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Unlock all 364"
          >
            <Text style={styles.unlockButtonText}>Unlock All 364</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: Colors.backgroundDark,
    borderRadius: 20,
    padding: 30,
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 14,
    zIndex: 10,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  line: {
    width: 40,
    height: 1,
    backgroundColor: Colors.gold,
    opacity: 0.5,
  },
  diamond: {
    width: 8,
    height: 8,
    backgroundColor: Colors.gold,
    transform: [{ rotate: '45deg' }],
    marginHorizontal: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.gold,
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    color: Colors.cream,
    textAlign: 'center',
    marginBottom: 8,
  },
  subCopy: {
    fontSize: 14,
    color: Colors.cream,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 22,
  },
  unlockButton: {
    backgroundColor: Colors.gold,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignSelf: 'center',
  },
  unlockButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.backgroundDark,
    letterSpacing: 1,
  },
});
