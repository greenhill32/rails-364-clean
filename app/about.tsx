import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/colors';

export default function AboutScreen() {
  const handleContinue = () => {
    router.replace('/pick-golden-day');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topContent}>
          <View style={styles.header}>
            <View style={styles.decorativeLine} />
            <Text style={styles.title}>364</Text>
            <Text style={styles.subtitle}>WAYS TO SAY NO</Text>
            <View style={styles.decorativeLine} />
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              For every day of the year except one, we provide you with the perfect excuse.
            </Text>
            <Text style={styles.description}>
              Because sometimes {`\u201cno\u201d`} needs a little creativity.
            </Text>
          </View>

          <View style={styles.featureContainer}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={{ color: Colors.gold }}>📅</Text>
              </View>
              <Text style={styles.featureText}>Tap any day for inspiration</Text>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={{ color: Colors.gold }}>✦</Text>
              </View>
              <Text style={styles.featureText}>A fresh excuse every day</Text>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.infinitySymbol}>∞</Text>
              </View>
              <Text style={styles.featureText}>All 364 included for launch</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomContent}>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Begin</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Elegantly decline, every single time.
          </Text>
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
    paddingTop: 60,
    paddingBottom: 30,
  },
  topContent: {
    flex: 1,
  },
  bottomContent: {
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  decorativeLine: {
    width: 60,
    height: 1,
    backgroundColor: Colors.gold,
    opacity: 0.5,
    marginVertical: 8,
  },
  title: {
    fontSize: 72,
    color: Colors.gold,
    fontStyle: 'italic',
    fontFamily: 'Didot',
  },
  subtitle: {
    fontSize: 18,
    color: Colors.gold,
    letterSpacing: 6,
    marginTop: -5,
    fontFamily: 'Didot',
  },
  descriptionContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: Colors.cream,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 8,
    opacity: 0.9,
  },
  featureContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infinitySymbol: {
    fontSize: 24,
    color: Colors.gold,
  },
  featureText: {
    fontSize: 15,
    color: Colors.cream,
    flex: 1,
  },
  continueButton: {
    backgroundColor: Colors.gold,
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 16,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.backgroundDark,
    letterSpacing: 2,
  },
  footerText: {
    fontSize: 13,
    color: Colors.gold,
    textAlign: 'center',
    opacity: 0.7,
    fontStyle: 'italic',
  },
});
