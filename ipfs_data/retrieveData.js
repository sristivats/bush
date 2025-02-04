const { ethers } = require("ethers");
require("dotenv").config();
const fs = require("fs");

// Connect to Ethereum Sepolia Testnet
const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

// Contract details
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "verifier",
          "type": "address"
        }
      ],
      "name": "HashStored",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "storeHash",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "getVerifier",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "hashToVerifier",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

async function fetchHash() {
  try {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

    // Replace with the IPFS hash you stored
    const storedHash = "Qme8pe7yZNgBAMjs12RCy4ydSEdFrANZVmDMuFQqKCXyUg";

    // Retrieve verifier address for the hash
    const verifierAddress = await contract.getVerifier(storedHash);
    console.log("Verifier Address:", verifierAddress);

    // Save the retrieved hash and verifier address to a JSON file
    const data = {
      ipfsHash: storedHash,
      verifier: verifierAddress
    };

    fs.writeFileSync("retrieved_hash.json", JSON.stringify(data, null, 2));
    console.log("Hash stored in retrieved_hash.json");
  } catch (error) {
    console.error("Error fetching hash:", error);
  }
}

fetchHash();
