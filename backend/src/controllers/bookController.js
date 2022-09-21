import bookModel from "../models/bookModel.js";
import { Op } from "sequelize";
import textConstants from "../constants/textConstants.js";
import { text } from "stream/consumers";
import urlConstants from "../constants/urlConstants.js";

export default class BookController {
  //addBook is function for add book
  async addBook(req, res, imageNameT) {
    try {
      const data = await bookModel.create({ ...req.body, image: imageNameT });
      console.log(data);
      if (data) {
        res.json(data);
      } else {
        res.json({ success: false, Message: "Error during Adding the book" });
      }
    } catch (err) {
      return res.json({
        success: false,
        message: "Error while Quering in Database",
      });
    }
  }

  //getting the book by id
  async getBookByID(req, res) {
    const { id } = req.params;
    if (id) {
      const data = await bookModel.findByPk(id);
      //   console.log(data);

      //if found the data then return json else thorw empty array
      //   if (data) {
      //     res.json(data);
      //   } else res.json([]);
      data ? res.json(data) : res.json([]);
    } else
      res.json({ success: false, message: textConstants.BOOK_ID_NOT_PROVIDED });
    await bookModel.findByPk();
  }

  //update the book
  async updateBook(req, res) {
    const { id } = req.params;
    if (id) {
      req.body;
      const data = await bookModel.update(req.body, {
        where: {
          id,
        },
      });
      if (data[0] === 1) {
        res.json({ success: true, message: "Updated Book" });
      } else {
        res.json({ success: false, message: "Couldm't update book" });
      }
      console.log(data);
    } else
      res.json({ success: false, message: textConstants.BOOK_ID_NOT_PROVIDED });
  }

  //delete by id
  async deleteBook(req, res) {
    const { id } = req.params;
    if (id) {
      const data = await bookModel.destroy({
        where: {
          id,
        },
      });
      //   if (data[0] === 1) {
      //     res.json({ success: true, message: "upload Book" });
      //   } else {
      //     res.json({ success: false, message: "Couldm't delte book" });
      //   }
      data
        ? res.json({ success: true, message: "deleted Book" })
        : res.json({ success: false, message: "Couldm't delete book" });
      console.log(data);
    } else
      res.json({ success: false, message: textConstants.BOOK_ID_NOT_PROVIDED });
  }

  //search book
  async searchBook(req, res) {
    const { q } = req.query;

    if (q) {
      const data = await bookModel.findAll({
        where: {
          [Op.or]: {
            name: {
              [Op.like]: `%${q}%`,
            },
            author: {
              [Op.like]: `%${q}%`,
            },
          },
        },
        raw:true,
      });

      console.log(data);
      //for ftech the image
      for (let d of data) {
        //which change the value of image url + old data
        d.image = urlConstants.IMG_PATH_URL + d.image;
        console.log(d.image);
      }
      res.json(data);
    } else res.json({ success: false, message: "Empty Query Search string." });
  }
  //get all the books list
  async getBooks(req, res) {
    let { limit } = req.query;
    //if there is no limit value then return 20 books
    if (!limit) limit = 20;
    try {
      const data = await bookModel.findAll({
        limit: parseInt(limit),
        raw: true,
      });
      console.log(data);
      //for ftech the image
      for (let d of data) {
        //which change the value of image url + old data
        d.image = urlConstants.IMG_PATH_URL + d.image;
        console.log(d.image);
      }
      res.json(data);
    } catch (error) {
      res.json({ success: false, message: error });
    }
  }
}
