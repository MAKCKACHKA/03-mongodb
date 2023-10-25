const contacts = require("../models/contacts");
const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const listContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const body = req.body;
  const result = await contacts.addContact(body);

  const { error } = addSchema.validate(body);
  if (error) {
    res.status(400).json({ message: error.message });
  }

  res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const result = await contacts.updateContact(contactId, body);
  const { error } = addSchema.validate(body);
  if (error) {
    res.status(400).json({ message: error.message });
  }
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const result = await contacts.updateStatusContact(contactId, body);
  const { error } = favoriteSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: "missing field favorite" });
  }
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(result);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
