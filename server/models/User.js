const mongoose = require('mongoose')

const personalBookItemSchema = new mongoose.Schema({
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    comment: String,
});

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            trim: true,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            lowercase: true,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        },
        //האם רוצה לקבל מייל בעת הוספת מתכון חדש
        getmailoninsert: {
            type: Boolean,
            default: false
        },
        roles: {
            type: String,
            enum: ['ADMIN', 'USER'],
            default: 'USER'
        },
        active: {
            type: Boolean,
            default: true,
            required: true
        },
        deleted: {
            type: Boolean,
            default: false,
            required: true
        },
        //ספר מתכונים אישי
        //שהסוג שלו זה מערך, שכל איבר בו הוא אוביקט,
        //והאוביקט הזה מכיל 2 שדות
        //שדה אחד הוא קוד של מתכון
        //ושדה שני הוא הערה שהמשתמש רושם לעצמו
        personalBook: [personalBookItemSchema]
           

    },
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)