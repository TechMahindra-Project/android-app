import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Alert,
  Modal,
  BackHandler,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import {Slider} from '@miblanchard/react-native-slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Loan = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const [loanAmount, setLoanAmount] = useState(1000);
  const [duration, setDuration] = useState(1);
  const [selectedReason, setSelectedReason] = useState(null);
  const [otherReason, setOtherReason] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Prevent back button during processing
  useEffect(() => {
    const backAction = () => {
      if (isProcessing) {
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [isProcessing]);

  const reasons = [
    'Advance Rent Payment',
    'Security Deposit',
    'Food Expenses',
    'Education Fees',
    'Medical Emergency',
    'Other',
  ];

  const getInterestRate = () => {
    switch (duration) {
      case 1:
        return 3.5;
      case 2:
        return 5;
      case 3:
        return 8;
      case 4:
        return 12;
      default:
        return 0;
    }
  };

  const calculateTotalAmount = () => {
    const interestRate = getInterestRate();
    const totalInterest = (loanAmount * interestRate) / 100;
    return (loanAmount + totalInterest).toFixed(2);
  };

  const calculateEMI = () => {
    const total = calculateTotalAmount();
    return (total / duration).toFixed(2);
  };

  const handleReasonSelect = reason => {
    setSelectedReason(reason);
    setShowOtherInput(reason === 'Other');
    if (reason !== 'Other') {
      setOtherReason('');
    }
  };

  const handleLoanSubmission = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      showSuccessAlert();
    }, 3000);
  };

  const showSuccessAlert = () => {
    Alert.alert(
      'Loan Approved',
      `Your loan details:\n\n• Amount: ₹${loanAmount.toLocaleString(
        'en-IN',
      )}\n• Duration: ${duration} ${
        duration === 1 ? 'Month' : 'Months'
      }\n• Monthly EMI: ₹${calculateEMI()}\n• Total Payable: ₹${calculateTotalAmount()}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={[styles.container, {backgroundColor: theme.colors.background}]}
        contentContainerStyle={styles.scrollContent}>
        <View style={[styles.card, {backgroundColor: theme.colors.card}]}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            <MaterialCommunityIcons
              name="cash-multiple"
              size={24}
              color={theme.colors.primary}
            />{' '}
            Apply for Loan
          </Text>

          <Text style={[styles.label, {color: theme.colors.text}]}>
            <MaterialCommunityIcons
              name="cash"
              size={20}
              color={theme.colors.primary}
            />{' '}
            Loan Amount
          </Text>
          <View style={styles.amountContainer}>
            <FontAwesome name="rupee" size={20} color={theme.colors.text} />
            <Text style={[styles.amountText, {color: theme.colors.text}]}>
              {loanAmount.toLocaleString('en-IN')}
            </Text>
          </View>

          <View style={styles.sliderContainerVertical}>
            <Slider
              value={loanAmount}
              onValueChange={value => setLoanAmount(value[0])}
              minimumValue={1000}
              maximumValue={10000}
              step={500}
              containerStyle={styles.slider}
              thumbTintColor="#4CAF50"
              minimumTrackTintColor="#4CAF50"
              maximumTrackTintColor={theme.isDarkMode ? '#555' : '#ddd'}
            />
            <View style={styles.sliderLabels}>
              <Text style={[styles.sliderLabel, {color: theme.colors.text}]}>
                ₹1,000
              </Text>
              <Text style={[styles.sliderLabel, {color: theme.colors.text}]}>
                ₹10,000
              </Text>
            </View>
          </View>

          <Text style={[styles.label, {color: theme.colors.text}]}>
            <MaterialCommunityIcons
              name="calendar-range"
              size={20}
              color={theme.colors.primary}
            />{' '}
            Duration
          </Text>
          <View style={styles.durationContainer}>
            {[1, 2, 3, 4].map(month => (
              <TouchableOpacity
                key={month}
                style={[
                  styles.durationButton,
                  duration === month && styles.selectedDuration,
                  {borderColor: theme.colors.text},
                ]}
                onPress={() => setDuration(month)}>
                <Text
                  style={[
                    styles.durationText,
                    {color: duration === month ? '#fff' : theme.colors.text},
                  ]}>
                  {month} {month === 1 ? 'Month' : 'Months'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.card, {backgroundColor: theme.colors.card}]}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            <MaterialCommunityIcons
              name="comment-question-outline"
              size={24}
              color={theme.colors.primary}
            />{' '}
            Select Your Loan Reason
          </Text>

          {reasons.map((reason, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.reasonItem,
                selectedReason === reason && styles.selectedReason,
                {borderColor: theme.colors.text},
              ]}
              onPress={() => handleReasonSelect(reason)}>
              <MaterialIcons
                name={
                  reason === 'Advance Rent Payment'
                    ? 'payment'
                    : reason === 'Security Deposit'
                    ? 'security'
                    : reason === 'Food Expenses'
                    ? 'fastfood'
                    : reason === 'Education Fees'
                    ? 'school'
                    : reason === 'Medical Emergency'
                    ? 'medical-services'
                    : 'help-outline'
                }
                size={24}
                color={selectedReason === reason ? '#fff' : theme.colors.text}
              />
              <Text
                style={[
                  styles.reasonText,
                  {
                    color:
                      selectedReason === reason ? '#fff' : theme.colors.text,
                  },
                ]}>
                {reason}
              </Text>
            </TouchableOpacity>
          ))}

          {showOtherInput && (
            <TextInput
              style={[
                styles.otherInput,
                {
                  color: theme.colors.text,
                  backgroundColor: theme.isDarkMode ? '#333' : '#f5f5f5',
                  borderColor: theme.colors.text,
                },
              ]}
              placeholder="Specify your reason"
              placeholderTextColor="#999"
              value={otherReason}
              onChangeText={setOtherReason}
            />
          )}
        </View>

        <View style={[styles.card, {backgroundColor: theme.colors.card}]}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={24}
              color={theme.colors.primary}
            />{' '}
            Loan Summary
          </Text>

          <View style={styles.summaryRow}>
            <MaterialCommunityIcons
              name="wallet-outline"
              size={20}
              color={theme.colors.text}
            />
            <Text style={[styles.summaryLabel, {color: theme.colors.text}]}>
              Amount:
            </Text>
            <Text style={[styles.summaryValue, {color: theme.colors.text}]}>
              ₹{loanAmount.toLocaleString('en-IN')}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <MaterialCommunityIcons
              name="calendar-outline"
              size={20}
              color={theme.colors.text}
            />
            <Text style={[styles.summaryLabel, {color: theme.colors.text}]}>
              Duration:
            </Text>
            <Text style={[styles.summaryValue, {color: theme.colors.text}]}>
              {duration} {duration === 1 ? 'Month' : 'Months'}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <MaterialCommunityIcons
              name="percent"
              size={20}
              color={theme.colors.text}
            />
            <Text style={[styles.summaryLabel, {color: theme.colors.text}]}>
              Interest Rate:
            </Text>
            <Text style={[styles.summaryValue, {color: theme.colors.text}]}>
              {getInterestRate()}%
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <MaterialCommunityIcons
              name="calculator-variant"
              size={20}
              color={theme.colors.text}
            />
            <Text style={[styles.summaryLabel, {color: theme.colors.text}]}>
              Monthly EMI:
            </Text>
            <Text style={[styles.summaryValue, {color: theme.colors.text}]}>
              ₹{calculateEMI()}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <MaterialCommunityIcons
              name="cash-check"
              size={20}
              color={theme.colors.text}
            />
            <Text style={[styles.summaryLabel, {color: theme.colors.text}]}>
              Total Payable:
            </Text>
            <Text style={[styles.summaryValue, {color: '#4CAF50'}]}>
              ₹{calculateTotalAmount()}
            </Text>
          </View>

          <Text style={[styles.note, {color: theme.colors.text}]}>
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={16}
              color={theme.colors.text}
            />{' '}
            By applying, you agree to our Terms of Service and Privacy Policy
          </Text>

          <TouchableOpacity
            style={[
              styles.applyButton,
              (!selectedReason ||
                (selectedReason === 'Other' && !otherReason)) &&
                styles.applyButtonDisabled,
            ]}
            disabled={
              !selectedReason ||
              (selectedReason === 'Other' && !otherReason) ||
              isProcessing
            }
            onPress={() =>
              Alert.alert(
                'Loan Application',
                'Are you sure you want to apply for this loan?',
                [
                  {text: 'Cancel', style: 'cancel'},
                  {
                    text: 'Confirm',
                    onPress: handleLoanSubmission,
                  },
                ],
              )
            }>
            <MaterialCommunityIcons name="send-check" size={20} color="white" />
            <Text style={styles.applyButtonText}> Apply for Loan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Processing Modal */}
      <Modal transparent visible={isProcessing}>
        <View style={styles.fallbackBlur}>
          <View style={styles.processingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={[styles.processingText, {color: theme.colors.text}]}>
              Processing your application...
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    opacity: 0.8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  amountText: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 8,
  },
  sliderContainerVertical: {
    marginBottom: 20,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -4,
  },
  slider: {
    marginBottom: 5,
  },
  durationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  durationButton: {
    width: '48%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedDuration: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  durationText: {
    fontSize: 14,
    fontWeight: '500',
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
  },
  selectedReason: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  reasonText: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  otherInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginTop: 5,
    fontSize: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  fallbackBlur: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    paddingLeft: 10,
    opacity: 0.8,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 5,
  },
  applyButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  applyButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  note: {
    fontSize: 14,
    marginTop: 15,
    opacity: 0.7,
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Loan;
