import { BsFillChatFill } from 'react-icons/bs';
import { MdAddTask } from 'react-icons/md';

import { HStack } from '../HStack';

export function ChatBanner({ imageUrl, name }: { imageUrl: string; name: string }) {
  return (
    <HStack className="bg-gray-800 mt-5 rounded-lg p-5">
      <img src={imageUrl} alt="" className="w-16 h-16 rounded-full" />
      <div>
        <h3 className="ml-3.5 text-xl font-larsseit">{name}</h3>
        <HStack className="space-x-5 items-center">
          <div className="chat chat-start">
            <HStack className="chat-bubble items-center space-x-2">
              <BsFillChatFill className="text-3xl text-white" />
              <p>Chat</p>
            </HStack>
          </div>
          <HStack className="bg-white px-3 py-2 rounded-xl mb-[2px] items-center text-black space-x-2">
            <MdAddTask className="text-2xl" />
            <p>Tasks</p>
          </HStack>
        </HStack>
      </div>
    </HStack>
  );
}
