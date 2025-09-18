
export const MOODS = [
    { name: 'Happy', emoji: '😊' },
    { name: 'Calm', emoji: '😌' },
    { name: 'Okay', emoji: '😐' },
    { name: 'Anxious', emoji: '😟' },
    { name: 'Sad', emoji: '😢' },
    { name: 'Angry', emoji: '😡' },
];

export const SOS_GUIDE_STEPS = [
    {
        title: 'Breathe Deeply',
        description: 'Find a quiet place. Close your eyes. Inhale slowly through your nose for 4 seconds, hold for 4 seconds, and exhale slowly through your mouth for 6 seconds. Repeat this 5 times.',
        icon: '🌬️'
    },
    {
        title: '5-4-3-2-1 Grounding',
        description: 'Acknowledge 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This pulls you back to the present moment.',
        icon: '👀'
    },
    {
        title: 'Hold Something Cold',
        description: 'Grab an ice cube or run your hands under cold water. The shock of the cold can help disrupt the panic cycle and ground you.',
        icon: '🧊'
    },
    {
        title: 'Focus on One Object',
        description: 'Pick a single object in front of you. Notice everything about it—its color, texture, shape, and weight. This narrows your focus and calms your mind.',
        icon: '🖼️'
    },
];

export const CRISIS_HELPLINES = [
    { name: 'National Suicide Prevention Lifeline', number: '988', website: 'https://988lifeline.org/' },
    { name: 'Crisis Text Line', number: 'Text HOME to 741741', website: 'https://www.crisistextline.org/' },
    { name: 'The Trevor Project (for LGBTQ Youth)', number: '1-866-488-7386', website: 'https://www.thetrevorproject.org/' },
];

export const GEMINI_SYSTEM_INSTRUCTION = `You are a friendly and empathetic AI companion named 'Aura', designed to support youth mental health. Your tone should be gentle, encouraging, and non-judgmental. Provide practical, evidence-based coping strategies for feelings like anxiety, stress, and sadness. Keep your responses concise and easy to understand. Avoid giving medical advice and always encourage users to speak with a trusted adult or professional if they are in crisis. If the user mentions self-harm, suicide, or immediate danger, gently provide crisis helpline numbers and strongly encourage them to seek immediate help. Do not use markdown formatting.`;
