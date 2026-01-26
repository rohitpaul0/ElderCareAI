import { ChatMessage } from './types';

export interface RiskResult {
    level: 'safe' | 'monitor' | 'high' | 'critical';
    factors: string[];
}

export function assessRisk(messages: ChatMessage[]): RiskResult {
    const factors: string[] = [];
    let riskScore = 0;

    if (messages.length === 0) {
        return { level: 'safe', factors: [] };
    }

    // 1. Analyze recent messages (last 20)
    const recent = messages.slice(-20);
    const userMessages = recent.filter(m => m.role === 'user');

    // immediate distress keywords
    const criticalKeywords = ['help', 'pain', 'emergency', 'fall', 'bleeding', 'chest', 'suicide', 'die', 'kill', 'hurt'];
    const highKeywords = ['sad', 'lonely', 'depressed', 'scared', 'afraid', 'nobody', 'alone'];

    // Check for critical keywords
    for (const msg of userMessages) {
        const content = msg.content.toLowerCase();
        for (const word of criticalKeywords) {
            if (content.includes(word)) {
                riskScore += 50;
                factors.push(`Critical keyword detected: "${word}"`);
            }
        }
    }

    // Check for negative mood patterns
    let negativeCount = 0;
    for (const msg of userMessages) {
        const content = msg.content.toLowerCase();
        if (highKeywords.some(w => content.includes(w))) {
            negativeCount++;
        }
    }

    if (negativeCount >= 3) {
        riskScore += 30;
        factors.push(`Persistent negative mood (${negativeCount} messages)`);
    }

    // Determine level
    let level: RiskResult['level'] = 'safe';
    if (riskScore >= 50) level = 'critical';
    else if (riskScore >= 30) level = 'high';
    else if (riskScore >= 10) level = 'monitor';

    return { level, factors };
}
