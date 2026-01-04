import { format, parseISO, isToday, isThisWeek, isThisMonth } from 'date-fns';

export const formatHours = (hours) => {
  if (hours === 0) return '0.0 hrs';
  const sign = hours > 0 ? '+' : '';
  return `${sign}${hours.toFixed(1)} hrs`;
};

export const formatDate = (dateString) => {
  try {
    return format(parseISO(dateString), 'MMM dd, yyyy');
  } catch {
    return dateString;
  }
};

export const formatDateTime = (dateString) => {
  try {
    return format(parseISO(dateString), 'MMM dd, yyyy HH:mm');
  } catch {
    return dateString;
  }
};

export const filterByDate = (logs, filter) => {
  if (filter === 'all') return logs;
  
  const now = new Date();
  return logs.filter(log => {
    try {
      const logDate = parseISO(log.date);
      switch (filter) {
        case 'today':
          return isToday(logDate);
        case 'week':
          return isThisWeek(logDate, { weekStartsOn: 1 });
        case 'month':
          return isThisMonth(logDate);
        default:
          return true;
      }
    } catch {
      return false;
    }
  });
};

export const searchLogs = (logs, searchTerm) => {
  if (!searchTerm) return logs;
  
  const term = searchTerm.toLowerCase();
  return logs.filter(log => 
    log.comment?.toLowerCase().includes(term) ||
    log.userEmail?.toLowerCase().includes(term) ||
    log.userName?.toLowerCase().includes(term)
  );
};

export const sortLogs = (logs, order) => {
  const sorted = [...logs].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
  return sorted;
};

export const calculateBalance = (logs) => {
  return logs.reduce((sum, log) => sum + (parseFloat(log.creditedHours) || 0), 0);
};
