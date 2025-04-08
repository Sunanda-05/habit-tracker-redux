# Redux Habit Tracker

A comprehensive habit tracking application **mainly focusing on implementing most Redux features** built with Next.js, Redux Toolkit, and shadcn/ui.

## Features

- Track daily, weekly, and monthly habits
- Persist user preferences with redux-persist
- Manage API requests with RTK Query
- Polished UI with shadcn/ui components
- Filter and sort habits by multiple criteria

## Redux Implementation

This project showcases a comprehensive implementation of Redux concepts:

1. **Redux Toolkit (RTK)**
   - Configured store with middleware
   - Used for state management across the application

2. **Entity Adapter**
   - Normalized state for efficient CRUD operations
   - Implemented selectors (`selectAll`, `selectById`)
   - Used in journal and habit management

3. **RTK Query**
   - Built data-fetching layer with `createApi`
   - Endpoints for CRUD operations on habits and journals
   - Implemented `fakeBaseQuery` for side-effect-only endpoints
   - Used `onQueryStarted` to sync backend data with normalized state
   - Cache invalidation with `providesTags` and `invalidatesTags`
   - Response transformation with `transformResponse`

4. **React-Redux Integration**
   - Connected components with `useSelector` and `useDispatch`
   - Leveraged RTK Query hooks for data fetching
   - Synchronized UI state with backend data

5. **UI Toast System**
   - Integrated with shadcn/ui toast component
   - Triggered notifications for user actions
   - Connected to RTK Query for operation feedback

6. **Redux Slices**
   - Created slices for theme, filters, journals, habits
   - Implemented reducers for state management
   - Used actions for state updates

7. **Redux Persist**
   - Persisted selected parts of state across sessions
   - Configured with whitelist/blacklist

8. **Redux Selectors**
   - Created efficient state selectors
   - Used for accessing normalized state

9. **Redux Actions and Reducers**
   - Implemented in slices for state manipulation
   - Connected to UI components

10. **Redux Provider**
    - Set up provider for application
    - Configured with store and persistor

11. **Redux State Management**
    - Combined local UI state and server state
    - Implemented optimistic updates

12. **Redux Middleware**
    - Configured default middleware
    - Added custom middleware as needed

13. **Redux Thunks**
    - Used via RTK Query for async operations
    - Handled loading, success, and error states

14. **State Normalization**
    - Implemented with entity adapters
    - Optimized for performance

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd redux-habit-tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the mock API:

   ```bash
   npm run mock-api
   # or
   yarn mock-api
   ```

4. In a separate terminal, start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
habit-tracker/
├── app/                   # Next.js app directory
├── components/            # UI components
│   ├── ui/                # shadcn/ui components
│   ├── AllEntriesTab.jsx       # Journal Entries listing component
│   ├── CalendarSheetView.jsx   # Journal Calendar components
│   ├── EntriesTab.jsx          # Journal Entry component
│   └── FilterBar.jsx           # Filtering component
│   ├── HabitForm.jsx           # Form for creating habits
│   ├── HabitList.jsx           # Habit listing component
│   ├── JournalEntry.jsx        # Journal listing component
│   ├── JournalHeader.jsx       # Journal Header component
│   ├── theme-provider.jsx      # Theme Provider Wrapper
│   ├── ThemeToggle.jsx         # Theme switcher
│   ├── Toast.jsx               # Toast Component
│   ├── ToastManager.jsx        # Global Toast Handler
│   ├── WriteTab.jsx            # Journal Form Component
├── redux/              # Redux configuration
│   ├── store.js                # Redux store setup
│   ├── provider.jsx            # Redux provider
│   ├── features/               # Redux slices
│   │   ├── themeSlice.js       # Theme state
│   │   ├── filterSlice.js      # Filter state
│   │   └── journalSlice.js     # Journal state with entity adapter
│   │   └── toastSlice.js       # Toast Slice
│   └── api/                    # RTK Query APIs
│       ├── habitApi.js         # Habit CRUD operations
│       ├── habitExtraApi.js    # Habit InjectApi Example
│       ├── toastApi.js         # Toast CRUD operations
│       └── journalApi.js       # Journal CRUD operations
├── mock/                  # Mock API data
│   └── db.json            # Mock database
└── package.json           # Dependencies and scripts
```

## Technologies

- Next.js
- Redux Toolkit
- RTK Query
- redux-persist
- shadcn/ui
- json-server (for mock API)

## License

MIT
