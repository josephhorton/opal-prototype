// app/assets/javascripts/search.js

console.log('Search JS loaded');

document.addEventListener('DOMContentLoaded', function () {
  const resultsBody = document.getElementById('results-body');
  const summary = document.getElementById('results-summary');

  const params = new URLSearchParams(window.location.search);
  const accountNumber = params.get('account-number-value')?.toLowerCase() || '';
  const caseNumber = params.get('case-number-value')?.toLowerCase() || '';
  const lastName = params.get('lastName')?.toLowerCase() || '';
  const firstName = params.get('firstName')?.toLowerCase() || '';
  const dobInput = params.get('date')?.replace(/\s/g, '');
  const niNumber = params.get('NINumber')?.toLowerCase() || '';
  const addressLine1 = params.get('addressLine1')?.toLowerCase() || '';
  const postcode = params.get('postcode')?.toLowerCase() || '';

  // Convert various date formats (e.g. "1/1/25", "01/01/2025", "15 May 1982") to "ddmmyyyy"
  function normaliseDate(dateString) {
    if (!dateString) return '';

    if (dateString.includes('/')) {
      const [d, m, y] = dateString.split('/').map(n => parseInt(n, 10));
      const fullYear = y < 100 ? (y > 30 ? 1900 + y : 2000 + y) : y;
      const date = new Date(fullYear, m - 1, d);
      return date.toLocaleDateString('en-GB').replace(/\D/g, '');
    }

    const parsed = new Date(dateString);
    return parsed instanceof Date && !isNaN(parsed)
      ? parsed.toLocaleDateString('en-GB').replace(/\D/g, '')
      : '';
  }

  const matches = window.accountData.filter(account => {
    const matchLast = lastName ? account.lastName.toLowerCase().includes(lastName) : true;
    const matchFirst = firstName ? account.firstName.toLowerCase().includes(firstName) : true;
    const matchNI = niNumber ? account.NINumber.toLowerCase().includes(niNumber) : true;
    const matchAddr = addressLine1 ? account.addressLine1.toLowerCase().includes(addressLine1) : true;
    const matchPostcode = postcode ? account.postcode.toLowerCase().includes(postcode) : true;
    const matchAccount = accountNumber ? account.accountNumber.toLowerCase().includes(accountNumber) : true;
    const matchCase = caseNumber ? account.pcr.toLowerCase().includes(caseNumber) : true;
    const matchDOB = dobInput ? normaliseDate(account.dateOfBirth) === normaliseDate(dobInput) : true;

    return matchLast && matchFirst && matchNI && matchAddr && matchPostcode && matchDOB && matchAccount && matchCase;
  });

  matches.forEach(account => {
    const row = `
      <tr class="govuk-table__row">
        <td class="govuk-table__cell">
          <a class="govuk-link govuk-link--no-visited-state" target="_blank" href="/account?id=${account.accountNumber}">
            ${account.accountNumber}
          </a>
        </td>
        <td class="govuk-table__cell">${account.lastName}, ${account.firstName}</td>
        <td class="govuk-table__cell">${account.aliases}</td>
        <td class="govuk-table__cell">${account.dateOfBirth}</td>
        <td class="govuk-table__cell">${account.addressLine1}</td>
        <td class="govuk-table__cell">${account.postcode}</td>
        <td class="govuk-table__cell">${account.NINumber}</td>
        <td class="govuk-table__cell">${account.parentOrg}</td>
        <td class="govuk-table__cell">${account.businessUnit}</td>
        <td class="govuk-table__cell">${account.pcr}</td>
        <td class="govuk-table__cell">${account.enf}</td>
        <td class="govuk-table__cell">${account.balance}</td>
      </tr>
    `;
    resultsBody.insertAdjacentHTML('beforeend', row);
  });
});


