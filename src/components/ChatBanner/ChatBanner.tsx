import React from 'react';
import { BsFillChatFill } from 'react-icons/bs';
import { MdAddTask } from 'react-icons/md';

import { HStack } from '../HStack';

export function ChatBanner({
  imageUrl,
  name,
  children,
  onIconClicked: onNavigate,
}: {
  imageUrl: string;
  name: string;
  children: React.ReactChild;
  onIconClicked: (iconClicked: string) => void;
}) {
  const handleNavigate = (iconClicked: string) => {
    onNavigate(iconClicked);
  };

  return (
    <HStack className="bg-gray-800 mt-5 rounded-lg p-5 justify-between">
      <HStack>
        <img src={imageUrl} alt="" className="w-16 h-16 rounded-full" />
        <div>
          <h3 className="ml-8 text-xl font-larsseit">{name}</h3>
          <HStack className="space-x-1 items-center mt-1">
            <button
              className={'btn btn-ghost hover:bg-transparent'}
              type="button"
              onClick={() => handleNavigate('chat')}
            >
              <div className="chat chat-start">
                <HStack className="chat-bubble items-center space-x-2">
                  <BsFillChatFill className="text-3xl text-white" />
                  <p>Chat</p>
                </HStack>
              </div>
            </button>
            <button
              type={'button'}
              className={'btn btn-ghost hover:bg-transparent'}
              onClick={() => handleNavigate('tasks')}
            >
              <HStack className="bg-white px-3 py-2 rounded-xl items-center mt-0.5 text-black space-x-2">
                <MdAddTask className="text-2xl" />
                <p>Tasks</p>
              </HStack>
            </button>
          </HStack>
        </div>
      </HStack>
      {children}
    </HStack>
  );
}
