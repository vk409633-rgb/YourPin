import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ToolsSection from '@/components/ToolsSection';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <ToolsSection />
                <Features />
            </main>
            <Footer />
        </>
    );
}
