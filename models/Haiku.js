import mongoose from 'mongoose';

const HaikuSchema = new mongoose.Schema({
  text: {
    type: [String],
    required: true,
    validate: [arrayLimit, 'Haiku must have exactly 3 lines']
  },
  timestamp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// New Code schema
const CodeSchema = new mongoose.Schema({
  code: {
    type: String,
    default: ''
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

function arrayLimit(val) {
  return val.length === 3;
}

export const Haiku = mongoose.models.Haiku || mongoose.model('Haiku', HaikuSchema);
export const Code = mongoose.models.Code || mongoose.model('Code', CodeSchema);