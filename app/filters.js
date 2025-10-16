//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here

addFilter('sortByDate', function (items, key, order = 'asc') {
  const clonedItems = [...items]; // 🔧 clone to avoid in-place mutation
  return clonedItems.sort(function (a, b) {
    const dateA = new Date(a[key]);
    const dateB = new Date(b[key]);
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
});



addFilter('removeEmpty', function (items) {
    // Directly return undefined if items is falsy (null, undefined, false, 0, '', etc.)
    if (!items) return
  
    // Handle the case when items is a string
    if (typeof items === 'string') {
      return items.trim() ? items : undefined
    }
  
    // Handle the case when items is an array
    if (Array.isArray(items)) {
      const output = items.filter(item => item)
      return output.length > 0 ? output : undefined
    }
  
    // Return undefined for other types
    return
  })

  
  // Define the custom filter
  addFilter('formatDate', function(date) {
      const parts = date.split('/');
      if (parts.length === 3) {
          return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      return date; // Return the original date if it doesn't match the expected format
  });
  