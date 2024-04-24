//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // new MOJFrontend.ButtonMenu({
  //   container: document.querySelector(".moj-button-menu"),
  //   mq: "(min-width: 200em)",
  //   buttonText: "Menu",
  //   buttonClasses:
  //     "govuk-button--secondary moj-button-menu__toggle-button--secondary",
  // });

  function getMonthName(monthNumber) {
    const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
    return months[monthNumber - 1]; // Subtract 1 to convert to zero-based index
  }


  const express = require('express');
  const app = express();
  const nunjucks = require('nunjucks');

  nunjucks.configure('views', { autoescape: true, express: app });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.get('/date-of-birth', (req, res) => {
      // Example data, replace with actual request handling logic
      let data = {
          'defendantDoB-day': 22,
          'defendantDoB-month': 12,
          'defendantDoB-year': 2007
      };

      if (data['defendantDoB-month']) {
          data['defendantDoB-month'] = getMonthName(data['defendantDoB-month']);
      }

      res.render('date-of-birth.njk', {
          dateOfBirth: `${data['defendantDoB-day']}–${data['defendantDoB-month']}–${data['defendantDoB-year']}` || "Not provided"
      });
  });

  app.listen(3000, () => console.log('Server running on port 3000'));

  // Define the function to convert a numeric month into a month name
  function getMonthName(monthNumber) {
    const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
    return months[monthNumber - 1]; // Arrays are zero-indexed so subtract 1
  }



  
})


