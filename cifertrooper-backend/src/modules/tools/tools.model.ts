import mongoose, { Document, Schema } from 'mongoose';

export interface IIpLog extends Document {
  linkId: string;
  ip: string;
  userAgent: string;
  referer: string;
  country?: string;
  city?: string;
  isp?: string;
  timestamp: Date;
}

const IpLogSchema = new Schema<IIpLog>(
  {
    linkId: { type: String, required: true, index: true },
    ip: { type: String, required: true },
    userAgent: { type: String, default: '' },
    referer: { type: String, default: '' },
    country: String,
    city: String,
    isp: String,
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const IpLog = mongoose.model<IIpLog>('IpLog', IpLogSchema);

export interface IGrabberLink extends Document {
  linkId: string;
  label: string;
  redirectUrl: string;
  createdBy?: string;
}

const GrabberLinkSchema = new Schema<IGrabberLink>(
  {
    linkId: { type: String, required: true, unique: true },
    label: { type: String, default: '' },
    redirectUrl: { type: String, required: true },
    createdBy: String,
  },
  { timestamps: true }
);

export const GrabberLink = mongoose.model<IGrabberLink>('GrabberLink', GrabberLinkSchema);
