import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AboutUsScreen = () => {
  const theme = useContext(ThemeContext);
  
  const teamData = [
    {
      name: 'Divyam Goel',
      role: 'Founder & CEO',
      bio: 'Real estate expert with 10+ years experience in property management',
      image: 'https://i.pinimg.com/236x/34/5c/6d/345c6d52234bbc72407ea25d49ad945e.jpg'
    },
    {
      name: 'Ayush Singla',
      role: 'CTO',
      bio: 'Tech enthusiast specializing in scalable web platforms',
      image: 'https://i.pinimg.com/236x/d2/7a/62/d27a626a6b0f3f78eff872925f766a93.jpg'
    },
    {
      name: 'Ayush Aggarwal',
      role: 'Head of Operations',
      bio: 'Customer service specialist focused on seamless PG experiences',
      image: 'https://i.pinimg.com/474x/52/33/20/5233204aae9643a84ce2ca4407299c2a.jpg'
    },
    {
      name: 'Keshav Singla',
      role: 'Marketing Head',
      bio: 'Digital marketing expert with focus on growth strategies',
      image: 'https://i.pinimg.com/236x/48/65/f6/4865f65986c705dd83291e47f2c31ae0.jpg'
    }
  ];

  return (
    <ScrollView 
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, {color: theme.colors.text}]}>About Find My PG</Text>
        <Text style={[styles.subtitle, {color: theme.colors.textSecondary}]}>
          Making PG hunting simple, transparent, and hassle-free
        </Text>
      </View>

      <View style={[styles.card, {backgroundColor: theme.colors.card}]}>
        <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Our Story</Text>
        <Text style={[styles.sectionText, {color: theme.colors.textSecondary}]}>
          Founded in 2025, Find My PG was born out of personal struggles to find quality paying guest accommodations.
          We've revolutionized the process by verifying listings, standardizing information, and providing transparent pricing.
        </Text>
      </View>

      <Text style={[styles.sectionHeader, {color: theme.colors.text}]}>Meet The Team</Text>
      
      {teamData.map((member, index) => (
        <View 
          key={index} 
          style={[
            styles.teamCard, 
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border
            }
          ]}
        >
          <Image 
            source={{uri: member.image}} 
            style={styles.memberImage} 
            resizeMode="cover"
          />
          <View style={styles.memberInfo}>
            <Text style={[styles.memberName, {color: theme.colors.text}]}>
              {member.name}
            </Text>
            <Text style={[styles.memberRole, {color: '#FFB347'}]}>
              {member.role}
            </Text>
            <Text style={[styles.memberBio, {color: '#888'}]}>
              {member.bio}
            </Text>
          </View>
        </View>
      ))}

      <View style={[styles.card, {backgroundColor: theme.colors.card}]}>
        <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Our Mission</Text>
        
        <View style={styles.missionItem}>
          <MaterialIcons 
            name="check-circle" 
            size={20} 
            color={'#66CDAA'} 
            style={styles.missionIcon}
          />
          <Text style={[styles.missionText, {color: theme.colors.text}]}>
            Eliminate broker commissions and hidden charges
          </Text>
        </View>
        
        <View style={styles.missionItem}>
          <MaterialIcons 
            name="check-circle" 
            size={20} 
            color={'#66CDAA'} 
            style={styles.missionIcon}
          />
          <Text style={[styles.missionText, {color: theme.colors.text}]}>
            Provide verified listings with real photos
          </Text>
        </View>
        
        <View style={styles.missionItem}>
          <MaterialIcons 
            name="check-circle" 
            size={20} 
            color={'#66CDAA'} 
            style={styles.missionIcon}
          />
          <Text style={[styles.missionText, {color: theme.colors.text}]}>
            Create standardized PG information for easy comparison
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.8,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
  },
  teamCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  memberImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 16,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  memberBio: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  missionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  missionIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  missionText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
});

export default AboutUsScreen;