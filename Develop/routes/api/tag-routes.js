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

router.post("/", async (req, res) => {
  try {
    // create a new category
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json({ message: "Failed to create Tag" });
  }
});

router.put("/:id", async (req, res) => {
  // update category by id value
  try {
    const updateTag = await Tag.update(
      { tag_name: req.body.tag_name },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(500).json({ message: "Failed to update tag" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
      // delete a category by its `id` value
      const deleteTag = await Tag.destroy({
          where: { id: req.params.id }
      });
      if (deleteTag) {
          res.status(200).json({ message: 'Tag deleted' });
      } else {
          res.status(404).json({ message: 'Tag not found' });
      }
  } catch (err) {
      res.status(500).json({ message: 'Failed to delete Tag' });
  }
});

module.exports = router;
