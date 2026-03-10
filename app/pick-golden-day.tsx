import { router } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { useGoldenDay } from '@/contexts/GoldenDayContext';
import Colors from '@/constants/colors';
import { Fonts } from '@/constants/fonts';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BG         = Colors.background;
const PANEL      = 'rgba(52, 18, 42, 0.68)';
const PANEL_EDGE = 'rgba(255, 255, 255, 0.07)';
const TEXT       = '#f8efe2';
const MUTED      = 'rgba(248, 239, 226, 0.62)';

const MONTHS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
];
const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// Spinning ring for selected day
function SelectedDayRing() {
  const spin = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 4500, useNativeDriver: true, easing: Easing.linear }),
    );
    anim.start();
    return () => anim.stop();
  }, []);
  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  return <Animated.View style={[cs.dayRing, { transform: [{ rotate }] }]} />;
}

export default function PickGoldenDayScreen() {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [selDay, setSelDay]       = useState(today.getDate());
  const [selMonth, setSelMonth]   = useState(today.getMonth());
  const [selYear, setSelYear]     = useState(today.getFullYear());

  const { setGoldenDay } = useGoldenDay();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const handleContinue = () => {
    setGoldenDay(selMonth, selDay);
    router.replace('/golden-day-splash');
  };

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth     = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const selectedText = `${selDay} ${MONTHS_LONG[selMonth]} ${selYear}`;

  return (
    <View style={s.container}>
<View style={s.content}>

        {/* HEADER */}
        <View style={s.header}>
          <View style={s.decoRule} />
          <Text style={s.headerLabel}>Choose Your</Text>
          <Text style={s.headerTitle}>Golden Day</Text>
          <View style={s.decoRule} />
        </View>

        {/* DESCRIPTION */}
        <Text style={s.description}>
          Pick one special day of the year{'\n'}
          for <Text style={{ fontStyle: 'italic' }}>amore</Text> instead of excuses.
        </Text>

        {/* PICKER CARD */}
        <View style={s.pickerCard}>

          {/* Month nav */}
          <View style={s.monthNav}>
            <TouchableOpacity
              style={s.navArrow}
              onPress={prevMonth}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={s.navArrowText}>‹</Text>
            </TouchableOpacity>
            <Text style={s.monthLabel}>{MONTHS[viewMonth]} {viewYear}</Text>
            <TouchableOpacity
              style={s.navArrow}
              onPress={nextMonth}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={s.navArrowText}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Weekday headers */}
          <View style={s.weekdays}>
            {WEEKDAYS.map((d, i) => (
              <Text key={i} style={s.weekday}>{d}</Text>
            ))}
          </View>

          {/* Day grid */}
          <View style={s.dayGrid}>
            {cells.map((day, i) => {
              if (!day) return <View key={i} style={cs.dayCell} />;
              const isSelected = day === selDay && viewMonth === selMonth && viewYear === selYear;
              const isToday    = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
              return (
                <TouchableOpacity
                  key={i}
                  style={cs.dayCell}
                  onPress={() => { setSelDay(day); setSelMonth(viewMonth); setSelYear(viewYear); }}
                  activeOpacity={0.7}
                >
                  {isSelected ? (
                    <>
                      <SelectedDayRing />
                      <View style={cs.dayInner} />
                      <Text style={[cs.dayNum, cs.dayNumSelected]}>{day}</Text>
                    </>
                  ) : (
                    <View style={[cs.dayBg, isToday && cs.dayBgToday]}>
                      <Text style={[cs.dayNum, isToday && cs.dayNumToday]}>{day}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Selected date pill */}
          <View style={s.selectedPill}>
            <View style={s.pillDiamond} />
            <Text style={s.pillText}>{selectedText}</Text>
            <View style={s.pillDiamond} />
          </View>

        </View>

        {/* BOTTOM */}
        <View style={s.bottom}>
          <TouchableOpacity style={s.continueBtn} onPress={handleContinue} activeOpacity={0.85}>
            <Text style={s.continueBtnText}>Continue</Text>
          </TouchableOpacity>
          <Text style={s.footerNote}>You can change this later.</Text>
        </View>

      </View>
    </View>
  );
}

// Day cell styles
const cs = StyleSheet.create({
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dayBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayBgToday: {
    backgroundColor: 'rgba(232, 175, 72, 0.12)',
  },
  dayNum: {
    fontSize: 14,
    fontWeight: '400',
    color: TEXT,
    zIndex: 2,
  },
  dayNumToday: {
    color: Colors.gold,
    fontWeight: '500',
  },
  dayNumSelected: {
    color: Colors.goldBright,
    fontWeight: '500',
    position: 'absolute',
    zIndex: 3,
  },
  dayRing: {
    position: 'absolute',
    width: 34,
    height: 34,
    borderRadius: 17,
    borderTopWidth: 2,
    borderTopColor: Colors.goldBright,
    borderRightWidth: 2,
    borderRightColor: Colors.gold,
    borderBottomWidth: 2,
    borderBottomColor: Colors.goldDark,
    borderLeftWidth: 2,
    borderLeftColor: Colors.goldDim,
    zIndex: 1,
  },
  dayInner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(22, 8, 18, 0.92)',
    zIndex: 2,
  },
});

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 64,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // HEADER
  header: {
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  decoRule: {
    width: 80,
    height: 1,
    backgroundColor: 'rgba(232, 175, 72, 0.6)',
  },
  headerLabel: {
    fontSize: 28,
    fontWeight: '300',
    fontStyle: 'italic',
    color: TEXT,
    letterSpacing: -0.5,
    fontFamily: Fonts.cormorantLight,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 6,
    textTransform: 'uppercase',
    color: Colors.gold,
    marginTop: -4,
    fontFamily: Fonts.cinzelMedium,
  },
  // DESCRIPTION
  description: {
    fontSize: 17,
    fontStyle: 'italic',
    fontWeight: '300',
    lineHeight: 29,
    color: MUTED,
    textAlign: 'center',
    paddingHorizontal: 8,
    fontFamily: Fonts.cormorantLight,
  },
  // PICKER CARD
  pickerCard: {
    width: '100%',
    borderRadius: 28,
    backgroundColor: PANEL,
    borderWidth: 1,
    borderColor: PANEL_EDGE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 50,
    elevation: 10,
    overflow: 'hidden',
    paddingBottom: 8,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
  },
  monthLabel: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 2,
    color: TEXT,
    textTransform: 'uppercase',
    fontFamily: Fonts.cinzel,
  },
  navArrow: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  navArrowText: {
    fontSize: 24,
    fontWeight: '300',
    color: Colors.gold,
    lineHeight: 28,
  },
  weekdays: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingBottom: 6,
  },
  weekday: {
    width: '14.28%',
    textAlign: 'center',
    fontSize: 8.5,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Colors.gold,
    opacity: 0.5,
    paddingVertical: 4,
    fontFamily: Fonts.cinzel,
  },
  dayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  selectedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginHorizontal: 16,
    marginBottom: 12,
    marginTop: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(232, 175, 72, 0.15)',
    backgroundColor: 'rgba(232, 175, 72, 0.05)',
  },
  pillDiamond: {
    width: 5,
    height: 5,
    backgroundColor: Colors.gold,
    transform: [{ rotate: '45deg' }],
    opacity: 0.7,
  },
  pillText: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.gold,
    fontFamily: Fonts.cinzel,
  },
  // BOTTOM
  bottom: {
    width: '100%',
    gap: 14,
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
  footerNote: {
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '300',
    color: MUTED,
    opacity: 0.7,
    textAlign: 'center',
    fontFamily: Fonts.cormorantLight,
  },
});
