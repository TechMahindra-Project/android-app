import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  Dimensions,
  Alert,
  Image,
  PanResponder,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const RewardsScreen = ({ navigation }) => {
  const theme = useContext(ThemeContext);
  const [userPoints, setUserPoints] = useState(500);
  const [claimedRewards, setClaimedRewards] = useState([]);
  const [streak, setStreak] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [scratchCardRevealed, setScratchCardRevealed] = useState(false);
  const [scratchCardWon, setScratchCardWon] = useState(null);
  const [slotMachineSpinning, setSlotMachineSpinning] = useState(false);
  const [slotResult, setSlotResult] = useState([0, 0, 0, 0]);

  // Available rewards
  const rewards = [
    {
      id: 1,
      name: '5% Discount',
      description: 'Get 5% off on your next PG booking',
      points: 500,
      icon: 'local-offer',
      color: '#4CAF50',
    },
    {
      id: 2,
      name: 'Free Laundry',
      description: '1 free laundry service this month',
      points: 300,
      icon: 'local-laundry-service',
      color: '#2196F3',
    },
    {
      id: 3,
      name: 'Room Upgrade',
      description: 'Upgrade to a better room for 3 days',
      points: 800,
      icon: 'king-bed',
      color: '#FF9800',
    },
    {
      id: 4,
      name: 'Food Coupon',
      description: 'Free meal from the PG kitchen',
      points: 200,
      icon: 'restaurant',
      color: '#E91E63',
    },
  ];

  // Daily check-in rewards
  const dailyRewards = [
    { day: 1, points: 50, claimed: false },
    { day: 2, points: 75, claimed: false },
    { day: 3, points: 100, claimed: false },
    { day: 4, points: 125, claimed: false },
    { day: 5, points: 150, claimed: false },
    { day: 6, points: 200, claimed: false },
    { day: 7, points: 300, claimed: false },
  ];

  // Quiz questions
  const quizQuestions = [
    {
      question: "What's the minimum notice period for PG booking cancellation?",
      options: ["24 hours", "3 days", "1 week", "1 month"],
      answer: 2
    },
    {
      question: "Which facility is usually NOT included in PG rent?",
      options: ["Electricity", "WiFi", "Laundry", "Gym"],
      answer: 3
    }
  ];

  // Scratch card prizes
  const scratchPrizes = [
    { id: 1, value: '50 points', points: 50, color: '#FFD700' },
    { id: 2, value: '100 points', points: 100, color: '#FF9800' },
    { id: 3, value: '5% Discount', points: 0, color: '#4CAF50' },
    { id: 4, value: 'Try Again', points: 0, color: '#9E9E9E' },
    { id: 5, value: '200 points', points: 200, color: '#2196F3' },
  ];

  // Slot machine symbols
  const slotSymbols = [
    { id: 0, icon: 'star', color: '#FFD700' },
    { id: 1, icon: 'local-offer', color: '#4CAF50' },
    { id: 2, icon: 'attach-money', color: '#2196F3' },
    { id: 3, icon: 'favorite', color: '#E91E63' },
    { id: 4, icon: 'whatshot', color: '#FF9800' },
  ];

  // Initialize pan responder for scratch card
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (!scratchCardRevealed) {
        setScratchCardRevealed(true);
        revealScratchCard();
      }
    },
  });

  const revealScratchCard = () => {
    if (userPoints < 50) {
      Alert.alert('Not enough points', 'You need at least 50 points to play scratch card!');
      return;
    }

    setUserPoints(userPoints - 50);
    
    // Random prize
    const randomPrize = scratchPrizes[Math.floor(Math.random() * scratchPrizes.length)];
    setScratchCardWon(randomPrize);
    
    if (randomPrize.points > 0) {
      setTimeout(() => {
        setUserPoints(prev => prev + randomPrize.points);
        Alert.alert('Congratulations!', `You won ${randomPrize.value}!`);
      }, 1000);
    } else if (randomPrize.value.includes('Discount')) {
      const discountReward = rewards.find(r => r.name.includes('Discount'));
      setTimeout(() => {
        Alert.alert('Congratulations!', `You won a ${discountReward.name}!`);
        setClaimedRewards([...claimedRewards, discountReward]);
      }, 1000);
    }
  };

  const playSlotMachine = () => {
    if (userPoints < 75) {
      Alert.alert('Not enough points', 'You need at least 75 points to play slot machine!');
      return;
    }

    setUserPoints(userPoints - 75);
    setSlotMachineSpinning(true);
    
    // Spin animation
    const spinDuration = 3000;
    const spins = [0, 0, 0, 0].map(() => Math.floor(Math.random() * slotSymbols.length));
    
    // Animate each slot
    const spinInterval = setInterval(() => {
      setSlotResult([
        Math.floor(Math.random() * slotSymbols.length),
        Math.floor(Math.random() * slotSymbols.length),
        Math.floor(Math.random() * slotSymbols.length),
        Math.floor(Math.random() * slotSymbols.length)
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(spinInterval);
      setSlotResult(spins);
      setSlotMachineSpinning(false);
      checkSlotResult(spins);
    }, spinDuration);
  };

  const checkSlotResult = (result) => {
    // Check for jackpot (all same)
    if (result[0] === result[1] && result[1] === result[2] && result[2] === result[3]) {
      const prize = 500;
      setUserPoints(prev => prev + prize);
      Alert.alert( `You won ${prize} points!`);
      return;
    }
    
    Alert.alert('Try Again!', 'Better luck next time!');
  };

  const claimReward = (reward) => {
    if (userPoints < reward.points) {
      Alert.alert('Not enough points', `You need ${reward.points} points to claim this reward!`);
      return;
    }
    
    setUserPoints(userPoints - reward.points);
    setClaimedRewards([...claimedRewards, reward]);
    Alert.alert('Congratulations!', `You've claimed ${reward.name}`);
  };

  const claimDailyReward = (day) => {
    const reward = dailyRewards.find(d => d.day === day);
    setUserPoints(userPoints + reward.points);
    setStreak(streak + 1);
    Alert.alert('Daily Reward', `You claimed ${reward.points} points for day ${day}!`);
  };

  const completeQuiz = () => {
    setUserPoints(userPoints + 500);
    setQuizCompleted(true);
    Alert.alert('Quiz Completed!', 'You earned 500 points!');
  };

  const resetScratchCard = () => {
    setScratchCardRevealed(false);
    setScratchCardWon(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Points Display */}
        <View style={[styles.pointsContainer, { backgroundColor: theme.colors.card }]}>
          <View style={styles.pointsHeader}>
            <MaterialIcons name="stars" size={24} color="#FFD700" />
            <Text style={[styles.pointsTitle, { color: theme.colors.text }]}>Your Points</Text>
          </View>
          <Text style={styles.pointsValue}>{userPoints}</Text>
          <View style={styles.streakContainer}>
            <MaterialIcons name="whatshot" size={20} color="#FF5722" />
            <Text style={[styles.streakText, { color: theme.colors.text }]}>
              {streak}-day streak
            </Text>
          </View>
        </View>

        {/* Scratch Card Game */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Scratch & Win</Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.text }]}>
            Spend 50 points to reveal your prize
          </Text>
          
          <View style={styles.scratchCardContainer}>
            <View style={[styles.scratchCard, { backgroundColor: theme.colors.card }]}>
              {!scratchCardRevealed ? (
                <View 
                  style={[styles.scratchCardCover, { backgroundColor: '#9E9E9E' }]}
                  {...panResponder.panHandlers}>
                  <MaterialIcons name="gesture" size={40} color="white" />
                  <Text style={styles.scratchCardCoverText}>Scratch to reveal</Text>
                </View>
              ) : (
                <View style={[styles.scratchCardRevealed, { backgroundColor: scratchCardWon?.color || '#4CAF50' }]}>
                  <Text style={styles.scratchCardPrize}>{scratchCardWon?.value || 'Try Again'}</Text>
                  <MaterialIcons 
                    name={scratchCardWon?.value.includes('Discount') ? 'local-offer' : 'stars'} 
                    size={40} 
                    color="white" 
                  />
                </View>
              )}
            </View>
            
            {scratchCardRevealed && (
              <TouchableOpacity 
                style={styles.playAgainButton}
                onPress={resetScratchCard}>
                <Text style={styles.playAgainText}>PLAY AGAIN (50 pts)</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Slot Machine Game */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Slot Machine</Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.text }]}>
            Spend 75 points for a chance to win big!
          </Text>
          
          <View style={[styles.slotMachine, { backgroundColor: theme.colors.card }]}>
            <View style={styles.slotsContainer}>
              {slotResult.map((symbol, index) => (
                <View key={index} style={[styles.slot, { backgroundColor: theme.colors.background }]}>
                  <MaterialIcons 
                    name={slotSymbols[symbol].icon} 
                    size={40} 
                    color={slotSymbols[symbol].color} 
                  />
                </View>
              ))}
            </View>
            
            <TouchableOpacity 
              style={[styles.spinButton, slotMachineSpinning && styles.disabledButton]}
              onPress={playSlotMachine}
              disabled={slotMachineSpinning}>
              <Text style={styles.spinButtonText}>
                {slotMachineSpinning ? 'SPINNING...' : 'SPIN (75 pts)'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily Check-In */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Daily Check-In</Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.text }]}>
            Check in daily to earn bonus points
          </Text>
          
          <View style={styles.dailyRewardsContainer}>
            {dailyRewards.map((dayReward) => (
              <TouchableOpacity
                key={dayReward.day}
                style={[
                  styles.dayReward,
                  dayReward.claimed && styles.dayRewardClaimed,
                  { backgroundColor: theme.colors.card }
                ]}
                onPress={() => !dayReward.claimed && claimDailyReward(dayReward.day)}
                disabled={dayReward.claimed}>
                <Text style={[styles.dayText, { color: theme.colors.text }]}>Day {dayReward.day}</Text>
                <MaterialIcons 
                  name={dayReward.claimed ? "check-circle" : "lock"} 
                  size={24} 
                  color={dayReward.claimed ? "#4CAF50" : "#9E9E9E"} 
                />
                <Text style={[styles.dayPoints, { color: theme.colors.text }]}>{dayReward.points} pts</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>


        {/* Available Rewards */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Available Rewards</Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.text }]}>
            Redeem your points for exclusive benefits
          </Text>
          
          <View style={styles.rewardsGrid}>
            {rewards.map((reward) => (
              <TouchableOpacity
                key={reward.id}
                style={[styles.rewardCard, { backgroundColor: theme.colors.card }]}
                onPress={() => claimReward(reward)}>
                <View style={[styles.rewardIconContainer, { backgroundColor: reward.color }]}>
                  <MaterialIcons name={reward.icon} size={24} color="white" />
                </View>
                <Text style={[styles.rewardName, { color: theme.colors.text }]}>{reward.name}</Text>
                <Text style={[styles.rewardDesc, { color: theme.colors.text }]}>{reward.description}</Text>
                <View style={styles.rewardPoints}>
                  <MaterialIcons name="stars" size={16} color="#FFD700" />
                  <Text style={styles.rewardPointsText}>{reward.points} pts</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Claimed Rewards */}
        {claimedRewards.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Your Rewards</Text>
            <View style={styles.claimedRewardsContainer}>
              {claimedRewards.map((reward, index) => (
                <View key={index} style={[styles.claimedReward, { backgroundColor: theme.colors.card }]}>
                  <View style={[styles.claimedRewardIcon, { backgroundColor: reward.color }]}>
                    <MaterialIcons name={reward.icon} size={20} color="white" />
                  </View>
                  <View style={styles.claimedRewardInfo}>
                    <Text style={[styles.claimedRewardName, { color: theme.colors.text }]}>{reward.name}</Text>
                    <Text style={[styles.claimedRewardDesc, { color: theme.colors.text }]}>{reward.description}</Text>
                  </View>
                  <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  pointsContainer: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  pointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pointsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  pointsValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD700',
    marginVertical: 4,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  streakText: {
    marginLeft: 6,
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 16,
  },
  scratchCardContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  scratchCard: {
    width: width * 0.8,
    height: width * 0.5,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  scratchCardCover: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scratchCardCoverText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  scratchCardRevealed: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scratchCardPrize: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  playAgainButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#FF5722',
    borderRadius: 8,
  },
  playAgainText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  slotMachine: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  slotsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  slot: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  spinButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#BBDEFB',
  },
  spinButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dailyRewardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  dayReward: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  dayRewardClaimed: {
    opacity: 0.7,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  dayPoints: {
    fontSize: 12,
    marginTop: 4,
  },
  quizContainer: {
    marginTop: 12,
  },
  quizQuestion: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
  quizOption: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  quizOptionText: {
    fontSize: 14,
  },
  rewardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rewardCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  rewardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  rewardName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  rewardDesc: {
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 12,
  },
  rewardPoints: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardPointsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
    marginLeft: 4,
  },
  claimedRewardsContainer: {
    marginTop: 8,
  },
  claimedReward: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  claimedRewardIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  claimedRewardInfo: {
    flex: 1,
  },
  claimedRewardName: {
    fontSize: 14,
    fontWeight: '600',
  },
  claimedRewardDesc: {
    fontSize: 12,
    opacity: 0.7,
  },
});

export default RewardsScreen;