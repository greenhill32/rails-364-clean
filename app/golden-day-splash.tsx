import Colors from '@/constants/colors';
import { Fonts } from '@/constants/fonts';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BG   = Colors.background;
const MUTED = 'rgba(248, 239, 226, 0.62)';

function DiamondDivider() {
  const pulse = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1400, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(pulse, { toValue: 0.5, duration: 1400, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
      ]),
    ).start();
  }, []);

  return (
    <View style={d.row}>
      <View style={d.line} />
      <Animated.View style={[d.diamond, { opacity: pulse }]} />
      <View style={d.line} />
    </View>
  );
}

const d = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    gap: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(232, 175, 72, 0.6)',
  },
  diamond: {
    width: 10,
    height: 10,
    backgroundColor: Colors.gold,
    transform: [{ rotate: '45deg' }],
  },
});

export default function GoldenDaySplashScreen() {
  return (
    <View style={s.container}>
      <View style={s.content}>
        <View style={s.hero}>
          {/* TOP */}
          <View style={s.top}>
            <DiamondDivider />
            <View style={s.titleBlock}>
              <Text style={s.title}>Your Golden Day</Text>
              <Text style={s.subtitle}>Has Been Set</Text>
            </View>
            <DiamondDivider />
          </View>

          {/* MESSAGE */}
          <View style={s.messageBlock}>
            <Text style={s.message}>
              One special day of the year where you can say Yes to anything.
            </Text>
            <Text style={s.message}>
              For 364 other days, we have the perfect excuse.
            </Text>
          </View>
        </View>

        {/* BOTTOM */}
        <View style={s.bottom}>
          <TouchableOpacity
            style={s.continueBtn}
            onPress={() => router.replace('/calendar')}
            activeOpacity={0.85}
          >
            <Text style={s.continueBtnText}>Explore Calendar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
    paddingBottom: 50,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
  },
  top: {
    alignItems: 'center',
    gap: 20,
  },
  titleBlock: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  title: {
    fontSize: 52,
    fontStyle: 'italic',
    fontWeight: '300',
    color: Colors.gold,
    letterSpacing: -1,
    textAlign: 'center',
    fontFamily: Fonts.cormorantTitle,
  },
  subtitle: {
    fontSize: 16,
    letterSpacing: 5,
    textTransform: 'uppercase',
    color: Colors.gold,
    opacity: 0.8,
    fontFamily: Fonts.cinzel,
    marginTop: -4,
  },
  messageBlock: {
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 12,
    marginTop: 84,
  },
  message: {
    fontSize: 17,
    fontStyle: 'italic',
    fontWeight: '300',
    color: Colors.cream,
    textAlign: 'center',
    lineHeight: 28,
    opacity: 0.85,
    fontFamily: Fonts.cormorantLight,
  },
  bottom: {
    alignItems: 'stretch',
  },
  continueBtn: {
    minHeight: 58,
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
  continueBtnText: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 4,
    textTransform: 'uppercase',
    color: '#1a0a05',
    fontFamily: Fonts.cinzelMedium,
  },
});
