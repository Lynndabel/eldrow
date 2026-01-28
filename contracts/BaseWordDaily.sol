// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract BaseWordDaily is Ownable {
    mapping(uint256 => bytes32) public dailyWordHash;

    event DailyWordCommitted(uint256 indexed day, bytes32 wordHash);

    function commitDailyWord(
        uint256 day,
        bytes32 wordHash
    ) external onlyOwner {
        require(dailyWordHash[day] == bytes32(0), "Daily word already committed");
        dailyWordHash[day] = wordHash;
        emit DailyWordCommitted(day, wordHash);
    }

    function verifyWord(
        uint256 day,
        string calldata word
    ) external view returns (bool) {
        bytes32 committed = dailyWordHash[day];
        if (committed == bytes32(0)) {
            return false;
        }
        return committed == keccak256(abi.encodePacked(word));
    }
}
