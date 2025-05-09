export const mockResponses = [
  {
    input: /hello|hi|hey/i,
    responses: [
      "Hello! How can I assist you today?",
      "Hi there! What can I help you with?",
      "Hey! I'm here to help. What's on your mind?"
    ]
  },
  {
    input: /how are you/i,
    responses: [
      "I'm functioning well, thank you! How can I help you?",
      "I'm operational and ready to assist. What can I do for you?",
    ]
  },
  {
    input: /.*/,  // Default fallback for any message
    responses: [
      "That's interesting! Tell me more about that.",
      "I understand. How can I help you with that?",
      "I'm processing that. Could you elaborate?",
      "Interesting perspective. Would you like to explore that further?",
    ]
  }
];

export function getMockResponse(message: string): string {
  // Find the first matching pattern
  const matchingPattern = mockResponses.find(pattern => 
    pattern.input.test(message)
  );
  
  // Get a random response from the matching pattern
  const responses = matchingPattern?.responses || mockResponses[mockResponses.length - 1].responses;
  const randomIndex = Math.floor(Math.random() * responses.length);
  
  return responses[randomIndex];
}
