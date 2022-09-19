import ethers from "ethers";
import erc20 from "./contracts/Ruble.json";

const ownerPrivateKey =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const producerPrivateKey =
  "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

class Answer {
  constructor(answer) {
    this.answer = answer;
  }
}

class Postcontroller {
  async JsonParse(req, res) {
    try {
      // PREPARING
      const provider = new ethers.providers.JsonRpcProvider();
      ethers.Wallet.provider = provider;
      let owner = new ethers.Wallet(ownerPrivateKey, provider);
      let producer = new ethers.Wallet(producerPrivateKey, provider);

      const Ruble = new ethers.Contract(contractAddress, erc20.abi, provider);

      const RubleByOwner = Ruble.connect(owner);
      const RubleByProducer = Ruble.connect(producer);

      // LOGIC
      let answerBody;
      let request = req.body;

      if (request.account == "producer") {
        answerBody = "producer";
      }

      // ANSWER

      let answer = new Answer(answerBody);
      res.status(200).json(answer);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new Postcontroller();
