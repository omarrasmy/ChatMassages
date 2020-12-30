const mongoose = require('mongoose');
require('dotenv').config({ path: './configurations/dev.env' })


mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://3Dpackage:kingabo3omar@cluster0.r8gmj.mongodb.net/Package3d?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

mongoose.connection.once('open', () => { console.log('MongoDB Connected'); });

