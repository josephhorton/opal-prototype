document.addEventListener('DOMContentLoaded', function () {
  // Only run on the /account page
  if (!window.location.pathname.includes('/account')) return;

  const params = new URLSearchParams(window.location.search);
  const accountId = params.get('id');
  const account = window.accountData.find(acc => acc.accountNumber === accountId);

  if (!account) {
    document.body.innerHTML = '<p class="govuk-body">Account not found.</p>';
    return;
  }

  document.getElementById('accountNumber').textContent = account.accountNumber;
  document.getElementById('fullName').textContent = `${account.firstName} ${account.lastName}`;
  document.getElementById('dob').textContent = account.dateOfBirth;
  document.getElementById('address').textContent = `${account.addressLine1}, ${account.postcode}`;
  document.getElementById('niNumber').textContent = account.NINumber;
  document.getElementById('balance').textContent = account.balance;
});
