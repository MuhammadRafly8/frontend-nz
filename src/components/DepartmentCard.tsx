'use client';
import React, { useState } from 'react';

interface DepartmentCardProps {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  isSelected: boolean;
  onClick: () => void;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({
  id,
  name,
  shortName,
  description,
  icon,
  color,
  bgColor,
  borderColor,
  isSelected,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group cursor-pointer relative overflow-hidden rounded-2xl p-8 border-2 transition-all duration-500 hover:scale-105 ${
        isSelected 
          ? `${borderColor} ${bgColor} shadow-2xl shadow-cyan-500/20` 
          : 'border-white/20 bg-white/5 hover:bg-white/10'
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      
      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-1000 ${
              isHovered ? 'animate-pulse' : ''
            }`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon with Animation */}
        <div className={`text-6xl mb-4 transition-all duration-300 ${
          isHovered ? 'scale-110 rotate-3' : 'scale-100'
        }`}>
          {icon}
        </div>

        {/* Title */}
        <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
          isSelected ? 'text-cyan-400' : 'text-white'
        }`}>
          {shortName}
        </h3>

        {/* Full Name */}
        <h4 className="text-lg font-semibold text-cyan-300 mb-3 line-clamp-2">
          {name}
        </h4>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-6">
          {description}
        </p>

        {/* Interactive Elements */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 transition-colors duration-300 group-hover:text-cyan-300">
            {isSelected ? 'Dipilih' : 'Klik untuk filter'}
          </span>
          
          {/* Selection Indicator */}
          <div className={`w-8 h-8 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
            isSelected 
              ? 'border-cyan-400 bg-cyan-400 shadow-lg shadow-cyan-400/50' 
              : 'border-gray-400 group-hover:border-cyan-400'
          }`}>
            {isSelected && (
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            )}
          </div>
        </div>

                 {/* Stats Badge */}
         <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
           isSelected 
             ? 'bg-cyan-500 text-white shadow-lg' 
             : 'bg-white/10 text-gray-300 group-hover:bg-cyan-500/20 group-hover:text-cyan-300'
         }`}>
           {15 + (parseInt(id.slice(-1)) || 0) * 5} Artikel
         </div>
      </div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

      {/* Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
        isSelected 
          ? 'shadow-[0_0_30px_rgba(0,234,255,0.3)]' 
          : 'group-hover:shadow-[0_0_20px_rgba(0,234,255,0.2)]'
      }`} />
    </div>
  );
};

export default DepartmentCard;
