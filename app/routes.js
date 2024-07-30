//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

require('./routes/account')(router)

router.get('/clear-session', function (req, res) {
    req.session.destroy(function (err) {
      res.redirect('/index.html'); // Redirect to index.html after clearing session
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
        response.redirect("./create-account/end-of-prototype")
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

