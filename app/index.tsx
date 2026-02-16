import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/about');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Image
      source={require('../assets/images/splash.png')}
      style={styles.image}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
