// Handlebars helpers for the Kiaalap dashboard

export const helpers = {
  // Compare helper for equality
  eq: (a, b) => a === b,

  // Check if value exists and is not empty
  exists: (value) => value !== undefined && value !== null && value !== '',

  // Convert string to lowercase
  lowercase: (str) => (str ? str.toLowerCase() : ''),

  // Convert string to uppercase
  uppercase: (str) => (str ? str.toUpperCase() : ''),

  // Format date
  formatDate: (date, format) => {
    if (!date) return '';
    const d = new Date(date);
    if (format === 'short') {
      return d.toLocaleDateString();
    }
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  },

  // Generate breadcrumb path
  breadcrumb: (path, separator = ' > ') => {
    if (!path || !Array.isArray(path)) return '';
    return path.map((item) => item.title || item).join(separator);
  },

  // Check if current page is active
  isActive: (currentPage, targetPage) => currentPage === targetPage,

  // Generate unique ID
  uniqueId: (prefix = 'id') => `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,

  // Truncate text
  truncate: (text, length = 100, suffix = '...') => {
    if (!text || text.length <= length) return text;
    return text.substring(0, length) + suffix;
  },

  // Conditional class helper
  conditionalClass: (condition, trueClass, falseClass = '') => {
    return condition ? trueClass : falseClass;
  },

  // JSON stringify for debugging
  json: (context) => JSON.stringify(context, null, 2),

  // Math operations
  add: (a, b) => (parseInt(a) || 0) + (parseInt(b) || 0),
  subtract: (a, b) => (parseInt(a) || 0) - (parseInt(b) || 0),
  multiply: (a, b) => (parseInt(a) || 0) * (parseInt(b) || 0),

  // Array operations
  length: (array) => (Array.isArray(array) ? array.length : 0),
  first: (array) => (Array.isArray(array) && array.length > 0 ? array[0] : null),
  last: (array) => (Array.isArray(array) && array.length > 0 ? array[array.length - 1] : null),

  // String operations
  startsWith: (str, prefix) => (str && typeof str === 'string' ? str.startsWith(prefix) : false),
  endsWith: (str, suffix) => (str && typeof str === 'string' ? str.endsWith(suffix) : false),
  contains: (str, substring) => (str && typeof str === 'string' ? str.includes(substring) : false),
};
