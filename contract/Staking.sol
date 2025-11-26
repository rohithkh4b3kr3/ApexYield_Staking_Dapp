// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Staking is ReentrancyGuard {
    using SafeMath for uint256;

    IERC20 public s_stakingToken;
    IERC20 public s_rewardToken;

    uint256 public constant REWARD_RATE = 1e18;   // reward rate per second (scaled)
    uint256 private totalStakedTokens;
    uint256 public rewardPerTokenStored;
    uint256 public lastUpdateTime;

    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public rewards;
    mapping(address => uint256) public userRewardPerTokenPaid;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);

    constructor(address stakingToken, address rewardToken) {
        s_stakingToken = IERC20(stakingToken);
        s_rewardToken = IERC20(rewardToken);
        lastUpdateTime = block.timestamp;
    }

    // ================= VIEW FUNCTIONS =================

    function rewardPerToken() public view returns(uint256) {
        if (totalStakedTokens == 0) {
            return rewardPerTokenStored;
        }

        uint256 timePassed = block.timestamp.sub(lastUpdateTime);
        uint256 totalRewards = timePassed.mul(REWARD_RATE);

        return rewardPerTokenStored.add(totalRewards.mul(1e18).div(totalStakedTokens));
    }

    function earned(address account) public view returns(uint256) {
        return stakedBalance[account]
            .mul(rewardPerToken().sub(userRewardPerTokenPaid[account]))
            .div(1e18)
            .add(rewards[account]);
    }

    // ================= MODIFIER =================

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;

        rewards[account] = earned(account);
        userRewardPerTokenPaid[account] = rewardPerTokenStored;
        _;
    }

    // ================= USER FUNCTIONS =================

    function stake(uint256 amount) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Amount must be greater than zero");

        totalStakedTokens = totalStakedTokens.add(amount);
        stakedBalance[msg.sender] = stakedBalance[msg.sender].add(amount);

        emit Staked(msg.sender, amount);

        bool success = s_stakingToken.transferFrom(msg.sender, address(this), amount);
        require(success, "Transfer failed");
    }

    function withdrawStakedTokens(uint256 amount) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Amount must be greater than zero");
        require(stakedBalance[msg.sender] >= amount, "Not enough staked tokens");

        totalStakedTokens = totalStakedTokens.sub(amount);
        stakedBalance[msg.sender] = stakedBalance[msg.sender].sub(amount);

        emit Withdrawn(msg.sender, amount);

        bool success = s_stakingToken.transfer(msg.sender, amount);
        require(success, "Transfer failed");
    }

    function getReward() external nonReentrant updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        require(reward > 0, "No rewards available");

        rewards[msg.sender] = 0;

        emit RewardsClaimed(msg.sender, reward);

        bool success = s_rewardToken.transfer(msg.sender, reward);
        require(success, "Reward transfer failed");
    }
}
