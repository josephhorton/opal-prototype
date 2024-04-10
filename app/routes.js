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
    if (employer == "employer-yes"){
        response.redirect("./create-account/defendant-employer-details")
    } else {
        response.redirect("./create-account/parent-details")
    }
})
