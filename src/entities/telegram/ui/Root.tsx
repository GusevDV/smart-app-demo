'use client';

import { type PropsWithChildren } from 'react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import { ErrorPage } from '@/shared/ui/ErrorPage';
import { useTelegramMock } from '../lib/useTelegramMock';
import { useDidMount } from '../lib/useDidMount';
import { useClientOnce } from '../lib/useClientOnce';
// import { setLocale } from '@/core/i18n/locale';
import { init } from '../lib/init';
import { useLaunchParams } from '../lib/useLaunchParams';

import '@telegram-apps/telegram-ui/dist/styles.css';
import './styles.css';

import { miniApp, useSignal } from '@telegram-apps/sdk-react';

function RootInner({ children }: PropsWithChildren) {
  const isDev = process.env.NODE_ENV === 'development';

  const isDark = useSignal(miniApp.isDark);

  // Mock Telegram environment in development mode if needed.
  if (isDev) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock();
  }

  const lp = useLaunchParams();
  const debug = isDev || lp.startParam === 'debug';

  // Initialize the library.
  useClientOnce(() => {
    init(false);
  });

  //   const initDataUser = useSignal(initData.user);

  // Set the user locale.
  //   useEffect(() => {
  //     initDataUser && setLocale(initDataUser.languageCode);
  //   }, [initDataUser]);

  return <AppRoot>{children}</AppRoot>;
}

export function Root(props: PropsWithChildren) {
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of
  // the Server Side Rendering. That's why we are showing loader on the server
  // side.
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) : (
    <div className="root__loading">Loading</div>
  );
}
