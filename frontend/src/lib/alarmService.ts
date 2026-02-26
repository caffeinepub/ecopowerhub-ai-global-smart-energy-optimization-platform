import type { AlarmConfig, EnergySummary } from '../types';

// Motivational messages with EcoPowerHub AI branding
export const motivationalMessages = [
  "Good morning! EcoPowerHub AI – Global Smart Energy Optimization Platform is here to help you save energy today.",
  "Rise and shine! Your energy coach from EcoPowerHub AI has insights for you.",
  "Hello! EcoPowerHub AI – Global Smart Energy Optimization Platform wishes you an energy-efficient day.",
  "Good morning! Let's optimize your energy usage together with EcoPowerHub AI.",
  "Wake up! EcoPowerHub AI – Global Smart Energy Optimization Platform has your daily energy update ready.",
];

export interface MorningUpdate {
  weather: {
    temperature: number;
    condition: string;
    windSpeed: number;
    humidity: number;
  };
  energySummary: {
    totalConsumption: number;
    peakUsage: number;
    efficiency: string;
  };
  systemStatus: string;
  motivationalMessage: string;
}

export function getMotivationalMessage(): string {
  return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
}

export function formatAlarmTime(timestamp: bigint): string {
  const date = new Date(Number(timestamp) / 1000000); // Convert nanoseconds to milliseconds
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export function generateVoicePrompt(
  alarm: AlarmConfig,
  weather: { temperature: number; condition: string },
  energySummary: EnergySummary
): string {
  const motivationalMsg = getMotivationalMessage();
  
  return `
    ${motivationalMsg}
    
    Current weather: ${weather.temperature} degrees, ${weather.condition}.
    
    Your energy summary: Total consumption is ${energySummary.totalConsumption.toFixed(2)} kilowatt hours.
    Peak usage was ${energySummary.peakUsage.toFixed(2)} kilowatts.
    
    Have a great day, and remember to optimize your energy usage!
  `;
}

export function playAlarmSound(ringTone: string, alertBeep: string): void {
  // Mock implementation - in production, this would play actual audio
  console.log(`Playing alarm sound: ${ringTone} with beep: ${alertBeep}`);
  
  // Try to use Web Audio API if available
  if ('AudioContext' in window || 'webkitAudioContext' in window) {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Set frequency based on alert beep type
      const frequency = alertBeep === 'loud' ? 800 : alertBeep === 'standard' ? 600 : 400;
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      // Set volume
      gainNode.gain.value = 0.3;
      
      // Play for 1 second
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 1);
    } catch (error) {
      console.error('Failed to play alarm sound:', error);
    }
  }
}

export function speakMorningUpdate(update: MorningUpdate, language: string): void {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    return;
  }

  const text = `
    Good morning! Here's your energy update from EcoPowerHub AI.
    
    Today's weather: ${Math.round(update.weather.temperature)} degrees Celsius, ${update.weather.condition}.
    Wind speed is ${update.weather.windSpeed} kilometers per hour, with ${update.weather.humidity} percent humidity.
    
    Your energy consumption: ${update.energySummary.totalConsumption.toFixed(1)} kilowatt hours total.
    Peak usage was ${update.energySummary.peakUsage.toFixed(1)} kilowatts.
    Your efficiency rating is ${update.energySummary.efficiency}.
    
    System status: ${update.systemStatus}.
    
    ${update.motivationalMessage}
    
    Have a great day!
  `;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language === 'Spanish' ? 'es-ES' : 
                   language === 'Mandarin' ? 'zh-CN' :
                   language === 'Hindi' ? 'hi-IN' :
                   language === 'Swahili' ? 'sw-KE' :
                   language === 'Arabic' ? 'ar-SA' : 'en-US';
  utterance.rate = 0.9;
  utterance.pitch = 0.8;

  window.speechSynthesis.speak(utterance);
}
