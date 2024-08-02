const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Helper function to process data
const processData = (data) => {
    let numbers = [];
    let alphabets = [];

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && item.length === 1 && /^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
        }
    });

    let highestAlphabet = alphabets.length ? [alphabets.sort((a, b) => b.localeCompare(a))[0]] : [];
    
    return { numbers, alphabets, highestAlphabet };
};

// POST method
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            user_id: 'Bhanu_prakash_02102003', 
            email: 'bhanuprakash@gmail.com', 
            roll_number: 'AP21110010775',
            message: 'Invalid input'
        });
    }

    const { numbers, alphabets, highestAlphabet } = processData(data);

    res.json({
        is_success: true,
        user_id: 'Bhanu_prakash_02102003', // Replace with your actual user ID format
        email: 'bhanuprakash@gmail.com', // Replace with your actual email
        roll_number: 'AP21110010775', // Replace with your actual roll number
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
    });
});

// GET method
app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

app.get("/",(req,res)=>{
    res.send("Hello, World!");
}

)

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);
});
