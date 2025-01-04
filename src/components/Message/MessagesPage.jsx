import Pusher from 'pusher-js';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button, Avatar, Upload } from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  MoreOutlined,
  SendOutlined,
  SmileOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import { addMessage, messageThunks } from '../../redux/slices/messageSlice';
import { changelastMessage, chatThunks } from '../../redux/slices/chatSlice';
import {
  BASE_API_URL,
  getAvatarForChat,
  PUSHER_CLUSTER,
  PUSHER_KEY,
} from '../../utils';

const MessagesPage = () => {
  const [messageInput, setMessageInput] = useState('');
  const [file, setFile] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const dispatch = useDispatch();
  const {
    chats,
    loading: chatsLoading,
    singleChat,
  } = useSelector((state) => state.chats);
  const { messages, loading: messagesLoading } = useSelector(
    (state) => state.messages
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(chatThunks.getAllChats({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    if (singleChat) {
      dispatch(messageThunks.getAllMessages(singleChat._id));
    }
  }, [singleChat, dispatch]);

  useEffect(() => {
    if (singleChat) {
      const pusher = new Pusher(PUSHER_KEY, {
        cluster: PUSHER_CLUSTER,
      });

      const channel = pusher.subscribe(`chat-${singleChat._id}`);

      channel.bind('message-received', (newMessage) => {
        dispatch(addMessage(newMessage));
        dispatch(changelastMessage(newMessage));
        scrollToBottom();
      });

      return () => {
        pusher.unsubscribe(`chat-${singleChat._id}`);
      };
    }
  }, [singleChat, dispatch]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!messageInput.trim() && !file) return;

    const formData = new FormData();
    formData.append('chatId', singleChat._id);
    formData.append(
      'receiver',
      singleChat.sponsor._id === user._id
        ? singleChat.startup._id
        : singleChat.sponsor._id
    );
    formData.append('sender', user._id);

    if (file) {
      formData.append(
        'type',
        file.type.startsWith('image')
          ? 'image'
          : file.type.startsWith('video')
            ? 'video'
            : 'file'
      );
      formData.append('file', file);
    } else {
      formData.append('type', 'text');
      formData.append('content', messageInput);
    }

    dispatch(messageThunks.createMessage(formData)).then(() => {
      setMessageInput('');
      setFile(null);
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
    onRemove: () => setFile(null),
  };

  const handleChatClick = (chat) => {
    dispatch(chatThunks.getChatById(chat._id));
  };

  return (
    <div className="flex h-full gap-2 bg-white rounded-lg">
      {/* Chat List Sidebar */}
      <div className="w-[300px] flex flex-col border-r">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Messages</h2>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Search by name, group, chat..."
              prefix={<SearchOutlined />}
            />
            <Button icon={<FilterOutlined />} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-4">
            <h3 className="text-gray-500 text-sm mb-2">Pinned Messages</h3>
            {chatsLoading ? (
              <p>Loading chats...</p>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat._id}
                  className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer ${
                    singleChat && singleChat._id === chat._id
                      ? 'bg-blue-50'
                      : ''
                  }`}
                  onClick={() => handleChatClick(chat)}
                >
                  <Avatar src={getAvatarForChat(chat, user)} />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">
                      {chat.sponsor.name || chat.startup.name}
                    </h4>
                    <p className="text-sm text-gray-500 truncate">
                      {(chat.lastMessage?.type === 'text'
                        ? chat.lastMessage?.content
                        : 'Sent an attachment') || 'No messages yet'}
                    </p>
                  </div>
                  <span className="text-sm text-gray-400 whitespace-nowrap">
                    {new Date(chat.updatedAt).toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white rounded-lg">
        {singleChat ? (
          <>
            <div className="flex justify-between items-center border-b p-4">
              <div>
                <h2 className="text-lg font-bold">
                  {singleChat.sponsor.name || singleChat.startup.name}
                </h2>
                <p className="text-sm text-green-500">Available</p>
              </div>
              <div className="flex gap-2">
                <Button icon={<MoreOutlined />} />
              </div>
            </div>

            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto px-4 scrollbar-custom"
              style={{
                height: 'calc(100% - 130px)',
              }}
            >
              {messagesLoading ? (
                <p>Loading messages...</p>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 flex ${
                      message.sender === user._id
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs ${
                        message.sender === user._id
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-gray-100 text-gray-800'
                      } p-2 rounded-lg`}
                    >
                      {message.type === 'text' ? (
                        <p className="break-words">{message.content}</p>
                      ) : message.type === 'image' ? (
                        <a
                          href={`${BASE_API_URL}${message.content}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={`${BASE_API_URL}${message.content}`}
                            alt="uploaded-file"
                            className="w-full h-auto rounded-lg"
                          />
                        </a>
                      ) : (
                        <video
                          src={`${BASE_API_URL}${message.content}`}
                          controls
                          className="w-full rounded-lg"
                        />
                      )}
                      <p className="text-xs text-gray-400 mt-1 text-right">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t bg-white p-4">
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="Type your message here..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button icon={<SmileOutlined />} />
                <Upload {...uploadProps}>
                  <Button icon={<PaperClipOutlined />} />
                </Upload>
                <Button
                  icon={<SendOutlined />}
                  type="primary"
                  onClick={handleSend}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Select a chat to start messaging.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
