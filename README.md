# ClassAlign

A modern approach to class mangaement, classroom real-time availability tracking and booking, with AI scheduling and display.

## Features

- User authentication (Teacher/Student roles)
- Interactive home screen with upcoming classes
- Classroom availability and booking system
- Calendar integration for scheduling
- Real-time notifications and announcements
- Profile management
- Schedule Display

## Tech Stack

- React Native
- Firebase (Authentication & Database)
- React Navigation
- Custom UI Components
- Custom Fonts (Lora, Quicksand)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Firebase:
   - Create a Firebase project
   - Add your Firebase configuration in `src/firebase.js`

4. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
ClassAlign/
├── src/
│   ├── screens/         # Screen components
│   ├── navigation/      # Navigation configuration
│   ├── context/        # Context providers
│   └── firebase.js     # Firebase configuration
├── assets/
│   ├── fonts/          # Custom fonts
│   └── images/         # Images and icons
└── App.js              # Root component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
