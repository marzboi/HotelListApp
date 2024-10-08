# Hotel Listing Application

## Overview

The Hotel Listing Application is a user-friendly Angular web app designed to display a list of hotels, allowing users to filter the list by several criteria such as hotel name, category, rating, and price. This app was made to show case some of the new feature of Angular 18 and the power of using signals in services to manage data accross components.

## Features

### Hotel Filters

The app offers various filtering options to enhance the user experience:

- **Name Filter**: Users can filter hotels by their name. This filter works as a "contains" search, meaning that any hotel name that includes the search text will be displayed.
- **Category (Stars) Filter**: Users can filter hotels by their star rating (from 1 to 5 stars). This filter is implemented as a checkbox system, allowing users to select multiple star ratings at once. For example, users can search for hotels that are either 3, 4, or 5 stars at the same time.

- **Rating Filter**: Users can filter hotels based on their rating, which is on a scale from 0 to 5. The filter is implemented as a range input, where users can set a minimum rating, and all hotels with that rating or higher will be shown. The rating filter supports decimal values (e.g., 3.7).

- **Price Filter**: The price filter allows users to filter hotels within a specific price range. This range is adjustable between a minimum price of 50€ and a maximum price of 1000€. Users can set the upper limit of their desired price, and hotels with prices less than or equal to this value will be displayed.

### Pagination

To manage large sets of results, the app includes a pagination system that divides the list of hotels into smaller pages. This makes browsing through hotels easier and faster by loading only a subset of results per page.

### Responsive Design

The app includes a clean and simple user interface. For layout and styling, the app leverages the powerful [Bootstrap](https://getbootstrap.com/) or [Tailwind CSS](https://tailwindcss.com/) frameworks (depending on your preferred implementation), ensuring a responsive and modern design across devices.

## Getting Started

### Installation

1. Clone or download the project to your local machine.
2. Navigate to the project directory and install the required dependencies:
   ```bash
   npm install
   ```

## Generating the Hotel Data

### To generate the hotel data, run the following command:

```bash
npm run generate-db
```

This will generate a db.json file containing a set of hotels, which will serve as the application's data source.

Running the Application
To start the development server and view the app in your browser, use the following command:

```bash
npm run start
```

The application will be accessible at http://localhost:4200. A local REST API for the hotel data will also be available at http://localhost:3000/hotels, powered by json-server.

## Technologies Used

- Angular (version 17)
- JSON Server for simulating a REST API.
- Faker.js for generating mock hotel data.
- Tailwind CSS for responsive design.
