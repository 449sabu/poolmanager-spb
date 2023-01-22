
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
} from '@chakra-ui/react';

import type { AccountInfo } from '@meshsdk/core';
import {
  useRewardAddress,
  useWallet,
  useWalletList,
  useWalletTx,
} from '@meshsdk/react';
import { useEffect, useState } from 'react';

const StakeButton = ({
  poolId,
  onCheck,
  content,
}: {
  poolId: string;
  onCheck: any;
  content: Content;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const wallets = useWalletList();
  const [hideMenuList, setHideMenuList] = useState(true);
  const { connect, connecting, connected, name } = useWallet();

  return (
    <div
      onMouseEnter={() => setHideMenuList(false)}
      onMouseLeave={() => setHideMenuList(true)}
    >
      <Button
        onClick={onOpen}
        colorScheme={`${content.theme}`}
        bg={`${content.theme}.400`}
        rounded={'md'}
        px={6}
        _hover={{
          bg: `${content.theme}.500`,
        }}
      >
        委任する
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>step 1</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {connected
                  ? name
                  : connecting
                  ? '接続中・・'
                  : 'ウォレットを接続する'}
              </MenuButton>
              <MenuList>
                {wallets.length > 0 ? (
                  wallets.map((wallet, index) => (
                    <MenuItem
                      minH="48px"
                      key={index}
                      onClick={() => {
                        connect(wallet.name);
                      }}
                    >
                      <Image
                        boxSize="2rem"
                        // borderRadius="full"
                        src={wallet.icon}
                        alt="Fluffybuns the destroyer"
                        mr="12px"
                      />
                      <span>{wallet.name}</span>
                    </MenuItem>
                  ))
                ) : (
                  <span>接続可能なウォレットがありません🙏</span>
                )}
              </MenuList>
            </Menu>
          </ModalBody>
          <ModalHeader>step 2</ModalHeader>
          <ModalBody>
            {}
            {connected ? (
              <Delegate poolId={poolId} onCheck={onCheck} content={content} />
            ) : connecting ? (
              <Button
                disabled={!connected}
                colorScheme={`${content.theme}`}
                bg={`${content.theme}.400`}
                rounded={'md'}
                px={6}
                _hover={{
                  bg: `${content.theme}.500`,
                }}
              >
                ...
              </Button>
            ) : (
              <Button
                disabled={!connected}
                colorScheme={`${content.theme}`}
                bg={`${content.theme}.400`}
                rounded={'md'}
                px={6}
                _hover={{
                  bg: `${content.theme}.500`,
                }}
              >
                ステーキングする
              </Button>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default StakeButton;

const Delegate = ({
  poolId,
  onCheck,
  content,
}: {
  poolId: string;
  onCheck: any;
  content: Content;
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
    console.log(accountInfo?.active);
  }, [rewardAddress]);

  if (checking) {
    return (
      <Button
        disabled={true}
        colorScheme={`${content.theme}`}
        bg={`${content.theme}.400`}
        rounded={'md'}
        px={6}
        _hover={{
          bg: `${content.theme}.500`,
        }}
      >
        Checking...
      </Button>
    );
    // return <span>Checking...</span>;
  }
  if (processing) {
    return (
      <Button
        disabled={true}
        colorScheme={`${content.theme}`}
        bg={`${content.theme}.400`}
        rounded={'md'}
        px={6}
        _hover={{
          bg: `${content.theme}.500`,
        }}
      >
        Loading...
      </Button>
    );
    // return <span>Loading...</span>;
  }
  if (done) {
    return (
      <Button
        disabled={true}
        colorScheme={`${content.theme}`}
        bg={`${content.theme}.400`}
        rounded={'md'}
        px={6}
        _hover={{
          bg: `${content.theme}.500`,
        }}
      >
        委任済み
      </Button>
    );
    // return <span>Stake Delegated</span>;
  }

  if (accountInfo?.active) {
    return accountInfo.poolId === poolId ? (
      <Button
        disabled={true}
        colorScheme={`${content.theme}`}
        bg={`${content.theme}.400`}
        rounded={'md'}
        px={6}
        _hover={{
          bg: `${content.theme}.500`,
        }}
      >
        既に委任しています。
      </Button>
    ) : (
      // <span>Stake Delegated</span>
      <Button
        onClick={delegateStake}
        colorScheme={`${content.theme}`}
        bg={`${content.theme}.400`}
        rounded={'md'}
        px={6}
        _hover={{
          bg: `${content.theme}.500`,
        }}
      >
        委任する
      </Button>
    );
  }

  return (
    <Button
      onClick={registerAddress}
      colorScheme={`${content.theme}`}
      bg={`${content.theme}.400`}
      rounded={'md'}
      px={6}
      _hover={{
        bg: `${content.theme}.500`,
      }}
    >
      新しく委任する
    </Button>
  );
  // return <span onClick={registerAddress}>Register Address</span>;
};
