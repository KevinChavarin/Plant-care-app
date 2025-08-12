import mongoose from 'mongoose';
import { Plant, PlantCareLog } from '@/types/plant';

const PlantSchema = new mongoose.Schema<Plant>({
  name: { type: String, required: true },
  scientificName: { type: String },
  description: { type: String, required: true },
  waterNeed: { 
    type: String, 
    required: true, 
    enum: ['xerophyte', 'mesophyte', 'hygrophyte'] 
  },
  habitat: { 
    type: String, 
    required: true, 
    enum: ['tropical', 'desert', 'temperate', 'mediterranean', 'subtropical', 'alpine'] 
  },
  lightRequirement: { 
    type: String, 
    required: true, 
    enum: ['sun', 'partial-shade', 'shade'] 
  },
  imageUrl: { type: String },
  careInstructions: {
    watering: { type: String, required: true },
    fertilizing: { type: String },
    pruning: { type: String },
    temperature: { type: String }
  },
  difficulty: { 
    type: String, 
    required: true, 
    enum: ['easy', 'medium', 'hard'] 
  },
  isIndoor: { type: Boolean, required: true },
  bloomingSeason: [{ type: String }],
  maxHeight: { type: String }
}, {
  timestamps: true
});

const PlantCareLogSchema = new mongoose.Schema<PlantCareLog>({
  plantId: { type: String, required: true, ref: 'Plant' },
  action: { 
    type: String, 
    required: true, 
    enum: ['watered', 'fertilized', 'pruned', 'repotted', 'other'] 
  },
  date: { type: Date, required: true, default: Date.now },
  notes: { type: String },
  nextActionDate: { type: Date }
}, {
  timestamps: true
});

export const PlantModel = mongoose.models.Plant || mongoose.model<Plant>('Plant', PlantSchema);
export const PlantCareLogModel = mongoose.models.PlantCareLog || mongoose.model<PlantCareLog>('PlantCareLog', PlantCareLogSchema);
