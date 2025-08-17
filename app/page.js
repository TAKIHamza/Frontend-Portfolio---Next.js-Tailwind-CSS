
import ContactButton from "@/components/ContactButton";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import ProjectsSection from "@/components/project/ProjectsSection";



export default function Home() {
  return (
    <div className=" overflow-y-auto  bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]  font-[family-name:var(--font-geist-sans)]">
     
     <NavBar></NavBar>
     <HeroSection/>

        <ContactButton currentUser={{ id: 1 }} />
        
        <ProjectsSection ></ProjectsSection>
        <Footer></Footer>
    </div>
  );
}
