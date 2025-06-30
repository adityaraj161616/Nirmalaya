# Nirmaalalya

A modern web application for booking wellness and Ayurvedic treatments.

## Features

- **Appointment Booking:**  
  Users can easily book appointments for various wellness and Ayurvedic treatments through a simple and intuitive interface.

- **Booking Slip Generation:**  
  After booking, the app generates a detailed booking slip with all relevant appointment information for the user.

- **Booking Confirmation Emails:**  
  Both the client and the doctor receive automated booking confirmation emails with all appointment details, ensuring clear communication and reducing no-shows.

- **Advanced Animations:**  
  The app leverages advanced GSAP (GreenSock Animation Platform) animations throughout the user interface, providing a smooth and engaging user experience.

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- GSAP (GreenSock Animation Platform)
- Supabase (for backend and authentication)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
```

### Running the Development Server

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
```

The output will be in the `dist/` directory.

## Project Structure

```
.
├── public/             # Static assets
├── src/                # Source code
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── integrations/   # Third-party integrations (e.g., Supabase)
│   ├── lib/            # Utility functions
│   └── pages/          # Application pages
├── package.json        # Project metadata and scripts
├── tailwind.config.ts  # Tailwind CSS configuration
└── vite.config.ts      # Vite configuration
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
