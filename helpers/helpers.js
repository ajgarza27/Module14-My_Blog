module.exports = {
    // Format a date
    format_date: (date) => {
      return date.toLocaleDateString();
    },
    
    // Format URL
    format_url: (url) => {
      return url
        .replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .split('/')[0]
        .split('?')[0];
    },
    
    format_plural: (word, amount) => {
      if (amount !== 1) {
        return `${word}s`;
      }
      return word;
    },
  };