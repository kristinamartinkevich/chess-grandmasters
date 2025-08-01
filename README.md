# ♟️ Chess Grandmasters

Create a **React + TypeScript** application that displays a list of chess grandmasters and a profile page for a selected player with live-updating information.

---

## ✅ Requirements

### 📋 List of Grandmasters
- Fetch and display a list of chess players with the **GM (Grandmaster)** title.
- 📥 **Endpoint**: [`https://api.chess.com/pub/titled/GM`](https://api.chess.com/pub/titled/GM)

### 👤 Player Profile Page
- Clicking a player opens a profile page showing:
  - Basic player information
  - A **live-updating activity timer**
- 📥 **Endpoint**: [`https://api.chess.com/pub/player/{username}`](https://api.chess.com/pub/player/{username})
- ⏱️ Use the `last_online` field from the API response to show time since last activity, updating every second.

---

## 🎨 Design

- You are free to style the application however you like.
- Layout, colors, fonts, and UI/UX decisions are up to you.

---

## 📡 Reference

- 📚 **API Documentation**: [https://www.chess.com/news/view/published-data-api](https://www.chess.com/news/view/published-data-api)
