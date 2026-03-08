// -----------------------------
// components/QuoteModal.tsx
// Quote Modal with beautiful share card capture
// -----------------------------
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Share,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { useRef, useState } from 'react';
import ViewShot from 'react-native-view-shot';
import { Quote } from '@/constants/quotes';
import Colors from '@/constants/colors';

// ─── Types ───────────────────────────────────────────────────────────────────

type QuoteModalProps = {
  visible: boolean;
  quote: Quote | null;
  onClose: () => void;
  onNoted?: () => void; // called when tap is logged (Noted pressed)
};

// ─── Corner ornament — Art Deco bracket ──────────────────────────────────────
// Four L-shaped gold brackets, one per corner.
// Flip transforms applied to container so child arms are always the same.

function CornerOrnament({
  position,
}: {
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}) {
  const isTop  = position === 'topLeft'  || position === 'topRight';
  const isLeft = position === 'topLeft'  || position === 'bottomLeft';

  return (
    <View
      style={[
        shareCardStyles.corner,
        isTop  ? { top: 20 }  : { bottom: 20 },
        isLeft ? { left: 20 } : { right: 20 },
        { transform: [{ scaleX: isLeft ? 1 : -1 }, { scaleY: isTop ? 1 : -1 }] },
      ]}
    >
      <View style={[shareCardStyles.cornerArm, shareCardStyles.cornerArmH]} />
      <View style={[shareCardStyles.cornerArm, shareCardStyles.cornerArmV]} />
      <View style={shareCardStyles.cornerDot} />
    </View>
  );
}

// ─── The share card — captured by ViewShot ───────────────────────────────────
// Fixed width 360 so the PNG is always crisp regardless of device.
// Background is self-contained (deep plum gradient) — looks great
// on any surface the image is pasted onto.

function ShareCard({ quote }: { quote: Quote }) {
  return (
    <View style={shareCardStyles.card}>

      {/* Deep gradient background — two layers of radial warmth */}
      <View style={shareCardStyles.bgBase} />
      <View style={shareCardStyles.bgGlow1} />
      <View style={shareCardStyles.bgGlow2} />

      {/* Art Deco corner ornaments */}
      <CornerOrnament position="topLeft" />
      <CornerOrnament position="topRight" />
      <CornerOrnament position="bottomLeft" />
      <CornerOrnament position="bottomRight" />

      {/* Content */}
      <View style={shareCardStyles.content}>

        {/* Top divider */}
        <View style={shareCardStyles.divider}>
          <View style={shareCardStyles.divLine} />
          <View style={shareCardStyles.divDiamond} />
          <View style={shareCardStyles.divLine} />
        </View>

        {/* Quote — large and italic */}
        <Text style={shareCardStyles.quoteText}>
          {`\u201c${quote.text}\u201d`}
        </Text>

        {/* Bottom divider */}
        <View style={shareCardStyles.divider}>
          <View style={shareCardStyles.divLine} />
          <View style={shareCardStyles.divDiamond} />
          <View style={shareCardStyles.divLine} />
        </View>

        {/* Brand — proud and visible */}
        <View style={shareCardStyles.brandRow}>
          <View style={shareCardStyles.brandRule} />
          <Text style={shareCardStyles.brandText}>364 Ways to Say No</Text>
          <View style={[shareCardStyles.brandRule, shareCardStyles.brandRuleRight]} />
        </View>

      </View>
    </View>
  );
}

// ─── Main modal component ─────────────────────────────────────────────────────

