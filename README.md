# FarmConnectNG 🧺

A Multi-Vendor Agriculture Marketplace connecting farmers directly with consumers.

## Features

- 🌾 Farmer Registration and Approval System
- 🏪 Individual Farm Store Pages
- 📦 Product Management with Approval Workflow
- 🚚 Order & Delivery Management
- 💰 Earnings and Withdrawal System
- ⭐ Customer Reviews and Ratings
- 🔍 Advanced Search and Filtering
- 📱 Mobile Responsive Design

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Headless UI
- **Icons**: Heroicons
- **Notifications**: React Hot Toast

## Prerequisites

- Node.js 18.x or later
- PostgreSQL database
- npm or yarn package manager

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/farmconnectng.git
   cd farmconnectng
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/farmconnectng"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Initialize the database:
   ```bash
   npx prisma migrate dev
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js 14 app directory
├── components/         # Reusable UI components
├── lib/               # Utility functions and configurations
├── prisma/            # Database schema and migrations
└── types/             # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@farmconnectng.com or join our Slack channel. 