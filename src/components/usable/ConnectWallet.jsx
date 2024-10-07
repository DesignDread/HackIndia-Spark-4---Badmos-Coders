import { Button } from '../ui/button';
import { useEffect, useState, useContext } from "react";
import { ContractContext } from "../../context";

const ConnectWallet = () => {
    const { connectWallet: contextConnectWallet, currentAccount, setCurrentAccount } = useContext(ContractContext);
    const [walletAddress, setWalletAddress] = useState(currentAccount || "");

    useEffect(() => {
        if (!walletAddress) {
            getCurrentWalletConnected();
        }
        addWalletListener();
    }, []);

    const connectWallet = async () => {
        const accounts = await contextConnectWallet(); // Use the context's connectWallet function
        if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setCurrentAccount(accounts[0]); // Update context state
            console.log(accounts[0]);
        }
    };

    const getCurrentWalletConnected = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_accounts",
                });
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                    setCurrentAccount(accounts[0]); // Update context state
                    console.log(accounts[0]);
                } else {
                    console.log("Connect to MetaMask using the Connect button");
                }
            } catch (err) {
                console.error(err.message);
            }
        } else {
            console.log("Please install MetaMask");
        }
    };

    const addWalletListener = () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                    setCurrentAccount(accounts[0]); // Update context state
                    console.log(accounts[0]);
                } else {
                    setWalletAddress("");
                    setCurrentAccount(""); // Clear context state
                    console.log("Please connect to MetaMask");
                }
            });
        } else {
            setWalletAddress("");
            console.log("Please install MetaMask");
        }
    };

    return (
        <>
            <Button onClick={connectWallet} variant="secondary" size="default">
                {walletAddress && walletAddress.length > 0
                    ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`
                    : "Connect Wallet"}
            </Button>
        </>
    );
}

export default ConnectWallet;
