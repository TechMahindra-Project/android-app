/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
  PermissionsAndroid,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

import LottieView from 'lottie-react-native';

const OnboardingScreen = ({onComplete}) => {
  const theme = useContext(ThemeContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [answers, setAnswers] = useState({
    budget: '',
    acRequired: '',
    location: '',
    foodPreference: '',
    LaundryPreference: '',
  });

  const questions = [
    {
      question: 'What is your monthly budget?',
      options: ['5k-7k', '7k-10k', '10k-15k', '15k+'],
      key: 'budget',
    },
    {
      question: 'Need AC room?',
      options: ['Yes', 'No'],
      key: 'acRequired',
    },
    {
      question: 'Where are you looking for a PG?',
      key: 'location',
      hasInput: true,
      inputPlaceholder: 'Enter area or city...',
    },
    {
      question: 'Food preference?',
      options: ['Yes', 'No'],
      key: 'foodPreference',
    },
    {
      question: 'Laundry preference?',
      options: ['Yes', 'No'],
      key: 'LaundryPreference',
    },
  ];

  
  const handleSkip = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submitAnswers();
    }
  };

  const handleOptionSelect = option => {
    const newAnswers = {
      ...answers,
      [questions[currentStep].key]: option,
    };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        submitAnswers();
      }
    }, 300);
  };

  const handleInputChange = text => {
    setAnswers({
      ...answers,
      location: text,
    });
  };

  const handleLocationSubmit = () => {
    if (answers.location.trim()) {
      Keyboard.dismiss();
      setTimeout(() => {
        if (currentStep < questions.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          submitAnswers();
        }
      }, 300);
    }
  };

  const useCurrentLocation = () => {
    if (currentLocation) {
      setAnswers({
        ...answers,
        location: currentLocation,
      });
    }
  };

  const submitAnswers = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onComplete(answers);
    }, 6000);
  };

  const currentQuestion = questions[currentStep];
  const isLocationStep = currentQuestion.key === 'location';
  const isSubmitDisabled = isLocationStep && !answers.location.trim();

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          {backgroundColor: theme.colors.background},
        ]}>
        <LottieView
          source={require('../assets/finding.json')}
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
        <Text style={[styles.loadingText, {color: theme.colors.text}]}>
          Finding the best PGs for you...
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      keyboardVerticalOffset={80}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSkip}>
            <Text
              style={[styles.skipText, {color: theme.colors.textSecondary}]}>
              {currentStep < questions.length - 1 ? 'Skip' : 'Submit'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <Text style={[styles.progressText, {color: theme.colors.text}]}>
            Step {currentStep + 1} of {questions.length}
          </Text>
          <View
            style={[styles.progressBar, {backgroundColor: theme.colors.card}]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${((currentStep + 1) / questions.length) * 100}%`,
                  backgroundColor: theme.colors.primary,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.questionContainer}>
          <Text style={[styles.questionText, {color: theme.colors.text}]}>
            {currentQuestion.question}
            {currentQuestion.optional && (
              <Text
                style={[
                  styles.optionalText,
                  {color: theme.colors.textSecondary},
                ]}>
                {''}
              </Text>
            )}
          </Text>

          {isLocationStep ? (
            <View style={styles.locationStepContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.colors.card,
                      color: theme.colors.text,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  placeholder={currentQuestion.inputPlaceholder}
                  placeholderTextColor={theme.colors.textSecondary}
                  value={answers.location}
                  onChangeText={handleInputChange}
                  returnKeyType="done"
                  onSubmitEditing={handleLocationSubmit}
                />
                <TouchableOpacity
                  style={[
                    styles.inputSubmit,
                    {
                      backgroundColor: isSubmitDisabled
                        ? theme.colors.disabled
                        : theme.colors.primary,
                    },
                  ]}
                  onPress={handleLocationSubmit}
                  disabled={isSubmitDisabled}>
                  <Icon name="arrow-forward" size={24} color="#fff" />
                </TouchableOpacity>
              </View>

              {locationPermissionGranted && (
                <TouchableOpacity
                  style={[
                    styles.locationButton,
                    {
                      backgroundColor: currentLocation
                        ? theme.colors.primary
                        : theme.colors.disabled,
                    },
                  ]}
                  onPress={useCurrentLocation}
                  disabled={!currentLocation}>
                  <Icon name="locate" size={20} color="#fff" />
                  <Text style={styles.locationButtonText}>
                    {currentLocation
                      ? 'Use Current Location'
                      : 'Getting Location...'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    {
                      backgroundColor:
                        answers[currentQuestion.key] === option
                          ? theme.colors.primary
                          : theme.colors.card,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  onPress={() => handleOptionSelect(option)}>
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color:
                          answers[currentQuestion.key] === option
                            ? '#fff'
                            : theme.colors.text,
                      },
                    ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingAnimation: {
    width: 200,
    height: 200,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '500',
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressText: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 32,
  },
  optionalText: {
    fontSize: 16,
    fontWeight: '400',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  optionButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: '45%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  locationStepContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 56,
    borderWidth: 1,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  inputSubmit: {
    height: 56,
    width: 56,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  locationButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default OnboardingScreen;
