export type WaterNeed = 'xerophyte' | 'mesophyte' | 'hygrophyte';
export type Habitat = 'tropical' | 'desert' | 'temperate' | 'mediterranean' | 'subtropical' | 'alpine';
export type LightRequirement = 'sun' | 'partial-shade' | 'shade';

export interface Plant {
  _id?: string;
  name: string;
  scientificName?: string;
  description: string;
  waterNeed: WaterNeed;
  habitat: Habitat;
  lightRequirement: LightRequirement;
  imageUrl?: string;
  careInstructions: {
    watering: string;
    fertilizing?: string;
    pruning?: string;
    temperature?: string;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  isIndoor: boolean;
  bloomingSeason?: string[];
  maxHeight?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PlantCareLog {
  _id?: string;
  plantId: string;
  action: 'watered' | 'fertilized' | 'pruned' | 'repotted' | 'other';
  date: Date;
  notes?: string;
  nextActionDate?: Date;
}

// Helper constants
export const WATER_NEEDS: Record<WaterNeed, { label: string; description: string }> = {
  xerophyte: {
    label: 'Xerophyte',
    description: 'Requires very little water, drought resistant'
  },
  mesophyte: {
    label: 'Mesophyte', 
    description: 'Moderate water requirements'
  },
  hygrophyte: {
    label: 'Hygrophyte',
    description: 'Requires high humidity and water'
  }
};

export const HABITATS: Record<Habitat, { label: string; description: string }> = {
  tropical: {
    label: 'Tropical',
    description: 'Warm and humid climate year-round'
  },
  desert: {
    label: 'Desert',
    description: 'Arid climate with little precipitation'
  },
  temperate: {
    label: 'Temperate',
    description: 'Well-defined seasons'
  },
  mediterranean: {
    label: 'Mediterranean',
    description: 'Dry summers and mild winters'
  },
  subtropical: {
    label: 'Subtropical',
    description: 'Warm climate with wet season'
  },
  alpine: {
    label: 'Alpine',
    description: 'High mountain, cold temperatures'
  }
};

export const LIGHT_REQUIREMENTS: Record<LightRequirement, { label: string; description: string }> = {
  sun: {
    label: 'Direct Sun',
    description: '6+ hours of direct sunlight'
  },
  'partial-shade': {
    label: 'Partial Shade',
    description: '3-6 hours of direct sunlight'
  },
  shade: {
    label: 'Shade',
    description: 'Indirect light, less than 3 hours of sun'
  }
};
