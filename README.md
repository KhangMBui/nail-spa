# 💅 NailSpa App

Welcome to **NailSpa App**!  
This is a full-stack booking and management system for nail salons, built with **TypeScript**, **Express**, **Sequelize**, **PostgreSQL**, and **React**.

---

## 🧩 Project Structure

```
nailspa-app/
│
├── nailspa-backend/   # Express + Sequelize + PostgreSQL API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── seeders/
│   │   ├── migrations/
│   │   ├── config/
│   │   └── app.ts
│   ├── .env
│   ├── package.json
│   └── ...
│
├── nailspa-frontend/  # React + TypeScript client
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md          # ← You are here!
```

---

## 🚀 Features

- **💅 Service Management:** Add, update, and remove nail services (with gel/non-gel options)
- **👩‍💼 Worker Management:** Manage staff, roles, and salaries
- **📅 Appointment Booking:** Book, update, and cancel appointments
- **💰 Income Tracking:** Record and view income entries
- **🔐 User Roles:** Admin/manager endpoints for secure operations
- **📖 API Docs:** Interactive Swagger UI at `/api-docs`
- **🌐 Modern Frontend:** React SPA for customers and staff

---

## 🛠️ Getting Started

### Backend

```sh
cd nailspa-backend
npm install
cp .env.example .env   # Edit your DB credentials
npm run db:reset       # Drop, create, migrate, and seed the database
npm run dev            # Start backend in dev mode
```

- API docs: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

### Frontend

```sh
cd nailspa-frontend
npm install
npm run dev
```

- App: [http://localhost:5173](http://localhost:5173) (default Vite port)

---

## 📝 Scripts

Backend (`nailspa-backend`):

- `npm run dev` — Start backend with hot reload
- `npm run db:reset` — Drop, create, migrate, and seed the database
- `npm run db:seed:all` — Run all seeders
- `npm run db:migrate` — Run migrations
- `npm run db:drop` — Drop the database

Frontend (`nailspa-frontend`):

- `npm run dev` — Start React app in dev mode

---

## 📚 API Documentation

- Visit [http://localhost:5000/api-docs](http://localhost:5000/api-docs) for interactive Swagger UI.

---

## 🖼️ Screenshots

> _Add screenshots of your booking page, admin dashboard, etc. here!_

---

## 🤝 Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you would like to change.

---

## 🧑‍💻 Authors

- [Khang Bui](mailto:khangbui2002@gmail.com)

---

## 🪄 License

[MIT](LICENSE)

---

> Made with ❤️ for nail salons!
