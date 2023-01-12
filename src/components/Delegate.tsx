import { Button } from '@chakra-ui/react';

import type { AccountInfo } from '@meshsdk/core';
import { useRewardAddress, useWallet, useWalletTx } from '@meshsdk/react';
import { useEffect, useState } from 'react';

export const Delegate = ({
  poolId,
  onCheck,
}: {
  poolId: string;
  onCheck: any;
}) => {
  const tx = useWalletTx();
  const { wallet } = useWallet();
  const rewardAddress = useRewardAddress();
  const [error, setError] = useState<unknown>();
  const [checking, setChecking] = useState(false);
  const [accountInfo, setAccountInfo] = useState<AccountInfo>();
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const checkAccountStatus = async () => {
    try {
      setChecking(true);

      if (rewardAddress) {
        const info = await onCheck(rewardAddress);
        setAccountInfo(info);
      }

      setChecking(false);
    } catch (error) {
      setError(error);
    }
  };

  // まだステークアドレスが登録されていなくて新しく登録する場合
  const registerAddress = async () => {
    setProcessing(true);
    setDone(false);
    try {
      if (rewardAddress) {
        const unsignedTx = await tx
          .registerStake(rewardAddress)
          .delegateStake(rewardAddress, poolId)
          .build();

        const signedTx = await wallet.signTx(unsignedTx);
        const txHash = await wallet.submitTx(signedTx);
        console.log('txHash', txHash);
        setDone(true);
      }
    } catch (error) {
      console.error('error', error);
      setError(error);
    }
    setProcessing(false);
  };

  // ステークアドレスが登録されている場合
  const delegateStake = async () => {
    setProcessing(true);
    setDone(false);
    try {
      if (rewardAddress) {
        const unsignedTx = await tx
          .delegateStake(rewardAddress, poolId)
          .build();

        const signedTx = await wallet.signTx(unsignedTx);
        const txHash = await wallet.submitTx(signedTx);
        setDone(true);
      }
    } catch (error) {
      console.error('error', error);
      setError(error);
    }
    setProcessing(false);
  };

  useEffect(() => {
    checkAccountStatus();
    console.log(accountInfo);
  }, [rewardAddress]);

  if (checking) {
    return <Button>Checking...</Button>;
  }
  if (processing) {
    return <Button>Loading...</Button>;
  }
  if (done) {
    return <Button>Stake Delegated</Button>;
  }

  if (accountInfo?.active) {
    return accountInfo.poolId === poolId ? (
      <Button>Stake Delegated</Button>
    ) : (
      <Button onClick={delegateStake}>委任する</Button>
    );
  }

  return <Button onClick={delegateStake}>委任する</Button>;
  // return <Button onClick={registerAddress}>ステーキング登録をする</Button>;
};
