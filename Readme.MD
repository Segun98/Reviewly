# Reviewly

## ReviewLy is a platform where users can sign up with their basic information and post reviews about apartments they've previously lived in.

# API

### Create Apartment

      Create an apartment to be reviewed

- URL

      /api/v1/apartment/create

- Method

      POST

- Body

        Content: {
        "name": "John's Place",

        "location":"5, Parkview Street", Idumota, Lagos",

        "description":"A 3 bedroom flat apartment with an open pool",

        "image":"https://image.unsplash.com"
        }

- Response:

  - Success Code: 201
  - Error Code: 400

\

### Get All Apartments

      Fetch all apartments

- URL

      /api/v1/apartments

- Method

      GET

- Success Response

  - Code: 200

         Content: [
        {
        "_id": "2852785387231",

        "name": "John's Place",

        "location":"5, Parkview Street",Idumota, Lagos",

        "description":"A 3 bedroom flat apartment with an open pool",

        "image":"https://image.unsplash.com"
        },

        {
        "_id": "57287215752"
        "name": "Fred's Lounge",
        "location":"3, Victoria Street",
        VI, Lagos",
        "description":"A 3 bedroom flat apartment with an open pool",
        "image":"https://image.unsplash.com",
        "createdAt": "2020-12-10T19:56:07.351Z"
        }
        ]

- Error Response:

  - Code: 400

### Get apartment

      Fetch a single apartment by id

- URL

      /api/v1/apartment/{id}

- Method

      GET

- Success Response

  - Code: 200

            Content:
            {
            "_id": "2852785387231",

            "name": "John's Place",

            "location":"5, Parkview Street",Idumota, Lagos",

            "description":"A 3 bedroom flat apartment with an open pool",

            "image":"https://image.unsplash.com"
            }

- Error Response:

  - Code: 400

### Create a review

      write a review

- URL

      /api/v1/review/create

- Method

      POST

- Headers

      "authorization": "bearer <your access token>"

- Body

        Content: {
        "name": "John's Place",

        "apartmentId": "John's Place",

        "landlordReview": "John's Place",

        "environmentReview":"5, Parkview Street", Idumota, Lagos",

        "amenitiesReview":"A 3 bedroom flat apartment with an open pool",

        "image":"https://image.unsplash.com"
        }

- Response:

  - Success Code: 201
  - Error Code: 400
