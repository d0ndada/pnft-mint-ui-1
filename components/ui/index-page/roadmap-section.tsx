
interface RoadmapEventProps {
  position: string;
  title: string;
  description: string;
}

export const RoadmapSection = () => {
  function RoadmapEvent({ position, title, description }:RoadmapEventProps) {
  return (
    <div className="mb-10  flex">
      {/* Position */}
      <div className="mr-4 flex flex-col items-center">
        <h3 className="mb-2 text-4xl font-bold text-black">{position}.</h3>
        {/* Line */}
{ position !=="3"    &&    <div className="mb-[-9vh] w-1 grow bg-black "></div>
}      </div>
      {/* Event details */}
      <div className="flex flex-col items-start rounded-lg border-2 border-black p-4">
        <h4 className="mb-2 text-2xl font-bold text-black">{title}</h4>
        <p className="text-lg text-black">{description}</p>
      </div>

    </div>
  );
}
  return (
   <section id="roadmap" className="conntent-space grid h-[100vh] grid-cols-2 items-center justify-items-center bg-secondary px-10 scroll-snap-align-start" >
        <div className="flex flex-col" >
        <h2 className="col-start-1 mb-8 text-3xl font-bold text-foreground">Roadmap</h2>
    <p className="text-lg text-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci praesentium est deleniti magni odio. Numquam temporibus dicta doloremque sint, quisquam exercitationem velit nisi est quos odit nihil, nam, tenetur laborum?</p>
</div>
        <div className="col-start-2 ml-[-32%] flex flex-col gap-12">
    {/* Roadmap events */}
    <RoadmapEvent position="1" title="Lucky Buddha Launch" description="Now Available on Opensea" />
    <RoadmapEvent position="2" title="Foo Dogs" description="A FREE NFT for all Lucky Buddha owners" />
    <RoadmapEvent position="3" title="??????????" description="A surprise collection coming soon" />
  </div>
</section>
  )
}
