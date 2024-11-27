import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface Step {
  text: string;
  completed: boolean;
}

export function LoadingSteps() {
  const [steps, setSteps] = useState<Step[]>([
    { text: "AI is researching the topic...", completed: false },
    { text: "Gathering relevant data...", completed: false },
    { text: "Analyzing information...", completed: false },
    { text: "Summarizing findings...", completed: false },
    { text: "Formatting newsletter...", completed: false },
    { text: "Generating final newsletter...", completed: false },
    { text: "Preparing email delivery...", completed: false }, 
    { text: "Sending newsletter to your inbox...", completed: false }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSteps(currentSteps => {
        const firstIncompleteIndex = currentSteps.findIndex(step => !step.completed);
        if (firstIncompleteIndex === -1) return currentSteps;

        return currentSteps.map((step, index) => 
          index === firstIncompleteIndex ? { ...step, completed: true } : step
        );
      });
    }, 8000); // 8 seconds per step = ~64 seconds total

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className={`
            flex items-center justify-center w-6 h-6 rounded-full
            ${step.completed 
              ? 'bg-green-500' 
              : 'bg-gray-600'
            } transition-colors duration-300
          `}>
            {step.completed && <Check className="w-4 h-4 text-white" />}
          </div>
          <span className={`
            text-sm
            ${step.completed ? 'text-green-400' : 'text-gray-400'}
          `}>
            {step.text}
          </span>
        </div>
      ))}
    </div>
  );
}