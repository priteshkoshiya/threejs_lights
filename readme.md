
# Three.js Lights Controller

An interactive 3D scene built with Three.js that allows users to manipulate and experiment with various lighting types in real-time. This project demonstrates how different light sources affect a 3D environment featuring a house and surrounding trees.

## 🚀 Live Demo
You can view the live project here: [https://threejs-lights-controller.netlify.app/](https://threejs-lights-controller.netlify.app/)

## ✨ Features
This application includes a comprehensive control panel (lil-gui) to adjust the following lighting types and their properties:

* **Sun/Moon Light (Directional):** Control intensity, color (RGB), and position (X, Y, Z).
* **Fill Light:** Adjust background illumination levels and positioning.
* **Rim Light (Spot Light):** Specifically includes controls for **Angle** and **Penumbra** to create soft edge effects.
* **Key Light:** The primary light source for the subject.
* **Ambient Light:** Uniformly illuminates all objects in the scene.
* **Point Light:** Light that emits in all directions from a single point.
* **Hemisphere Light:** Provides a gradient between a sky color and a ground color.
* **RectArea Light:** Emits light from a rectangular plane.
* **Helpers:** Toggle "Show Helper" for each light to visualize its position and direction in the 3D space.

## 🛠️ Technologies Used
* **Three.js:** 3D Engine
* **TypeScript:** Primary programming language
* **Vite:** Build tool and local development server
* **lil-gui:** For the interactive control interface

## 💻 Setup and Installation

Follow these steps to run the project locally:

1. **Prerequisites:**
   Download and install [Node.js](https://nodejs.org/).

2. **Install Dependencies:**
   ```bash
   # Run this only the first time
   npm install

3. **Run Local Server:**
   ```bash
   # Start the development server at localhost:8080
   npm run dev

4. **Build for Production:**
   ```bash
   # Generate a production-ready build in the dist/ directory
   npm run build

## 📁 Project Structure

* `/src`: Contains the TypeScript source code for the Three.js scene and controllers.
* `/static`: Asset files used in the project.
* `vite.config.js`: Configuration for the Vite build tool.

---

Created by [priteshkoshiya](https://github.com/priteshkoshiya)
