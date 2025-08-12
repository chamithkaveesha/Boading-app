# 🏠 බෝඩිම් TIKKA - Boarding House Management System

A modern, comprehensive web application for managing boarding houses and rental properties. Built with React and designed to streamline property management, tenant tracking, and payment processing.

## 🌟 Features

### 🏠 Room Management
- Create and manage multiple rooms
- Track room occupancy and resident details
- Add/remove residents from rooms
- Centralized room organization system

### 💰 Payment Tracking
- Handle regular payments and re-payments
- Track dues and financial records
- Payment history and balance tracking
- Multi-currency support
- Generate payment reports

### 👥 User Management
- Secure user authentication (login/signup)
- Role-based access control
- Admin dashboard for property owners
- User dashboard for residents
- Profile management

### 📊 Analytics & Reports
- Comprehensive transaction logs
- Payment analytics
- Financial reporting
- Real-time data tracking

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **React Router Dom** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Zustand** - Lightweight state management

### Form & Validation
- **React Hook Form** - Performant forms with easy validation
- **Yup** - Schema validation
- **@hookform/resolvers** - Form validation resolvers

### HTTP & Authentication
- **Axios** - HTTP client for API requests
- **JWT Decode** - JWT token handling


## 📁 Project Structure

```
src/
├── api/                    # API service layer
│   ├── auth.js            # Authentication services
│   ├── room.js            # Room management APIs
│   ├── user.js            # User management APIs
│   ├── payment.js         # Payment processing APIs
│   └── Dashboard.js       # Dashboard data APIs
├── components/            # Reusable UI components
│   ├── NavBar.jsx         # Navigation component
│   ├── Footer.jsx         # Footer component
│   ├── RoomTable.jsx      # Room listing table
│   ├── AddRoomPopup.jsx   # Room creation modal
│   ├── AddMemberPopup.jsx # Member addition modal
│   └── ProtectedRoute.jsx # Route protection
├── pages/                 # Main application pages
│   ├── HomePage.jsx       # Landing page
│   ├── Dashboard.jsx      # User dashboard
│   ├── DashboardAdmin.jsx # Admin dashboard
│   ├── Login.jsx          # Authentication page
│   ├── Payment.jsx        # Payment processing
│   └── Account.jsx        # User profile
├── context/               # React context providers
│   ├── GlobalState.jsx    # Global state management
│   └── CurrencyContext.jsx# Currency context
├── config/                # Configuration files
│   └── api.js            # API configuration
└── utils/                 # Utility functions
    └── errorHandler.js    # Error handling utilities
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/chamithkaveesha/Boading-app.git
   cd Boading-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🐳 Docker Deployment

The project includes Docker configuration for easy deployment:

### Using Docker Compose (Recommended)

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in detached mode
docker-compose up -d
```

### Using Docker directly

```bash
# Build the image
docker build -t boarding-app .

# Run the container
docker run -p 80:80 boarding-app
```

## 🏗️ Architecture

### State Management
- **Zustand** for lightweight, scalable state management
- **React Context** for theme and currency settings
- Local component state for UI interactions

### Routing
- Protected routes for authenticated users
- Role-based route access (Admin vs User)
- Lazy loading for optimal performance

### API Integration
- Centralized API configuration
- JWT token-based authentication
- Error handling and retry logic
- Request/response interceptors

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=your_api_endpoint
VITE_JWT_SECRET=your_jwt_secret
```

### API Configuration
Update `src/config/api.js` with your backend endpoints.

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Nginx Configuration
The project includes an `nginx.conf` file for production deployment with Nginx.

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Bug Reports & Feature Requests

Please use the [GitHub Issues](https://github.com/chamithkaveesha/Boading-app/issues) page to report bugs or request features.

## 📞 Support

For support and questions, please contact:
- Email: [gdchamithkaveesha@gmail.com]
- GitHub: [@chamithkaveesha](https://github.com/chamithkaveesha)


