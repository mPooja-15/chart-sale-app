// routes/sale.js
const express = require("express");
const router = express.Router();
const SalesData = require("../models/Sale");

router.post("/", async (req, res) => {
  try {
    const { salesData } = req.body;

    // Check if a product with the same name already exists
    const existingProduct = await SalesData.findOne({
      product: salesData.product,
    });

    if (existingProduct) {
      // Check if the same month already exists for the product
      const existingMonth = existingProduct.sales.find(
        (sale) => sale.month === salesData.sales[0].month
      );

      if (existingMonth) {
        // Update the amount for an existing month
        existingMonth.amount = salesData.sales[0].amount;
        await existingProduct.save();
        return res.status(200).json(existingProduct);
      } else {
        // Add sales data for a new month
        existingProduct.sales.push(salesData.sales[0]);
        await existingProduct.save();
        return res.status(201).json(existingProduct);
      }
    } else {
      // Product does not exist, create a new one
      const result = await SalesData.create(salesData);
      return res.status(201).json(result);
    }
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error (E11000)
      res
        .status(400)
        .json({ error: "Product with the same name already exists." });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// API endpoint to get sales data
router.get("/", async (req, res) => {
  try {
    const data = await SalesData.find({});
    res.json({ salesData: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
