import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/home/search" />;  // 앱을 '/login' 경로로 리디렉션
}