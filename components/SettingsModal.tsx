import Constants from 'expo-constants';
import { Alert, Linking, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/colors';
import { Fonts } from '@/constants/fonts';
import { useGoldenDay } from '@/contexts/GoldenDayContext';

type SettingsModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function SettingsModal({ visible, onClose }: SettingsModalProps) {
  const { clearLocalCache } = useGoldenDay();
  const version = Constants.expoConfig?.version ?? 'dev';

  const handlePrivacyPolicy = async () => {
    await Linking.openURL('https://publicbucket3222.blob.core.windows.net/$web/364/privacy.html');
  };

  const handleTermsOfService = async () => {
    await Linking.openURL('https://publicbucket3222.blob.core.windows.net/$web/364/terms.html');
  };

  const handleClearLocalCache = () => {
    Alert.alert(
      'Clear local cache?',
      'This resets your saved golden day, clicked days, and local testing state on this device.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear Cache',
          style: 'destructive',
          onPress: async () => {
            await clearLocalCache();
            onClose();
          },
        },
      ],
    );
  };

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
            accessibilityLabel="Close settings"
          >
            <Text style={styles.closeX}>{'\u00d7'}</Text>
          </Pressable>

          <Text style={styles.title}>Settings</Text>

          {/* Diamond divider */}
          <View style={styles.diamondDivider}>
            <View style={styles.dividerLine} />
            <View style={styles.dividerDiamond} />
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handlePrivacyPolicy}
            accessibilityRole="button"
            accessibilityLabel="Privacy Policy"
          >
            <Text style={styles.menuItemText}>Privacy Policy</Text>
            <Text style={styles.menuItemChevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleTermsOfService}
            accessibilityRole="button"
            accessibilityLabel="Terms of Service"
          >
            <Text style={styles.menuItemText}>Terms of Service</Text>
            <Text style={styles.menuItemChevron}>›</Text>
          </TouchableOpacity>
          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleClearLocalCache}
            accessibilityRole="button"
            accessibilityLabel="Clear local cache"
          >
            <Text style={[styles.menuItemText, styles.destructiveText]}>Clear Local Cache</Text>
            <Text style={styles.menuItemChevron}>›</Text>
          </TouchableOpacity>
          <View style={styles.divider} />

          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Version {version}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(24, 10, 19, 0.82)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: Colors.backgroundDark,
    borderRadius: 24,
    padding: 30,
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    position: 'relative',
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
  title: {
    fontSize: 18,
    color: Colors.gold,
    textAlign: 'center',
    letterSpacing: 4,
    fontFamily: Fonts.cinzelMedium,
  },
  diamondDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(232, 175, 72, 0.3)',
  },
  dividerDiamond: {
    width: 6,
    height: 6,
    backgroundColor: Colors.gold,
    transform: [{ rotate: '45deg' }],
    marginHorizontal: 10,
    opacity: 0.7,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  menuItemText: {
    fontSize: 17,
    color: Colors.cream,
    fontFamily: Fonts.cormorant,
  },
  destructiveText: {
    color: Colors.goldBright,
  },
  menuItemChevron: {
    fontSize: 24,
    color: Colors.gold,
    fontWeight: '300',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 8,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  versionText: {
    fontSize: 10,
    color: Colors.cream,
    opacity: 0.5,
    letterSpacing: 2,
    fontFamily: Fonts.cinzel,
  },
});
