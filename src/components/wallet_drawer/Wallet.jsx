import React, {useState} from 'react';
import {Stack} from '@chakra-ui/react';
import MobileWalletHeader from './mobile_w_header';
import WalletContent from './wallet_content';
import DepositWallet from './deposit';
import WithdrawalWallet from './withdrawal';
import {drawer_styles} from '../navbar/Navbar';
import {ResponsivePopup, ResponsivePopupContent} from '@/ui-lib';

export const Wallet = ({isWalOpen, onWalClose, avatar, onDrawerOpen}) => {
  const [page, setPage] = useState('wallet');
  const [step, setStep] = useState('method');
  return (
    <ResponsivePopup
      onCloseComplete={() => setPage('wallet')}
      blockScrollOnMount={true}
      isOpen={isWalOpen}
      onClose={onWalClose}
      placement="right"
    >
      <ResponsivePopupContent {...drawer_styles}>
        <MobileWalletHeader
          onDrawerClose={onWalClose}
          step={step}
          setPage={setPage}
          setStep={setStep}
          activePage={page}
          onDrawerOpen={onDrawerOpen}
        />
        <Stack gap={`0px`} flex={`1`} overflowY={`auto`}>
          {page === 'wallet' && (
            <WalletContent avatar={avatar} setPage={setPage} onWalClose={onWalClose} />
          )}
          {page === 'deposit' && (
            <DepositWallet
              step={step}
              setStep={setStep}
              setPage={setPage}
              onWalClose={onWalClose}
            />
          )}
          {page === 'withdrawal' && <WithdrawalWallet setPage={setPage} onWalClose={onWalClose} />}
        </Stack>
      </ResponsivePopupContent>
    </ResponsivePopup>
  );
};

export default Wallet;
