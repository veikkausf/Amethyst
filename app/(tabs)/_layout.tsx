import { Stack } from 'expo-router/stack';
// Miks täö tekee toisen headerin, piilotettu nyt
export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
