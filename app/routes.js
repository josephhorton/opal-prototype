//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const rows = require('./data/rows.json')

const reportsRoutes = require('./routes/reports')
reportsRoutes(router)

// Add your routes here

// DAILY CHECKS
router.get('/bank-list', (req, res) => {
  res.render('bank-list')
})

// MANUAL CASH INPUT

router.post('/suspense-category-form', function (req, res) {

  var paymentCategory = req.session.data['payment1Category']

  if (paymentCategory == "Criminal"){
    res.redirect('/manual-cash-input/payment-1/search-account.html')
  } if (paymentCategory == "Court fee"){
    res.redirect('/manual-cash-input/payment-1/court-fee-details.html')
  } if (paymentCategory == "Suspense"){
    res.redirect('/manual-cash-input/payment-1/suspense.html')
  }

})

// OTHER FLOWS



router.get('/sandbox', function (req, res) {
  res.render('sandbox', { rows })
})


require('./routes/account')(router)


router.get('/clear-session', function (req, res) {
    req.session.destroy(function (err) {
      res.redirect('/index.html'); // Redirect to index.html after clearing session
    });
});

router.get('/clear-search', function (req, res) {
    req.session.destroy(function (err) {
      res.redirect('/search/search.html'); // Redirect to index.html after clearing session
    });
});


router.post('/create-account-form', function(request, response) {

    var defendantFine = request.session.data['defendantTypeF']
    var defendantFixedPentalty = request.session.data['defendantTypeFP']
    var accountType = request.session.data['accountType']


    if (accountType == "Fine") {
        response.redirect("./create-account/account-details?courtHearingLanguage=English&documentLanguage=English")
    } 
    else if (accountType == "Fixed Penalty") {
        response.redirect("./create-account/fixed-penalty/fixed-penalty-details?offenceType=Vehicle")
    } 
    else if (accountType == "Conditional Caution"){
        response.redirect("./create-account/end-of-prototype")
    }
})

router.post('/defendant-type-question', function(request, response) {

    var defendant = request.session.data['defendantType']

    if (defendant == "defendant-company"){
        response.redirect("./create-account/company-details")
    } else {
        response.redirect("./create-account/individual-details")
    }
})


router.post('/contact-details-question', function(request, response) {

    var defendant = request.session.data['defendantType']

    if (defendant == "defendant-company"){
        response.redirect("./create-account/end")
    } else {
        response.redirect("./create-account/employer-question")
    }
})


router.post('/employer-question', function(request, response) {

    var employer = request.session.data['employer']
    var defendant = request.session.data['defendantType']
    if (employer == "employer-yes"){
        response.redirect("./create-account/employer-details")
    } 
    else if ( (employer == "employer-no") && (defendant == "defendant-individual-parent-pay") ){
        response.redirect("./create-account/parent-details")
    }
    else {
        response.redirect("./create-account/end")
    }
})

router.post('/employer-details-question', function(request, response) {

    var defendant = request.session.data['defendantType']

    if (defendant == "defendant-individual-parent-pay"){
        response.redirect("./create-account/parent-details")
    } else {
        response.redirect("./create-account/end")
    }
})

router.post('/personal-details-question', function(request, response) {

    var changeAnswer = request.session.data['change-personal-details']

    if (changeAnswer == "true"){
        response.redirect("./create-account/personal-details/check-answers")
    } else {
        response.redirect("./create-account/personal-details/address?pd-status=started")
    }
})

router.post('/sending-court-question', function(request, response) {

    var changeAnswer = request.session.data['change-sending-court']

    if (changeAnswer == "true"){
        response.redirect("./create-account/court-details/check-answers")
    } else {
        response.redirect("./create-account/court-details/enforcement-court?cd-status=started")
    }
})


const reports = require('./data/reports.json');
let inMemoryReports = [...reports]; // Clone so we can modify it without overwriting the file

// --- GET route: show reports (with optional business unit filter) ---
router.get('/quarter-year-end/quarter-year-end-report', function (req, res) {
  const selectedBU = req.session.data['businessUnit'] || 'all';
  let filteredReports = inMemoryReports;

  if (selectedBU && selectedBU !== 'all') {
    filteredReports = inMemoryReports.filter(report => report.unit === selectedBU);
  }

  // Check for success message flag
  const showBanner = req.session.data['reportCreated'];
  // Clear flag so it doesn’t persist after first view
  req.session.data['reportCreated'] = false;

  res.render('quarter-year-end/quarter-year-end-report', {
    reports: filteredReports,
    businessUnit: selectedBU,
    showBanner
  });
});



// --- POST route: create a new report ---
router.post('/quarter-year-end/quarter-year-end-report', function (req, res) {
  const selectedUnit = req.session.data['createReportBusinessUnit'];
  const selectedType = req.session.data['createReportReportType'];

  if (selectedUnit && selectedType) {
    const newReport = {
      date: '2026-04-01T12:30:00Z',
      displayDate: '01 Apr 2026 at 12:30',
      title: `${selectedType} report`,
      unit: selectedUnit,
      author: 'generic.user',
      status: 'Ready'
    };

    inMemoryReports.unshift(newReport);

    // Set flag to show banner after redirect
    req.session.data['reportCreated'] = true;
  }

  res.redirect('/quarter-year-end/quarter-year-end-report');
});





module.exports = router


