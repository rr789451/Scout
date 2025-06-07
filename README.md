# Scout Mobile App

<p align="center">
  <img src="assets/docs/images/app-banner.png" width="800" alt="Scout App">
</p>

A modern, feature-rich property search and management application built with React Native, TypeScript, and Appwrite. The app allows users to browse, filter, and view detailed information about various properties, including maps, reviews, and more.

## 🚀 Features

- **Home Screen**
  - Featured properties carousel
  - Personalized property recommendations

- **Explore Interface**
  - Advanced search with real-time filtering
  - Interactive map integration
  - Customizable search parameters
  - Price range and property type filtering

- **Property Details**
  - High-resolution image galleries
  - Comprehensive property information
  - Interactive location maps
  - Verified user reviews and ratings
  - Agent contact information

- **User Profiles**
  - Personalized user settings
  - Account management options
  - Bookmarked properties management
  - Rental history and current rentals

- **Payment Integration**
  - Secure payment processing for property bookings
  - Rental payment scheduling 

## 💻 Tech Stack

- **Framework**: React Native with TypeScript
- **Development Platform**: Expo
- **Styling**: Tailwind CSS (via React Native Tailwind)
- **Backend & Authentication**: Appwrite
- **Map Integration**: React Native Maps
- **Payment Processing**: Stripe integration

## 📁 Project Structure

```
/
├── app/                 # Main application code
│   ├── (root)/          # Screen components
│   ├── _layout.tsx      # Navigation configuration
│   └── sign-in.tsx      # Sign In Page
├── components/          # Reusable UI components
├── constants/           # Application constants
├── lib/                 # Utility functions and services
├── assets/              # Static assets
│   ├── images/          # Application images
│   ├── icons/           # Custom icons
│   └── fonts/           # Custom fonts
└── .env.local           # Environment variables
```

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/rr789451/scout.git
cd scout
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local
```

4. Configure the following environment variables:
```env
EXPO_PUBLIC_APPWRITE_PROJECT_ID=
EXPO_PUBLIC_APPWRITE_ENDPOINT=
EXPO_PUBLIC_APPWRITE_DATABASE_ID=
EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID=
EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID=
EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID=
EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID=
EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID=
```

5. Start the development server:
```bash
npx expo start
```

## 🔑 Authentication

The application uses Appwrite for authentication. Ensure you have set up the following:

- Create an Appwrite project
- Configure authentication methods (Google OAuth provider)
- Set up the necessary collections in Appwrite Console
- Update the environment variables with your Appwrite credentials

## 💾 Database Schema

### Users Collection
```typescript
interface Users {
  userId: string;
  rentedProperties: string[];
  bookmarkedProperties: string[];
  accountStatus: enum;
  avatar: string;
  lastActive: Date;
  accountCreated: Date;
  email: string;
  emailVerification: boolean;
  phone: string;
  phoneVerification: boolean;
  userName: string;
}
```

### Properties Collection
```typescript
interface Properties {
  name: string;
  type: enum;
  description: string;
  price: number;
  address: string;
  area: number
  bedrooms: number;
  bathrooms: number;
  rating: number;
  facilities: enum;
  image: url;
  geolocation: string;
}
```

### Galleries Collection
```typescript
interface Galleries {
  image: url
}
```

### Reviews Collection
```typescript
interface Reviews {
  name: string;
  avatar: url;
  rating: number;
  review: string;
}
```

### Agents Collection
```typescript
interface Agents {
  name: string;
  email: email;
  avatar: url;
  phone: string
}
```

## 👥 User Roles

### Regular Users
- Browse and search properties
- View detailed property information
- Bookmark properties for future reference
- Make rental payments

### Agents
- Manage property listings
- Update property information

## 📱 Screen Flows

### Main Navigation
- Home (Featured & Recommendations)
- Explore (Search & Filters)
- Profile (Settings)

### Property Discovery Flow
1. Browse featured properties on Home screen
2. Use advanced search and filters on Explore screen
3. Save properties to bookmarks
4. View detailed property information
5. Contact agent for inquires

### Rental Management Flow
1. Apply for property rental
2. Complete payment processing
3. Track rental history

### User Profile Flow
1. Access profile settings
2. Manage bookmarked properties
3. View current rentals

## 🚀 Development

### Running on Simulator/Emulator
```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

### Building for Production
```bash
# Create a production build
eas build --platform all

# Preview production build
eas build:run
```

## 📸 Screenshots

<div align="center">
  <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-bottom: 20px;">
    <img src="assets/docs/images/home-screen.jpg" width="250" alt="Home Screen" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    <img src="assets/docs/images/explore-screen.jpg" width="250" alt="Explore Screen" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    <img src="assets/docs/images/profile-screen.jpg" width="250" alt="Profile Screen" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  </div>
  <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;">
    <img src="assets/docs/images/details-screen-1.jpg" width="250" alt="Details Screen" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    <img src="assets/docs/images/details-screen-2.jpg" width="250" alt="Details Screen" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    <img src="assets/docs/images/search-screen.jpg" width="250" alt="Search Screen" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  </div>
</div>

## 🔮 Future Enhancements

### Phase 3 Development Roadmap

1. **Dual Authentication System**
   - Separate login flows for property agents and regular users
   - Agent-specific dashboard and listing management

2. **Real-Time Chat System**
   - Direct messaging between agents and potential renters
   - Chat history and message threading
   - File sharing capabilities
   - Push notifications for new messages

## 🤝 Contributing

- Fork the repository
- Create a feature branch
```bash
git checkout -b feature/YourFeature
```
- Commit changes
```bash
git commit -m 'Add some feature'
```
- Push to the branch
```bash
git push origin feature/YourFeature
```
- Open a Pull Request

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 🆘 Support

For support, please:
- Open an issue in the GitHub repository
- Contact me at [Rohit](mailto:rr789451@gmail.com)

## ✨ Acknowledgments

Built with the following amazing technologies:

[![React Native](https://img.shields.io/badge/React_Native-0.71+-61DAFB?style=for-the-badge&logo=react)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Expo](https://img.shields.io/badge/Expo-SDK_48+-000020?style=for-the-badge&logo=expo)](https://expo.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Appwrite](https://img.shields.io/badge/Appwrite-2.0+-F02E65?style=for-the-badge&logo=appwrite)](https://appwrite.io/)
