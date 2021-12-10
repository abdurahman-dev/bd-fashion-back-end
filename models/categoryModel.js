const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Provide Category Name'],
      unique: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    image: {
      url: {
        type: String,
        required: [true, 'Please provide img url'],
      },
      publicId: {
        type: String,
        required: [true, 'Please provide img  public_id'],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model('Category', categorySchema);
