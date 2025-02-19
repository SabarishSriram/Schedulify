# Schedulify

Schedulify is a calendar scheduling application that allows users to book appointments with dynamic availability. It integrates Google Maps and Google Calendar to streamline scheduling and appointment management.

## Features

- **Dynamic Availability**: Users can set and manage their availability dynamically.
- **Google Calendar Integration**: Sync appointments directly with Google Calendar.
- **Google Maps Integration**: Location-based scheduling using Google Maps.
- **Appointment Management**: View, edit, and cancel booked appointments.

## Screenshots

### Home Page
![image](https://github.com/user-attachments/assets/067f149c-efa0-47f8-a3f7-929dfef26cd3)

### Booking Form
![image](https://github.com/user-attachments/assets/e9b6cb94-2958-4d4c-83dd-6d45ca506bba)

### Availability Route
![image](https://github.com/user-attachments/assets/3536879a-0dde-4d19-a61b-e6961bf78902)

### Scheduling Form
![image](https://github.com/user-attachments/assets/977024cb-c3bb-42f6-979d-e81f4b59609e)





## Tech Stack

- **Next.js**
- **TypeScript**
- **Prisma**
- **PostgreSQL**
- **shadcn/ui**
- **Nylas**
- **Auth.js**

## Self-Hosting Guide

### Deploy with Vercel

Click the button below to deploy instantly:

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/SabarishSriram/Schedulify)

### Alternatively:

#### 1. Fork the repository:

```sh
https://github.com/SabarishSriram/Schedulify.git
```

#### 2. Install dependencies:

```sh
npm install
```

#### 3. Set up environment variables

Create a `.env` file and add the necessary variables (refer to `.env.example`):

```sh
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
DATABASE_URL=
NYLAS_API_KEY=
NYLAS_API_URL=
NYLAS_CLIENT_ID=
NYLAS_REDIRECT_URI=
NEXT_URL=

```

#### 4. Run the development server:

```sh
npm run dev
```

#### 5. Set up Prisma:

```sh
npx prisma generate
npx prisma db push
```

---

