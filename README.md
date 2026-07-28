# Skillova Q3 — Fullstack Event Registration (Django + React)

A small fullstack app where a React form collects Email, Password (min 8
characters), and Age, and sends it to a Django API for registration. The
backend validates everything server-side. Even if the frontend is bypassed
(e.g. someone hits the API directly with bad data), invalid requests are
rejected with a 400 and clear error messages.

## Project structure

Skillova_q3/
├── backend/ → Django API (registration endpoint + validation)
└── frontend/ → React form (talks to the Django API)


## Prerequisites

- [Python](https://www.python.org/) 3.10+
- [Node.js](https://nodejs.org/) v18+
- Git

## Running the backend (Django)

1. Open a terminal in the `backend` folder:

cd backend

2. Create and activate a virtual environment:

python -m venv venv
venv\Scripts\activate

3. Install dependencies:
```
   pip install -r requirements.txt
```

4. Apply migrations:

python manage.py migrate

5. Run the server:

python manage.py runserver

   The API will be live at `http://127.0.0.1:8000/api/register/`.

## Running the frontend (React)

1. Open a **second** terminal in the `frontend` folder:
  cd frontend

2. Install dependencies:
  npm install

3. Start the app:

npm start

   Opens automatically at `http://localhost:3000`.

## Using it

With both servers running, fill out the form at `localhost:3000` and submit.
- Valid data → Django returns `201 Created`, the form clears and shows a success message.
- Invalid data (e.g. bad email, short password, non-numeric age) → Django returns `400 Bad Request` with field-specific errors, shown under each input.

## Why backend validation matters

Even though the React form checks input before submitting, that check only
protects users going through the UI. Anyone can bypass the frontend entirely
and send malformed data straight to the API (e.g. via Postman). so the
Django side re-validates everything independently, which is the only way to
guarantee bad data never reaches the database.