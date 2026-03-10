import { router } from 'expo-router';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useRef } from 'react';
import Colors from '@/constants/colors';
import { Fonts } from '@/constants/fonts';

const BG         = Colors.background;
const PANEL      = 'rgba(52, 18, 42, 0.68)';
const PANEL_EDGE = 'rgba(255, 255, 255, 0.07)';
const TEXT       = '#f8efe2';
const MUTED      = 'rgba(248, 239, 226, 0.62)';

function FeatureIcon({ emoji, duration = 6000 }: { emoji: string; duration?: number }) {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, { toValue: 1, duration, useNativeDriver: true, easing: Easing.linear }),
    ).start();
  }, []);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View style={iconS.wrap}>
      <Animated.View style={[iconS.ring, { transform: [{ rotate }] }]} />
      <View style={iconS.inner}>
        <Text style={iconS.emoji}>{emoji}</Text>
      </View>
    </View>
  );
}

const iconS = StyleSheet.create({
  wrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    borderTopWidth: 2,
    borderTopColor: Colors.goldBright,
    borderRightWidth: 2,
    borderRightColor: Colors.gold,
    borderBottomWidth: 2,
    borderBottomColor: Colors.goldDark,
    borderLeftWidth: 2,
    borderLeftColor: Colors.goldDim,
  },
  inner: {
    position: 'absolute',
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(28, 10, 24, 0.90)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 20,
    lineHeight: 24,
    color: Colors.gold,
  },
});

export default function AboutScreen() {
  return (
    <View style={s.container}>

      {/* TOP GROUP — vertically centered in available space */}
      <View style={s.topGroup}>

        {/* HEADER */}
        <View style={s.header}>
          <View style={s.decoRule} />
          <Text style={s.title}>364</Text>
          <Text style={s.subtitle}>Ways to Say No</Text>
          <View style={s.decoRule} />
        </View>

        {/* DESCRIPTION */}
        <View style={s.descBlock}>
          <Text style={s.desc}>
            For every day of the year{' '}
            <Text style={s.descStrong}>except one</Text>
            , we provide the perfect excuse.
          </Text>
          <Text style={s.desc}>
            Because sometimes "no" deserves a little{' '}
            <Text style={s.descStrong}>elegance</Text>
            .
          </Text>
        </View>

        {/* FEATURE CARD */}
        <View style={s.featureCard}>
          <View style={s.featureList}>

            <View style={s.featureItem}>
              <FeatureIcon emoji="📅" duration={6000} />
              <View style={s.featureTextWrap}>
                <Text style={s.featureLabel}>Tap any day for your excuse</Text>
                <Text style={s.featureSub}>Daily inspiration</Text>
              </View>
            </View>

            <View style={[s.featureItem, s.featureItemBorder]}>
              <FeatureIcon emoji="✦" duration={7500} />
              <View style={s.featureTextWrap}>
                <Text style={s.featureLabel}>One hidden Golden Day</Text>
                <Text style={s.featureSub}>Discover yours</Text>
              </View>
            </View>

            <View style={[s.featureItem, s.featureItemBorder]}>
              <FeatureIcon emoji="∞" duration={5500} />
              <View style={s.featureTextWrap}>
                <Text style={s.featureLabel}>All 364 excuses at launch</Text>
                <Text style={s.featureSub}>No waiting</Text>
              </View>
            </View>

          </View>
        </View>

      </View>

      {/* BOTTOM — pinned */}
      <View style={s.bottom}>
        <TouchableOpacity
          style={s.beginBtn}
          onPress={() => router.replace('/pick-golden-day')}
          activeOpacity={0.85}
        >
          <Text style={s.beginBtnText}>Begin</Text>
        </TouchableOpacity>
        <Text style={s.footerTagline}>Elegantly decline, every single time.</Text>
      </View>

    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 28,
    paddingBottom: 36,
  },
  topGroup: {
    flex: 1,
    justifyContent: 'center',
    gap: 28,
  },
  // HEADER
  header: {
    alignItems: 'center',
    gap: 10,
  },
  decoRule: {
    width: 80,
    height: 1,
    backgroundColor: 'rgba(232, 175, 72, 0.6)',
  },
  title: {
    fontSize: 80,
    fontStyle: 'italic',
    fontWeight: '300',
    letterSpacing: -3,
    lineHeight: 76,
    color: Colors.gold,
    fontFamily: Fonts.cormorantTitle,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: 5,
    textTransform: 'uppercase',
    color: Colors.gold,
    opacity: 0.82,
    fontFamily: Fonts.cinzel,
  },
  // DESCRIPTION
  descBlock: {
    alignItems: 'center',
    paddingHorizontal: 6,
    gap: 10,
  },
  desc: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '300',
    lineHeight: 30,
    color: MUTED,
    textAlign: 'center',
    fontFamily: Fonts.cormorantLight,
  },
  descStrong: {
    fontStyle: 'normal',
    fontWeight: '400',
    color: TEXT,
    fontFamily: Fonts.cormorant,
  },
  // FEATURE CARD
  featureCard: {
    borderRadius: 24,
    padding: 22,
    paddingBottom: 18,
    backgroundColor: PANEL,
    borderWidth: 1,
    borderColor: PANEL_EDGE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 8,
    overflow: 'hidden',
  },
  featureList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  featureItemBorder: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(232, 175, 72, 0.08)',
  },
  featureTextWrap: {
    flex: 1,
  },
  featureLabel: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 24,
    color: TEXT,
    fontFamily: Fonts.cormorant,
  },
  featureSub: {
    fontSize: 9,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.gold,
    opacity: 0.5,
    marginTop: 3,
    fontFamily: Fonts.cinzel,
  },
  // BOTTOM
  bottom: {
    gap: 14,
    alignItems: 'stretch',
    paddingTop: 16,
  },
  beginBtn: {
    minHeight: 62,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d4963e',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.4,
    shadowRadius: 36,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 236, 178, 0.26)',
  },
  beginBtnText: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 4,
    textTransform: 'uppercase',
    color: '#1a0a05',
    fontFamily: Fonts.cinzelMedium,
  },
  footerTagline: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '300',
    color: MUTED,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: Fonts.cormorantLight,
  },
});
