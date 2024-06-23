// models/Configuration.js
import mongoose from 'mongoose';

const ConfigurationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

export const configurationModel = mongoose.models.configurations || mongoose.model('configurations', ConfigurationSchema);
