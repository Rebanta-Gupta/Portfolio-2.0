import type { PortfolioData } from '../../types';
import About      from './About';
import Contact    from './Contact';
import Experience from './Experience';
import Hero       from './Hero';
import Projects   from './Projects';
import Skills     from './Skills';

interface MainSectionsProps {
  data: PortfolioData;
}

export default function MainSections({ data }: MainSectionsProps) {
  return (
    <>
      <Hero
        hero={data.hero}
        resumeEnabled={data.resumeEnabled}
        resumePath={data.resumePath}
      />
      <About      about={data.about} />
      <Experience experience={data.experience} />
      <Projects   projects={data.projects} />
      <Skills     skills={data.skills} />
      <Contact    contact={data.contact} />
    </>
  );
}