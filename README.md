
# Angular Country Info 🌍

This is an Angular application built as a test assessment. It provides information about countries, allowing users to search for a country and view its public holidays for a given year. The application is built with Angular 20, Angular Material, and Tailwind CSS, and it fetches data from the [Nager.Date API](https://date.nager.at/Api).

-----

## ✨ Features

* **Home Page**:
  * Search for countries by name with a dynamic input field.
  * Display a full, clickable list of all available countries.
  * A "Random Countries" widget that shows 3 random countries and their next upcoming public holiday.
* **Country Detail Page**:
  * Displays a list of all public holidays for the selected country.
  * Includes the holiday name, date, and type.
  * Allows users to switch the year from 2020 to 2030, with the current year displayed by default.
* **Code Quality**:
  * Integrated with ESLint and Prettier for consistent code style.
  * `lint-staged` is configured to automatically format and lint files on commit.

-----

## 🛠️ Tech Stack

* **Framework**: [Angular](https://angular.io/) v20
* **UI Components**: [Angular Material](https://material.angular.io/) v20
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
* **Asynchronous Operations**: [RxJS](https://rxjs.dev/)
* **Code Quality**: [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)
* **Module Bundler**: [Angular CLI](https://angular.io/cli)

-----

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

* [Node.js](https://nodejs.org/) (v20.x or later recommended)
* [Angular CLI](https://angular.io/cli) (v20.x or later)
  ```bash
  npm install -g @angular/cli
  ```

### Installation & Setup

1.  **Clone the repository**

    ```bash
    git clone <your-repository-url>
    cd angular-template
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```
-----

## 📜 Available Scripts

### Running the Development Server

To start the application in development mode, run the following command. The app will be available at `http://localhost:4200/`. The server will automatically reload if you change any of the source files.

```bash
npm start
```

### Building the Project

To create a production-ready build of the application, use:

```bash
npm run build
```

The build artifacts will be stored in the `dist/angular-template/browser/` directory.

### Code Linting and Formatting

This project uses ESLint for code analysis and Prettier for code formatting. These checks are automatically run on staged files before each commit, thanks to `lint-staged`.

To run the linter manually across the entire project, you can add a `lint` script to `package.json` or run `ng lint`.

To format the code manually, run:

```bash
npx prettier --write .
```

-----

## 🏛️ Project Architecture

The application is structured into a few key modules and components:

* **`app.component`**: The root component of the application.
* **`home.component`**: The main page, containing the country search functionality and the random countries widget.
* **`country.component`**: The detail page, which displays the list of holidays for a specific country and handles year switching.
* **`core/services`**: Contains services responsible for API communication (e.g., `country.service.ts`).
* **`shared/models`**: Contains TypeScript interfaces for the data structures used throughout the application (e.g., `country.model.ts`, `holiday.model.ts`).

Routing is managed in `app.routes.ts`, defining the paths for the home and country detail pages.
