export interface ParticlesProps {
  /** Number of particles. */
  count?: number;
  /** Movement speed multiplier. */
  speed?: number;
  /** CSS color for particles and lines. */
  color?: string;
  /** Max distance for connecting lines between particles. */
  connectDistance?: number;
  /** Enable mouse repulsion interaction. */
  mouseInteract?: boolean;
  /** Particle radius range (min). */
  minRadius?: number;
  /** Particle radius range (max). */
  maxRadius?: number;
  /** Opacity of connecting lines. */
  lineOpacity?: number;
  /** Background color (transparent by default). */
  backgroundColor?: string;
  /** Whether the animation is running. */
  active?: boolean;
  /** Additional CSS classes. */
  className?: string;
}
