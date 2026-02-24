import { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Pressable, Alert, ActivityIndicator } from 'react-native';
import { X } from 'lucide-react-native';
import Purchases from 'react-native-purchases';
import Colors from '@/constants/colors';
import { useGoldenDay } from '@/contexts/GoldenDayContext';
import { ensureRevenueCatConfigured } from '@/lib/revenuecat';

type PaywallModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function PaywallModal({ visible, onClose }: PaywallModalProps) {
  const { setPurchased } = useGoldenDay();
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      await ensureRevenueCatConfigured();
      const offerings = await Purchases.getOfferings();
      const lifetime = offerings.current?.lifetime;
      if (!lifetime) {
        Alert.alert('Error', 'No offering found. Please try again later.');
        return;
      }
      const { customerInfo } = await Purchases.purchasePackage(lifetime);
      if (customerInfo.entitlements.active['pro']) {
        setPurchased(true);
        onClose();
      }
    } catch (e: any) {
      if (!e.userCancelled) {
        Alert.alert('Purchase Error', e.message || 'Something went wrong.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    setLoading(true);
    try {
      await ensureRevenueCatConfigured();
      const customerInfo = await Purchases.restorePurchases();
      if (customerInfo.entitlements.active['pro']) {
        setPurchased(true);
        onClose();
      } else {
        Alert.alert('No Purchases Found', 'We could not find any previous purchases to restore.');
      }
    } catch (e: any) {
      Alert.alert('Restore Error', e.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
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
            onPress={handlePurchase}
            disabled={loading}
            accessibilityRole="button"
            accessibilityLabel="Unlock all 364"
          >
            {loading ? (
              <ActivityIndicator color={Colors.backgroundDark} />
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
    minWidth: 180,
    alignItems: 'center',
  },
  unlockButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.backgroundDark,
    letterSpacing: 1,
  },
  restoreButton: {
    alignSelf: 'center',
    marginTop: 16,
    padding: 8,
  },
  restoreButtonText: {
    fontSize: 13,
    color: Colors.cream,
    opacity: 0.6,
  },
});
