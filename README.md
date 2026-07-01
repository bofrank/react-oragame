# React OraGame

Find recipes by ingredient! A simple and intuitive app to discover what you can cook with the ingredients you have on hand.

## Why I Built This

I wanted a fast, low-friction way to answer a very simple everyday question: *“What can I cook with what I already have?”* Instead of forcing users to browse through random recipe lists, this app starts from a single ingredient and builds outward, helping you discover recipes you can actually make right now.

What makes this project unique is its focus on ingredient-first discovery and its use of a public recipe database as the sole source of truth. You can type in almost any ingredient, and the app will query a public API to return real recipes that match, rather than a fixed, hand-curated list. This keeps the experience lightweight, always up to date, and easy to extend for new data sources or UI ideas in the future.

## 🚀 Live Demo

[View the app](http://oraga.me)

## ✨ Features

- Search recipes by ingredient
- Discover new dishes based on what you have available
- Easy-to-use interface
- Built with React

## 🛠️ Tech Stack

- **Frontend**: React, CSS
- **APIs**: Recipe database integration

## 📋 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bofrank/react-oragame.git
cd react-oragame
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## 🤝 Contributing

Contributions are welcome! Feel free to open issues and submit pull requests to help improve this project.

## 📝 License

This project is open source and available under the MIT License.

---

**Note**: The live demo at http://oraga.me uses a self-signed SSL certificate. You may see a security warning in your browser, which is safe to bypass.
