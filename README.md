![image](https://github.com/user-attachments/assets/05d2dec8-1306-475b-90de-0728f6283fb4)

# VitalWave

VitalWave is a web application designed to assist users in finding suitable hospitals based on various personal and medical criteria, including age, sex, location, underlying health conditions, symptoms, and preferred time slots. The application integrates Google Maps to provide a seamless location-based search experience.

## Features

- **Dynamic User Input Form:**
  - Collects details such as age, sex, location, underlying health conditions, symptoms, and preferred time slots.
  - Validates inputs for accuracy and relevance.

- **Google Maps Integration:**
  - Displays nearby hospitals based on user location.
  - Provides interactive map markers with information windows for each hospital.

- **Server-Side Processing:**
  - Uses Node.js and Express to handle API requests and process data.
  - Parses CSV files to fetch and sort hospital data according to user requirements.

- **Machine Learning:**
  - Employs a Naive Bayes classifier to assess the urgency of the user's condition (emergency or non-emergency).

## Technologies Used

### Frontend:
- React.js
- Bootstrap for styling
- `react-google-autocomplete` for location input
- `react-google-maps/api` for map rendering

### Backend:
- Node.js
- Express
- Morgan for logging
- Helmet for security enhancements
- Cors for handling cross-origin requests
- Body-parser for parsing incoming request bodies
- Natural (for Naive Bayes classification)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vitalwave.git
   ```

2. Navigate to the project directory:
   ```bash
   cd vitalwave
   ```

3. Install dependencies for the backend:
   ```bash
   npm install
   ```

4. Navigate to the frontend directory:
   ```bash
   cd my-app
   ```

5. Install dependencies for the frontend:
   ```bash
   npm install
   ```

6. Start the backend server:
   ```bash
   node server.js
   ```

7. Start the frontend server:
   ```bash
   npm start
   ```

## Usage

1. Open the application in your browser at `http://localhost:3000`.
2. Follow the on-screen instructions to input your details.
3. View the list of recommended hospitals on the map.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Google Maps API for location services
- Bootstrap for CSS framework
- Natural library for machine learning classification

## Contact

For any inquiries or feedback, please contact:
- [Idrak Islam](mailto:playbox8g@gmail.com)
- [Kiarash Vosough](mailto:kiarashvos@gmail.com)
- [Muhammad Hamza Sohail](mailto:hamza.sohail29@gmail.com)
- [Rayyan Ahmed](mailto:rayyanahmed021@hotmail.com)

## Administrative Information
### Project Title: VitalWave

### Team Members:
- Idrak Islam - playbox8g@gmail.com
- Kiarash Vosough - kiarashvos@gmail.com
- Muhammad Hamza Sohail - hamza.sohail29@gmail.com
- Rayyan Ahmed - rayyanahmed021@hotmail.com

## Instructions to Compile and Run the Project for Judges

### Overview
This is a simple React App (Next.js) with a Node.js API running in the background.

### Prerequisites
You will need Node.js and npm installed on your system.

### Steps

1. Start the API (run the below commands from the root folder):
   ```bash
   cd api
   npm install
   npm run dev
   ```

2. On a different terminal, start the Next.js app (run the below commands from the root folder):
   ```bash
   cd my-app
   npm install
   npm run start:dev
   ```

3. Once both servers are running simultaneously on two different terminals, visiting `http://localhost:3000` should load the application.
