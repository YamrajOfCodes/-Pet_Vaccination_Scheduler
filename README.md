
# Pet Vaccination Scheduler

A React and Node.js application designed to help veterinary clinics manage pet vaccination schedules efficiently. This project includes a responsive frontend interface and a backend with RESTful API endpoints.


## Features

- Frontend (React)
Dashboard: View all pet vaccination records, search, and filter by vaccination status.

Add and Edit Form: Add new pet details or update existing records.

Calendar View: Interactive calendar highlighting vaccination due dates.

Search and Filter: Search pets by name and filter based on vaccination status.

Responsive Design: Optimized for desktop and mobile using Tailwind CSS.

 - Backend (Node.js/Express)

CRUD Operations: REST API endpoints for managing pet records.

GET /api/pets: List all pets.

POST /api/pets: Add a new pet.

PUT /api/pets/:id: Update pet details.

DELETE /api/pets/:id: Delete a pet record.

Database Integration: Supports MongoDB for persistent storage.

Data Validation: Ensures valid inputs for all fields.
## FAQ

 #### What is the purpose of the Pet Vaccination Scheduler?


The Pet Vaccination Scheduler is designed to help veterinary clinics manage pet vaccination schedules. It provides tools to track vaccination records, schedule upcoming vaccinations, and streamline pet data management.

####  How does the calendar view work?

The calendar view shows a monthly or weekly grid highlighting dates with upcoming vaccinations. Clicking on a highlighted date opens a popup with the details of pets scheduled for vaccinations on that day.


#### Can we Schedule Vaccination without login

No, Register yourself is mandatory here..


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`USER_SECRET_KEY`

`DATABASE_URL`

`PORT`

