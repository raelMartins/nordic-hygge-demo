export const tagCoOwnStatus = key => {
  switch (key) {
    case 'accepted':
      return {
        bg: '#09DBA01A',
        color: '#09DBA0',
        text: 'Accepted',
      };
    case 'pending':
      return {
        bg: '#FF9D1D1A',
        color: '#FF9D1D',
        text: 'Pending',
      };
    case 'declined':
      return {
        bg: '#FF6A6A1A',
        color: '#FF6A6A',
        text: 'Rejected',
      };
    case 'NON-DEFAULTING':
      return {
        bg: '#09DBA01A',
        color: '#09DBA0',
        text: 'Paid',
      };
    case 'DEFAULTING':
      return {
        bg: '#FF9D1D1A',
        color: '#FF9D1D',
        text: 'Pending',
      };
    case 'HOST':
      return {
        bg: '#F0F0F0',
        color: '#6499E9',
        text: 'Host',
      };
    default:
      return {
        bg: '#1A1D24',
        color: 'matador_text.100',
        text: '-',
      };
  }
};
