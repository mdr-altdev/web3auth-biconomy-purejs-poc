const rpc = (() => {
  /**
   *
   * @param {*} provider - provider received from Web3Auth login.
   */

  const getChainId = async provider => {
    const web3 = new Web3(provider)

    // Get the connected Chain's ID
    const chainId = await web3.eth.getChainId()

    return chainId.toString()
  }

  const getAccounts = async provider => {
    const web3 = new Web3(provider)

    // Get user's Ethereum public address
    const address = (await web3.eth.getAccounts())[0]

    return address
  }

  const getBalance = async provider => {
    const web3 = new Web3(provider)

    // Get user's Ethereum public address
    const address = (await web3.eth.getAccounts())[0]

    // Get user's balance in ether
    const balance = web3.utils.fromWei(
      await web3.eth.getBalance(address), // Balance is in wei
    )

    return balance
  }

  const sendTransaction = async provider => {
    try {
      const web3 = new Web3(provider)
      const accounts = await web3.eth.getAccounts()

      const txRes = await web3.eth.sendTransaction({
        from: accounts[0],
        to: accounts[0],
        value: web3.utils.toWei('0.0000001'),
      })
      return txRes.transactionHash
    } catch (error) {
      return error.toString()
    }
  }

  const signMessage = async provider => {
    const web3 = new Web3(provider)

    // Get user's Ethereum public address
    const fromAddress = (await web3.eth.getAccounts())[0]

    const originalMessage = 'YOUR_MESSAGE'

    // Sign the message
    const signedMessage = await web3.eth.personal.sign(
      originalMessage,
      fromAddress,
    )

    return signedMessage
  }

  const getPrivateKey = async provider => {
    const privateKey = await provider.request({
      method: 'eth_private_key',
    })

    return privateKey
  }

  const readContract = async provider => {
    if (!provider) {
      console.error('provider not initialized yet')
      return
    }
    const web3 = new Web3(provider)
    const contractABI =
      '[ { "inputs": [ { "internalType": "string", "name": "initMessage", "type": "string" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [ { "internalType": "string", "name": "newMessage", "type": "string" } ], "name": "update", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "message", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" } ]'
    const contractAddress = '0x3888B4606F9f12eE2e92f04Bb0398172BB91765d'
    const contract = new web3.eth.Contract(
      JSON.parse(contractABI),
      contractAddress,
    )
    // Read message from smart contract
    const message = await contract.methods.message().call()
    return message
  }

  const writeContract = async provider => {
    if (!provider) {
      console.error('provider not initialized yet')
      return
    }
    const web3 = provider
    const fromAddress = (await web3.eth.getAccounts())[0]

    const contractABI =
      '[ { "inputs": [ { "internalType": "string", "name": "initMessage", "type": "string" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [ { "internalType": "string", "name": "newMessage", "type": "string" } ], "name": "update", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "message", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" } ]'
    const contractAddress = '0x3888B4606F9f12eE2e92f04Bb0398172BB91765d'
    const contract = new web3.eth.Contract(
      JSON.parse(contractABI),
      contractAddress,
    )
    // Send transaction to smart contract to update message and wait to finish
    const receipt = await contract.methods
      .update('Journey to Web3Auth begins.')
      .send({
        from: fromAddress,
      })
    return receipt
  }

  const mintNft = async provider => {
    console.log(provider)
    if (!provider) {
      console.error('provider not initialized yet')
      return
    }
    const web3 = provider

    // const fromAddress = (await web3.eth.getAccounts())[0]

    const contractABI =
      '[{"inputs":[{"internalType":"address","name":"_trustedForwarder","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"safeMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"trustedForwarder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]'
    const contractAddress = '0x124B49bE6FE61AF652dfBAC8F5E3E583c6d5DA3F'
    
    const contract = new web3.eth.Contract(JSON.parse(contractABI), contractAddress)
    const selfAddress = (await web3.eth.getAccounts())[0]
    const receipt = await contract.methods.safeMint(selfAddress).send({
      from: selfAddress,
    })
    return receipt
  }

  return {
    getChainId,
    getAccounts,
    getBalance,
    sendTransaction,
    signMessage,
    getPrivateKey,
    readContract,
    writeContract,
    mintNft,
  }
})()
