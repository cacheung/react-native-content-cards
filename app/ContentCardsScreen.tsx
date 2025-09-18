import { MobileCore } from '@adobe/react-native-aepcore';
import { ContentCardView, useContentCardUI } from '@adobe/react-native-aepmessaging';
import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Appearance,
  ColorSchemeName,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

const MODE_OPTIONS: {
  label: string;
  value: ColorSchemeName;
}[] = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: null }
];

const ContentCardsScreen = () => {
  const [trackInput, setTrackInput] = useState('');
  const [selectedMode, setSelectedMode] = useState<string>('System');
  const colorScheme = useColorScheme();
  
  // Using the surface specified in requirements
  const surface = Platform.OS === 'android' ? 'rn/android/remote_image' : 'rn/ios/remote_image';
  const { content, isLoading, error, refetch } = useContentCardUI(surface);

  // Use content from the hook
  const safeContent = content || [];
  
  // Log basic content cards info
  useEffect(() => {
    console.log(`Content Cards: ${safeContent.length} cards for surface "${surface}"`);
    if (error) console.error('Content Cards Error:', error);
  }, [safeContent.length, surface, error]);


  // Fire default trackAction "small_image" on component mount
  useEffect(() => {
    MobileCore.trackAction('small_image');
  }, []);

  // Handle mode change
  const handleModeChange = useCallback(
    (mode: string, value: ColorSchemeName) => {
      setSelectedMode(mode);
      Appearance.setColorScheme(value);
    },
    []
  );

  // Handle content card events
  const handleContentCardEvent = useCallback((event: string, card: any) => {
    console.log('Content card event:', event, card?.id);
    // ContentCardView handles its own visibility on dismiss
    // No need to manually filter out cards
  }, []);

  // Simple style overrides demo - adds colored border and rounded corners
  const simpleStyleOverrides = {
    smallImageStyle: {
      card: {
        borderWidth: 2,
        borderColor: '#007AFF', // Blue border
        borderRadius: 12,       // Rounded corners
        margin: 8,             // Spacing around cards
      }
    }
  };

  // Handle custom track action with input text
  const handleTrackAction = async () => {
    if (!trackInput.trim()) {
      Alert.alert('Input Required', 'Please enter a track action name');
      return;
    }

    try {
      // Track the custom action
      MobileCore.trackAction(trackInput.trim());
      
      // Refresh content cards after tracking
      await refetch();
      
      // Clear the input
      setTrackInput('');
      
      Alert.alert('Success', `Tracked action: ${trackInput.trim()}`);
    } catch (err) {
      console.error('Error tracking action:', err);
      Alert.alert('Error', 'Failed to track action');
    }
  };

  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/*Light/Dark Mode Switcher */}
        <View style={styles.headerContainer}>
          <View
            style={[styles.modeSwitcher, { backgroundColor: colors.viewBg }]}
          >
            {MODE_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.label}
                style={[
                  styles.modeOption,
                  selectedMode === option.label
                    ? [
                        styles.modeOptionSelected,
                        { backgroundColor: colors.modeBg }
                      ]
                    : styles.modeOptionUnselected
                ]}
                onPress={() => handleModeChange(option.label, option.value)}
              >
                <Text
                  style={[
                    styles.modeOptionText,
                    {
                      fontWeight: selectedMode === option.label ? '600' : '400',
                      color: colors.text
                    }
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={[styles.title, { color: colors.text }]}>Content Cards</Text>
        <Text style={[styles.subtitle, { color: colors.mutedText }]}>Surface: {surface}</Text>
      
        {/* Input section for custom trackAction */}
        <View style={[styles.inputSection, { backgroundColor: colors.panel, borderColor: colors.panelBorder }]}>
          <Text style={[styles.inputLabel, { color: colors.text }]}>Custom Track Action:</Text>
        <View style={styles.inputRow}>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: colors.inputBg,
                  borderColor: colors.inputBorder,
                  color: colors.text
                }
              ]}
              value={trackInput}
              onChangeText={setTrackInput}
              placeholder="Enter track action name"
              placeholderTextColor={colors.placeholderText}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity 
              style={[
                styles.button,
                { backgroundColor: colors.buttonPrimary },
                isLoading && styles.buttonDisabled
              ]} 
              onPress={handleTrackAction}
              disabled={isLoading}
            >
              <Text style={[styles.buttonText, { color: colors.buttonText }]}>
                {isLoading ? 'Loading...' : 'Track & Refresh'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Cards Display - ContentCardView */}
      <FlatList
        style={styles.cardsContainer}
        data={safeContent}
        keyExtractor={(item, index) => item?.id || `card-${index}`}
        renderItem={({ item: card }) => (
          <View style={styles.cardWrapper}>
            <ContentCardView 
              template={card}
              listener={handleContentCardEvent}
              styleOverrides={simpleStyleOverrides}
            />
          </View>
        )}
        
          ListHeaderComponent={() => (
            <>
              {error && (
                <View style={[styles.errorContainer, { backgroundColor: colors.panel }]}>
                  <Text style={[styles.errorText, { color: colors.errorText }]}>Error loading content cards</Text>
                  <TouchableOpacity style={[styles.retryButton, { backgroundColor: colors.errorText }]} onPress={refetch}>
                    <Text style={[styles.retryText, { color: colors.buttonText }]}>Retry</Text>
                  </TouchableOpacity>
                </View>
              )}

              {isLoading && safeContent.length === 0 && (
                <View style={styles.loadingContainer}>
                  <Text style={[styles.loadingText, { color: colors.mutedText }]}>Loading content cards...</Text>
                  <Text style={[styles.loadingHint, { color: colors.mutedText }]}>
                    Checking surface: {surface}
                  </Text>
                </View>
              )}
            </>
          )}
          ListEmptyComponent={() => (
            !isLoading ? (
              <View style={[styles.emptyContainer, { backgroundColor: colors.panel, borderColor: colors.panelBorder }]}>
                <Text style={[styles.emptyTitle, { color: colors.text }]}>No Content Cards Available</Text>
                <Text style={[styles.emptyText, { color: colors.mutedText }]}>
                  Content cards will appear here when configured in Adobe Journey Optimizer for surface: &quot;{surface}&quot;
                </Text>
                <Text style={[styles.emptyHint, { color: colors.mutedText }]}>
                  Try tracking an action above to refresh content cards.
                </Text>
              </View>
            ) : null
          )}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  modeSwitcher: {
    width: '65%',
    borderRadius: 12,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modeOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  modeOptionSelected: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 2,
  },
  modeOptionUnselected: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  modeOptionText: {
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  inputSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    fontSize: 16,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardsContainer: {
    flex: 1,
  },
  cardWrapper: {
    marginBottom: 12,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
  },
  loadingHint: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  errorContainer: {
    alignItems: 'center',
    padding: 40,
    borderRadius: 12,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 12,
  },
  retryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryText: {
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
    borderRadius: 12,
    borderWidth: 1,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 8,
  },
  emptyHint: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default ContentCardsScreen;
