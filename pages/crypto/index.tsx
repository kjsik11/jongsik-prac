/* global BigInt */

import classNames from 'classnames';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@components/ui';

import simple_token_abi from '../../public/simple_token_abi.json';

export default function Bitcoin() {
  const router = useRouter();

  const [receiverAddress, setReceiverAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [transferHash, setTransferHash] = useState('');

  const [balance, setBalance] = useState(0);
  const [tokenName, setTokenName] = useState('');

  const [contract, setContract] = useState<any | null>(null);
  const [address, setAddress] = useState('');
  const [err, setErr] = useState('');

  const accountChangeHandler = useCallback((address) => {
    setAddress(address);

    const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    const tempSigner = tempProvider.getSigner();
    if (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
      const tempContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        simple_token_abi,
        tempSigner,
      );
      setContract(tempContract);
    }
    setTokenName('');
  }, []);

  const handleConnectMetamask = useCallback(() => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result: string[]) => {
          if (result.length > 0) accountChangeHandler(result[0]);
          else setErr('No result');
        })
        .catch((err: Error) => setErr(err.message));
    } else {
      window.alert('need to install metamask first');
    }
  }, [accountChangeHandler]);

  const handleTransfer = useCallback(async () => {
    if (!contract || loading) return;

    setLoading(true);
    contract
      .decimals()
      .then((decimal: number) => {
        (
          contract.transfer(receiverAddress, BigInt(amount * Math.pow(10, decimal))) as Promise<any>
        ).then(({ hash }) => {
          setTransferHash(hash);
          setReceiverAddress('');
          setAmount(0);
        });
      })
      .catch((e: any) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [contract, receiverAddress, amount, loading]);

  useEffect(() => {
    if (contract) {
      contract.name().then((name: string) => setTokenName(name));
      contract.balanceOf(address).then(({ _hex }: { _hex: string }) => {
        const balanceNum = Number(_hex);
        contract.decimals().then((decimal: number) => {
          setBalance(balanceNum / Math.pow(10, decimal));
        });
      });
    }
  }, [contract, address]);

  if (err)
    return (
      <div className="flex flex-col items-center pt-20">
        <p>{err}</p>
        <Button onClick={() => router.reload()}>Refresh</Button>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto pt-20 px-2 space-y-8">
      <div className="border rounded-md p-4">
        {address && (
          <>
            <p className="font-bold text-2xl pb-4">{tokenName}</p>
            <p>
              Your Address: <span className="text-blue-500 font-semibold">{address}</span>
            </p>
            <p></p>
            <p>
              Your Balance: <span className="text-blue-500 font-semibold">{balance}</span>
            </p>
          </>
        )}
        <div className={classNames('flex justify-end', { 'pt-20': !address })}>
          <Button disabled={Boolean(address)} onClick={handleConnectMetamask}>
            {!address ? 'Connect To Metamask' : 'Connected'}
          </Button>
        </div>
      </div>
      {address && contract && (
        <div className="border rounded-md p-4">
          <p className="font-semibold text-xl">Interaction Card</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTransfer();
            }}
            className="mt-4 space-y-2"
          >
            <label className="block font-semibold text-sm">Receiver Address</label>
            <input
              className="border rounded-md py-1 px-4 border-gray-400 w-80"
              onChange={(e) => setReceiverAddress(e.target.value)}
              value={receiverAddress}
            />
            <label className="block font-semibold text-sm">Amount</label>
            <input
              max={balance || 0}
              min={1}
              type="number"
              className="border rounded-md py-1 px-4 border-gray-400 w-80"
              onChange={(e) => setAmount(Number(e.target.value))}
              value={amount}
            />
            <div className="flex justify-end">
              <Button disabled={!receiverAddress || !amount}>Submit</Button>
            </div>
          </form>
          {transferHash && (
            <p className="pt-4">
              Transfer Hash:<span className="text-blue-500 font-semibold">{transferHash}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
