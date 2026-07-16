import mongoose from 'mongoose';

const pricingPackageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    features: [{ type: String }],
    description: { type: String },
    isRecommended: { type: Boolean, default: false },
    isEnabled: { type: Boolean, default: true },
    deliveryEstimate: { type: String },
    revisionLimit: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const PricingPackage = mongoose.model('PricingPackage', pricingPackageSchema);
export default PricingPackage;
