# KoinX - Tax Loss Harvesting

A React-based tax loss harvesting interface that helps users optimize their cryptocurrency portfolio for tax purposes by identifying opportunities to harvest tax losses while maintaining investment positions.

## Features

- Real-time capital gains calculation
  - Pre-harvesting view showing current capital gains/losses
  - Post-harvesting view with dynamic updates based on selections
  - Automatic tax savings calculation
- Interactive holdings table
  - Detailed view of your crypto portfolio
  - Bulk selection with select all functionality
  - Individual asset selection
  - "View All" expansion option
- Responsive design optimized for all devices
- Loading states and error handling
- Type-safe implementation with TypeScript

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (for icons)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── api/          # API mock implementations
├── components/   # React components
├── context/      # React context providers
├── styles/       # CSS styles
├── types/        # TypeScript type definitions
├── utils/        # Utility functions
└── main.tsx      # Application entry point
```

## Components

- **PreHarvestingCard**: Displays current capital gains status
- **AfterHarvestingCard**: Shows projected gains after selected harvesting actions
- **HoldingsTable**: Interactive table showing all cryptocurrency holdings

## Data Flow

1. Mock APIs provide initial holdings and capital gains data
2. User selects assets for tax loss harvesting
3. Real-time calculations update the projected gains/losses
4. Tax savings are automatically calculated and displayed

## Development

- Run development server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Lint code: `npm run lint`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
