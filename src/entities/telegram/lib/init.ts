'use client'

import {
    backButton,
    viewport,
    themeParams,
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
    miniApp.mount();
    initData.restore();
    void viewport.mount().then(() => {
      viewport.bindCssVars();
      miniApp.bindCssVars();
      themeParams.bindCssVars();
    }).catch(e => {
      console.error('Something went wrong mounting the viewport', e);
    });
  }
