const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your own details
const FULL_NAME = "john_doe"; // lowercase
const DOB = "17091999"; // ddmmyyyy
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    let evenNumbers = [];
    let oddNumbers = [];
    let alphabets = [];
    let specialChars = [];
    let sum = 0;
    let concatString = "";

    data.forEach(item => {
      if (/^-?\d+$/.test(item)) {
        const num = parseInt(item);
        if (num % 2 === 0) {
          evenNumbers.push(item);
        } else {
          oddNumbers.push(item);
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        specialChars.push(item);
      }
    });

    const allChars = alphabets.join("");
    const reversed = allChars.split("").reverse().join("");
    concatString = reversed
      .split("")
      .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: concatString
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      error: "An unexpected error occurred."
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
