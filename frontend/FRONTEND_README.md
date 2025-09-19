# Gen-Z Ballot - Modular Voting System Frontend

## 🎨 New Features
- **Glassomorphism UI Theme**: Modern glass-like design with backdrop filters and transparency effects
- **Modular Architecture**: Clean separation of components, hooks, and utilities
- **Enhanced UX**: Smooth animations, better responsive design, and improved accessibility

## 📁 Project Structure

```
src/
├── components/           # Reusable React components
│   ├── AccountSelector.js    # Account selection component
│   ├── TabNavigation.js      # Tab navigation component
│   ├── VoterRegistration.js  # Voter registration form and list
│   ├── CandidateRegistration.js # Candidate registration form and list
│   ├── VotingPanel.js        # Voting interface
│   ├── VerificationPanel.js  # Verification interface for officers
│   ├── EventLog.js          # Event logging component
│   └── index.js             # Component exports
│
├── hooks/               # Custom React hooks
│   ├── useContract.js       # Contract initialization hook
│   ├── useVoters.js         # Voter management hook
│   ├── useCandidates.js     # Candidate management hook
│   ├── useVoting.js         # Voting functionality hook
│   └── index.js             # Hook exports
│
├── utils/               # Utility functions and constants
│   ├── constants.js         # Application constants and configurations
│   ├── blockchain.js        # Blockchain utility functions
│   ├── eventManager.js      # Event management system
│   └── index.js             # Utility exports
│
├── contracts/           # Smart contract ABIs and addresses
├── App.js              # Main application component
├── App.css             # App-specific styles
├── index.js            # React app entry point
└── index.css           # Global glassomorphism styles
```

## 🎨 Glassomorphism Theme Features

- **Dynamic Gradient Background**: Animated multi-color gradient background
- **Glass Cards**: Translucent cards with backdrop blur effects
- **Smooth Animations**: Fade-in effects and hover transitions
- **Responsive Design**: Mobile-first design with adaptive layouts
- **Modern Typography**: Clean, readable fonts with proper contrast
- **Interactive Elements**: Hover effects and focus states for accessibility

## 🔧 Key Components

### AccountSelector
- Displays available Hardhat accounts
- Shows current account role and address
- Glassomorphism card design

### VoterRegistration
- Voter registration form with validation
- List of registered voters with status badges
- Real-time updates via blockchain events

### CandidateRegistration
- Candidate registration with security deposit
- Candidate list with verification status
- Political party and constituency information

### VotingPanel
- Clean voting interface
- Shows only verified candidates
- Prevents multiple voting through smart contract validation

### VerificationPanel
- Officer-only verification interface
- Separate sections for voter and candidate verification
- Role-based access control

### EventLog
- Real-time blockchain event logging
- Formatted event display with timestamps
- Scrollable event history

## 🎣 Custom Hooks

### useContract
- Manages smart contract initialization
- Handles wallet connections
- Error handling and loading states

### useVoters
- Voter data management
- Registration and verification functions
- Event listener setup

### useCandidates
- Candidate data management
- Registration with security deposits
- Verification workflow

### useVoting
- Vote casting functionality
- Voter eligibility validation
- Transaction handling

## 🛠 Utilities

### constants.js
- Hardhat account configurations
- Blockchain network settings
- Validation constants

### blockchain.js
- Provider initialization
- Transaction utilities
- Address formatting helpers

### eventManager.js
- Centralized event management
- Event logging and notification system
- Subscription-based updates

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start Hardhat node:**
   ```bash
   npx hardhat node
   ```

3. **Deploy contracts:**
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

4. **Start the frontend:**
   ```bash
   npm start
   ```

## 🎯 Features Maintained

All original functionality has been preserved:
- ✅ Voter registration and verification
- ✅ Candidate registration with security deposits
- ✅ Voting system with eligibility checks
- ✅ Role-based verification by election officers
- ✅ Real-time event logging
- ✅ Multiple account switching
- ✅ Blockchain transaction handling

## 🎨 Styling

The new glassomorphism theme includes:
- Animated gradient backgrounds
- Glass-like transparency effects
- Modern button designs with hover states
- Improved form styling with focus effects
- Responsive design for mobile devices
- Accessibility improvements with focus indicators

## 📱 Responsive Design

The interface is fully responsive with:
- Mobile-first design approach
- Flexible grid layouts
- Adaptive typography
- Touch-friendly interface elements
- Optimized for various screen sizes