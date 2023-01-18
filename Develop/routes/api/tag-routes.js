const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    // find all categories
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          as: "products",
        },
      ],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve tags" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    // find one category by its primary key
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          as: "products",
        },
      ],
    });
    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
    } else {
      res.json(tag);
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve Tag" });
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
