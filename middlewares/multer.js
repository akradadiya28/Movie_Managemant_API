import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        const imgUpload = Date.now() + '-' + file.originalname;
        cb(null, file.fieldname + '-' + imgUpload)
        console.log(imgUpload);
    }
})

const upload = multer({ storage: storage })

export default upload;

// PORT=3022
// DB_URI="mongodb+srv://akradadiya28:ArpitRnw28@ecommerceapi.tzmga.mongodb.net/fake_db"
// JWT_SECRET=fake_db