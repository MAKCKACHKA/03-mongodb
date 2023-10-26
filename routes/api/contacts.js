const express = require("express");
const router = express.Router();
const contacts = require("../../controllers/contacts");
const isValidId = require("../../middleware/isValidId");
const {
  validateBody,
  addSchema,
  favoriteSchema,
} = require("../../middleware/isValidBody");

router.get("/", contacts.listContacts);
router.get("/:contactId", isValidId, contacts.getContactById);
router.post("/", validateBody(addSchema), contacts.addContact);
router.delete("/:contactId", isValidId, contacts.removeContact);
router.put(
  "/:contactId",
  isValidId,
  validateBody(addSchema),
  contacts.updateContact
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(favoriteSchema),
  contacts.updateStatusContact
);

module.exports = router;
