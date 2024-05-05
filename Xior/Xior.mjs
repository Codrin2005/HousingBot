import axios from 'axios';

axios.get('https://xior-booking.com')
  .then(function (response) {
    var csrfToken = response.data.csrfToken;
    console.log(csrfToken);
    // Now include csrfToken in your subsequent request
  })
  .catch(function (error) {
    console.log(error);
  });
