const Amadeus = require("amadeus") 

const amadeus = new Amadeus({
    clientId : "Xk3oqx7VCr344IidedqmU3UK9Nr7yVRa",
    clientSecret: "zBh2azNRJADQVa3W",
})
const searchAirport = async (req,res) => {
    
    const parameter = req.params['search']
    
    await amadeus.referenceData.locations.get({
        keyword: parameter,
        subType: Amadeus.location.any
    })
    .then(function(response){
        res.send(response.result)
    })
    .catch(function(response){
        res.status(404)
        res.send({ error: '404', message: 'not airport and city is not founded', success: false })
    })
  
}

const flightSearch = async (req,res) => {
   const originCode = req.query.originCode;
   const destinationCode = req.query.destinationCode;
   const dateOfDeparture = req.query.dateOfDeparture;

   await amadeus.shopping.flightOffersSearch.get({
    originLocationCode:originCode,
    destinationLocationCode: destinationCode,
    departureDate: dateOfDeparture,
    adults: "1",
    max : "5"
   })
   .then(function(response){
    res.send(response.result)
   })
   .catch(function(response){
    res.send({ error: '404', message: 'no flights are found.please try another destination', success: false })
   })
}

const flightConfirmation = async (req,res) => {
    const flight = req.body.flight;
    
    amadeus.shopping.flightOffers.pricing
      .post(
        JSON.stringify({
          data: {
            type: "flight-offers-pricing",
            flightOffers: [flight],
          },
        })
      )
      .then(function(response) {
        res.status(201)
        res.send(response.result);
      })
      .catch(function(response) {
        res.status(404)
        res.send({ error: '404', message: 'cannot book your flights', success: false });
      });
}

const flightBooking = async (req,res) => {
const flight = req.body.flight;
const name = req.body.name;
  await amadeus.booking.flightOrders
    .post(
      JSON.stringify({
        data: {
          type: "flight-order",
          flightOffers: [flight],
          travelers: [
            {
              id: "1",
              dateOfBirth: "1982-01-16",
              name: {
                firstName: name.first,
                lastName: name.last,
              },
              gender: "MALE",
              contact: {
                emailAddress: "shahidkhannsucse74@gmail.com",
                phones: [
                  {
                    deviceType: "MOBILE",
                    countryCallingCode: "+880",
                    number: "1797587727",
                  },
                ],
              },
              documents: [
                {
                  documentType: "PASSPORT",
                  birthPlace: "Dhaka",
                  issuanceLocation: "Dhaka",
                  issuanceDate: "2015-04-14",
                  number: "00000000",
                  expiryDate: "2025-04-14",
                  issuanceCountry: "ES",
                  validityCountry: "ES",
                  nationality: "ES",
                  holder: true,
                },
              ],
            },
          ],
        },
      })
    )
    .then(function(response) {
      res.send(response.result);
    })
    .catch(function(response) {
    res.status(404)
      res.send({error: 404, message: 'Cannot book your flight.Please try agin later.', success:false});
    });

}
module.exports={searchAirport, flightSearch,flightConfirmation}