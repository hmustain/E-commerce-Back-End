const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    // find all categories
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
          as: "products",
        },
      ],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve categories" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find one category by its primary key
    const category = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          as: "products",
        },
      ],
    });
    if (!category) {
      res.status(404).json({ message: "Category not found" });
    } else {
      res.json(category);
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve category" });
  }
});

router.post("/", async (req, res) => {
  try {
    // create a new category
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: "Failed to create category" });
  }
});

// come back and get help from tutor on this one
router.put("/:id", async (req, res) => {
  // update category by id value
  try {
    const updateCat = await Category.update(
      { category_name: req.body.category_name },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updateCat);
  } catch (err) {
    res.status(500).json({ message: "Failed to update category" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
      // delete a category by its `id` value
      const deleteCat = await Category.destroy({
          where: { id: req.params.id }
      });
      if (deleteCat) {
          res.status(200).json({ message: 'Category deleted' });
      } else {
          res.status(404).json({ message: 'Category not found' });
      }
  } catch (err) {
      res.status(500).json({ message: 'Failed to delete category' });
  }
});


module.exports = router;