export function QuoteModal({ visible, quote, onClose, onNoted }: QuoteModalProps) {
  const viewShotRef            = useRef<ViewShot>(null);
  const [noted, setNoted]      = useState(false);
  const shareOpacity           = useRef(new Animated.Value(0)).current;
  const shareTranslate         = useRef(new Animated.Value(10)).current;

  // Reset state each time modal opens
  const handleModalShow = () => {
    setNoted(false);
    shareOpacity.setValue(0);
    shareTranslate.setValue(10);
  };

  // Noted: log the tap, reveal Share
  const handleNoted = () => {
    if (noted) return;
    setNoted(true);
    onNoted?.();

    Animated.parallel([
      Animated.timing(shareOpacity, {
        toValue: 1,
        duration: 380,
        useNativeDriver: true,
      }),
      Animated.timing(shareTranslate, {
        toValue: 0,
        duration: 380,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Dismiss — no tap logged if not yet noted
  const handleDismiss = () => {
    onClose();
  };

  // Share — capture the ShareCard as a PNG and share the image.
  // CRITICAL: on iOS, passing both `url` and `message` causes iOS to
  // discard the image and share only text. Split by platform.
  const handleShare = async () => {
    if (!quote || !viewShotRef.current) return;
    try {
      const uri = await (viewShotRef.current as any).capture();

      const { Platform } = require('react-native');

      if (Platform.OS === 'ios') {
        // iOS: url only → shares as image in share sheet
        await Share.share({ url: uri });
      } else {
        // Android: message required; uri goes in as file:// path
        await Share.share({
          message: `\u201c${quote.text}\u201d\n\n\u2014 364 Ways to Say No`,
          url: uri, // some Android targets support this via Sharing.Intent
        });
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  if (!quote) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleDismiss}
      onShow={handleModalShow}
    >
      <View style={styles.overlay}>

        {/* ── CARD WRAPPER ── */}
        <View style={styles.cardWrapper}>

          {/*
            ViewShot wraps the ShareCard — the dedicated share artefact.
            It has its own self-contained background so the PNG looks
            beautiful regardless of what the user pastes it onto.
            Fixed width 360 → crisp PNG on all devices.
          */}
          <ViewShot
            ref={viewShotRef}
            options={{ format: 'png', quality: 1, width: 360 }}
            style={styles.viewShot}
          >
            <ShareCard quote={quote} />
          </ViewShot>

          {/*
            Dismiss × — outside ViewShot, never appears in shared image.
            Closes WITHOUT logging a tap (tap cost = 0).
          */}
          <Pressable
            style={styles.dismissBtn}
            onPress={handleDismiss}
            hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
            accessibilityRole="button"
            accessibilityLabel="Dismiss without using a tap"
          >
            <Text style={styles.dismissX}>{'\u00d7'}</Text>
          </Pressable>

        </View>

        {/* ── NOTED (primary) ── */}
        <TouchableOpacity
          style={[styles.notedBtn, noted && styles.notedBtnConfirmed]}
          onPress={handleNoted}
          activeOpacity={0.85}
          disabled={noted}
          accessibilityRole="button"
          accessibilityLabel="Noted — uses one tap"
        >
          <Text style={[styles.notedBtnText, noted && styles.notedBtnTextConfirmed]}>
            {noted ? '\u2713  Noted' : 'Noted'}
          </Text>
        </TouchableOpacity>

        {/* Tap cost hint */}
        <Text style={[styles.tapHint, noted && styles.tapHintUsed]}>
          {noted ? 'tap used' : 'uses 1 tap'}
        </Text>

        {/*
          SHARE (secondary) — hidden until Noted is pressed.
          User has committed to the quote before being asked to share it.
          Captures the ShareCard PNG, not a screenshot of the whole screen.
        */}
        <Animated.View
          style={[
            styles.shareWrapper,
            {
              opacity: shareOpacity,
              transform: [{ translateY: shareTranslate }],
            },
          ]}
          pointerEvents={noted ? 'auto' : 'none'}
        >
          <TouchableOpacity
            style={styles.shareBtn}
            onPress={handleShare}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Share this quote"
          >
            {/* Share icon — inline SVG-style using unicode arrow */}
            <Text style={styles.shareIcon}>{'\u2197'}</Text>
            <Text style={styles.shareBtnText}>Share this one</Text>
          </TouchableOpacity>
        </Animated.View>

      </View>
    </Modal>
  );
}

// ─── Share card styles ────────────────────────────────────────────────────────
// Designed as a standalone image artefact. 360px wide.

const CARD_WIDTH  = 360;
const CARD_RADIUS = 28;

const shareCardStyles = StyleSheet.create({

  card: {
    width: CARD_WIDTH,
    minHeight: 420,
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Background layers — solid dark plum
  bgBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1e0a1a',
  },

  // Warm gold corona — top centre bloom
  bgGlow1: {
    position: 'absolute',
    top: -60,
    alignSelf: 'center',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(232,175,72,0.18)',
  },

  // Deep rose warmth — bottom
  bgGlow2: {
    position: 'absolute',
    bottom: -40,
    alignSelf: 'center',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(120,40,80,0.28)',
  },

  content: {
    width: '100%',
    paddingHorizontal: 36,
    paddingVertical: 32,
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
  },

  // ── Divider ──
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 22,
  },
  divLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gold,
    opacity: 0.45,
  },
  divDiamond: {
    width: 7,
    height: 7,
    backgroundColor: Colors.gold,
    transform: [{ rotate: '45deg' }],
    marginHorizontal: 12,
    opacity: 0.9,
  },

  // ── Quote ──
  quoteText: {
    fontSize: 24,
    // Change to: fontFamily: 'CormorantGaramond_400Regular_Italic'
    // once fonts are loaded (Section 2 of checklist)
    fontStyle: 'italic',
    fontWeight: '400',
    color: '#f8efe2',
    textAlign: 'center',
    lineHeight: 38,
    letterSpacing: 0.2,
    paddingHorizontal: 4,
  },

  // ── Brand line ──
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 2,
  },
  brandRule: {
    width: 24,
    height: 1,
    backgroundColor: Colors.gold,
    opacity: 0.7,
  },
  brandRuleRight: {
    // mirrors left rule — same style
  },
  brandText: {
    // Change to: fontFamily: 'Cinzel_500Medium'
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 3.5,
    textTransform: 'uppercase',
    color: Colors.gold,
  },

  // ── Corner ornaments ──
  corner: {
    position: 'absolute',
    width: 28,
    height: 28,
    zIndex: 3,
  },
  cornerArm: {
    position: 'absolute',
    backgroundColor: Colors.gold,
    opacity: 0.6,
    top: 0,
    left: 0,
  },
  cornerArmH: {
    width: 22,
    height: 1.5,
  },
  cornerArmV: {
    width: 1.5,
    height: 22,
  },
  cornerDot: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 3.5,
    height: 3.5,
    borderRadius: 1,
    backgroundColor: Colors.gold,
    opacity: 0.9,
  },
});

// ─── Modal UI styles ──────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(8, 3, 10, 0.88)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 0,
  },

  // Card wrapper — relative so dismiss × can bleed outside
  cardWrapper: {
    width: '100%',
    maxWidth: 360,
    position: 'relative',
    marginBottom: 4,
  },

  // ViewShot fills the wrapper — the ShareCard IS the visible modal card
  viewShot: {
    width: '100%',
    borderRadius: 28,
    overflow: 'hidden',
    // Glass border on top of the share card
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    // Outer glow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.55,
    shadowRadius: 40,
    elevation: 16,
  },

  // Dismiss × — bleeds top-right outside card, not in ViewShot
  dismissBtn: {
    position: 'absolute',
    top: -14,
    right: -14,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(26, 8, 22, 0.93)',
    borderWidth: 1,
    borderColor: 'rgba(232,175,72,0.28)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  dismissX: {
    fontSize: 18,
    color: Colors.gold,
    opacity: 0.75,
    lineHeight: 22,
    // Change to: fontFamily: 'CormorantGaramond_300Light'
  },

  // ── Noted (primary) ──
  notedBtn: {
    width: '100%',
    maxWidth: 360,
    minHeight: 56,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    // Liquid gold — replace with LinearGradient in Section 7 of checklist
    // For now: solid gold is acceptable
    backgroundColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  notedBtnConfirmed: {
    backgroundColor: 'rgba(75, 50, 18, 0.85)',
    shadowOpacity: 0.1,
  },
  notedBtnText: {
    // Change to: fontFamily: 'Cinzel_500Medium'
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 4,
    textTransform: 'uppercase',
    color: Colors.backgroundDark,
  },
  notedBtnTextConfirmed: {
    color: Colors.gold,
    opacity: 0.7,
    letterSpacing: 5,
  },

  // Tap cost hint
  tapHint: {
    // Change to: fontFamily: 'Cinzel_400Regular'
    fontSize: 8,
    fontWeight: '500',
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: Colors.gold,
    opacity: 0.3,
    marginTop: 6,
    marginBottom: 2,
  },
  tapHintUsed: {
    opacity: 0.5,
  },

  // ── Share (secondary) ──
  shareWrapper: {
    width: '100%',
    maxWidth: 360,
    marginTop: 10,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(232,175,72,0.32)',
    backgroundColor: 'rgba(232,175,72,0.04)',
    gap: 8,
  },
  shareIcon: {
    fontSize: 16,
    color: Colors.gold,
    opacity: 0.72,
    lineHeight: 20,
  },
  shareBtnText: {
    // Change to: fontFamily: 'Cinzel_400Regular'
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 3.5,
    textTransform: 'uppercase',
    color: Colors.gold,
  },
});
