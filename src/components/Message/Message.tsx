import { useEffect, useState } from 'react';

import { HStack } from '../HStack';
import { VStack } from '../VStack';

export function Message({
  content,
  sender_image_url,
  sender_name,
  sent_at,
  isLastMessage,
  isFirstMessage,
}: {
  content: string;
  sender_image_url: string;
  sender_name: string;
  sent_at: Date;
  isLastMessage: boolean;
  isFirstMessage: boolean;
}) {
  function calculateMinutesPassed(endDate: Date) {
    const start = new Date().getTime();
    const end = new Date(endDate).getTime();

    const difference = start - end;
    const minutesPassed = Math.floor(difference / 60000);

    return minutesPassed;
  }

  const [minutesAgo, setMinutesAgo] = useState(calculateMinutesPassed(sent_at));

  function verifyPlural() {
    return minutesAgo > 1 ? 's' : '';
  }

  useEffect(() => {
    function minhaFuncao() {
      if (!isLastMessage) return;
      setMinutesAgo((prev) => prev + 1);
    }

    const OneMinuteInMilliseconds = 60000;
    const intervalId = setInterval(minhaFuncao, OneMinuteInMilliseconds);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <HStack>
      {isFirstMessage && (
        <img src={sender_image_url} alt="" className="w-12 rounded-full" />
      )}
      <VStack className="ml-3">
        <HStack className="items-center space-x-4">
          <h3 className="text-lg font-semibold">{sender_name}</h3>
          <p>{minutesAgo ? `${minutesAgo} min${verifyPlural()} ago` : 'Just now'}</p>
        </HStack>
        <p>{content}</p>
      </VStack>
    </HStack>
  );
}
