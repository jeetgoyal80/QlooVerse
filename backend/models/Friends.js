import mongoose from 'mongoose';

const friendSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['pending', 'accepted'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

const Friend = mongoose.model('Friend', friendSchema);
export default Friend;
