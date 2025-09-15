# SaaS Contracts Dashboard

**Author:** Swastik Shetty

---

## About The Project

This is a single-page application (SPA) built with React that simulates a SaaS contracts management dashboard. It allows users to log in, view a filterable list of contracts, and inspect detailed insights for each contract.

## Tech Stack Choices

*   **Framework:** Vite + React was chosen for its fast development server and optimized build process.
*   **Styling:** Tailwind CSS was used exclusively for styling to enable rapid UI development with a utility-first approach, ensuring a consistent and modern design without writing custom CSS.
*   **State Management:** React's Context API was used for managing global authentication state due to its simplicity and native integration with React. For a larger application, Redux or a similar library might be considered.
*   **Routing:** `react-router-dom` is the standard for routing in React applications.
*   **Icons:** `react-icons` provides a vast and easy-to-use library of icons.

## Assumptions Made

*   **Authentication:** The login is a mock implementation. Any username is accepted, and the password must be `test123`. A mock JWT is stored in `localStorage` to persist the session.
*   **API:** The contract data is fetched from a local JSON file (`public/api/contracts.json`). The API calls are simulated with `fetch`.
*   **File Upload:** The file upload functionality is a simulation. It uses `setTimeout` to mimic an asynchronous upload process and does not actually send files to a server.
*   **Responsiveness:** The UI is designed to be responsive and should work well on both desktop and mobile devices.

## Setup Instructions

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd saas-contracts-dashboard
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).
