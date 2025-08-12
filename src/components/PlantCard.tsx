import React from 'react';
import Image from 'next/image';
import { Plant, WATER_NEEDS, HABITATS, LIGHT_REQUIREMENTS } from '@/types/plant';
import { Droplets, Sun, MapPin, Clock, Home, TreePine } from 'lucide-react';

interface PlantCardProps {
  plant: Plant;
  onEdit?: (plant: Plant) => void;
  onDelete?: (plantId: string) => void;
  onCareLog?: (plant: Plant) => void;
}

export const PlantCard: React.FC<PlantCardProps> = ({ 
  plant, 
  onEdit, 
  onDelete, 
  onCareLog 
}) => {
  const getWaterNeedStyle = (waterNeed: Plant['waterNeed']) => {
    const styles = {
      xerophyte: 'water-xerophyte',
      mesophyte: 'water-mesophyte', 
      hygrophyte: 'water-hygrophyte'
    };
    return styles[waterNeed];
  };

  const getHabitatStyle = (habitat: Plant['habitat']) => {
    const styles = {
      tropical: 'habitat-tropical',
      desert: 'habitat-desert',
      temperate: 'habitat-temperate',
      mediterranean: 'habitat-mediterranean',
      subtropical: 'habitat-tropical',
      alpine: 'habitat-temperate'
    };
    return styles[habitat] || 'habitat-temperate';
  };

  const getLightStyle = (light: Plant['lightRequirement']) => {
    const styles = {
      sun: 'light-sun',
      'partial-shade': 'light-partial-shade',
      shade: 'light-shade'
    };
    return styles[light];
  };

  const getDifficultyColor = (difficulty: Plant['difficulty']) => {
    const colors = {
      easy: 'text-green-600',
      medium: 'text-yellow-600',
      hard: 'text-red-600'
    };
    return colors[difficulty];
  };

  const getDifficultyLabel = (difficulty: Plant['difficulty']) => {
    const labels = {
      easy: 'Easy',
      medium: 'Medium', 
      hard: 'Hard'
    };
    return labels[difficulty];
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-1">{plant.name}</h3>
          {plant.scientificName && (
            <p className="text-sm text-muted italic">{plant.scientificName}</p>
          )}
        </div>
        <div className="flex gap-2">
          {plant.isIndoor && (
            <div className="p-2 bg-accent/10 rounded-lg">
              <Home className="w-4 h-4 text-accent" />
            </div>
          )}
        </div>
      </div>

      {/* Image */}
      {plant.imageUrl && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <Image 
            src={plant.imageUrl} 
            alt={plant.name}
            width={400}
            height={192}
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      {/* Description */}
      <p className="text-muted mb-4 text-sm leading-relaxed">{plant.description}</p>

      {/* Categories */}
      <div className="space-y-3 mb-4">
        {/* Water Need */}
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-blue-500" />
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getWaterNeedStyle(plant.waterNeed)}`}>
            {WATER_NEEDS[plant.waterNeed].label}
          </span>
        </div>

        {/* Habitat */}
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-green-500" />
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getHabitatStyle(plant.habitat)}`}>
            {HABITATS[plant.habitat].label}
          </span>
        </div>

        {/* Light Requirement */}
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-yellow-500" />
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getLightStyle(plant.lightRequirement)}`}>
            {LIGHT_REQUIREMENTS[plant.lightRequirement].label}
          </span>
        </div>

        {/* Difficulty */}
        <div className="flex items-center gap-2">
          <TreePine className="w-4 h-4 text-accent" />
          <span className={`text-xs font-medium ${getDifficultyColor(plant.difficulty)}`}>
            Difficulty: {getDifficultyLabel(plant.difficulty)}
          </span>
        </div>
      </div>

      {/* Additional Info */}
      {(plant.maxHeight || plant.bloomingSeason?.length) && (
        <div className="border-t border-border pt-3 mb-4">
          {plant.maxHeight && (
            <p className="text-xs text-muted mb-1">
              <span className="font-medium">Max height:</span> {plant.maxHeight}
            </p>
          )}
          {plant.bloomingSeason?.length && (
            <p className="text-xs text-muted">
              <span className="font-medium">Blooming:</span> {plant.bloomingSeason.join(', ')}
            </p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 pt-3 border-t border-border">
        {onCareLog && (
          <button
            onClick={() => onCareLog(plant)}
            className="flex-1 bg-accent hover:bg-accent-dark text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
          >
            <Clock className="w-4 h-4" />
            Log Care
          </button>
        )}
        {onEdit && (
          <button
            onClick={() => onEdit(plant)}
            className="px-3 py-2 border border-border hover:bg-muted/10 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(plant._id!)}
            className="px-3 py-2 text-red-600 hover:bg-red-50 border border-red-200 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
