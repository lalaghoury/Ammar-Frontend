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
