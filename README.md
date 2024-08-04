# Crypto Tracker

## Project Overview
Crypto Tracker is a React-based application that provides real-time tracking of cryptocurrency prices and their 24-hour price changes. This application is built using React and Bootstrap for styling, and it fetches real-time data from the Binance API. The project includes features such as filtering cryptocurrencies by categories (MEME, TOP, UTILS, and ALL), and displaying cryptocurrency prices in a visually appealing way with periodic updates.

## Features

- **Real-Time Data:** 
  - Fetches real-time cryptocurrency prices and their 24-hour price changes from the Binance API.

- **Filter by Category:** 
  - Users can filter cryptocurrencies by categories such as MEME coins, TOP coins, UTILS, and view ALL coins.

- **Visual Updates:** 
  - Displays cryptocurrency data with periodic updates and animations.

- **Dark Theme:** 
  - The application uses a dark theme for a better visual experience.

## Technologies Used

- **React:** JavaScript library for building user interfaces.
- **Bootstrap:** Front-end framework for responsive design and styling.
- **Binance API:** Source of real-time cryptocurrency data.
- **CSS:** Custom styles for theming and layout.

## How It Works

- **Fetching Data:**
  - The application fetches real-time data from the Binance API for various cryptocurrencies.
  - It retrieves both the current prices and the 24-hour price change percentages.

- **Context Providers:**
  - The `PriceCoinsContext` and `PriceChangeContext` are used to manage the state of cryptocurrency prices and price changes across the application.
  - These contexts provide data to the components that display the cryptocurrency information.

- **Displaying Data:**
  - The application uses Bootstrap cards to display each cryptocurrency's data, including its image, name, current price, and 24-hour price change percentage.
  - The data is displayed in a grid layout that adjusts for different screen sizes using Bootstrap's responsive grid system.

- **Filtering:**
  - Users can filter the displayed cryptocurrencies by selecting a category from a dropdown menu.
  - The categories include MEME coins, TOP coins, UTILS, and ALL.

- **Periodic Updates:**
  - The application periodically updates the displayed cryptocurrency data to ensure that users see the most recent information.
  - Animations are used to smoothly transition between updates.
