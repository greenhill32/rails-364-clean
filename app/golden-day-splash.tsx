import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/colors';

export default function GoldenDaySplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topContent}>
          <Text style={styles.celebration}>✦</Text>
          <Text style={styles.title}>Your Golden Day</Text>
          <Text style={styles.subtitle}>Has Been Set</Text>
          <Text style={styles.celebration}>✦</Text>
        </View>

        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            One special day of the year where you can say Yes to anything.
          </Text>
          <Text style={styles.message}>
            For 364 other days, we have the perfect excuse.
          </Text>
        </View>

        <View style={styles.bottomContent}>
          <TouchableOpacity style={styles.continueButton} onPress={() => router.replace('/calendar')}>
            <Text style={styles.continueButtonText}>Explore Calendar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    paddingTop: 80,
    paddingBottom: 40,
  },
  topContent: {
    alignItems: 'center',
  },
  celebration: {
    fontSize: 48,
    color: Colors.gold,
    marginVertical: 8,
  },
  title: {
    fontSize: 48,
    color: Colors.gold,
    fontWeight: '300',
    letterSpacing: 2,
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 24,
    color: Colors.gold,
    letterSpacing: 3,
    opacity: 0.8,
  },
  messageContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  message: {
    fontSize: 16,
    color: Colors.cream,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 12,
    opacity: 0.9,
  },
  bottomContent: {
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: Colors.gold,
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 16,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.backgroundDark,
    letterSpacing: 2,
  },
});
