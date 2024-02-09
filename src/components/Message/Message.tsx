import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { v4 } from 'uuid';

import { socket } from '../../hooks/useCreateMessage';
import { CreateMessageDTO } from '../../hooks/useCreateMessage/types';
import { useIsGroupRoute } from '../../hooks/useIsGroupRoute';
import { PrivateConversation } from '../../hooks/usePrivateConversationQuery/types';
import { useRouteUUID } from '../../hooks/useRouteUUID';
import { GroupWithMessage } from '../../hooks/useUserGroupsQuery/types';
import { useUser } from '../../store/useUser';
import { HStack } from '../HStack';
import { VStack } from '../VStack';

export function Message({
  content,
  senderImageUrl,
  senderName,
  sentAt,
  isLastMessage,
  isFirstMessage,
}: {
  content: string;
  senderImageUrl: string;
  senderName: string;
  sentAt: string;
  isLastMessage: boolean;
  isFirstMessage: boolean;
}) {
  const calculateMinutesPassed = (endDate: Date) => {
    const start = new Date().getTime();
    const end = new Date(endDate).getTime();

    const difference = start - end;
    const minutesPassed = Math.floor(difference / 60000);

    return minutesPassed;
  };

  const sentAtDate = new Date(sentAt);

  const wasSentToday = sentAtDate.toDateString() === new Date().toDateString();

  const wasSentInTheLastHour = calculateMinutesPassed(sentAtDate) < 60;
  const [minutesAgo, setMinutesAgo] = useState(calculateMinutesPassed(sentAtDate));

  function verifyPlural() {
    return minutesAgo > 1 ? 's' : '';
  }

  useEffect(() => {
    function increaseMinutesAgo() {
      setMinutesAgo((prev) => prev + 1);
    }

    const OneMinuteInMilliseconds = 60000;

    const intervalId = setInterval(increaseMinutesAgo, OneMinuteInMilliseconds);

    return () => clearInterval(intervalId);
  }, []);

  const hours = sentAtDate.getHours();
  const minutes = sentAtDate.getMinutes();

  const hoursSerialized = hours.toString().padStart(2, '0');
  const minutesSerialized = minutes.toString().padEnd(2, '0');

  const verifyJustSent = () => {
    const minuteWithPluralIfNeeded = `minute${verifyPlural()}`;
    const minutes = `${minutesAgo} ${minuteWithPluralIfNeeded} ago`;

    return minutesAgo ? minutes : 'Just now';
  };

  return (
    <HStack>
      {isFirstMessage && (
        <img src={senderImageUrl} alt="" className="w-12 rounded-full" />
      )}
      <VStack className="ml-3">
        <HStack className="items-center space-x-4">
          <h3 className="text-lg font-semibold">{senderName}</h3>

          {wasSentToday && !wasSentInTheLastHour && (
            <HStack>
              <p>{hoursSerialized}</p>
              <span>:</span>
              <p>{minutesSerialized}</p>
            </HStack>
          )}
          {wasSentToday && wasSentInTheLastHour && <p>{verifyJustSent()}</p>}
          {!wasSentToday && (
            <HStack className="space-x-1 items-center">
              <p>{sentAtDate.toLocaleString('default', { month: 'long' })}</p>
              <p className="font-larsseit text-xs">{sentAtDate.getDate()}</p>
            </HStack>
          )}
        </HStack>
        <p>{content}</p>
      </VStack>
    </HStack>
  );
}
