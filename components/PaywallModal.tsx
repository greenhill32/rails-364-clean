import { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Pressable, Alert, ActivityIndicator } from 'react-native';
// import Purchases from 'react-native-purchases'; // RC disabled until App Store submission
import Colors from '@/constants/colors';
import { Fonts } from '@/constants/fonts';
import { useGoldenDay } from '@/contexts/GoldenDayContext';
// import { ensureRevenueCatConfigured } from '@/lib/revenuecat'; // RC disabled until App Store submission

type PaywallModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function PaywallModal({ visible, onClose }: PaywallModalProps) {
  const { setPurchased } = useGoldenDay();
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    // RC disabled until App Store submission
    // setLoading(true);
    // try {
    //   await ensureRevenueCatConfigured();
    //   const offerings = await Purchases.getOfferings();
    //   const lifetime = offerings.current?.lifetime;
    //   if (!lifetime) {
    //     Alert.alert('Error', 'No offering found. Please try again later.');
    //     return;
    //   }
    //   const { customerInfo } = await Purchases.purchasePackage(lifetime);
    //   if (customerInfo.entitlements.active['pro']) {
    //     setPurchased(true);
    //     onClose();
    //   }
    // } catch (e: any) {
    //   if (!e.userCancelled) {
    //     Alert.alert('Purchase Error', e.message || 'Something went wrong.');
    //   }
    // } finally {
    //   setLoading(false);
    // }
    Alert.alert('Coming Soon', 'In-app purchases will be available when the app launches on the App Store.');
  };

  const handleRestore = async () => {
    // RC disabled until App Store submission
    // setLoading(true);
    // try {
    //   await ensureRevenueCatConfigured();
    //   const customerInfo = await Purchases.restorePurchases();
    //   if (customerInfo.entitlements.active['pro']) {
    //     setPurchased(true);
    //     onClose();
    //   } else {
    //     Alert.alert('No Purchases Found', 'We could not find any previous purchases to restore.');
    //   }
    // } catch (e: any) {
    //   Alert.alert('Restore Error', e.message || 'Something went wrong.');
    // } finally {
    //   setLoading(false);
    // }
    Alert.alert('Coming Soon', 'In-app purchases will be available when the app launches on the App Store.');
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
            accessibilityLabel="Close"
          >
            <Text style={styles.closeX}>{'\u00d7'}</Text>
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
            onPress={handlePurchase}
            disabled={loading}
            accessibilityRole="button"
            accessibilityLabel="Unlock all 364"
          >
            {loading ? (
              <ActivityIndicator color='#1a0a05' />
            ) : (
              <Text style={styles.unlockButtonText}>Unlock All 364</Text>
            )}
          </TouchableOpacity>

          {/* Restore Purchases */}
          <TouchableOpacity
            style={styles.restoreButton}
            onPress={handleRestore}
            disabled={loading}
            accessibilityRole="button"
            accessibilityLabel="Restore purchases"
          >
            <Text style={styles.restoreButtonText}>Restore Purchases</Text>
          </TouchableOpacity>
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
    borderRadius: 28,
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
    fontSize: 32,
    fontWeight: '300',
    fontStyle: 'italic',
    color: Colors.gold,
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 12,
    fontFamily: Fonts.cormorantTitle,
  },
  body: {
    fontSize: 16,
    color: Colors.cream,
    textAlign: 'center',
    marginBottom: 8,
    fontStyle: 'italic',
    fontFamily: Fonts.cormorant,
  },
  subCopy: {
    fontSize: 14,
    color: Colors.cream,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 22,
    fontStyle: 'italic',
    fontFamily: Fonts.cormorant,
  },
  unlockButton: {
    backgroundColor: '#d4963e',
    borderWidth: 1,
    borderColor: 'rgba(255, 236, 178, 0.26)',
    borderRadius: 999,
    minHeight: 52,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unlockButtonText: {
    fontSize: 16,
    color: '#1a0a05',
    letterSpacing: 4,
    fontFamily: Fonts.cinzelMedium,
  },
  restoreButton: {
    alignSelf: 'center',
    marginTop: 16,
    padding: 8,
  },
  restoreButtonText: {
    fontSize: 11,
    color: Colors.cream,
    opacity: 0.55,
    fontFamily: Fonts.cinzel,
  },
});
