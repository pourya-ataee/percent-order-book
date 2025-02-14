# Project Setup

## Installation

First, install the required dependencies:

```sh
npm install
```

## Configuration

Before running the project, update the `.env` file and set the `BASE_URL` according to your local server. This ensures that the proxy functions correctly.

Example:

```env
VITE_BASE_URL=http://localhost:3000/api/
```

## Running the Project

Once the setup is complete, start the development server:

```sh
npm run dev
```

Make sure your server is running on the specified `BASE_URL` to avoid any proxy-related issues.
