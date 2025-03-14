'use client'

import {
    backButton,
    viewport,
    miniApp,
    initData,
    init as initSDK,
    setDebug,
  } from '@telegram-apps/sdk-react';

  /**
   * Initializes the application and configures its dependencies.
   */
  export function init(debug: boolean): void {

    // Set @telegram-apps/sdk-react debug mode.
    setDebug(debug);

    // Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
    // Also, configure the package.
    initSDK();

    // Mount all components used in the project.
    backButton.isSupported() && backButton.mount();
    console.log(miniApp.mount.isAvailable())
    miniApp.mount().then(() => {
      console.log('ok')
      miniApp.bindCssVars();
    })
    initData.restore();
    void viewport.mount().then(() => {
      viewport.bindCssVars();
    }).catch(e => {
      console.error('Something went wrong mounting the viewport', e);
    });

  }
