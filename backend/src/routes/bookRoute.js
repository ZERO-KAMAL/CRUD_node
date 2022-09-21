import { Router } from "express";
import multer from "multer";
import BookController from "../controllers/bookController.js";
const router = Router();

let imageName;
//multer works for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    imageName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname.trim();
    cb(null, imageName);
  },
});

const upload = multer({ storage });

const bookController = new BookController();

//book/add *image is form name*
router.post("/add", upload.single("image"), (req, res) => {
  bookController.addBook(req, res, imageName);
});

//to get the individual  data from db
router.get("/:id", bookController.getBookByID);

//to get all the data from database
router.get("/", bookController.getBooks);

//to update the data
router.put("/update/:id", bookController.updateBook);

//to delete
router.delete("/delete/:id", bookController.deleteBook);

//for search
router.get("/search/all", bookController.searchBook);

export default router;
