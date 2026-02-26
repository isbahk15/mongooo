Mongoose Checkpoint: Basic Node and Express
This project is a functional implementation of the Mongoose library for Node.js, completed as part of the freeCodeCamp Back End Development and APIs certification.

🚀 Implementation Details
The project successfully connects to a MongoDB Atlas cluster and implements a full set of CRUD (Create, Read, Update, Delete) operations using a Person model.

🛠️ Features Included:
Database Connection: Established a secure connection via Mongoose using environmental variables (MONGO_URI).

Schema Design: Created a personSchema with a required name (String), age (Number), and an array of favoriteFoods (Strings).

CRUD Operations:

Create: Logic for createAndSavePerson and createManyPeople.

Read: Implemented findPeopleByName, findOneByFood, and findPersonById.

Update: Updates via the "Classic" method (Find-Edit-Save) and findOneAndUpdate.

Delete: Document removal using findByIdAndRemove and remove.

Advanced Querying: Chained search helpers including .sort(), .limit(), and .select() for optimized data retrieval.

✅ Verification
The project has been verified via the local terminal, successfully displaying the message:
Connected to MongoDB successfully.