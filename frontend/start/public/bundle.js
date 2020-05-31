const simpleStorageABI = [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "last_completed_migration",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "completed",
          "type": "uint256"
        }
      ],
      "name": "setCompleted",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "new_address",
          "type": "address"
        }
      ],
      "name": "upgrade",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
const simpleStorageAddress = '0x583e52F0bBa71d5C4979878547eDC68Bd0BF8414';
const web3 = new Web3('http://localhost:9545');
const simpleStorage = new web3.eth.Contract(simpleStorageABI, simpleStorageAddress);

document.addEventListener('DOMContentLoaded', () => {
    const $setData = document.getElementById('setData');
    const $data = document.getElementById('data');

    web3.eth.getAccounts()
        .then(_accounts => {
            accounts = _accounts;
        });

    const getData = () => {
        simpleStorage.methods
            .get()
            .call()
            .then(result => {
                $data.innerHTML = results;
            });
    };
    getData();

    $setData.addEventListener('submit', e => {
        e.preventDefault();
        const data = e.target.elements[0].value;
        simpleStorage.methods
            .set(data)
            .send({from: accounts[0]})
            .then(getData);
    })
});
