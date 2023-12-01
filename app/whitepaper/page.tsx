"use client"

import React from 'react';
import Footer from '@/components/footer';
import { useInView } from 'react-intersection-observer';

const WhitepaperPage = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <>
            <div ref={ref} className={`bg-card-foreground-100 min-h-screen overflow-y-auto p-8 ${!inView ? 'translate-y-5 opacity-0' : 'animate-fade-in-up'} `}>
                <h1 className="text-center font-bold xl:mb-8 xl:text-4xl xl:leading-[6rem] 2xl:mb-8 2xl:text-6xl 2xl:leading-[12rem]">Solar Juice NFT Whitepaper</h1>
                <div className="rounded-lg bg-card p-[5%] shadow-md">
                    <div className="space-y-6">
                        {/* Introduction */}
                        <section>
                            <h2 className="text-xl font-semibold">1. Introduction</h2>
                            <p>Welcome to Solar Juice NFT! These terms and conditions outline the rules and regulations for the use of our platform.</p>
                        </section>

                        {/* Acceptance of Terms */}
                        <section>
                            <h2 className="text-xl font-semibold">2. Acceptance of Terms</h2>
                            <p>By accessing this platform, we assume you accept these terms and conditions. Do not continue to use Solar Juice NFT if you do not agree to all the terms and conditions stated on this page.</p>
                        </section>

                        {/* Digital Ownership and Staking */}
                        <section>
                            <h2 className="text-xl font-semibold">3. Digital Ownership and Staking</h2>
                            <p>Solar Juice NFT provides a platform for digital ownership and environmentally responsible staking. Users can stake their digital assets to earn rewards and actively participate in the growth of the Solar Juice ecosystem.</p>
                        </section>

                        {/* Environmental Impact */}
                        <section>
                            <h2 className="text-xl font-semibold">4. Environmental Impact</h2>
                            <p>Our commitment to environmental sustainability includes contributing to Renewable Energy Credits (RECs) and supporting carbon offset initiatives. Staking activities directly contribute to positive environmental impacts.</p>
                        </section>

                        {/* User Engagement and Education */}
                        <section>
                            <h2 className="text-xl font-semibold">5. User Engagement and Education</h2>
                            <p>Solar Juice NFT is dedicated to transparent reporting on how staking rewards catalyze environmental initiatives. The platform serves as an educational hub, providing information on the ecological consequences of staking and the broader significance of renewable energy.</p>
                        </section>

                        {/* Governance and Community */}
                        <section>
                            <h2 className="text-xl font-semibold">6. Governance and Community</h2>
                            <p>Solar Juice NFT follows a governance model that incorporates the voices of stakers. Stakers have decision-making authority, shaping the platform&apos;s trajectory, partnerships, and sustainability endeavors. The community is encouraged to actively engage in environmental projects.</p>
                        </section>

                        {/* Conclusion */}
                        <section>
                            <h2 className="text-xl font-semibold">7. Conclusion</h2>
                            <p>The synthesis of NFT ownership, staking mechanics, and a commitment to environmental well-being places Solar Juice NFT at the forefront of innovation within the NFT domain. Users contribute meaningfully to a sustainable and ecologically conscious future.</p>
                        </section>

                        {/* Download Whitepaper */}
                        {/* <section>
                            <h2 className="text-xl font-semibold">8. Download Whitepaper</h2>
                            <p>Download our whitepaper for a detailed understanding of our terms, conditions, and the innovative solutions offered by Solar Juice NFT.</p>
                            <a href="/home/lawliet/dl/SolarJuice.Whitepaper2.0.odt" download>Download Terms and Conditions</a>
                        </section> */}
                    </div>
                </div>
            </div>
            <Footer enableScrollSnap={false} />
        </>
    );
}

export default WhitepaperPage;
