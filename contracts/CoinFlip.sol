/*
 * Solidity Contract : CoinFlip
 * Compiler Version  : pragma solidity 0.5.16;
 */

contract CoinFlip {













     

     struct Range_uint8 {
          uint8 minimum;
          uint8 maximum;
     }

     struct Range_uint64 {
          uint64 minimum;
          uint64 maximum;
     }

     struct Settings {
          uint8 cap;
          Range_uint8 buy;
          Range_uint8 bet;
          Range_uint8 sell;
          Range_uint64 token;
     }

     Settings private settings;

     //settings.cap           = 30 tokens;
     //settings.buy.minimum   =  1 tokens;
     //settings.buy.maximum   = 10 tokens;
     //settings.bet.minimum   =  1 tokens;
     //settings.bet.maximum   = 10 tokens;
     //settings.token.minimum =       1000 gwei / 0.000001 ether;
     //settings.token.maximum = 1000000000 gwei / 1.000000 ether;

     struct Owner {
          address wallet;
          uint256 balance;
          uint256 tokens;
          uint256 pool;
     }

     Owner private owner;

     struct Token {
          uint256 rate;
          uint32 balance;

          uint256 win;
          uint256 lose;
     }

     mapping(address => Token) private player;

     uint256 private token_supply;
     uint256 private token_value;

     constructor(uint256 total_tokens) public payable {

          owner.wallet = msg.sender;
          owner.balance = msg.value;
          owner.tokens = total_tokens;
          owner.pool = 0;

          token_supply = total_tokens;
          token_value = owner.balance / token_supply;

          settings.cap           =                 150;
          settings.buy.minimum   =                   1;
          settings.buy.maximum   =                  30;
          settings.bet.minimum   =                   1;
          settings.bet.maximum   =                  15;
          settings.sell.minimum  =                   1;
          settings.sell.maximum  =                  30;
          settings.token.minimum =       1000000000000;
          settings.token.maximum = 5000000000000000000;

     }

     modifier _owner() {
          require(msg.sender == owner.wallet, "Function reserved to contract owner");
          _;
     }

     modifier _player(bool flag) {
          if (flag) require(player[msg.sender].balance >=   1, "Insufficient tokens for this action");
          else require(player[msg.sender].balance == 0, "Cannot action with positive balance");
          _;
     }

     function calculate_token_value() private {
          token_value = (owner.balance / token_supply);
     }

     function isOwner() public view returns(bool) {
          return (owner.wallet == msg.sender);
     }

     function contractOwner() public view returns(address) {
          return (owner.wallet);
     }

     // ------------------------------------------------------------------------------------------------------------------------------------------------------ \\
     // ------------------------------------------------------------------------------------------------------------------------------------------------------ \\
     // ------------------------------------------------------------------------------------------------------------------------------------------------------ \\

     function getSettings() public view returns(uint8, uint8, uint8, uint8, uint8, uint8, uint8, uint64, uint64) {
          return (settings.cap, settings.buy.minimum, settings.buy.maximum, settings.bet.minimum, settings.bet.maximum, settings.sell.minimum, settings.sell.maximum, settings.token.minimum, settings.token.maximum);
     }

     event SettingsUpdate(address owner, string field, uint64 from, uint64 to);

     function _setCapValue(uint8 value) public _owner() {
          uint8 current = settings.cap;
          settings.cap = value;
          emit SettingsUpdate(msg.sender, "cap-value", current, value);
     }

     function _setBuyMinimum(uint8 value) public _owner() {
          require(value > 0, "minimum value cannot be equal to zero");
          require(value < settings.buy.maximum, "minimum value cannot be more than or equal to maximum value");
          uint8 current = settings.buy.minimum; settings.buy.minimum = value;
          emit SettingsUpdate(msg.sender, "buy-minimum", current, value);
     }

     function _setBuyMaximum(uint8 value) public _owner() {
          require(value < 251, "maximum value cannot be more than 250");
          require(value > settings.buy.minimum, "maximum value cannot be less than or equal to minimum value");
          uint8 current = settings.buy.maximum; settings.buy.maximum = value;
          emit SettingsUpdate(msg.sender, "buy-maximum", current, value);
     }

     function _setBetMinimum(uint8 value) public _owner() {
          require(value > 0, "minimum value cannot be equal to zero");
          require(value < settings.bet.maximum, "minimum value cannot be more than or equal to maximum value");
          uint8 current = settings.bet.minimum; settings.bet.minimum = value;
          emit SettingsUpdate(msg.sender, "bet-minimum", current, value);
     }

     function _setBetMaximum(uint8 value) public _owner() {
          require(value < 251, "maximum value cannot be more than 250");
          require(value > settings.bet.minimum, "maximum value cannot be less than or equal to minimum value");
          uint8 current = settings.bet.maximum; settings.bet.maximum = value;
          emit SettingsUpdate(msg.sender, "bet-maximum", current, value);
     }

     function _setSellMinimum(uint8 value) public _owner() {
          require(value > 0, "minimum value cannot be equal to zero");
          require(value < settings.sell.maximum, "minimum value cannot be more than or equal to maximum value");
          uint8 current = settings.sell.minimum; settings.sell.minimum = value;
          emit SettingsUpdate(msg.sender, "sell-minimum", current, value);
     }

     function _setSellMaximum(uint8 value) public _owner() {
          require(value < 251, "maximum value cannot be more than 250");
          require(value > settings.sell.minimum, "maximum value cannot be less than or equal to minimum value");
          uint8 current = settings.sell.maximum; settings.sell.maximum = value;
          emit SettingsUpdate(msg.sender, "buy-maximum", current, value);
     }

     function _setTokenMinimum(uint64 value) public _owner() {
          require(value > 0, "minimum value cannot be equal to zero");
          require(value < settings.token.maximum, "minimum value cannot be more than or equal to maximum value");
          uint64 current = settings.token.minimum; settings.token.minimum = value;
          emit SettingsUpdate(msg.sender, "token-minimum", current, value);
     }

     function _setTokenMaximum(uint64 value) public _owner() {
          require(value < 18000000000000000001, "maximum value cannot be more than 18000000000000000000");
          require(value > settings.token.minimum, "maximum value cannot be less than or equal to minimum value");
          uint64 current = settings.token.maximum; settings.token.maximum = value;
          emit SettingsUpdate(msg.sender, "token-maximum", current, value);
     }

     // ------------------------------------------------------------------------------------------------------------------------------------------------------ \\
     // ------------------------------------------------------------------------------------------------------------------------------------------------------ \\
     // ------------------------------------------------------------------------------------------------------------------------------------------------------ \\

     function getStatistics() public view returns(address, uint256, uint256, uint256, uint256, uint256, uint32, uint256, uint256) {

          //contract.address
          //contract.ethereum

          //contract.token.total
          //contract.token.available

          //contract.token.ethereum

          return (address(this), address(this).balance, token_supply, owner.tokens, token_value, player[msg.sender].rate, player[msg.sender].balance, player[msg.sender].win, player[msg.sender].lose);
     }

     /*function getRandom() private view returns (uint256) {
          uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)));
          return uint16(random / 2 ** (random % 16));
     }*/
     function getRandom() private view returns (uint256) {
          return uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)));
     }

     event Pump(address owner, uint256 eth_amount);
     function pump() public _owner() payable {
          owner.balance += msg.value;
          calculate_token_value();
          emit Pump(msg.sender, msg.value);
     }

     event Buy(address player, uint256 amount);
     function buy(uint16 tokens) public _player(false) payable {
          uint256 eth_amount = tokens * token_value;
          require(owner.tokens >= tokens, "Insufficient token supply");
          require(msg.value >= eth_amount, "Insufficient eth to buy tokens");

          owner.tokens -= tokens;
          owner.balance += eth_amount;
          owner.pool += eth_amount;

          player[msg.sender].rate = token_value;
          player[msg.sender].balance = tokens;

          calculate_token_value();
          emit Buy(msg.sender, tokens);
     }

     function bet_uint32(uint32 values) public _player(true) {
          uint32 count = (values / 2 ** 24);
          require(player[msg.sender].balance <= 100, "Maximum allowed token count reached");
          require(count >= 1, "Cannot bet less than 1 turn"); require(count <= 24, "Cannot bet more than 24 turns");
          require(player[msg.sender].balance >= count, "Insufficient tokens for this action");
          require((owner.balance - owner.pool) >= (player[msg.sender].rate * count), "Insufficient contract funds available");

          uint256 randomize = getRandom();
          uint32 random = uint32(randomize / 2 ** (randomize % 32));
          uint32 result = random ^ (values - (count * 2 ** 24));

          uint32 lost = result & 1;
          for (uint32 i = 1; i < count; i++) {
               if (((result / 2 ** i) & 1) == 1) {
                    ++lost;
               }
          }
          player[msg.sender].win += count - lost;
          player[msg.sender].lose += lost;
          lost *= 2;

          if (lost < count) {
               count = count - lost;
               player[msg.sender].balance += count;
               owner.tokens -= count;
               owner.pool += count * player[msg.sender].rate;
          } else {
               count = lost - count;
               player[msg.sender].balance -= count;
               owner.tokens += count;
               owner.pool -= count * player[msg.sender].rate;
          }

     }

     function bet_uint16(uint16 values) public _player(true) {
          uint16 count = (values / 2 ** 12);
          require(player[msg.sender].balance <= 100, "Maximum allowed token count reached");
          require(count >= 1, "Cannot bet less than 1 turn"); require(count <= 12, "Cannot bet more than 12 turns");
          require(player[msg.sender].balance >= count, "Insufficient tokens for this action");
          require((owner.balance - owner.pool) >= (player[msg.sender].rate * count), "Insufficient contract funds available");

          uint256 randomize = getRandom();
          uint16 random = uint16(randomize / 2 ** (randomize % 16));
          uint16 result = random ^ (values - (count * 2 ** 12));

          uint16 lost = result & 1;
          for (uint16 i = 1; i < count; i++) {
               if (((result / 2 ** i) & 1) == 1) {
                    ++lost;
               }
          }
          player[msg.sender].win += count - lost;
          player[msg.sender].lose += lost;
          lost *= 2;

          if (lost < count) {
               count = count - lost;
               player[msg.sender].balance += count;
               owner.tokens -= count;
               owner.pool += count * player[msg.sender].rate;
          } else {
               count = lost - count;
               player[msg.sender].balance -= count;
               owner.tokens += count;
               owner.pool -= count * player[msg.sender].rate;
          }

     }

     event Sell(address player, uint256 amount);
     function sell(uint16 tokens) public _player(true) {
          uint256 eth_amount = tokens * player[msg.sender].rate;
          require(player[msg.sender].balance >= tokens, "Insufficient token balance");
          require(owner.balance >= eth_amount, "Insufficient contract balance");

          owner.tokens += tokens;
          owner.balance -= eth_amount;
          owner.pool -= eth_amount;

          player[msg.sender].balance -= tokens;
          msg.sender.transfer(eth_amount);

          calculate_token_value();
          emit Sell(msg.sender, tokens);
     }

     event Dump(address owner, uint256 eth_amount);
     function dump(uint256 eth_amount) public _owner() {
          require(address(this).balance >= eth_amount);
          // Cannot dump more than active token value

          // Transfer ether to owner wallet & set rate
          owner.balance -= eth_amount;
          msg.sender.transfer(eth_amount);
          calculate_token_value();

          emit Dump(msg.sender, eth_amount);
     }

}
