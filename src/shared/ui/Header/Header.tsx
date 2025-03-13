'use client';
import { useSignal, initData, type User } from '@telegram-apps/sdk-react';
import './header.css';
import { Avatar, Divider, Text } from '@telegram-apps/telegram-ui';
import Image from 'next/image';

const Header = () => {
  const initDataState = useSignal(initData.state);

  return (
    <>
      <header className="header">
        <div className="text-container">
          <Image alt="" src="/images/beeline_logo.svg" width={36} height={36} />
          <Text className="text" weight="1">
            Mini App
          </Text>
        </div>
        <div></div>
        <div className="profile">
          <Text className="name" weight="3">
            {initDataState?.user?.username}
          </Text>
          <Avatar src={initDataState?.user?.photo_url} width={44} />
        </div>
      </header>
      <Divider />
    </>
  );
};

export default Header;
