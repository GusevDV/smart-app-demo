'use client';

import AuthForm from '@/features/auth-form';
import { Page } from '@/shared/ui/Page';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const handleLogin = () => {
    router.push('/sbp');
  };

  return (
    <Page back={false}>
      <AuthForm onLogin={handleLogin} />
    </Page>
  );
}
