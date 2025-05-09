# 🚄 Train Schedule API

<div align="center">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

</div>

Backend API for the Train Schedule application, built with NestJS and TypeScript.

---

## ✨ Key Features

<table>
  <tr>
    <td width="50%">
      <h3>🔐 Authentication</h3>
      <ul>
        <li>JWT authentication</li>
        <li>Secure user management</li>
        <li>Role-based access control</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🔍 Train Data API</h3>
      <ul>
        <li>CRUD operations for train schedules</li>
        <li>Filtering and sorting</li>
        <li>Validation with class-validator</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>⚙️ Architecture</h3>
      <ul>
        <li>Modular NestJS structure</li>
        <li>Global exception handling</li>
        <li>Environment-based configuration</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🛡️ Security</h3>
      <ul>
        <li>CORS protection</li>
        <li>Input validation</li>
        <li>HTTP exception filters</li>
      </ul>
    </td>
  </tr>
</table>

## 🧩 Technologies

<details>
<summary><b>Backend Stack</b></summary>

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Typed programming language
- **Express** - Web framework for Node.js
- **dotenv** - Environment variable management
- **class-validator** - Input validation

</details>

<details>
<summary><b>Development Tools</b></summary>

- **ESLint** - Static code analysis
- **Prettier** - Code formatting 
- **TypeScript** - Strict typing

</details>

## 🏗️ Project Architecture

```
src/
├── 📁 app.module.ts          # Main application module
├── 📁 main.ts                # Application entry point
├── 📄 setup-cors.ts          # CORS configuration
│
├── 📁 common/                # Common utilities
│   └── 📁 filters/           # Global filters
│       └── 📄 http-exception.filter.ts  # HTTP exception handling
│
├── 📁 configs/               # Application configuration
│   └── 📄 configs.type.ts    # Configuration type definitions
│
├── 📁 modules/               # Feature modules
│   ├── 📁 auth/              # Authentication module
│   │   ├── 📁 controllers/   # Auth controllers
│   │   ├── 📁 dto/           # Data transfer objects
│   │   ├── 📁 guards/        # Authentication guards
│   │   └── 📁 services/      # Auth services
│   │
│   └── 📁 trains/            # Trains module
│       ├── 📁 controllers/   # Train controllers
│       ├── 📁 dto/           # Data transfer objects
│       ├── 📁 entities/      # Train entities
│       └── 📁 services/      # Train services
│
└── 📁 utils/                 # Utility functions
```

## 🚀 Implementation Features

### Validation and Error Handling

The application uses NestJS's built-in validation:

```typescript
// Global validation pipe setup
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
}));

// Global exception filter
app.useGlobalFilters(new HttpExceptionFilter());
```

### Configuration Management

Environment-based configuration with strong typing:

```typescript
// Type-safe configuration
const appConfig = configService.get<AppConfig>('app');

await app.listen(appConfig.port, appConfig.host, () => {
  console.log(`Server running on http://${appConfig.host}:${appConfig.port}`);
});
```

### Security Features

- CORS configuration for secure client-server communication
- Input validation to prevent malicious data
- Exception filters for proper error handling

## 🔧 Running the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/username/train-schedule-api.git
   cd train-schedule-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   PORT=3000
   HOST=localhost
   DATABASE_URL=your_database_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```bash
   npm run start:dev
   ```

5. The API will be available at: [http://localhost:3000](http://localhost:3000)

## 📦 API Endpoints

The API provides the following endpoints:

- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `GET /trains` - Get all train schedules
- `GET /trains/:id` - Get a specific train schedule
- `POST /trains` - Create a new train schedule
- `PATCH /trains/:id` - Update a train schedule
- `DELETE /trains/:id` - Delete a train schedule
