const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const connection = require("./database/db.js");

const PORT = process.env.PORT || 3001;
// const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
//   'http://localhost:3000',
//   'https://stalwart-gaufre-c859e0.netlify.app'
// ];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS: ' + origin));
//     }
//   },
//   credentials: true,
// };
// app.use(cors(corsOptions));
// app.use(cors());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));


app.use('/api/v1/order', require('./routes/orderRoute'));
app.use('/api/v1/user', require('./routes/userRoute'));

connection();

app.listen(PORT, () => console.log("server is running on port", PORT));
