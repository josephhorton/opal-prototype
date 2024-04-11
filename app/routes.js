//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

require('./routes/account')(router)

router.post('/employer-question', function(request, response) {

    var employer = request.session.data['employer']
    var defendant = request.session.data['defendantType']
    if (employer == "employer-yes"){
        response.redirect("./create-account/defendant-employer-details")
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
