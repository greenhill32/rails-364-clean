import Colors from '@/constants/colors';
import { Fonts } from '@/constants/fonts';
import { Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type AmoreModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function AmoreModal({ visible, onClose }: AmoreModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close Button — × character, bleeds outside card */}
          <Pressable
            style={styles.closeButton}
            onPress={onClose}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <Text style={styles.closeX}>{'\u00d7'}</Text>
          </Pressable>

          {/* Wink GIF */}
          <Image
            source={require('../assets/images/wink.gif')}
            style={styles.winkGif}
            resizeMode="cover"
          />

          {/* Top Divider */}
          <View style={styles.divider}>
            <View style={styles.line} />
            <View style={styles.sparkle} />
            <View style={styles.line} />
          </View>

          {/* Amore Title */}
          <Text style={styles.amoreTitle}>Amore</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Today is for love, not excuses
          </Text>

          {/* Bottom Divider */}
          <View style={styles.divider}>
            <View style={styles.line} />
            <View style={styles.sparkle} />
            <View style={styles.line} />
          </View>

          {/* Close Button */}
          <TouchableOpacity
            style={styles.doneButton}
            onPress={onClose}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <Text style={styles.doneButtonText}>Perfect</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(24, 10, 19, 0.84)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalContainer: {
    backgroundColor: Colors.backgroundDark,
    borderRadius: 28,
    padding: 45,
    width: '100%',
    maxWidth: 380,
    marginTop: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    position: 'relative',
    alignItems: 'center',
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: -14,
    right: -14,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(26, 8, 22, 0.93)',
    borderWidth: 1,
    borderColor: 'rgba(232, 175, 72, 0.28)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeX: {
    fontSize: 18,
    color: Colors.gold,
    opacity: 0.75,
    lineHeight: 22,
  },
  winkGif: {
    width: '100%',
    height: 380,
    marginBottom: 16,
    marginTop: 8,
    borderRadius: 12,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  line: {
    width: 50,
    height: 1,
    backgroundColor: Colors.gold,
    opacity: 0.6,
  },
  sparkle: {
    width: 12,
    height: 12,
    backgroundColor: Colors.gold,
    transform: [{ rotate: '45deg' }],
    marginHorizontal: 16,
  },
  amoreTitle: {
    fontSize: 48,
    fontWeight: '300',
    color: Colors.gold,
    fontStyle: 'italic',
    letterSpacing: 2,
    textAlign: 'center',
    fontFamily: Fonts.cormorantTitle,
  },
  subtitle: {
    fontSize: 21,
    color: Colors.gold,
    textAlign: 'center',
    opacity: 1,
    marginTop: 8,
    fontStyle: 'italic',
    fontFamily: Fonts.cormorant,
  },
  doneButton: {
    backgroundColor: '#d4963e',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 236, 178, 0.26)',
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  doneButtonText: {
    fontSize: 18,
    color: '#1a0a05',
    letterSpacing: 4,
    fontFamily: Fonts.cinzelMedium,
  },
});
