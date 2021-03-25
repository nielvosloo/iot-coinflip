/*
 * Solidity Contract : CoinFlip
 * Compiler Version  : pragma solidity 0.5.16;
 */
pragma solidity 0.5.16;

contract CoinFlip {

     struct Owner {
          address wallet;
          uint256 balance;
     }

     Owner private owner;

     constructor() public payable {
          owner.wallet = msg.sender;
          owner.balance = msg.value;
     }

     modifier _owner(bool flag) {
          if (flag) require(msg.sender == owner.wallet, "Function reserved to contract owner");
               else require(msg.sender != owner.wallet, "Function reserved to players only");
          _;
     }

     function contractOwner() public view returns(address) {
          return (owner.wallet);
     }

     event Deposit(address owner, uint256 amount);
     function deposit() public payable _owner(true) {
          owner.balance += msg.value;
          emit Deposit(msg.sender, msg.value);
     }

     event Withdraw(address owner, uint256 amount);
     function withdraw(uint256 amount) public _owner(true) {
          require(owner.balance >= amount, "Insufficient contract balance");
          owner.balance -= amount;
          msg.sender.transfer(amount);
          emit Withdraw(msg.sender, amount);
     }







     event FlipCoin(address player, uint256 amount, bool win, uint8 inp, uint8 rand, uint8 res, uint8 count);
     function flipCoin(uint8 values) public payable _owner(false) returns (bool) {
          require(owner.balance >= msg.value, "Insufficient contract balance");
          uint256 randomize = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)));
          uint8 random_bits = (uint8)(randomize); uint8 win_count = 0;

          uint8 result = (random_bits & values);




          for (uint8 i = 0; i <= 7; ++i) {

               //if ((result & (1 << i)) == 1) {
               if (((result / 2**i) & 1) == 1) {
                    ++win_count;
               }
          }

          bool flag = (win_count > (7 - win_count));
          if (flag) {
               owner.balance -= msg.value;
               msg.sender.transfer(msg.value * 2);
          } else {
               owner.balance += msg.value;
          }

          emit FlipCoin(msg.sender, msg.value, flag, values, random_bits, result, win_count);
          return flag;
     }

}
