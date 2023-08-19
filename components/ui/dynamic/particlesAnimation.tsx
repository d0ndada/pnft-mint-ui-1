import { useEffect } from 'react';
// import { tsParticles } from 'tsparticles';
import styles from './ParticlesAnimation.module.css';

function ParticlesAnimation() {
  useEffect(() => {
    // tsParticles.load("particleContainer", {
      // ... the provided configuration
    });
  // }, []);

  return (
    <div className={styles.particleContainer}></div>
  );
}

export default ParticlesAnimation;
