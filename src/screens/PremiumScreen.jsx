import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const PremiumScreen = () => {
  const theme = useContext(ThemeContext);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Gold color palette
  const goldColors = {
    primary: '#FFD700',
    dark: '#D4AF37',
    light: '#FFECB3',
    accent: '#F9A825',
  };

  const premiumPlans = [
    {
      id: 'monthly',
      title: 'Monthly Plan',
      price: '$4.99/month',
      features: [
        'Unlimited PG listings',
        'Priority customer support',
        'Advanced filters',
        'No ads',
      ],
      popular: false,
      icon: 'calendar-month',
    },
    {
      id: 'yearly',
      title: 'Yearly Plan',
      price: '$49.99/year',
      savings: 'Save 15%',
      features: [
        'All monthly features',
        'Early access to new features',
        'Exclusive yearly bonuses',
      ],
      popular: true,
      icon: 'calendar-today',
    },
    {
      id: 'lifetime',
      title: 'Lifetime Access',
      price: '$99.99 once',
      features: [
        'All premium features forever',
        'Free lifetime updates',
        'VIP support priority',
      ],
      popular: false,
      icon: 'all-inclusive',
    },
  ];

  const handleSubscribe = planId => {
    setIsProcessing(true);
    setSelectedPlan(planId);

    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Subscription Successful',
        `Thank you for subscribing to ${
          premiumPlans.find(p => p.id === planId).title
        }!`,
        [{text: 'OK'}],
      );
    }, 2000);
  };

  const renderPlanCard = plan => {
    const isSelected = selectedPlan === plan.id;

    return (
      <TouchableOpacity
        key={plan.id}
        activeOpacity={0.9}
        onPress={() => !isProcessing && setSelectedPlan(plan.id)}>
        <LinearGradient
          colors={
            isSelected
              ? [goldColors.dark, goldColors.primary]
              : [theme.colors.card, theme.colors.card]
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[
            styles.planCard,
            {
              borderWidth: isSelected ? 0 : 1,
              borderColor: theme.colors.border,
              shadowColor: isSelected
                ? goldColors.primary
                : theme.colors.border,
            },
          ]}>
          {plan.popular && (
            <View
              style={[
                styles.popularBadge,
                {backgroundColor: goldColors.accent},
              ]}>
              <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
            </View>
          )}

          <View style={styles.planHeader}>
            <Icon
              name={plan.icon}
              size={32}
              color={isSelected ? 'white' : goldColors.primary}
            />
            {plan.savings && (
              <View
                style={[
                  styles.savingsBadge,
                  {backgroundColor: theme.colors.background},
                ]}>
                <Text style={[styles.savingsText, {color: goldColors.dark}]}>
                  {plan.savings}
                </Text>
              </View>
            )}
          </View>

          <Text
            style={[
              styles.planTitle,
              {color: isSelected ? 'white' : theme.colors.text},
            ]}>
            {plan.title}
          </Text>

          <Text
            style={[
              styles.planPrice,
              {color: isSelected ? 'white' : goldColors.primary},
            ]}>
            {plan.price}
          </Text>

          <View style={styles.featuresContainer}>
            {plan.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Icon
                  name="check-circle"
                  size={18}
                  color={isSelected ? 'white' : goldColors.primary}
                />
                <Text
                  style={[
                    styles.featureText,
                    {color: isSelected ? 'white' : theme.colors.text},
                  ]}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.subscribeButton,
              {
                backgroundColor: isSelected ? 'white' : goldColors.primary,
                opacity: isProcessing && !isSelected ? 0.6 : 1,
              },
            ]}
            onPress={() => handleSubscribe(plan.id)}
            disabled={isProcessing}>
            {isProcessing && isSelected ? (
              <ActivityIndicator color={goldColors.dark} />
            ) : (
              <Text
                style={[
                  styles.subscribeButtonText,
                  {color: isSelected ? goldColors.dark : 'white'},
                ]}>
                {isSelected ? 'Selected' : 'Subscribe Now'}
              </Text>
            )}
          </TouchableOpacity>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      contentContainerStyle={styles.scrollContent}>
      {/* Premium Header */}
      <LinearGradient
        colors={[goldColors.dark, goldColors.primary]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.premiumHeader}>
        <Icon
          name="workspace-premium"
          size={48}
          color="white"
          style={styles.premiumIcon}
        />
        <Text style={styles.headerTitle}>Find My PG Premium</Text>
        <Text style={[styles.headerSubtitle, {fontSize:14, color:'white'}]}>
          Unlock exclusive features and benefits
        </Text>
      </LinearGradient>

      {/* Benefits Section */}
      <View
        style={[styles.sectionContainer, {backgroundColor: theme.colors.card}]}>
        <View style={styles.sectionHeader}>
          <Icon name="stars" size={24} color={goldColors.primary} />
          <Text
            style={[
              styles.sectionTitle,
              {color: theme.colors.text, marginLeft: 10},
            ]}>
            Premium Benefits
          </Text>
        </View>

        {[
          {
            icon: 'home',
            text: 'Unlimited PG listings with detailed information',
          },
          {icon: 'filter-alt', text: 'Advanced filters for precise searching'},
          {icon: 'support-agent', text: 'Priority customer support'},
          {icon: 'flash-on', text: 'Exclusive early access to new features'},
          {icon: 'verified-user', text: 'Verified PG listings only'},
        ].map((item, index) => (
          <View key={index} style={styles.benefitItem}>
            <View
              style={[
                styles.benefitIconContainer,
                {backgroundColor: goldColors.light},
              ]}>
              <Icon name={item.icon} size={20} color={goldColors.dark} />
            </View>
            <Text style={[styles.benefitText, {color: theme.colors.text}]}>
              {item.text}
            </Text>
          </View>
        ))}
      </View>

      {/* Plans Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Icon name="payment" size={24} color={goldColors.primary} />
          <Text
            style={[
              styles.sectionTitle,
              {color: theme.colors.text, marginLeft: 10},
            ]}>
            Choose Your Plan
          </Text>
        </View>

        <View style={styles.plansContainer}>
          {premiumPlans.map(renderPlanCard)}
        </View>
      </View>

      {/* FAQ Section */}
      <View
        style={[styles.sectionContainer, {backgroundColor: theme.colors.card}]}>
        <View style={styles.sectionHeader}>
          <Icon name="help-outline" size={24} color={goldColors.primary} />
          <Text
            style={[
              styles.sectionTitle,
              {color: theme.colors.text, marginLeft: 10},
            ]}>
            Frequently Asked Questions
          </Text>
        </View>

        {[
          {
            icon: 'receipt',
            question: 'How does billing work?',
            answer:
              'Your subscription will automatically renew unless canceled at least 24 hours before the end of the current period.',
          },
          {
            icon: 'cancel',
            question: 'Can I cancel anytime?',
            answer:
              'Yes, you can cancel your subscription anytime through your account settings.',
          },
          {
            icon: 'free-breakfast',
            question: 'Is there a free trial?',
            answer:
              'We occasionally offer free trials. Check our promotions page for current offers.',
          },
          {
            icon: 'security',
            question: 'Is my payment secure?',
            answer:
              'All payments are processed through secure, encrypted channels.',
          },
        ].map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <View style={styles.faqQuestionContainer}>
              <View
                style={[
                  styles.faqIconContainer,
                  {backgroundColor: goldColors.light},
                ]}>
                <Icon name={item.icon} size={16} color={goldColors.dark} />
              </View>
              <Text style={[styles.faqQuestion, {color: theme.colors.text}]}>
                {item.question}
              </Text>
            </View>
            <Text style={[styles.faqAnswer, {color: '#888'}]}>
              {item.answer}
            </Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Icon name="security" size={18} color={goldColors.dark} />
        <Text
          style={[
            styles.footerText,
            {color: theme.colors.secondaryText || '#888'},
          ]}>
          Secure payment processing. By subscribing, you agree to our{' '}
          <Text style={{textDecorationLine: 'underline', fontWeight: '500'}}>
            Terms
          </Text>{' '}
          and{' '}
          <Text style={{textDecorationLine: 'underline', fontWeight: '500'}}>
            Privacy Policy
            
          </Text>
          .
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  premiumHeader: {
    padding: 30,
    paddingTop: 50,
    paddingBottom: 40,
    alignItems: 'center',
    marginBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  premiumIcon: {
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    maxWidth: '80%',
    opacity: 0.9,
  },
  sectionContainer: {
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  benefitIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  benefitText: {
    fontSize: 16,
    flex: 1,
  },
  plansContainer: {
    marginBottom: 10,
  },
  planCard: {
    borderRadius: 16,
    padding: 25,
    marginBottom: 15,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  popularBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  savingsBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  savingsText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  featuresContainer: {
    marginBottom: 25,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 15,
    marginLeft: 10,
    flex: 1,
  },
  subscribeButton: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  subscribeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  faqItem: {
    marginBottom: 20,
  },
  faqQuestionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  faqIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 38,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  footerText: {
    fontSize: 12,
    marginLeft: 10,
    flex: 1,
  },
});

export default PremiumScreen;
