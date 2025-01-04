export const getUrl = (role) => {
  if (role === 'admin') {
    return '/admin';
  } else if (role === 'startup') {
    return '/startup';
  } else {
    return '/sponsor';
  }
};

export const getRequestStatusColor = (status) => {
  switch (status) {
    case 'PENDING':
      return 'orange';
    case 'APPROVED':
      return 'green';
    default:
      return 'red';
  }
};

export const getAvatarForChat = (chat, user) => {
  if (!chat) return '';

  const { sponsor, startup } = chat;
  const nameOfChat = user.role === 'sponsor' ? startup.name : sponsor.name;

  return `https://ui-avatars.com/api/?name=${nameOfChat}`;
};

export const API_URL = process.env.API_URL;
export const PUSHER_CLUSTER = process.env.PUSHER_CLUSTER;
export const PUSHER_KEY = process.env.PUSHER_KEY;
export const BASE_API_URL = process.env.BASE_API_URL;