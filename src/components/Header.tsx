import React from 'react';
import { Leaf, Plus, Search, Filter } from 'lucide-react';

interface HeaderProps {
  onAddPlant: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onAddPlant,
  searchTerm,
  onSearchChange,
  showFilters,
  onToggleFilters
}) => {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Leaf className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">PlantCare</h1>
              <p className="text-xs text-muted">Smart plant care management</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search plants..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-background"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleFilters}
              className={`p-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                showFilters 
                  ? 'bg-accent text-white' 
                  : 'border border-border hover:bg-muted/10 text-foreground'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            
            <button
              onClick={onAddPlant}
              className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Plant</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
